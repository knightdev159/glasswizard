/** Shared typography for the customer-care pages, so all three read identically. */

export function PolicyBody({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-ink-950">{title}</h1>
      <div className="mt-6 space-y-5">{children}</div>
    </>
  );
}

export function PolicyHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pt-4 text-xl font-bold tracking-tight text-ink-950">{children}</h2>
  );
}

export function PolicyPara({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed text-ink-700">{children}</p>;
}

export function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-ink-700">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-frost-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
