import Link from "next/link";

const links = [
  { href: "/policies/delivery", label: "Delivery & installation" },
  { href: "/policies/returns", label: "Returns" },
  { href: "/policies/warranty", label: "Warranty" },
];

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside>
          <h2 className="text-xs font-bold uppercase tracking-wider text-ink-400">
            Customer care
          </h2>
          <nav className="mt-3 flex flex-col gap-0.5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-2.5 py-2 text-sm text-ink-700 transition hover:bg-ink-50 hover:text-frost-800"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="max-w-3xl">{children}</article>
      </div>
    </div>
  );
}
