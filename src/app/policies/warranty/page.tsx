import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { PolicyBody, PolicyHeading, PolicyPara } from "@/components/policy";

export const metadata: Metadata = {
  title: "Warranty",
  description: `Manufacturer warranty coverage on every refrigerator sold by ${company.legalName}, and how to make a claim.`,
};

export default function WarrantyPolicyPage() {
  return (
    <PolicyBody title="Warranty">
      <PolicyPara>
        Every refrigerator we sell is new, sold as an authorised dealer, and carries the
        manufacturer’s full factory warranty. Buying from a grey-market or liquidation
        seller frequently voids that coverage — buying from us does not.
      </PolicyPara>

      <PolicyHeading>Coverage by model</PolicyHeading>
      <PolicyPara>
        Terms are set by the manufacturer, not by us. Here is what each model in our
        catalogue carries.
      </PolicyPara>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink-300 text-left">
              <th className="py-3 pr-4 font-semibold text-ink-900">Model</th>
              <th className="py-3 pr-4 font-semibold text-ink-900">Overall</th>
              <th className="py-3 font-semibold text-ink-900">Sealed system</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {products.map((p) => (
              <tr key={p.sku}>
                <td className="py-3 pr-4 align-top">
                  <Link
                    href={`/refrigerators/${p.slug}`}
                    className="font-medium text-frost-700 hover:underline"
                  >
                    {p.brand} {p.model}
                  </Link>
                </td>
                <td className="py-3 pr-4 align-top text-ink-700">{p.warranty.overall}</td>
                <td className="py-3 align-top text-ink-700">
                  {p.warranty.sealedSystem ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PolicyHeading>What “sealed system” means</PolicyHeading>
      <PolicyPara>
        The sealed system is the compressor, condenser, evaporator, drier and connecting
        tubing — the refrigeration circuit itself. It is the most expensive part of the
        appliance to repair and the part manufacturers cover longest. A one-year overall
        warranty with a ten-year compressor warranty, as on the LG, means labour and
        general parts are covered for a year while the compressor stays covered for a
        decade.
      </PolicyPara>

      <PolicyHeading>Making a claim</PolicyHeading>
      <PolicyPara>
        Call us first at{" "}
        <a href={`tel:${company.contact.phone}`} className="numeric font-semibold text-frost-700 hover:underline">
          {company.contact.phoneDisplay}
        </a>
        . In the first year we will usually diagnose it ourselves and, where the fault is
        straightforward, handle the manufacturer paperwork on your behalf. Beyond the first
        year, claims go directly to the manufacturer’s service network; we will give you
        the model number, serial number and date of sale you need to open the case.
      </PolicyPara>

      <PolicyHeading>What voids coverage</PolicyHeading>
      <PolicyPara>
        Commercial use of a residential unit, installation outside the rated ambient
        temperature range, damage from power surges without a suppressor, and repairs
        carried out by an unauthorised technician. Note the ambient range in particular:
        only models listed as garage-ready on their product page are rated to run in an
        unconditioned South Florida garage.
      </PolicyPara>

      <PolicyPara>
        This page summarises the manufacturers’ terms for convenience. The manufacturer’s
        own warranty document, supplied with the appliance, is the binding one.
      </PolicyPara>
    </PolicyBody>
  );
}
