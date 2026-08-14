import type { Category, Product } from "./types";

/**
 * The GLASSWIZARD catalog.
 *
 * Every capacity, dimension and energy figure below was taken from the
 * manufacturer spec sheet linked in `specSheetUrl`. Where a manufacturer does
 * not publish a figure the field is simply absent — see the note in types.ts.
 *
 * `price` and `inventory` are the two blocks that are ours rather than the
 * manufacturer's, and they are the two you must keep current.
 */

export const categories: Category[] = [
  {
    id: "french-door",
    name: "French door",
    plural: "French door refrigerators",
    blurb:
      "Two doors over a freezer drawer. The widest fresh-food shelves you can " +
      "get in a 36-inch opening, and the format most new kitchens are designed around.",
  },
  {
    id: "side-by-side",
    name: "Side-by-side",
    plural: "Side-by-side refrigerators",
    blurb:
      "Full-height freezer next to full-height fridge. Narrow door swing for " +
      "tight galley kitchens, and the easiest format for reaching frozen food without bending.",
  },
  {
    id: "top-freezer",
    name: "Top freezer",
    plural: "Top freezer refrigerators",
    blurb:
      "The most cubic feet per dollar and the fewest things to break. Our " +
      "standard recommendation for rentals, garages and second kitchens.",
  },
  {
    id: "beverage-center",
    name: "Beverage centre",
    plural: "Beverage centres",
    blurb:
      "Undercounter glass-door refrigeration held between 34 and 50 °F. Front-vented, " +
      "so it can go under a counter run or stand on its own.",
  },
];

export const products: Product[] = [
  {
    slug: "samsung-rf23db9900qd-bespoke-4-door-flex",
    model: "RF23DB9900QD",
    brand: "Samsung",
    name: "Bespoke 4-Door Flex Counter-Depth Refrigerator with AI Family Hub+",
    category: "french-door",
    sku: "GW-SAM-RF23DB9900QD",

    price: 3499,
    listPrice: 4499,

    finish: "Stainless steel with charcoal Family Hub+ panel",
    depthClass: "counter-depth",
    installType: "freestanding",
    doorCount: 4,

    capacity: {
      totalCuFt: 22.5,
      freshFoodCuFt: 13.7,
      freezerCuFt: 4.4,
      flexCuFt: 4.4,
    },
    dimensions: { widthIn: 35.875, heightIn: 73, depthIn: 28.75 },
    shippingWeightLbs: 359,

    energy: { kwhPerYear: 631, energyStar: true },
    electrical: { volts: 115, hertz: 60, amps: 15 },
    iceMaker: { type: "Dual Ice Maker in freezer — cubed ice and Ice Bites" },
    waterDispenser: "Internal Beverage Center with autofill pitcher and dispenser",
    warranty: {
      overall: "1 year parts and labour",
      sealedSystem: "5 years sealed system, 10 years digital inverter compressor",
    },

    adaCompliant: true,
    smartHome: ["SmartThings", "Wi-Fi", "Bixby", "Amazon Alexa", "Google Assistant"],

    shortDescription:
      "Counter-depth 4-door with a 32-inch touchscreen and a FlexZone that swaps between freezer and crisper.",
    description:
      "The top of Samsung's Bespoke line and the model we sell most often into new " +
      "kitchen builds. At 28¾ inches deep it sits nearly flush with a standard 24-inch " +
      "cabinet run, so you get a built-in look without a built-in price. The lower-right " +
      "FlexZone compartment runs at five separate set points — freeze, soft freeze, " +
      "meat/fish, fruit/veg, or beverage — which in practice means you can turn 4.4 cubic " +
      "feet from freezer into crisper the week you host and back again afterwards. " +
      "AI Vision Inside identifies items as they go in and keeps a running inventory on " +
      "the 32-inch panel. Door panels are user-replaceable, so a kitchen repaint does not " +
      "mean a new refrigerator.",
    highlights: [
      "FlexZone drawer with 5 temperature settings, 4.4 cu. ft.",
      "AI Family Hub+ with 32-inch touchscreen",
      "AI Vision Inside food recognition",
      "Beverage Center with internal dispenser and autofill pitcher",
      "Dual Ice Maker — cubed ice and Ice Bites",
      "Interchangeable Bespoke door panels",
    ],
    waterFilterModel: "DA97-17376B",
    specSheetUrl:
      "https://image-us.samsung.com/SamsungUS/home/home-appliances/refrigerators/bespoke/rf23db9900qdaa/fit/RF23DB9900_Counter_Depth_V3.pdf",

    images: [
      {
        src: "/products/GW-SAM-RF23DB9900QD/01.svg",
        alt: "Samsung RF23DB9900QD Bespoke 4-Door Flex refrigerator, front view",
        source: "pending",
      },
      {
        src: "/products/GW-SAM-RF23DB9900QD/02.svg",
        alt: "Samsung RF23DB9900QD with the Family Hub+ panel lit",
        source: "pending",
      },
    ],

    inventory: { onHand: 4, localLeadTimeDays: 3 },
  },

  {
    slug: "lg-lrfvs3006s-instaview-craft-ice",
    model: "LRFVS3006S",
    brand: "LG",
    name: "30 cu. ft. InstaView Door-in-Door Refrigerator with Craft Ice",
    category: "french-door",
    sku: "GW-LG-LRFVS3006S",

    price: 2799,
    listPrice: 3599,

    finish: "PrintProof stainless steel",
    depthClass: "standard-depth",
    installType: "freestanding",
    doorCount: 3,

    capacity: { totalCuFt: 30 },
    dimensions: { widthIn: 35.75, heightIn: 68.875, depthIn: 34.125 },
    shippingWeightLbs: 335,

    energy: { energyStar: true },
    electrical: { volts: 115, hertz: 60, amps: 15 },
    iceMaker: {
      type: "Dual ice maker — cubed, crushed and Craft Ice spheres",
      dailyProductionLbs: 3,
    },
    waterDispenser: "External ice and filtered water dispenser",
    warranty: {
      overall: "1 year parts and labour",
      sealedSystem: "10 years linear compressor",
    },

    adaCompliant: false,
    smartHome: ["LG ThinQ", "Wi-Fi", "Amazon Alexa", "Google Assistant"],

    shortDescription:
      "Thirty cubic feet, a knock-to-see glass panel, and the round slow-melt ice everyone actually wants.",
    description:
      "The biggest fresh-food capacity we stock in a standard 36-inch opening. The " +
      "InstaView panel lights from inside on two knocks, so the most-opened part of the " +
      "door gets opened far less — which is the point, since the Door-in-Door " +
      "compartment holds the drinks and condiments that account for most door swings. " +
      "Craft Ice makes three 2-inch spheres a day automatically; they melt slowly enough " +
      "that a drink is not watered down twenty minutes in. The linear compressor carries " +
      "a ten-year warranty, which is the longest sealed-system coverage on anything in " +
      "this catalogue.",
    highlights: [
      "30 cu. ft. — the largest capacity we stock at 36 inches wide",
      "InstaView glass panel lights on two knocks",
      "Craft Ice slow-melting 2-inch spheres",
      "Door-in-Door easy-access compartment",
      "Dual ice maker — cubed, crushed and spheres",
      "10-year linear compressor warranty",
    ],
    waterFilterModel: "LT1000P",
    specSheetUrl:
      "https://www.lg.com/us/refrigerators/lg-lrfvs3006s-french-3-door-refrigerator",

    images: [
      {
        src: "/products/GW-LG-LRFVS3006S/01.svg",
        alt: "LG LRFVS3006S InstaView refrigerator, front view",
        source: "pending",
      },
      {
        src: "/products/GW-LG-LRFVS3006S/02.svg",
        alt: "LG LRFVS3006S with the InstaView panel illuminated",
        source: "pending",
      },
    ],

    inventory: { onHand: 6, localLeadTimeDays: 2 },
  },

  {
    slug: "ge-profile-pvd28bynfs-4-door",
    model: "PVD28BYNFS",
    brand: "GE Profile",
    name: "27.9 cu. ft. Smart 4-Door French-Door Refrigerator with Door-in-Door",
    category: "french-door",
    sku: "GW-GEP-PVD28BYNFS",

    price: 2999,
    listPrice: 3899,

    finish: "Fingerprint-resistant stainless steel",
    depthClass: "standard-depth",
    installType: "freestanding",
    doorCount: 4,

    capacity: {
      totalCuFt: 27.9,
      freshFoodCuFt: 15.71,
      freezerCuFt: 8.57,
      flexCuFt: 3.62,
    },
    dimensions: { widthIn: 35.625, heightIn: 69.906, depthIn: 34.313 },
    shippingWeightLbs: 342,

    energy: { energyStar: true },
    electrical: { volts: 115, hertz: 60, amps: 15 },
    iceMaker: { type: "Freezer ice maker with external dispenser" },
    waterDispenser: "External dispenser with hands-free AutoFill",
    warranty: { overall: "1 year limited parts and labour" },

    adaCompliant: false,
    smartHome: ["SmartHQ", "Wi-Fi", "Amazon Alexa", "Google Assistant"],

    shortDescription:
      "Four doors, twin evaporators, and a dispenser that fills a container and stops on its own.",
    description:
      "GE's answer to the four-door format, and the best-balanced large refrigerator we " +
      "carry. TwinChill runs separate evaporators for the fresh-food and freezer sides, " +
      "so the fridge stays humid and the freezer stays dry — the practical result is " +
      "produce that lasts and frozen food that does not develop burn. The 3.62 cubic " +
      "foot drawer between them holds four set points of its own. Hands-free AutoFill " +
      "senses the vessel under the dispenser and shuts off when it is full, which sounds " +
      "like a gimmick until you have filled a water bottle without watching it.",
    highlights: [
      "TwinChill dual evaporators",
      "Hands-free AutoFill dispenser",
      "3.62 cu. ft. convertible drawer with 4 settings",
      "Door-in-Door storage",
      "ENERGY STAR certified — up to 9% more efficient than standard",
      "Full-width LED interior lighting",
    ],
    waterFilterModel: "XWFE",
    specSheetUrl:
      "https://www.geappliances.com/appliance/GE-Profile-ENERGY-STAR-27-9-Cu-Ft-Smart-Fingerprint-Resistant-4-Door-French-Door-Refrigerator-with-Door-In-Door-PVD28BYNFS",

    images: [
      {
        src: "/products/GW-GEP-PVD28BYNFS/01.svg",
        alt: "GE Profile PVD28BYNFS 4-door refrigerator, front view",
        source: "pending",
      },
    ],

    inventory: { onHand: 3, localLeadTimeDays: 3 },
  },

  {
    slug: "bosch-b36ct80sns-800-series",
    model: "B36CT80SNS",
    brand: "Bosch",
    name: "800 Series 36-inch Counter-Depth French Door Refrigerator",
    category: "french-door",
    sku: "GW-BSH-B36CT80SNS",

    price: 3399,
    listPrice: 3999,

    finish: "Stainless steel with anti-fingerprint coating",
    depthClass: "counter-depth",
    installType: "either",
    doorCount: 3,

    capacity: { totalCuFt: 20.8 },
    dimensions: { widthIn: 35.625, heightIn: 72, depthIn: 27.813 },
    cutout: { widthIn: 36, heightIn: 72, depthIn: 25 },
    shippingWeightLbs: 322,

    energy: { energyStar: true },
    electrical: { volts: 120, hertz: 60, amps: 15 },
    iceMaker: { type: "Internal ice maker with external ice and water dispenser" },
    waterDispenser: "External ice and filtered water dispenser",
    warranty: {
      overall: "1 year parts and labour",
      sealedSystem: "5 years sealed system",
    },

    adaCompliant: false,
    smartHome: ["Home Connect", "Wi-Fi"],

    shortDescription:
      "One of the very few freestanding refrigerators with two compressors — and it shows in the produce drawer.",
    description:
      "We sell this to people who cook. Almost every refrigerator on the market runs a " +
      "single compressor split between two compartments; the Bosch 800 Series runs two " +
      "compressors with two evaporators, which lets each side hold its set point without " +
      "borrowing cooling from the other. Paired with the FarmFresh system — VitaFreshPro " +
      "humidity control, a FreshProtect ethylene absorber, an AirFresh carbon filter and " +
      "MultiAirFlow distribution — it is the best produce-keeper we stock, by a wide " +
      "margin. Interior is glass and stainless rather than moulded plastic. Fits a " +
      "36 × 72 × 25-inch cutout for a flush cabinetry run.",
    highlights: [
      "Dual compressors with dual evaporators — rare in a freestanding unit",
      "FarmFresh System: VitaFreshPro, FreshProtect, AirFresh filter, MultiAirFlow",
      "Glass and stainless interior with stainless back wall",
      "Flush-to-cabinetry counter-depth build",
      "Home Connect remote monitoring",
      "5-year sealed system warranty",
    ],
    waterFilterModel: "BORPLFTR50",
    specSheetUrl:
      "https://www.bosch-home.com/us/en/product/refrigerators/fridge-freezers/freestanding-fridge-freezers-with-freezer-at-bottom/B36CT80SNS",

    images: [
      {
        src: "/products/GW-BSH-B36CT80SNS/01.svg",
        alt: "Bosch B36CT80SNS 800 Series counter-depth refrigerator, front view",
        source: "pending",
      },
    ],

    inventory: { onHand: 2, localLeadTimeDays: 5 },
  },

  {
    slug: "kitchenaid-krfc302ess-counter-depth",
    model: "KRFC302ESS",
    brand: "KitchenAid",
    name: "22 cu. ft. Counter-Depth French Door Refrigerator with Interior Dispenser",
    category: "french-door",
    sku: "GW-KA-KRFC302ESS",

    price: 2699,
    listPrice: 3299,

    finish: "Stainless steel",
    depthClass: "counter-depth",
    installType: "freestanding",
    doorCount: 3,

    capacity: { totalCuFt: 22 },
    dimensions: { widthIn: 35.75, heightIn: 72, depthIn: 30.25 },
    shippingWeightLbs: 317,

    energy: { energyStar: false },
    electrical: { volts: 120, hertz: 60, amps: 15 },
    iceMaker: { type: "Freezer ice maker" },
    waterDispenser: "Interior filtered water dispenser",
    warranty: {
      overall: "1 year parts and labour",
      sealedSystem: "5 years sealed system parts",
    },

    adaCompliant: false,

    shortDescription:
      "Twenty-two cubic feet in a counter-depth cabinet, with the dispenser moved inside where it belongs.",
    description:
      "Three inches taller than a typical counter-depth unit, which is where the extra " +
      "capacity comes from — 22 cubic feet is unusual at this depth. The water dispenser " +
      "sits inside the fresh-food compartment rather than in the door, so the exterior " +
      "stays an unbroken stainless face; if you have specified a clean-front kitchen this " +
      "is usually the reason you end up here. ExtendFresh monitors the two compartments " +
      "independently and adjusts for each. The freezer drawer organises on three levels " +
      "rather than the usual two. Check your ceiling clearance before ordering: at " +
      "72 inches it is taller than most cabinets above it expect.",
    highlights: [
      "22 cu. ft. — unusually large for counter-depth",
      "ExtendFresh independent temperature management",
      "Interior water dispenser keeps the door face clean",
      "Three-tier pull-out freezer drawer",
      "Humidity-controlled crispers",
      "72-inch height — verify clearance before ordering",
    ],
    waterFilterModel: "EDR4RXD1 (EveryDrop Filter 4)",
    specSheetUrl:
      "https://www.kitchenaid.com/major-appliances/refrigeration/refrigerators/french-door-refrigerators/p.22-cu.-ft.-36-counter-depth-french-door-refrigerator-with-interior-dispense.krfc302ess.html",

    images: [
      {
        src: "/products/GW-KA-KRFC302ESS/01.svg",
        alt: "KitchenAid KRFC302ESS counter-depth French door refrigerator, front view",
        source: "pending",
      },
    ],

    inventory: { onHand: 5, localLeadTimeDays: 2 },
  },

  {
    slug: "whirlpool-wrs325sdhz-side-by-side",
    model: "WRS325SDHZ",
    brand: "Whirlpool",
    name: "36-inch 24.6 cu. ft. Side-by-Side Refrigerator",
    category: "side-by-side",
    sku: "GW-WHP-WRS325SDHZ",

    price: 1349,
    listPrice: 1699,

    finish: "Fingerprint-resistant stainless steel",
    depthClass: "standard-depth",
    installType: "freestanding",
    doorCount: 2,

    capacity: { totalCuFt: 24.6 },
    dimensions: { widthIn: 35.875, heightIn: 69.625, depthIn: 33.625 },
    shippingWeightLbs: 285,

    energy: { energyStar: false },
    electrical: { volts: 115, hertz: 60, amps: 15 },
    iceMaker: { type: "Built-in ice maker with external dispenser" },
    waterDispenser: "External ice and filtered water dispenser",
    warranty: { overall: "1 year limited parts and labour" },

    adaCompliant: true,

    shortDescription:
      "The dependable one. Narrow door swing, twenty-five cubic feet, and very little to go wrong.",
    description:
      "Our highest-volume seller, and the unit we put in most rental and remodel jobs. " +
      "Side-by-side doors need roughly half the clearance of a French door to open " +
      "fully, which is what makes this the right answer in a galley kitchen or anywhere " +
      "an island sits close to the refrigerator. Full-height freezer means frozen food is " +
      "at eye level rather than in a drawer at your feet. Frameless glass shelves wipe " +
      "clean edge to edge, the in-door can caddy holds a twelve-pack out of the way, and " +
      "the fingerprint-resistant finish genuinely does resist fingerprints. ADA compliant.",
    highlights: [
      "Narrow door swing for galley kitchens and tight islands",
      "Full-height freezer — no bending to reach frozen food",
      "Frameless glass shelves",
      "In-door can caddy holds a 12-pack",
      "Humidity-controlled crispers",
      "ADA compliant",
    ],
    waterFilterModel: "EDR1RXD1 (EveryDrop Filter 1)",
    specSheetUrl:
      "https://www.whirlpool.com/kitchen/refrigeration/refrigerators/side-by-side/p.36-inch-wide-side-by-side-refrigerator-25-cu.-ft.wrs325sdhz.html",

    images: [
      {
        src: "/products/GW-WHP-WRS325SDHZ/01.svg",
        alt: "Whirlpool WRS325SDHZ side-by-side refrigerator, front view",
        source: "pending",
      },
    ],

    inventory: { onHand: 11, localLeadTimeDays: 1 },
  },

  {
    slug: "frigidaire-fftr1835vs-top-freezer",
    model: "FFTR1835VS",
    brand: "Frigidaire",
    name: "30-inch 18.3 cu. ft. Top Freezer Refrigerator",
    category: "top-freezer",
    sku: "GW-FRG-FFTR1835VS",

    price: 849,
    listPrice: 1049,

    finish: "Stainless steel",
    depthClass: "standard-depth",
    installType: "freestanding",
    doorCount: 2,

    capacity: { totalCuFt: 18.3, freshFoodCuFt: 13.4, freezerCuFt: 4.9 },
    dimensions: { widthIn: 30, heightIn: 66.375, depthIn: 30.375 },
    shippingWeightLbs: 168,

    energy: { energyStar: false },
    electrical: { volts: 115, hertz: 60, amps: 15 },
    warranty: {
      overall: "1 year parts and labour",
      sealedSystem: "5 years sealed system",
    },

    adaCompliant: true,
    garageReady: true,
    ambientRangeF: [45, 110],

    shortDescription:
      "The most cubic feet per dollar we sell, and rated to run in a Florida garage.",
    description:
      "There is a reason this format has not changed much in forty years: nothing on it " +
      "breaks. No dispenser, no ice line, no touchscreen — a compressor, a fan and two " +
      "doors. At 30 inches wide it drops into the opening most older Miami homes and " +
      "condos already have. The garage-ready rating matters here specifically: it is " +
      "certified to hold temperature in ambient conditions from 45 to 110 °F, which an " +
      "unconditioned South Florida garage will absolutely reach in August. EvenTemp " +
      "circulates air to keep warm spots down, and the doors close themselves if you " +
      "leave one at a shallow angle. Our standard recommendation for rentals and second " +
      "kitchens. Ice maker kit sold separately.",
    highlights: [
      "Garage Ready — certified from 45 °F to 110 °F ambient",
      "EvenTemp cooling system",
      "Dual humidity-controlled crispers",
      "Sliding half-width deli drawer",
      "Auto-close doors",
      "ADA compliant",
      "30-inch width fits most older openings",
    ],
    specSheetUrl:
      "https://www.frigidaire.com/en/p/kitchen/refrigerators/top-freezer-refrigerators/FFTR1835VS",

    images: [
      {
        src: "/products/GW-FRG-FFTR1835VS/01.svg",
        alt: "Frigidaire FFTR1835VS top freezer refrigerator, front view",
        source: "pending",
      },
    ],

    inventory: { onHand: 14, localLeadTimeDays: 1 },
  },

  {
    slug: "frigidaire-gallery-fgbc5334vs-beverage-center",
    model: "FGBC5334VS",
    brand: "Frigidaire Gallery",
    name: "24-inch 5.3 cu. ft. Built-In Beverage Centre",
    category: "beverage-center",
    sku: "GW-FRG-FGBC5334VS",

    price: 1149,
    listPrice: 1399,

    finish: "Stainless steel with tinted glass door",
    depthClass: "built-in",
    installType: "either",
    doorCount: 1,

    capacity: { totalCuFt: 5.3 },
    dimensions: { widthIn: 23.4375, heightIn: 35, depthIn: 23.25 },
    shippingWeightLbs: 121,

    energy: { energyStar: false },
    electrical: { volts: 115, hertz: 60, amps: 15 },
    warranty: {
      overall: "1 year parts and labour",
      sealedSystem: "5 years sealed system",
    },

    adaCompliant: false,
    ambientRangeF: [34, 50],

    shortDescription:
      "Holds 165 cans between 34 and 50 °F, front-vented, and slides under a standard counter run.",
    description:
      "Front-venting is the specification that matters on an undercounter unit — it means " +
      "this can be trimmed into a cabinet run with no clearance behind or above, or left " +
      "freestanding at the end of an island. Neither is a compromise. The cabinet holds " +
      "165 twelve-ounce cans comfortably and 195 if you pack it, on adjustable " +
      "end-to-end glass shelves with stainless trim. Temperature sets anywhere from 34 to " +
      "50 °F on an LED display, so it works as a beer fridge at the low end or a cellar " +
      "for reds at the high end. Tinted glass keeps light off the contents.",
    highlights: [
      "165 cans easy fit, 195 maximum",
      "Front-venting — installs built-in or freestanding",
      "34 °F to 50 °F range on LED controls",
      "Adjustable end-to-end glass shelving with stainless trim",
      "Tinted glass door",
      "Fits a standard 24-inch undercounter opening",
    ],
    specSheetUrl:
      "https://www.frigidaire.com/en/p/kitchen/refrigerators/beverage-center-refrigerators/FGBC5334VS",

    images: [
      {
        src: "/products/GW-FRG-FGBC5334VS/01.svg",
        alt: "Frigidaire Gallery FGBC5334VS built-in beverage centre, front view",
        source: "pending",
      },
    ],

    inventory: { onHand: 7, localLeadTimeDays: 2 },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(id: Product["category"]): Product[] {
  return products.filter((p) => p.category === id);
}

export function getCategory(id: Product["category"]): Category | undefined {
  return categories.find((c) => c.id === id);
}

export const brands = [...new Set(products.map((p) => p.brand))].sort();
