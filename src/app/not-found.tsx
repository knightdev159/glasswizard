import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="numeric text-sm font-bold uppercase tracking-wider text-frost-700">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-950">
        We could not find that page
      </h1>
      <p className="mx-auto mt-3 max-w-md text-ink-600">
        The model may have been discontinued, or the link may be out of date. Everything we
        currently stock is on one page.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/refrigerators"
          className="rounded-lg bg-frost-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-frost-800"
        >
          Browse refrigerators
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-ink-300 px-6 py-3 text-sm font-semibold text-ink-800 transition hover:border-frost-500 hover:text-frost-700"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
