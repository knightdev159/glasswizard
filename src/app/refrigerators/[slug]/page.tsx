import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { company } from "@/data/company";
import { getCategory, getProductBySlug, products } from "@/data/products";
import type { Product } from "@/data/types";
import {
  formatCuFt,
  formatDimensions,
  formatInches,
  formatPrice,
  savingsPercent,
  stockLabel,
} from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found" };

  return {
    title: `${product.brand} ${product.model} — ${product.name}`,
    description: `${product.shortDescription} ${formatCuFt(product.capacity.totalCuFt)}, ${formatDimensions(product.dimensions)}. In stock in Miami at ${formatPrice(product.price)}.`,
    alternates: { canonical: `/refrigerators/${product.slug}` },
    openGraph: {
      title: `${product.brand} ${product.model}`,
      description: product.shortDescription,
      images: product.images.map((i) => i.src),
    },
  };
}

/** schema.org Product + Offer. Drives rich results for price and availability. */
function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.name}`,
    model: product.model,
    sku: product.sku,
    ...(product.upc ? { gtin12: product.upc } : {}),
    brand: { "@type": "Brand", name: product.brand },
    description: product.shortDescription,
    image: product.images.map((i) => `https://glasswizard.com${i.src}`),
    offers: {
      "@type": "Offer",
      url: `https://glasswizard.com/refrigerators/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.inventory.onHand > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: company.legalName },
    },
    // Only assert dimensions the manufacturer actually publishes — an
    // "undefined in" string in structured data is worse than an absent property.
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Total capacity",
        value: `${product.capacity.totalCuFt} cu ft`,
      },
      { "@type": "PropertyValue", name: "Width", value: `${product.dimensions.widthIn} in` },
      ...(product.dimensions.heightIn !== undefined
        ? [{ "@type": "PropertyValue", name: "Height", value: `${product.dimensions.heightIn} in` }]
        : []),
      ...(product.dimensions.depthIn !== undefined
        ? [{ "@type": "PropertyValue", name: "Depth", value: `${product.dimensions.depthIn} in` }]
        : []),
    ],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const stock = stockLabel(product);
  const savings = savingsPercent(product);
  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);
  const dimensionsIncomplete =
    product.dimensions.heightIn === undefined || product.dimensions.depthIn === undefined;

  return (
    <div className="container-page py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-frost-700">
          Home
        </Link>
        <span className="mx-2 text-ink-300">/</span>
        <Link href="/refrigerators" className="hover:text-frost-700">
          Refrigerators
        </Link>
        {category && (
          <>
            <span className="mx-2 text-ink-300">/</span>
            <Link
              href={`/refrigerators?category=${category.id}`}
              className="hover:text-frost-700"
            >
              {category.name}
            </Link>
          </>
        )}
        <span className="mx-2 text-ink-300">/</span>
        <span className="numeric text-ink-800">{product.model}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} />

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-frost-700">
            {product.brand}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-ink-950">
            {product.name}
          </h1>
          <p className="numeric mt-2 text-sm text-ink-500">
            Model {product.model} · SKU {product.sku}
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="numeric text-3xl font-bold text-ink-950">
              {formatPrice(product.price)}
            </span>
            {product.listPrice && (
              <>
                <span className="numeric text-lg text-ink-400 line-through">
                  {formatPrice(product.listPrice)}
                </span>
                {savings !== null && (
                  <span className="rounded-full bg-frost-100 px-2.5 py-1 text-xs font-bold text-frost-800">
                    Save {savings}%
                  </span>
                )}
              </>
            )}
          </div>

          <p
            className={`mt-2 text-sm font-medium ${
              stock.tone === "in"
                ? "text-emerald-700"
                : stock.tone === "low"
                  ? "text-amber-700"
                  : "text-ink-500"
            }`}
          >
            {stock.text}
          </p>

          <div className="mt-6">
            <AddToCart sku={product.sku} onHand={product.inventory.onHand} />
          </div>

          <ul className="mt-6 space-y-2 rounded-card border border-ink-200 bg-ink-50/50 p-5 text-sm text-ink-700">
            <li className="flex gap-2.5">
              <Tick />
              {product.price >= company.freeDeliveryThreshold
                ? "Free delivery across Miami-Dade and Broward"
                : `$${company.localDeliveryFee} flat local delivery`}
            </li>
            <li className="flex gap-2.5">
              <Tick />
              Installed, levelled and tested by our own crew
            </li>
            <li className="flex gap-2.5">
              <Tick />
              Old refrigerator hauled away and recycled
            </li>
            <li className="flex gap-2.5">
              <Tick />
              {company.returnWindowDays}-day returns · {product.warranty.overall}
            </li>
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <QuickSpec label="Capacity" value={formatCuFt(product.capacity.totalCuFt)} />
            <QuickSpec label="Width" value={formatInches(product.dimensions.widthIn)} />
            <QuickSpec
              label="Height"
              value={
                product.dimensions.heightIn !== undefined
                  ? formatInches(product.dimensions.heightIn)
                  : null
              }
            />
            <QuickSpec
              label="Depth"
              value={
                product.dimensions.depthIn !== undefined
                  ? formatInches(product.dimensions.depthIn)
                  : null
              }
            />
            <QuickSpec
              label="Depth class"
              value={product.depthClass === "counter-depth" ? "Counter-depth" : product.depthClass === "built-in" ? "Built-in" : "Standard"}
            />
            <QuickSpec label="Doors" value={String(product.doorCount)} />
          </div>

          {dimensionsIncomplete && (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
              <strong className="font-semibold">{product.brand}</strong> publishes only the
              nominal width for this model — the remaining dimensions are in the
              installation guide inside the carton. Before you order, call{" "}
              <a
                href={`tel:${company.contact.phone}`}
                className="numeric font-semibold underline"
              >
                {company.contact.phoneDisplay}
              </a>{" "}
              and we will measure the unit on our floor for you.
            </p>
          )}
        </div>
      </div>

      {/* Overview */}
      <section className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink-950">
            Why we stock this one
          </h2>
          <p className="mt-4 leading-relaxed text-ink-700">{product.description}</p>
        </div>
        <div className="rounded-card border border-ink-200 p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">
            Key features
          </h2>
          <ul className="mt-4 space-y-2.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm text-ink-700">
                <Tick />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Full specifications */}
      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight text-ink-950">
            Full specifications
          </h2>
          <a
            href={product.specSheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-frost-700 hover:text-frost-800"
          >
            Manufacturer spec sheet ↗
          </a>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-ink-500">
          Every figure below is as published by {product.brand}. Where a value is shown as
          “—”, the manufacturer does not publish it and we will not invent one — ask us and
          we will measure the unit on our floor.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SpecGroup title="Capacity">
            <Spec label="Total" value={formatCuFt(product.capacity.totalCuFt)} />
            <Spec
              label="Fresh food"
              value={product.capacity.freshFoodCuFt ? formatCuFt(product.capacity.freshFoodCuFt) : null}
            />
            <Spec
              label="Freezer"
              value={product.capacity.freezerCuFt ? formatCuFt(product.capacity.freezerCuFt) : null}
            />
            <Spec
              label="Convertible / flex"
              value={product.capacity.flexCuFt ? formatCuFt(product.capacity.flexCuFt) : null}
            />
          </SpecGroup>

          <SpecGroup title="Dimensions & fit">
            <Spec label="Width" value={formatInches(product.dimensions.widthIn)} />
            <Spec
              label="Height"
              value={
                product.dimensions.heightIn !== undefined
                  ? formatInches(product.dimensions.heightIn)
                  : null
              }
            />
            <Spec
              label="Depth (excl. handles)"
              value={
                product.dimensions.depthIn !== undefined
                  ? formatInches(product.dimensions.depthIn)
                  : null
              }
            />
            <Spec
              label="Depth incl. handles"
              value={
                product.dimensions.depthWithHandlesIn
                  ? formatInches(product.dimensions.depthWithHandlesIn)
                  : null
              }
            />
            <Spec
              label="Required cutout"
              value={
                product.cutout
                  ? `${formatInches(product.cutout.widthIn)} W × ${formatInches(product.cutout.heightIn)} H × ${formatInches(product.cutout.depthIn)} D`
                  : null
              }
            />
            <Spec
              label="Shipping weight"
              value={product.shippingWeightLbs ? `${product.shippingWeightLbs} lb` : null}
            />
          </SpecGroup>

          <SpecGroup title="Cooling & dispensing">
            <Spec label="Ice maker" value={product.iceMaker?.type ?? null} />
            <Spec
              label="Ice production"
              value={
                product.iceMaker?.dailyProductionLbs
                  ? `${product.iceMaker.dailyProductionLbs} lb / 24 h`
                  : null
              }
            />
            <Spec
              label="Ice storage"
              value={
                product.iceMaker?.storageCapacityLbs
                  ? `${product.iceMaker.storageCapacityLbs} lb`
                  : null
              }
            />
            <Spec label="Water dispenser" value={product.waterDispenser ?? null} />
            <Spec label="Water filter" value={product.waterFilterModel ?? null} />
            <Spec
              label="Operating ambient"
              value={
                product.ambientRangeF
                  ? `${product.ambientRangeF[0]} °F – ${product.ambientRangeF[1]} °F`
                  : null
              }
            />
          </SpecGroup>

          <SpecGroup title="Power, ratings & warranty">
            <Spec
              label="Electrical"
              value={`${product.electrical.volts} V / ${product.electrical.hertz} Hz / ${product.electrical.amps} A`}
            />
            <Spec
              label="Energy use"
              value={product.energy.kwhPerYear ? `${product.energy.kwhPerYear} kWh / year` : null}
            />
            <Spec label="ENERGY STAR" value={product.energy.energyStar ? "Certified" : "Not certified"} />
            <Spec
              label="ADA compliant"
              value={
                product.adaCompliant === undefined ? null : product.adaCompliant ? "Yes" : "No"
              }
            />
            <Spec
              label="Garage ready"
              value={product.garageReady === undefined ? null : product.garageReady ? "Yes" : "No"}
            />
            <Spec label="Smart home" value={product.smartHome?.join(", ") ?? null} />
            <Spec label="Warranty" value={product.warranty.overall} />
            <Spec label="Sealed system" value={product.warranty.sealedSystem ?? null} />
          </SpecGroup>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tight text-ink-950">
            Others in {category?.plural.toLowerCase()}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function QuickSpec({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-lg border border-ink-200 px-3 py-2.5">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-400">{label}</dt>
      <dd
        className={`numeric mt-0.5 text-sm font-semibold ${value ? "text-ink-900" : "text-ink-300"}`}
      >
        {value ?? "—"}
      </dd>
    </div>
  );
}

function SpecGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-card border border-ink-200">
      <h3 className="border-b border-ink-200 bg-ink-50 px-5 py-3 text-sm font-bold text-ink-900">
        {title}
      </h3>
      <dl className="divide-y divide-ink-100">{children}</dl>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex gap-4 px-5 py-3 text-sm">
      <dt className="w-2/5 shrink-0 text-ink-500">{label}</dt>
      <dd className={`numeric flex-1 ${value ? "text-ink-900" : "text-ink-300"}`}>
        {value ?? "—"}
      </dd>
    </div>
  );
}

function Tick() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0 text-frost-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}
