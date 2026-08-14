/**
 * Single source of truth for company identity.
 *
 * Anything that appears in a footer, a schema.org block, an invoice, or a
 * policy page reads from here — so there is exactly one place to correct a
 * legal name or address.
 */

export const company = {
  legalName: "GLASSWIZARD LLC",
  displayName: "Glasswizard",
  tagline: "Refrigeration, delivered and installed across South Florida.",
  description:
    "Glasswizard is a South Florida appliance dealer specialising in refrigeration. " +
    "We stock French door, side-by-side, top freezer and beverage centre models from " +
    "Samsung, LG, GE, Bosch, KitchenAid, Whirlpool and Frigidaire, and we deliver, " +
    "install and haul away the old unit ourselves.",

  address: {
    street: "16320 Southwest 101st Avenue",
    locality: "Miami",
    region: "FL",
    regionName: "Florida",
    postalCode: "33157",
    country: "US",
    countryName: "United States",
  },

  contact: {
    email: "sales@glasswizard.com",
    supportEmail: "support@glasswizard.com",
    phone: "+1-305-555-0142",
    phoneDisplay: "(305) 555-0142",
  },

  /** Local time is America/New_York. */
  hours: [
    { days: "Monday – Friday", opens: "09:00", closes: "18:00" },
    { days: "Saturday", opens: "10:00", closes: "16:00" },
    { days: "Sunday", opens: null, closes: null },
  ],

  /** Warehouse coordinates, used for the LocalBusiness schema block. */
  geo: { latitude: 25.6198, longitude: -80.3661 },

  /** ZIP prefixes we deliver to on our own trucks. */
  localDeliveryZipPrefixes: ["330", "331", "332", "333", "334"],

  freeDeliveryThreshold: 999,
  /** Flat local delivery fee below the threshold, USD. */
  localDeliveryFee: 89,
  /** Florida state sales tax; Miami-Dade adds a 1% discretionary surtax. */
  salesTaxRate: 0.07,

  returnWindowDays: 30,
} as const;

export const formattedAddress = [
  company.address.street,
  `${company.address.locality}, ${company.address.region} ${company.address.postalCode}`,
].join(", ");

export type Company = typeof company;
