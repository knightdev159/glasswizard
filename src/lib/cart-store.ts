/**
 * The cart lives in localStorage, which is an external store — so it is read
 * through `useSyncExternalStore` rather than mirrored into React state inside
 * an effect. That gives us three things for free: no hydration mismatch (the
 * server snapshot is always empty), no cascading render on mount, and live
 * sync between browser tabs via the `storage` event.
 *
 * Only the SKU and quantity are persisted. Price is always re-read from the
 * catalogue, so a stale entry can never sell a unit at last month's price.
 */

const STORAGE_KEY = "glasswizard.cart.v1";

export interface StoredLine {
  sku: string;
  quantity: number;
}

const EMPTY: readonly StoredLine[] = Object.freeze([]);

let cache: readonly StoredLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function parse(raw: string | null): readonly StoredLine[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const lines = parsed.flatMap((entry): StoredLine[] => {
      if (typeof entry !== "object" || entry === null) return [];
      const { sku, quantity } = entry as Partial<StoredLine>;
      if (typeof sku !== "string" || typeof quantity !== "number") return [];
      if (!Number.isFinite(quantity) || quantity < 1) return [];
      return [{ sku, quantity: Math.floor(quantity) }];
    });
    return lines.length > 0 ? lines : EMPTY;
  } catch {
    return EMPTY;
  }
}

function load(): readonly StoredLine[] {
  if (typeof window === "undefined") return EMPTY;
  return parse(window.localStorage.getItem(STORAGE_KEY));
}

function emit() {
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  // Another tab changed the cart — drop our cache and re-read.
  if (listeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

function onStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  cache = load();
  loaded = true;
  emit();
}

/** Cached so repeated calls return a referentially stable value. */
export function getSnapshot(): readonly StoredLine[] {
  if (!loaded) {
    cache = load();
    loaded = true;
  }
  return cache;
}

/** Always empty on the server, which is what the markup is rendered against. */
export function getServerSnapshot(): readonly StoredLine[] {
  return EMPTY;
}

/** False during SSR and the hydration render, true thereafter. */
export function getHydratedSnapshot(): boolean {
  return true;
}

export function getHydratedServerSnapshot(): boolean {
  return false;
}

function commit(next: readonly StoredLine[]) {
  cache = next.length > 0 ? next : EMPTY;
  loaded = true;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  }
  emit();
}

export function addLine(sku: string, quantity = 1) {
  const current = getSnapshot();
  const existing = current.find((l) => l.sku === sku);
  commit(
    existing
      ? current.map((l) => (l.sku === sku ? { ...l, quantity: l.quantity + quantity } : l))
      : [...current, { sku, quantity }]
  );
}

export function setLineQuantity(sku: string, quantity: number) {
  const current = getSnapshot();
  commit(
    quantity <= 0
      ? current.filter((l) => l.sku !== sku)
      : current.map((l) => (l.sku === sku ? { ...l, quantity } : l))
  );
}

export function removeLine(sku: string) {
  commit(getSnapshot().filter((l) => l.sku !== sku));
}

export function clearCart() {
  commit(EMPTY);
}
