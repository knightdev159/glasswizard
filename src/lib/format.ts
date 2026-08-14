import { company } from "@/data/company";
import type { Dimensions, Product } from "@/data/types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const usdCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** Whole-dollar price, for tiles and headings. */
export function formatPrice(value: number): string {
  return usd.format(value);
}

/** Cent-accurate, for anything that has to add up — cart, tax, totals. */
export function formatMoney(value: number): string {
  return usdCents.format(value);
}

/**
 * Renders inches the way a spec sheet does: 35¾ rather than 35.75, because
 * that is what is printed on the installation guide the customer is holding
 * when they measure their opening.
 */
const EIGHTHS = ["", "⅛", "¼", "⅜", "½", "⅝", "¾", "⅞"];

export function formatInches(value: number): string {
  const whole = Math.floor(value);
  const eighth = Math.round((value - whole) * 8);
  if (eighth === 0) return `${whole}"`;
  if (eighth === 8) return `${whole + 1}"`;
  return `${whole}${EIGHTHS[eighth]}"`;
}

export function formatDimensions(d: Dimensions): string {
  return `${formatInches(d.widthIn)} W × ${formatInches(d.heightIn)} H × ${formatInches(d.depthIn)} D`;
}

export function formatCuFt(value: number): string {
  return `${value} cu. ft.`;
}

/** Percentage saved off list, rounded down so we never overstate a discount. */
export function savingsPercent(product: Product): number | null {
  if (!product.listPrice || product.listPrice <= product.price) return null;
  return Math.floor(((product.listPrice - product.price) / product.listPrice) * 100);
}

export function qualifiesForFreeDelivery(price: number): boolean {
  return price >= company.freeDeliveryThreshold;
}

export function stockLabel(product: Product): {
  text: string;
  tone: "in" | "low" | "out";
} {
  const { onHand, localLeadTimeDays } = product.inventory;
  if (onHand === 0) return { text: "Out of stock", tone: "out" };
  const days = localLeadTimeDays === 1 ? "next business day" : `${localLeadTimeDays} business days`;
  if (onHand <= 3) return { text: `Only ${onHand} left — delivers in ${days}`, tone: "low" };
  return { text: `In stock — delivers in ${days}`, tone: "in" };
}
