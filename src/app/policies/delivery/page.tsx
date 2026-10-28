import type { Metadata } from "next";
import { company } from "@/data/company";
import { PolicyBody, PolicyHeading, PolicyPara, PolicyList } from "@/components/policy";

export const metadata: Metadata = {
  title: "Delivery",
  description: `How ${company.legalName} ships and delivers orders across ${company.localDeliveryArea} and the rest of the United States.`,
};

export default function DeliveryPolicyPage() {
  return (
    <PolicyBody title="Delivery">
      <PolicyPara>
        We sell online only. Your order is delivered to your address by a delivery or
        freight carrier we book for you — there is no showroom pickup.
      </PolicyPara>

      <PolicyHeading>Where your order ships from</PolicyHeading>
      <PolicyPara>
        We keep a limited stock of our best-selling models for faster local delivery. Every
        other model is shipped new by the distributor or manufacturer straight to you. The
        lead time on each product page is our estimate in business days from order
        confirmation, and we confirm it when you order.
      </PolicyPara>

      <PolicyHeading>Where we deliver</PolicyHeading>
      <PolicyPara>
        Local delivery covers {company.localDeliveryArea} counties — all ZIP codes beginning{" "}
        <span className="numeric font-medium text-ink-900">
          {company.localDeliveryZipPrefixes.join(", ")}
        </span>
        . It is free on orders of{" "}
        <span className="numeric font-medium text-ink-900">
          ${company.freeDeliveryThreshold}
        </span>{" "}
        or more, and a flat{" "}
        <span className="numeric font-medium text-ink-900">${company.localDeliveryFee}</span>{" "}
        below that. Anywhere else in the United States, we quote freight at cost before you
        pay.
      </PolicyPara>

      <PolicyHeading>What is not included</PolicyHeading>
      <PolicyList
        items={[
          "Installation. We do not install, level or connect appliances; a licensed installer or plumber should connect any water line.",
          "Removal of your old appliance.",
          "Electrical work. Refrigerators require a dedicated grounded 115–120 V, 15 A circuit.",
          "Carpentry. Cabinetry, trim or doors that need altering for a unit to fit.",
        ]}
      />

      <PolicyHeading>Before you order</PolicyHeading>
      <PolicyPara>
        Measure the opening, the narrowest point on the path in, and the door swing. This
        is the most common cause of a failed delivery, and it is entirely avoidable. If any
        measurement is within an inch of the published dimensions on the product page, call
        us at{" "}
        <a href={`tel:${company.contact.phone}`} className="numeric font-semibold text-frost-700 hover:underline">
          {company.contact.phoneDisplay}
        </a>{" "}
        and we will check the fit with you before the order ships.
      </PolicyPara>
      <PolicyPara>
        If the unit will not fit the opening or the access path, we will arrange its return
        and refund the purchase price in full. The delivery fee is not refunded in that
        case.
      </PolicyPara>

      <PolicyHeading>Scheduling</PolicyHeading>
      <PolicyPara>
        We or the carrier will contact you to arrange a delivery window. Someone over 18
        must be present to accept the delivery, inspect it and sign for it.
      </PolicyPara>
    </PolicyBody>
  );
}
