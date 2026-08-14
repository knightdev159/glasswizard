import type { Metadata } from "next";
import { company } from "@/data/company";
import { PolicyBody, PolicyHeading, PolicyPara, PolicyList } from "@/components/policy";

export const metadata: Metadata = {
  title: "Delivery & installation",
  description: `How ${company.legalName} delivers, installs and hauls away refrigerators across Miami-Dade and Broward.`,
};

export default function DeliveryPolicyPage() {
  return (
    <PolicyBody title="Delivery & installation">
      <PolicyPara>
        Every delivery in our local service area is made by our own crew on our own truck.
        We do not use contract freight, and we do not leave a refrigerator in a garage.
      </PolicyPara>

      <PolicyHeading>Where we deliver</PolicyHeading>
      <PolicyPara>
        Miami-Dade and Broward counties — all ZIP codes beginning{" "}
        <span className="numeric font-medium text-ink-900">
          {company.localDeliveryZipPrefixes.join(", ")}
        </span>
        . Delivery is free on orders of{" "}
        <span className="numeric font-medium text-ink-900">
          ${company.freeDeliveryThreshold}
        </span>{" "}
        or more, and a flat{" "}
        <span className="numeric font-medium text-ink-900">${company.localDeliveryFee}</span>{" "}
        below that. Outside this area we will quote common-carrier freight on request.
      </PolicyPara>

      <PolicyHeading>What is included</PolicyHeading>
      <PolicyList
        items={[
          "Bringing the unit into the kitchen and unpacking it",
          "Levelling the cabinet and aligning the doors",
          "Connecting the water line to an existing ¼-inch shut-off valve",
          "Starting the ice maker and confirming production before we leave",
          "Removing all packaging from the property",
          "Hauling away your old refrigerator, with refrigerant recovered under EPA Section 608",
        ]}
      />

      <PolicyHeading>What is not included</PolicyHeading>
      <PolicyList
        items={[
          "New plumbing. If there is no water shut-off valve within six feet, a licensed plumber must add one before we can connect a dispenser or ice maker.",
          "Electrical work. Refrigerators require a dedicated grounded 115–120 V, 15 A circuit.",
          "Carpentry. We will not cut, plane or remove cabinetry, trim or doors to make a unit fit.",
          "Hoisting or crane work above the second floor without stair access.",
        ]}
      />

      <PolicyHeading>Before the truck arrives</PolicyHeading>
      <PolicyPara>
        Measure the opening, the narrowest point on the path in, and the door swing. This
        is the single most common cause of a failed delivery, and it is entirely avoidable.
        If any measurement is within an inch of the published dimensions on the product
        page, call us at{" "}
        <a href={`tel:${company.contact.phone}`} className="numeric font-semibold text-frost-700 hover:underline">
          {company.contact.phoneDisplay}
        </a>{" "}
        and we will work it out before loading.
      </PolicyPara>
      <PolicyPara>
        If the unit cannot be installed because the opening or access path will not take
        it, we will return it and refund the purchase price in full. The delivery fee is
        not refunded in that case.
      </PolicyPara>

      <PolicyHeading>Scheduling</PolicyHeading>
      <PolicyPara>
        We deliver Monday to Saturday in four-hour windows, confirmed by phone the day
        before. Someone over 18 must be present to accept the delivery and sign for it.
        Lead times shown on each product page are business days from order confirmation.
      </PolicyPara>
    </PolicyBody>
  );
}
