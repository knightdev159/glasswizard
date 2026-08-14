"use client";

import Link from "next/link";
import { useState } from "react";
import { company } from "@/data/company";
import { categories } from "@/data/products";
import { useCart } from "./cart-provider";

const nav = [
  { href: "/refrigerators", label: "All refrigerators" },
  ...categories.map((c) => ({ href: `/refrigerators?category=${c.id}`, label: c.name })),
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { itemCount, hydrated } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/90 backdrop-blur">
      <div className="bg-ink-950 text-ink-100">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p>
            Free delivery on orders over{" "}
            <span className="numeric font-semibold text-white">
              ${company.freeDeliveryThreshold}
            </span>{" "}
            across Miami-Dade &amp; Broward
          </p>
          <a
            href={`tel:${company.contact.phone}`}
            className="numeric font-semibold text-white hover:text-frost-300"
          >
            {company.contact.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Snowflake className="h-7 w-7 text-frost-600" />
          <span className="text-lg font-bold tracking-tight text-ink-950">
            GLASS<span className="text-frost-700">WIZARD</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition hover:text-frost-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-lg border border-ink-200 px-3 py-2 text-sm font-semibold text-ink-800 transition hover:border-frost-500 hover:text-frost-700"
          >
            <CartIcon className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Cart</span>
            {hydrated && itemCount > 0 && (
              <span className="numeric absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-frost-600 px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink-200 bg-white lg:hidden">
          <div className="container-page flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink-100 py-3 text-sm font-medium text-ink-700 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Snowflake({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
      <path d="M12 6.5l-2.2-2.2M12 6.5l2.2-2.2M12 17.5l-2.2 2.2M12 17.5l2.2 2.2" />
      <path d="M6.5 12l-2.2-2.2M6.5 12l-2.2 2.2M17.5 12l2.2-2.2M17.5 12l2.2 2.2" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6" />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  );
}
