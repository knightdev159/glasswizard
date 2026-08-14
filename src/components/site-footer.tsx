import Link from "next/link";
import { company } from "@/data/company";
import { categories } from "@/data/products";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-ink-200 bg-ink-950 text-ink-300">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold tracking-tight text-white">
            GLASS<span className="text-frost-400">WIZARD</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-400">
            {company.tagline}
          </p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-ink-400">
            {company.legalName}
            <br />
            {company.address.street}
            <br />
            {company.address.locality}, {company.address.region} {company.address.postalCode}
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Shop</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/refrigerators" className="hover:text-frost-300">
                All refrigerators
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/refrigerators?category=${c.id}`} className="hover:text-frost-300">
                  {c.plural}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Customer care
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/policies/delivery" className="hover:text-frost-300">
                Delivery &amp; installation
              </Link>
            </li>
            <li>
              <Link href="/policies/returns" className="hover:text-frost-300">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/policies/warranty" className="hover:text-frost-300">
                Warranty
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-frost-300">
                Contact us
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-frost-300">
                About Glasswizard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`tel:${company.contact.phone}`}
                className="numeric font-semibold text-white hover:text-frost-300"
              >
                {company.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.contact.email}`} className="hover:text-frost-300">
                {company.contact.email}
              </a>
            </li>
          </ul>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-white">Hours</h3>
          <ul className="numeric mt-3 space-y-1.5 text-sm text-ink-400">
            {company.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span>{h.opens ? `${h.opens}–${h.closes}` : "Closed"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800/60">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p>
            Specifications are published by the manufacturer and subject to change.
            Confirm your opening before ordering.
          </p>
        </div>
      </div>
    </footer>
  );
}
