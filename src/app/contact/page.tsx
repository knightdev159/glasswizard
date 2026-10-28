import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${company.legalName} in ${company.address.locality}, ${company.address.region} — phone, email, business address and support hours.`,
};

export default function ContactPage() {
  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink-950">Contact us</h1>
        <p className="mt-3 leading-relaxed text-ink-600">
          Measuring questions, delivery scheduling, or working out whether a unit will fit
          your opening — call us, that is usually fastest. We answer our own phone during
          business hours.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">
              Business address
            </h2>
            <address className="mt-3 not-italic leading-relaxed text-ink-800">
              {company.legalName}
              <br />
              {company.address.street}
              <br />
              {company.address.locality}, {company.address.region}{" "}
              {company.address.postalCode}
              <br />
              {company.address.countryName}
            </address>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
              We sell exclusively online. This is our registered business and mailing
              address — there is no showroom or walk-in pickup.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">Phone</h2>
            <a
              href={`tel:${company.contact.phone}`}
              className="numeric mt-2 block text-2xl font-bold text-ink-950 hover:text-frost-700"
            >
              {company.contact.phoneDisplay}
            </a>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">Email</h2>
            <ul className="mt-2 space-y-1 text-ink-800">
              <li>
                Sales —{" "}
                <a
                  href={`mailto:${company.contact.email}`}
                  className="font-semibold text-frost-700 hover:underline"
                >
                  {company.contact.email}
                </a>
              </li>
              <li>
                Service —{" "}
                <a
                  href={`mailto:${company.contact.supportEmail}`}
                  className="font-semibold text-frost-700 hover:underline"
                >
                  {company.contact.supportEmail}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">
              Phone &amp; email hours
            </h2>
            <ul className="numeric mt-3 max-w-xs space-y-2 text-sm text-ink-700">
              {company.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-6 border-b border-ink-100 pb-2">
                  <span>{h.days}</span>
                  <span className="font-medium text-ink-900">
                    {h.opens ? `${h.opens} – ${h.closes}` : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-500">All times Eastern (America/New_York).</p>
          </section>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
