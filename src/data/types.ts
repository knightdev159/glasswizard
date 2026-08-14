/**
 * Domain types for the GLASSWIZARD catalog.
 *
 * Design rule: every field here maps to something printed on a manufacturer
 * spec sheet. Optional fields are optional because the spec sheet does not
 * always publish them — never fill them with a guess. A missing value renders
 * as "—" in the UI, which is honest; a fabricated value is a returned unit.
 */

export type CategoryId =
  | "french-door"
  | "side-by-side"
  | "top-freezer"
  | "beverage-center";

export interface Category {
  id: CategoryId;
  name: string;
  /** Plural, used in headings and breadcrumbs. */
  plural: string;
  blurb: string;
}

export type DepthClass = "standard-depth" | "counter-depth" | "built-in";

export type InstallType = "freestanding" | "built-in" | "either";

/** All dimensions in inches, as published by the manufacturer. */
export interface Dimensions {
  widthIn: number;
  heightIn: number;
  /** Cabinet depth, excluding handles. */
  depthIn: number;
  /** Depth including handles, when the manufacturer publishes it. */
  depthWithHandlesIn?: number;
  /** Depth including handles and an open-door swing, when published. */
  depthWithDoorOpenIn?: number;
}

/** Required rough opening for built-in / cutout installs. */
export interface CutoutDimensions {
  widthIn: number;
  heightIn: number;
  depthIn: number;
}

/** Capacities in cubic feet, as published. Sub-capacities may not sum to total. */
export interface Capacity {
  totalCuFt: number;
  freshFoodCuFt?: number;
  freezerCuFt?: number;
  /** Convertible / flex compartment, on 4-door models. */
  flexCuFt?: number;
}

export interface Energy {
  /** Estimated yearly consumption from the FTC EnergyGuide label. */
  kwhPerYear?: number;
  energyStar: boolean;
}

export interface IceMaker {
  type: string;
  /** Pounds produced per 24h, when published. */
  dailyProductionLbs?: number;
  /** Storage bin capacity in pounds, when published. */
  storageCapacityLbs?: number;
}

export interface Electrical {
  volts: number;
  hertz: number;
  amps: number;
}

export interface Warranty {
  /** e.g. "1 year parts and labor". */
  overall: string;
  /** Sealed system / compressor coverage, which is usually longer. */
  sealedSystem?: string;
}

export interface ProductImage {
  /** Path under /public. */
  src: string;
  alt: string;
  /**
   * Provenance. The storefront only ever presents `own-photo` as a real
   * product photo. `pending` renders as an explicit placeholder so we never
   * imply we photographed a unit we haven't.
   *
   * See docs/IMAGES.md — we do not use manufacturer or retailer photography
   * without a dealer asset licence.
   */
  source: "own-photo" | "pending";
}

export interface Product {
  /** URL segment. */
  slug: string;
  /** Manufacturer model number — the real one. */
  model: string;
  brand: string;
  name: string;
  category: CategoryId;

  /** Our internal stock-keeping unit. */
  sku: string;
  /** Manufacturer UPC, when we have it on the carton. */
  upc?: string;

  /** Current selling price, USD. */
  price: number;
  /** Manufacturer suggested retail, USD. Omit when we sell at MSRP. */
  listPrice?: number;

  finish: string;
  depthClass: DepthClass;
  installType: InstallType;
  doorCount: number;

  capacity: Capacity;
  dimensions: Dimensions;
  cutout?: CutoutDimensions;
  /** Shipping weight in pounds, from the carton. */
  shippingWeightLbs?: number;

  energy: Energy;
  electrical: Electrical;
  iceMaker?: IceMaker;
  waterDispenser?: string;
  warranty: Warranty;

  /** ADA-compliant per the manufacturer. */
  adaCompliant: boolean;
  /** Rated to run in an unconditioned garage. */
  garageReady?: boolean;
  /** Operating ambient range, when the manufacturer publishes one. */
  ambientRangeF?: [number, number];
  smartHome?: string[];

  shortDescription: string;
  description: string;
  highlights: string[];
  /** Replacement water filter part number — a real revenue line for a dealer. */
  waterFilterModel?: string;

  /** Link to the manufacturer's own spec page or PDF. Every product has one. */
  specSheetUrl: string;

  images: ProductImage[];

  inventory: {
    /** Units physically in the Miami warehouse. */
    onHand: number;
    /** Business days to deliver in our local service area. */
    localLeadTimeDays: number;
  };
}
