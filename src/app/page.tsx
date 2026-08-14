import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ProductImageView } from "@/components/product-image";
import { categories, getProductBySlug, products } from "@/data/products";
import { company } from "@/data/company";
import { capitalise, formatCuFt, formatInches, formatPrice, spellNumber } from "@/lib/format";

const HERO_SLUG = "lg-lrfvs3006s-instaview-craft-ice";

export default function HomePage() {
  const hero = getProductBySlug(HERO_SLUG)!;
  const featured = products.filter((p) => p.slug !== HERO_SLUG).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-200 bg-gradient-to-b from-frost-50/70 to-white">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-frost-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-frost-700">
              <span className="h-1.5 w-1.5 rounded-full bg-frost-500" />
              Family-run in South Miami
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink-950 sm:text-5xl">
              We only sell refrigerators.
              <span className="block text-frost-700">So we know them properly.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-600">
              {capitalise(spellNumber(products.length))} models, every one of them in our
              warehouse on{" "}
              {company.address.street.split(" ").slice(1).join(" ")}. Our own crew
              delivers, levels the doors, connects the water line and takes the old unit
              away. No third-party freight, no drop-and-run.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/refrigerators"
                className="rounded-lg bg-frost-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-frost-800"
              >
                Browse the catalogue
              </Link>
              <a
                href={`tel:${company.contact.phone}`}
                className="numeric rounded-lg border border-ink-300 px-6 py-3 text-sm font-semibold text-ink-800 transition hover:border-frost-500 hover:text-frost-700"
              >
                Call {company.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-card border border-ink-200 bg-white p-6 shadow-xl shadow-ink-900/5">
              <ProductImageView
                image={hero.images[1] ?? hero.images[0]}
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority
                className="aspect-4/3"
              />
              <div className="mt-4 flex items-end justify-between gap-4 border-t border-ink-100 pt-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-frost-700">
                    {hero.brand} · {hero.model}
                  </p>
                  <p className="mt-1 font-semibold text-ink-900">{hero.name}</p>
                  <p className="numeric mt-1 text-sm text-ink-500">
                    {formatCuFt(hero.capacity.totalCuFt)} ·{" "}
                    {formatInches(hero.dimensions.widthIn)} wide
                  </p>
                </div>
                <Link
                  href={`/refrigerators/${hero.slug}`}
                  className="numeric shrink-0 rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-ink-800"
                >
                  {formatPrice(hero.price)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service promises */}
      <section className="border-b border-ink-200 bg-white">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Delivered by our crew",
              body: `Free on orders over $${company.freeDeliveryThreshold} across Miami-Dade and Broward. $${company.localDeliveryFee} flat below that.`,
            },
            {
              title: "Installed and levelled",
              body: "Doors aligned, water line connected, ice maker started and tested before we leave.",
            },
            {
              title: "Old unit hauled away",
              body: "We take the outgoing refrigerator and recycle its refrigerant to EPA Section 608.",
            },
            {
              title: `${company.returnWindowDays}-day returns`,
              body: "Uninstalled and in original packaging. Full refund, and we collect it ourselves.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="text-sm font-semibold text-ink-900">{item.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-16">
        <h2 className="text-2xl font-bold tracking-tight text-ink-950">Shop by format</h2>
        <p className="mt-2 max-w-2xl text-ink-600">
          The format decides more about how a kitchen works day to day than the brand
          does. Here is the honest version of each.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <Link
                key={c.id}
                href={`/refrigerators?category=${c.id}`}
                className="group rounded-card border border-ink-200 p-6 transition hover:border-frost-400 hover:bg-frost-50/40"
              >
                <h3 className="font-semibold text-ink-900 group-hover:text-frost-800">
                  {c.name}
                </h3>
                <p className="numeric mt-1 text-xs font-medium text-ink-400">
                  {count} model{count === 1 ? "" : "s"}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{c.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="container-page pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink-950">
              In the warehouse now
            </h2>
            <p className="mt-2 text-ink-600">
              Everything below is physically on our floor — not a drop-ship listing.
            </p>
          </div>
          <Link
            href="/refrigerators"
            className="hidden shrink-0 text-sm font-semibold text-frost-700 hover:text-frost-800 sm:block"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.sku} product={p} />
          ))}
        </div>
      </section>

      {/* Measuring guide — the single most common reason an appliance delivery fails */}
      <section className="border-y border-ink-200 bg-ink-950 text-ink-200">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Measure three things before you order
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-400">
              Nearly every failed refrigerator delivery comes down to one of these, and
              all three take about four minutes with a tape measure. If anything is
              tight, call us and we will work it out with you before the truck is loaded.
            </p>
            <a
              href={`tel:${company.contact.phone}`}
              className="numeric mt-6 inline-block rounded-lg bg-frost-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-frost-500"
            >
              Talk it through — {company.contact.phoneDisplay}
            </a>
          </div>
          <ol className="space-y-5">
            {[
              {
                n: "1",
                t: "The opening itself",
                d: "Width, height and depth of the alcove. Leave at least ½ inch of clearance on the sides and 1 inch at the back for airflow.",
              },
              {
                n: "2",
                t: "The path in",
                d: "Every doorway, turn and stair between the truck and the kitchen. The narrowest point is the one that matters — usually a front door at 32 inches.",
              },
              {
                n: "3",
                t: "The door swing",
                d: "A French door needs roughly 24 inches of clear space in front to open fully; a side-by-side needs about half that. Watch for an island.",
              },
            ].map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="numeric flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-frost-500/40 bg-frost-500/10 text-sm font-bold text-frost-300">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-400">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
