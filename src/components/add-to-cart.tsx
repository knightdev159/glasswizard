"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./cart-provider";

export function AddToCart({ sku, onHand }: { sku: string; onHand: number }) {
  const { add, lines } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const inCart = lines.find((l) => l.product.sku === sku)?.quantity ?? 0;
  const remaining = Math.max(onHand - inCart, 0);
  const soldOut = onHand === 0;

  // Clamped during render rather than corrected in an effect, so the displayed
  // quantity can never briefly exceed what is left on the floor — which matters
  // when another tab adds the same SKU.
  const selected = Math.min(quantity, Math.max(remaining, 1));

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2500);
    return () => clearTimeout(t);
  }, [added]);

  if (soldOut) {
    return (
      <div className="rounded-lg border border-ink-200 bg-ink-50 p-4 text-sm text-ink-600">
        <p className="font-semibold text-ink-800">Out of stock</p>
        <p className="mt-1">
          We can normally source this within a week —{" "}
          <Link href="/contact" className="font-medium text-frost-700 underline">
            ask us for an ETA
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex items-center rounded-lg border border-ink-300">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, selected - 1))}
            disabled={selected <= 1}
            aria-label="Decrease quantity"
            className="h-12 w-11 text-lg text-ink-600 disabled:text-ink-300"
          >
            −
          </button>
          <span className="numeric w-8 text-center font-semibold" aria-live="polite">
            {selected}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(Math.min(remaining, selected + 1))}
            disabled={selected >= remaining}
            aria-label="Increase quantity"
            className="h-12 w-11 text-lg text-ink-600 disabled:text-ink-300"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            add(sku, selected);
            setAdded(true);
          }}
          disabled={remaining <= 0}
          className="h-12 flex-1 rounded-lg bg-frost-700 px-6 text-sm font-semibold text-white transition hover:bg-frost-800 disabled:bg-ink-300"
        >
          {remaining <= 0 ? "All stock in your cart" : "Add to cart"}
        </button>
      </div>

      {added && (
        <p className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800" role="status">
          Added to cart.{" "}
          <Link href="/cart" className="font-semibold underline">
            View cart
          </Link>
        </p>
      )}
    </div>
  );
}
