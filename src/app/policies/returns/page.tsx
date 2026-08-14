import type { Metadata } from "next";
import { company } from "@/data/company";
import { PolicyBody, PolicyHeading, PolicyPara, PolicyList } from "@/components/policy";

export const metadata: Metadata = {
  title: "Returns",
  description: `${company.returnWindowDays}-day return policy for refrigerators purchased from ${company.legalName} in Miami, Florida.`,
};

export default function ReturnsPolicyPage() {
  return (
    <PolicyBody title="Returns">
      <PolicyPara>
        You have{" "}
        <span className="numeric font-medium text-ink-900">{company.returnWindowDays} days</span>{" "}
        from the delivery date to return a refrigerator. We collect it ourselves — you do
        not need to arrange freight or find the original box a carrier will accept.
      </PolicyPara>

      <PolicyHeading>What we accept</PolicyHeading>
      <PolicyList
        items={[
          "Units returned within 30 days of delivery",
          "Units in original condition with all shelves, bins, filters and literature",
          "Units that have been used normally — a refrigerator you plugged in and ran is still returnable",
          "Any unit that fails to fit the opening, provided it has not been modified",
        ]}
      />

      <PolicyHeading>What we cannot accept</PolicyHeading>
      <PolicyList
        items={[
          "Units with physical damage caused after delivery — dents, scratched panels, cracked interior parts",
          "Units that have been modified: handles swapped, doors reversed by a third party, panels drilled",
          "Special-order models sourced specifically for you, which are noted as such at the time of order",
          "Water filters and accessories once the sealed packaging is opened",
        ]}
      />

      <PolicyHeading>Restocking</PolicyHeading>
      <PolicyPara>
        There is no restocking fee on a return within the {company.returnWindowDays}-day
        window. If the unit was installed, we deduct the{" "}
        <span className="numeric font-medium text-ink-900">${company.localDeliveryFee}</span>{" "}
        collection cost from the refund; if it was never installed, the refund is in full.
      </PolicyPara>

      <PolicyHeading>Damage on arrival</PolicyHeading>
      <PolicyPara>
        Inspect the unit before our crew leaves. Because we deliver on our own trucks,
        transit damage is our problem rather than a freight claim you have to pursue. Point
        it out at the door and we will take the unit back and replace it, at no cost and
        with no paperwork.
      </PolicyPara>

      <PolicyHeading>How to start a return</PolicyHeading>
      <PolicyPara>
        Call{" "}
        <a href={`tel:${company.contact.phone}`} className="numeric font-semibold text-frost-700 hover:underline">
          {company.contact.phoneDisplay}
        </a>{" "}
        or email{" "}
        <a href={`mailto:${company.contact.supportEmail}`} className="font-semibold text-frost-700 hover:underline">
          {company.contact.supportEmail}
        </a>{" "}
        with your order number. We will schedule collection within three business days and
        issue the refund to the original payment method within five business days of the
        unit reaching our warehouse.
      </PolicyPara>
    </PolicyBody>
  );
}
