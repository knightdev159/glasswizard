import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { brands, categories, products } from "@/data/products";
import type { CategoryId, Product } from "@/data/types";

export const metadata: Metadata = {
  title: "All refrigerators",
  description:
    "Every refrigerator Glasswizard stocks in Miami — French door, side-by-side, " +
    "top freezer and beverage centres from Samsung, LG, GE Profile, Bosch, KitchenAid, " +
    "Whirlpool and Frigidaire, with full published specifications.",
};

type SortKey = "featured" | "price-asc" | "price-desc" | "capacity-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "capacity-desc", label: "Largest capacity" },
];

function sortProducts(list: Product[], key: SortKey): Product[] {
  const copy = [...list];
  switch (key) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "capacity-desc":
      return copy.sort((a, b) => b.capacity.totalCuFt - a.capacity.totalCuFt);
    default:
      return copy;
  }
}

/** Rebuilds the query string with one key changed, preserving the others. */
function hrefWith(
  current: { category?: string; brand?: string; sort?: string },
  patch: Record<string, string | undefined>
): string {
  const next = { ...current, ...patch };
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) {
    if (v) params.set(k, v);
  }
  const qs = params.toString();
  return qs ? `/refrigerators?${qs}` : "/refrigerators";
}

export default async function RefrigeratorsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string; sort?: string }>;
}) {
  const sp = await searchParams;

  const activeCategory = categories.find((c) => c.id === sp.category)?.id as
    | CategoryId
    | undefined;
  const activeBrand = brands.includes(sp.brand ?? "") ? sp.brand : undefined;
  const activeSort = (SORTS.find((s) => s.key === sp.sort)?.key ?? "featured") as SortKey;

  const current = { category: activeCategory, brand: activeBrand, sort: sp.sort };

  let list = products;
  if (activeCategory) list = list.filter((p) => p.category === activeCategory);
  if (activeBrand) list = list.filter((p) => p.brand === activeBrand);
  list = sortProducts(list, activeSort);

  const category = categories.find((c) => c.id === activeCategory);

  return (
    <div className="container-page py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-frost-700">
          Home
        </Link>
        <span className="mx-2 text-ink-300">/</span>
        {category ? (
          <>
            <Link href="/refrigerators" className="hover:text-frost-700">
              Refrigerators
            </Link>
            <span className="mx-2 text-ink-300">/</span>
            <span className="text-ink-800">{category.name}</span>
          </>
        ) : (
          <span className="text-ink-800">Refrigerators</span>
        )}
      </nav>

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink-950">
          {category ? category.plural : "All refrigerators"}
        </h1>
        <p className="mt-3 leading-relaxed text-ink-600">
          {category
            ? category.blurb
            : "Every model we stock, with the manufacturer's published specifications. " +
              "If a figure is not printed on the spec sheet, we leave it blank rather than guess."}
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Filters — plain links, so they work with JavaScript disabled and are
            individually shareable. */}
        <aside className="space-y-7">
          <FilterGroup title="Format">
            <FilterLink href={hrefWith(current, { category: undefined })} active={!activeCategory}>
              All formats
            </FilterLink>
            {categories.map((c) => (
              <FilterLink
                key={c.id}
                href={hrefWith(current, { category: c.id })}
                active={activeCategory === c.id}
              >
                {c.name}
                <Count n={products.filter((p) => p.category === c.id).length} />
              </FilterLink>
            ))}
          </FilterGroup>

          <FilterGroup title="Brand">
            <FilterLink href={hrefWith(current, { brand: undefined })} active={!activeBrand}>
              All brands
            </FilterLink>
            {brands.map((b) => (
              <FilterLink
                key={b}
                href={hrefWith(current, { brand: b })}
                active={activeBrand === b}
              >
                {b}
                <Count n={products.filter((p) => p.brand === b).length} />
              </FilterLink>
            ))}
          </FilterGroup>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-200 pb-4">
            <p className="numeric text-sm text-ink-600">
              {list.length} {list.length === 1 ? "model" : "models"}
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-sm text-ink-500">Sort</span>
              {SORTS.map((s) => (
                <Link
                  key={s.key}
                  href={hrefWith(current, { sort: s.key === "featured" ? undefined : s.key })}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                    activeSort === s.key
                      ? "bg-ink-950 text-white"
                      : "text-ink-600 hover:bg-ink-100"
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {list.length === 0 ? (
            <div className="mt-12 rounded-card border border-dashed border-ink-300 p-12 text-center">
              <p className="font-semibold text-ink-800">
                Nothing in stock matches that combination.
              </p>
              <p className="mt-2 text-sm text-ink-600">
                We can usually order it in within a week — give us a call.
              </p>
              <Link
                href="/refrigerators"
                className="mt-5 inline-block rounded-lg border border-ink-300 px-5 py-2.5 text-sm font-semibold text-ink-800 hover:border-frost-500 hover:text-frost-700"
              >
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p, i) => (
                <ProductCard key={p.sku} product={p} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-wider text-ink-400">{title}</h2>
      <div className="mt-3 flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition ${
        active
          ? "bg-frost-50 font-semibold text-frost-800"
          : "text-ink-700 hover:bg-ink-50"
      }`}
    >
      {children}
    </Link>
  );
}

function Count({ n }: { n: number }) {
  return <span className="numeric text-xs text-ink-400">{n}</span>;
}
