"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { products } from "@/data/products";
import type { Product } from "@/data/types";
import { company } from "@/data/company";
import {
  addLine,
  clearCart,
  getHydratedServerSnapshot,
  getHydratedSnapshot,
  getServerSnapshot,
  getSnapshot,
  removeLine,
  setLineQuantity,
  subscribe,
} from "@/lib/cart-store";

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

interface CartTotals {
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  totals: CartTotals;
  /** False during SSR and the hydration render, true once localStorage is live. */
  hydrated: boolean;
  add: (sku: string, quantity?: number) => void;
  setQuantity: (sku: string, quantity: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribe,
    getHydratedSnapshot,
    getHydratedServerSnapshot
  );

  const lines = useMemo<CartLine[]>(() => {
    return stored.flatMap((line) => {
      const product = products.find((p) => p.sku === line.sku);
      if (!product) return [];
      // Never let the cart exceed what is actually on the warehouse floor.
      const quantity = Math.min(line.quantity, Math.max(product.inventory.onHand, 0));
      if (quantity <= 0) return [];
      return [{ product, quantity, lineTotal: product.price * quantity }];
    });
  }, [stored]);

  const totals = useMemo<CartTotals>(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const delivery =
      subtotal === 0 || subtotal >= company.freeDeliveryThreshold
        ? 0
        : company.localDeliveryFee;
    const tax = Math.round(subtotal * company.salesTaxRate * 100) / 100;
    return { subtotal, delivery, tax, total: subtotal + delivery + tax };
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount: lines.reduce((n, l) => n + l.quantity, 0),
      totals,
      hydrated,
      add: addLine,
      setQuantity: setLineQuantity,
      remove: removeLine,
      clear: clearCart,
    }),
    [lines, totals, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
