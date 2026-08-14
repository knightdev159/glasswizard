"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { ProductImageView } from "@/components/product-image";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { capitalise, formatInches, formatMoney, formatPrice, spellNumber } from "@/lib/format";

export default function CartPage() {
  const { lines, totals, hydrated, setQuantity, remove } = useCart();

  if (!hydrated) {
    return (
      <div className="container-page py-20">
        <div className="h-6 w-40 animate-pulse rounded bg-ink-100" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-ink-950">Your cart is empty</h1>
        <p className="mt-3 text-ink-600">
          {capitalise(spellNumber(products.length))} models in stock in South Miami, all
          ready to deliver this week.
        </p>
        <Link
          href="/refrigerators"
          className="mt-8 inline-block rounded-lg bg-frost-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-frost-800"
        >
          Browse refrigerators
        </Link>
      </div>
    );
  }

  const shortfall = company.freeDeliveryThreshold - totals.subtotal;

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold tracking-tight text-ink-950">Your cart</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-ink-200 border-y border-ink-200">
          {lines.map(({ product, quantity, lineTotal }) => (
            <li key={product.sku} className="flex gap-5 py-6">
              <Link
                href={`/refrigerators/${product.slug}`}
                className="shrink-0 rounded-lg border border-ink-200 bg-ink-50/60 p-2"
              >
                <ProductImageView
                  image={product.images[0]}
                  sizes="112px"
                  badge={false}
                  className="h-24 w-24 sm:h-28 sm:w-28"
                />
              </Link>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-frost-700">
                      {product.brand}
                    </p>
                    <h2 className="mt-0.5 font-semibold leading-snug text-ink-900">
                      <Link href={`/refrigerators/${product.slug}`} className="hover:text-frost-700">
                        {product.name}
                      </Link>
                    </h2>
                    <p className="numeric mt-1 text-xs text-ink-500">
                      Model {product.model} · {product.capacity.totalCuFt} cu. ft. ·{" "}
                      {formatInches(product.dimensions.widthIn)} wide
                    </p>
                  </div>
                  <p className="numeric font-bold text-ink-900">{formatPrice(lineTotal)}</p>
                </div>

                <div className="mt-auto flex items-center gap-4">
                  <div className="flex items-center rounded-lg border border-ink-300">
                    <button
                      type="button"
                      onClick={() => setQuantity(product.sku, quantity - 1)}
                      aria-label={`Decrease quantity of ${product.model}`}
                      className="h-9 w-9 text-ink-600"
                    >
                      −
                    </button>
                    <span className="numeric w-7 text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(product.sku, quantity + 1)}
                      disabled={quantity >= product.inventory.onHand}
                      aria-label={`Increase quantity of ${product.model}`}
                      className="h-9 w-9 text-ink-600 disabled:text-ink-300"
                    >
                      +
                    </button>
                  </div>
                  {quantity >= product.inventory.onHand && (
                    <span className="numeric text-xs text-amber-700">
                      All {product.inventory.onHand} in stock
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(product.sku)}
                    className="text-sm text-ink-500 underline hover:text-ink-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-card border border-ink-200 p-6">
          <h2 className="font-bold text-ink-950">Order summary</h2>

          <dl className="numeric mt-5 space-y-3 text-sm">
            <Row label="Subtotal" value={formatMoney(totals.subtotal)} />
            <Row
              label="Delivery & installation"
              value={totals.delivery === 0 ? "Free" : formatMoney(totals.delivery)}
            />
            <Row
              label={`Sales tax (${(company.salesTaxRate * 100).toFixed(0)}%)`}
              value={formatMoney(totals.tax)}
            />
            <div className="flex justify-between border-t border-ink-200 pt-3 text-base font-bold text-ink-950">
              <dt>Total</dt>
              <dd>{formatMoney(totals.total)}</dd>
            </div>
          </dl>

          {shortfall > 0 && (
            <p className="numeric mt-4 rounded-lg bg-frost-50 px-4 py-3 text-sm text-frost-900">
              Add {formatMoney(shortfall)} more for free delivery.
            </p>
          )}

          <button
            type="button"
            disabled
            className="mt-5 w-full cursor-not-allowed rounded-lg bg-ink-300 px-6 py-3 text-sm font-semibold text-white"
          >
            Checkout
          </button>
          <p className="mt-3 text-xs leading-relaxed text-ink-500">
            Online payment is not connected yet — no card processor is wired to this
            store. To place this order today, call{" "}
            <a
              href={`tel:${company.contact.phone}`}
              className="numeric font-semibold text-frost-700 underline"
            >
              {company.contact.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${company.contact.email}`} className="font-semibold text-frost-700 underline">
              {company.contact.email}
            </a>
            .
          </p>

          <p className="mt-4 border-t border-ink-100 pt-4 text-xs leading-relaxed text-ink-500">
            Tax shown is the {(company.salesTaxRate * 100).toFixed(0)}% Florida rate applied
            to this cart. Miami-Dade adds a discretionary surtax on the first $5,000 of each
            item, which is calculated at checkout.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-ink-700">
      <dt>{label}</dt>
      <dd className="font-medium text-ink-900">{value}</dd>
    </div>
  );
}
