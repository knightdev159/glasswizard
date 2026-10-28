/**
 * Single source of truth for company identity.
 *
 * Anything that appears in a footer, a schema.org block, an invoice, or a
 * policy page reads from here — so there is exactly one place to correct a
 * legal name or address.
 */

export const company = {
  legalName: "Sirius Nexus LLC",
  displayName: "Sirius Nexus",
  /** Canonical origin for metadata, sitemap, robots and structured data. */
  siteUrl: "https://sirius-nexus-ecommerce.vercel.app",
  tagline: "Refrigeration and cooling equipment, sold online and delivered across South Florida.",
  description:
    "Sirius Nexus LLC is an online-only retailer of " +
    "refrigeration and cooling equipment: residential and commercial refrigerators, " +
    "freezers, HVAC and cooling systems, industrial appliances and replacement parts. " +
    "Our catalogue currently carries French door, side-by-side, top freezer and " +
    "beverage centre refrigerators from Samsung, LG, GE, Bosch, KitchenAid, Whirlpool " +
    "and Frigidaire.",

  /** Business and mailing address. We sell exclusively online — this is not a
   *  showroom and there is no walk-in pickup. */
  address: {
    street: "401 NE Mizner Blvd, Apt 514",
    locality: "Boca Raton",
    region: "FL",
    regionName: "Florida",
    postalCode: "33432",
    country: "US",
    countryName: "United States",
  },

  contact: {
    email: "dinoromano822@gmail.com",
    supportEmail: "dinoromano822@gmail.com",
    phone: "+1-954-794-4648",
    phoneDisplay: "(954) 794-4648",
  },

  /** Phone and email support hours. Local time is America/New_York. */
  hours: [
    { days: "Monday – Friday", opens: "09:00", closes: "18:00" },
    { days: "Saturday", opens: "10:00", closes: "16:00" },
    { days: "Sunday", opens: null, closes: null },
  ],

  /** As registered with the IRS. NAICS 2022 449210 is "Electronics and
   *  Appliance Retailers"; online-only sellers are classified with their
   *  store-based counterparts since the 2022 revision. */
  industry: {
    sector: "Retail Trade",
    naicsCode: "449210",
    naicsTitle: "Electronics and Appliance Retailers",
    activity: "Selling goods exclusively over the internet",
  },

  /** Counties covered by local delivery, matching the ZIP prefixes below. */
  localDeliveryArea: "Miami-Dade, Broward and Palm Beach",
  /** ZIP prefixes we deliver to on our own trucks. */
  localDeliveryZipPrefixes: ["330", "331", "332", "333", "334"],

  freeDeliveryThreshold: 999,
  /** Flat local delivery fee below the threshold, USD. */
  localDeliveryFee: 89,
  /** Florida state sales tax. Online orders are taxed where they are delivered,
   *  so the destination county's discretionary surtax applies on top. */
  salesTaxRate: 0.07,

  returnWindowDays: 30,
} as const;

export const formattedAddress = [
  company.address.street,
  `${company.address.locality}, ${company.address.region} ${company.address.postalCode}`,
].join(", ");

export type Company = typeof company;
