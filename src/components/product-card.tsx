import Link from "next/link";
import type { Product } from "@/data/types";
import { formatCuFt, formatInches, formatPrice, savingsPercent, stockLabel } from "@/lib/format";
import { ProductImageView } from "./product-image";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const savings = savingsPercent(product);
  const stock = stockLabel(product);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-ink-200 bg-white transition hover:border-ink-300 hover:shadow-lg hover:shadow-ink-900/5">
      <div className="relative bg-ink-50/60 p-4">
        {savings !== null && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-frost-700 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Save {savings}%
          </span>
        )}
        <ProductImageView
          image={product.images[0]}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          priority={priority}
          className="aspect-4/3"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-ink-100 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-frost-700">
            {product.brand}
          </p>
          <h3 className="mt-1 text-base font-semibold leading-snug text-ink-900">
            <Link href={`/refrigerators/${product.slug}`} className="after:absolute after:inset-0">
              {product.name}
            </Link>
          </h3>
          <p className="numeric mt-1 text-xs text-ink-500">Model {product.model}</p>
        </div>

        <dl className="numeric flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-600">
          <div className="flex gap-1">
            <dt className="text-ink-400">Capacity</dt>
            <dd className="font-medium">{formatCuFt(product.capacity.totalCuFt)}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-ink-400">Width</dt>
            <dd className="font-medium">{formatInches(product.dimensions.widthIn)}</dd>
          </div>
        </dl>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-600">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="numeric text-xl font-bold text-ink-900">
              {formatPrice(product.price)}
            </span>
            {product.listPrice && (
              <span className="numeric text-sm text-ink-400 line-through">
                {formatPrice(product.listPrice)}
              </span>
            )}
          </div>
          <p
            className={`mt-1.5 text-xs font-medium ${
              stock.tone === "in"
                ? "text-emerald-700"
                : stock.tone === "low"
                  ? "text-amber-700"
                  : "text-ink-400"
            }`}
          >
            {stock.text}
          </p>
        </div>
      </div>
    </article>
  );
}
