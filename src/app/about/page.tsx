import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { brands, products } from "@/data/products";

export const metadata: Metadata = {
  title: "About",
  description: `${company.legalName} is a refrigeration-only appliance dealer in South Miami, delivering and installing across Miami-Dade and Broward with its own crew.`,
};

export default function AboutPage() {
  const totalUnits = products.reduce((n, p) => n + p.inventory.onHand, 0);

  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="text-3xl font-bold tracking-tight text-ink-950">
        About {company.displayName}
      </h1>

      <div className="mt-8 space-y-6 leading-relaxed text-ink-700">
        <p className="text-lg text-ink-800">
          {company.legalName} is a refrigeration-only appliance dealer operating out of a
          warehouse on {company.address.street} in {company.address.locality}. We do not
          sell ranges, dishwashers or laundry. One category, done properly.
        </p>

        <p>
          That focus is a deliberate trade. A general appliance dealer carries perhaps two
          hundred SKUs across eight categories and cannot know any of them in depth. We
          carry {products.length} refrigerator models from {brands.length} manufacturers,
          and there are currently {totalUnits} units on the floor. We have opened every one
          of them, measured them, and installed them in enough South Florida kitchens to
          know which ones cause trouble in a 1960s condo and which ones do not.
        </p>

        <h2 className="pt-4 text-xl font-bold tracking-tight text-ink-950">
          We do our own deliveries
        </h2>
        <p>
          The single biggest source of appliance complaints is third-party freight: a
          contract truck arrives, leaves a box in the garage, and the customer is left to
          find an installer. We do not work that way. Our crew brings the unit in, levels
          the cabinet, aligns the doors, connects the water line, starts the ice maker and
          confirms it is making ice before leaving. The old refrigerator goes back on the
          truck and its refrigerant is recovered under EPA Section 608.
        </p>

        <h2 className="pt-4 text-xl font-bold tracking-tight text-ink-950">
          We publish the manufacturer’s numbers
        </h2>
        <p>
          Every capacity, dimension and energy figure on this site is taken from the
          manufacturer’s own published spec sheet, and each product page links to that
          sheet so you can check us. Where a manufacturer does not publish a figure, we
          show a dash rather than an estimate. If you need a number that is not printed
          anywhere, call us and we will go measure the unit standing in the warehouse.
        </p>

        <h2 className="pt-4 text-xl font-bold tracking-tight text-ink-950">
          Where we deliver
        </h2>
        <p>
          Miami-Dade and Broward on our own trucks — every ZIP beginning{" "}
          <span className="numeric font-medium text-ink-900">
            {company.localDeliveryZipPrefixes.join(", ")}
          </span>
          . Free on orders over{" "}
          <span className="numeric font-medium text-ink-900">
            ${company.freeDeliveryThreshold}
          </span>
          , a flat{" "}
          <span className="numeric font-medium text-ink-900">
            ${company.localDeliveryFee}
          </span>{" "}
          below that. Outside that area we will quote freight, but we will also tell you
          honestly if a local dealer is the better call.
        </p>
      </div>

      <div className="mt-10 rounded-card border border-ink-200 bg-ink-50/50 p-6">
        <h2 className="font-bold text-ink-950">{company.legalName}</h2>
        <address className="mt-2 text-sm not-italic leading-relaxed text-ink-700">
          {company.address.street}
          <br />
          {company.address.locality}, {company.address.region} {company.address.postalCode}
        </address>
        <p className="numeric mt-3 text-sm text-ink-700">
          <a href={`tel:${company.contact.phone}`} className="font-semibold text-frost-700 hover:underline">
            {company.contact.phoneDisplay}
          </a>
          {" · "}
          <a href={`mailto:${company.contact.email}`} className="font-semibold text-frost-700 hover:underline">
            {company.contact.email}
          </a>
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded-lg bg-frost-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-frost-800"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
