/**
 * Generates the reference renders under public/products/<sku>/.
 *
 * These are placeholders, but not arbitrary ones: each silhouette is drawn at
 * the true width-to-height ratio taken from that model's published dimensions,
 * and the door/drawer splits follow its actual configuration. So a
 * counter-depth Bosch reads as narrow and tall, and the 30-inch Frigidaire
 * reads as short and squat, exactly as they do on a showroom floor.
 *
 * They are explicitly labelled as renders. When the dealer photography lands,
 * drop the JPEGs into the same folder and flip `source` to "own-photo" in
 * src/data/products.ts — see docs/IMAGES.md.
 *
 *   npm run generate:images
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, "..", "public");

const { products } = await import("../src/data/products.ts");

/** Finish name -> body gradient stops and trim colour. */
function palette(finish) {
  const f = finish.toLowerCase();
  if (f.includes("white")) {
    return { light: "#ffffff", mid: "#f1f2f4", dark: "#d8dbe0", trim: "#b9bec7", handle: "#c9ced6" };
  }
  if (f.includes("black")) {
    return { light: "#4a4f57", mid: "#33383f", dark: "#1e2227", trim: "#12151a", handle: "#6b7280" };
  }
  // Stainless, the default across this catalogue.
  return { light: "#e8ebef", mid: "#c8ced7", dark: "#a2aab6", trim: "#7c8592", handle: "#8b939f" };
}

/**
 * Horizontal split lines as a fraction of cabinet height, plus whether the
 * section above each split is vertically divided into two doors.
 */
function layout(product) {
  switch (product.category) {
    case "side-by-side":
      return { verticalSplitAt: 0.42, horizontalSplits: [] };
    case "top-freezer":
      return { verticalSplitAt: null, horizontalSplits: [0.3] };
    case "bottom-freezer":
      return { verticalSplitAt: null, horizontalSplits: [0.32] };
    case "beverage-center":
      return { verticalSplitAt: null, horizontalSplits: [], glassDoor: true };
    case "french-door":
    default:
      return product.doorCount >= 4
        ? { verticalSplitAt: null, horizontalSplits: [0.58, 0.79], frenchTop: 0.58 }
        : { verticalSplitAt: null, horizontalSplits: [0.62], frenchTop: 0.62 };
  }
}

/**
 * Nominal cabinet heights, used only to give a plausible silhouette when the
 * manufacturer does not publish a height. The caption says so explicitly, so
 * the render never implies a measurement we do not have.
 */
const NOMINAL_HEIGHT_IN = {
  "french-door": 70,
  "side-by-side": 70,
  "top-freezer": 66,
  "bottom-freezer": 67,
  "beverage-center": 34,
};

function svg(product, variant) {
  const { widthIn } = product.dimensions;
  const heightKnown = product.dimensions.heightIn !== undefined;
  const heightIn = heightKnown
    ? product.dimensions.heightIn
    : (NOMINAL_HEIGHT_IN[product.category] ?? 68);
  const c = palette(product.finish);
  const l = layout(product);
  const lit = variant === 2;

  // Cabinet drawn at true aspect ratio, with room for a caption beneath.
  const H = 620;
  const W = Math.round(H * (widthIn / heightIn));
  const padX = 46;
  const padTop = 30;
  const captionH = 62;
  const vbW = W + padX * 2;
  const vbH = H + padTop + captionH;

  const x = padX;
  const y = padTop;
  const r = 10;
  const parts = [];

  parts.push(`<rect x="${x + 6}" y="${y + 10}" width="${W}" height="${H}" rx="${r}" fill="#0b0f14" opacity="0.10"/>`);
  parts.push(`<rect x="${x}" y="${y}" width="${W}" height="${H}" rx="${r}" fill="url(#body)" stroke="${c.trim}" stroke-width="1.5"/>`);

  // Section divisions.
  const yAt = (frac) => y + H * (1 - frac);
  for (const frac of l.horizontalSplits) {
    parts.push(`<line x1="${x + 3}" y1="${yAt(frac)}" x2="${x + W - 3}" y2="${yAt(frac)}" stroke="${c.trim}" stroke-width="2.5" opacity="0.85"/>`);
  }
  if (l.verticalSplitAt !== null && l.verticalSplitAt !== undefined) {
    const sx = x + W * l.verticalSplitAt;
    parts.push(`<line x1="${sx}" y1="${y + 3}" x2="${sx}" y2="${y + H - 3}" stroke="${c.trim}" stroke-width="2.5" opacity="0.85"/>`);
    parts.push(`<rect x="${sx - 16}" y="${y + 40}" width="7" height="${H * 0.34}" rx="3.5" fill="${c.handle}"/>`);
    parts.push(`<rect x="${sx + 9}" y="${y + 40}" width="7" height="${H * 0.34}" rx="3.5" fill="${c.handle}"/>`);
    // Dispenser recess on the freezer door.
    parts.push(`<rect x="${x + W * 0.08}" y="${y + H * 0.14}" width="${W * 0.26}" height="${H * 0.2}" rx="6" fill="#0b0f14" opacity="${lit ? 0.55 : 0.72}"/>`);
  }
  if (l.frenchTop) {
    const sx = x + W / 2;
    parts.push(`<line x1="${sx}" y1="${y + 3}" x2="${sx}" y2="${yAt(l.frenchTop)}" stroke="${c.trim}" stroke-width="2.5" opacity="0.85"/>`);
    parts.push(`<rect x="${sx - 16}" y="${y + 46}" width="7" height="${H * 0.3}" rx="3.5" fill="${c.handle}"/>`);
    parts.push(`<rect x="${sx + 9}" y="${y + 46}" width="7" height="${H * 0.3}" rx="3.5" fill="${c.handle}"/>`);
  }

  // Drawer / door pull bars for the lower sections.
  const lower = [...l.horizontalSplits].sort((a, b) => b - a);
  lower.forEach((frac, i) => {
    const next = lower[i + 1] ?? 0;
    const mid = yAt((frac + next) / 2);
    if (l.frenchTop || product.category === "top-freezer") {
      parts.push(`<rect x="${x + W * 0.2}" y="${mid - 4}" width="${W * 0.6}" height="8" rx="4" fill="${c.handle}"/>`);
    }
  });
  if (product.category === "top-freezer") {
    parts.push(`<rect x="${x + W * 0.2}" y="${yAt(0.3) + 26}" width="${W * 0.6}" height="8" rx="4" fill="${c.handle}"/>`);
  }
  if (product.category === "bottom-freezer") {
    // Full-height fridge door handle above the freezer drawer pull.
    parts.push(`<rect x="${x + W - 26}" y="${y + H * 0.12}" width="7" height="${H * 0.4}" rx="3.5" fill="${c.handle}"/>`);
  }

  // Glass door with visible shelving, for the beverage centre.
  if (l.glassDoor) {
    const gx = x + 16;
    const gy = y + 16;
    const gw = W - 32;
    const gh = H - 32;
    parts.push(`<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="6" fill="url(#glass)" stroke="${c.trim}" stroke-width="1.5"/>`);
    for (let i = 1; i <= 4; i++) {
      const sy = gy + (gh / 5) * i;
      parts.push(`<line x1="${gx + 8}" y1="${sy}" x2="${gx + gw - 8}" y2="${sy}" stroke="#cfe3ee" stroke-width="2" opacity="0.5"/>`);
    }
    parts.push(`<rect x="${x + W - 26}" y="${y + H * 0.3}" width="7" height="${H * 0.34}" rx="3.5" fill="${c.handle}"/>`);
  }

  // Smart panel on the Family Hub model.
  if (product.smartHome?.includes("SmartThings") && l.frenchTop) {
    parts.push(`<rect x="${x + W * 0.09}" y="${y + H * 0.06}" width="${W * 0.34}" height="${H * 0.3}" rx="5" fill="${lit ? "#1b3a5c" : "#22262b"}" stroke="#0d1013"/>`);
    if (lit) {
      parts.push(`<rect x="${x + W * 0.12}" y="${y + H * 0.1}" width="${W * 0.28}" height="5" rx="2.5" fill="#7fb8e8" opacity="0.8"/>`);
      parts.push(`<rect x="${x + W * 0.12}" y="${y + H * 0.14}" width="${W * 0.18}" height="5" rx="2.5" fill="#7fb8e8" opacity="0.55"/>`);
    }
  }

  // InstaView glass panel, lit on the second variant.
  if (lit && product.model.startsWith("LRFVS")) {
    parts.push(`<rect x="${x + W * 0.52}" y="${y + H * 0.08}" width="${W * 0.4}" height="${H * 0.42}" rx="6" fill="#2b4a63" opacity="0.9" stroke="#16222c"/>`);
    parts.push(`<rect x="${x + W * 0.55}" y="${y + H * 0.13}" width="${W * 0.34}" height="${H * 0.1}" rx="4" fill="#a9d4ef" opacity="0.35"/>`);
    parts.push(`<rect x="${x + W * 0.55}" y="${y + H * 0.26}" width="${W * 0.34}" height="${H * 0.1}" rx="4" fill="#a9d4ef" opacity="0.25"/>`);
  }

  // Feet.
  parts.push(`<rect x="${x + 14}" y="${y + H}" width="18" height="7" rx="2" fill="${c.trim}"/>`);
  parts.push(`<rect x="${x + W - 32}" y="${y + H}" width="18" height="7" rx="2" fill="${c.trim}"/>`);

  const capY = y + H + 32;
  const caption = `${product.brand} ${product.model}`;
  const dims = [
    `${widthIn}" W`,
    heightKnown ? `${heightIn}" H` : null,
    product.dimensions.depthIn !== undefined ? `${product.dimensions.depthIn}" D` : null,
  ]
    .filter((part) => part !== null)
    .join(" × ");
  const sub = heightKnown
    ? `${dims} · reference render, studio photo pending`
    : `${dims} · height not published by ${product.brand} · reference render, proportions nominal`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" width="${vbW}" height="${vbH}" role="img" aria-label="${escapeXml(product.images[variant - 1]?.alt ?? caption)}">
  <defs>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${c.dark}"/>
      <stop offset="14%" stop-color="${c.light}"/>
      <stop offset="38%" stop-color="${c.mid}"/>
      <stop offset="62%" stop-color="${c.light}"/>
      <stop offset="86%" stop-color="${c.mid}"/>
      <stop offset="100%" stop-color="${c.dark}"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#20323d" stop-opacity="0.92"/>
      <stop offset="45%" stop-color="#33505f" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="#1a262e" stop-opacity="0.94"/>
    </linearGradient>
  </defs>
  <rect width="${vbW}" height="${vbH}" fill="transparent"/>
${parts.map((p) => "  " + p).join("\n")}
  <text x="${vbW / 2}" y="${capY}" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" font-size="17" font-weight="600" fill="#475569">${escapeXml(caption)}</text>
  <text x="${vbW / 2}" y="${capY + 21}" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" font-size="12.5" fill="#94a3b8">${escapeXml(sub)}</text>
</svg>
`;
}

function escapeXml(s) {
  return String(s).replace(/[<>&"']/g, (ch) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[ch]
  );
}

let written = 0;
for (const product of products) {
  const dir = join(publicDir, "products", product.sku);
  await mkdir(dir, { recursive: true });
  for (let i = 0; i < product.images.length; i++) {
    const image = product.images[i];
    if (image.source === "own-photo") {
      console.log(`  skip  ${image.src} — real photography, not overwriting`);
      continue;
    }
    await writeFile(join(publicDir, image.src.replace(/^\//, "")), svg(product, i + 1), "utf8");
    console.log(`  write ${image.src}`);
    written++;
  }
}
console.log(`\n${written} reference render(s) generated for ${products.length} products.`);
