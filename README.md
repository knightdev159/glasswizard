# GLASSWIZARD LLC — storefront

E-commerce storefront for a refrigeration-only appliance dealer in South Miami.

**Stack:** Next.js 16.3 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4

```bash
npm run dev              # http://localhost:3000
npm run build            # production build
npm run typecheck        # tsc --noEmit
npm run lint             # eslint
npm run generate:images  # regenerate the product reference renders
```

## What's here

| Route | |
| --- | --- |
| `/` | Home — hero, formats, in-stock grid, measuring guide |
| `/refrigerators` | Catalogue with format/brand filters and sorting |
| `/refrigerators/[slug]` | Product detail — gallery, buy box, full spec tables |
| `/cart` | Cart with delivery threshold, Florida sales tax, stock ceiling |
| `/about`, `/contact` | Company pages, contact form |
| `/policies/{delivery,returns,warranty}` | Customer care |
| `/sitemap.xml`, `/robots.txt` | Generated from the catalogue |

All nine product pages prerender as static HTML at build time.

## The data model

Everything lives in `src/data/`:

- **`company.ts`** — one record for the legal name, address, phone, hours, tax
  rate, delivery thresholds. The footer, the schema.org blocks, the policy
  pages and the cart all read from it, so a legal name or address is corrected
  in exactly one place.
- **`products.ts`** — the catalogue.
- **`types.ts`** — the shape, with the reasoning behind it.

### Spec figures are real, and traceable

Every capacity, dimension, energy and warranty figure was taken from the
manufacturer's published spec sheet, and each product carries a `specSheetUrl`
pointing at the sheet it came from — surfaced on the page as
"Manufacturer spec sheet ↗" so a customer can check us.

The rule enforced in `types.ts`: **optional fields are optional because the
manufacturer does not publish them, and are never filled with a guess.** A
missing figure renders as "—" and the page says why. Bosch does not publish a
fresh-food/freezer split for the B36CT80SNS, so that row is a dash rather than
an invented number.

Two GE models were dropped during research because GE has discontinued them
(`GTS18GTNRWW`, `GTS18HGNRWW`) — a live store should not list them.

**Kenmore 46-75635 has a real data gap.** Kenmore publishes only a nominal
31-inch width on its product page and puts height, depth, energy draw and
warranty terms in the installation guide inside the carton; Home Depot returns
403 and Walmart bot-gates, so none of it could be verified. `Dimensions.heightIn`
and `depthIn` are therefore optional in the type, the product page dashes them,
and it shows an amber callout telling the customer to call for a measurement off
the warehouse floor. **Fill these in from the carton before launch** — a customer
cannot buy a refrigerator without a height. Its warranty is set to Kenmore's
standard 1-year limited and should be confirmed against the printed document.

### What is *ours* rather than the manufacturer's

Two blocks, and they are the two you must own:

- **`price` / `listPrice`** — set to realistic street pricing as a starting
  point. **Verify every one against your dealer cost sheet before going live.**
  This is the one category of number on the site that could not be sourced from
  a manufacturer document.
- **`inventory.onHand` / `localLeadTimeDays`** — currently static. See below.

## Images

**The store displays only imagery GLASSWIZARD owns or is licensed to use.**
Manufacturer and retailer product photography is copyrighted by Samsung, LG, GE,
Bosch, Whirlpool, Best Buy and Home Depot; using it on a store that sells those
brands is a genuine liability, and manufacturers enforce it against dealers.

What ships instead: generated reference renders under
`public/products/<SKU>/`. They are not generic boxes — each is drawn at the
**true width-to-height ratio from that model's published dimensions**, with door
and drawer splits matching its actual configuration, so the counter-depth Bosch
reads narrow and tall while the 30-inch Frigidaire reads short and squat. Each
carries its model number and dimensions in the caption.

Every image has a `source` field. Anything marked `pending` renders with a
visible **Reference render** badge, so a dimensional render is never mistaken
for a photo of a unit on our floor. Flip it to `own-photo` and the badge
disappears — and the generator will then refuse to overwrite that file.

**[`docs/IMAGES.md`](docs/IMAGES.md)** covers the three legitimate routes to
real photography — brand dealer portals (how dealers normally do it), syndication
feeds like Icecat/Syndigo, and shooting your own units — plus the two-step swap
procedure.

## Not yet wired

Deliberately, and surfaced honestly in the UI rather than faked:

1. **Payments.** The cart computes correct totals but Checkout is disabled, and
   the page tells the customer to call. Wire Stripe Checkout or similar and
   replace that button.
2. **Contact form delivery.** No transactional email provider is connected, so
   the form composes a pre-filled message and hands it to the customer's mail
   client — which genuinely works today. Swap `handleSubmit` for a server action
   using Resend/Postmark/SES when you have one.
3. **Inventory.** `inventory.onHand` is static in the source file. It drives the
   stock badges, the quantity ceiling in the cart, and `availability` in the
   product schema, so it needs to come from real stock before launch.
4. **Miami-Dade surtax.** The cart applies Florida's 7% rate. The county's
   discretionary surtax on the first $5,000 of each item is noted on the page
   but not calculated — fold it in with the payment integration.
5. **Domain.** `glasswizard.com` is hardcoded as the canonical host in
   `layout.tsx`, `sitemap.ts` and `robots.ts`.

## Notes on implementation

- **Cart state** reads localStorage through `useSyncExternalStore`
  (`src/lib/cart-store.ts`) rather than mirroring it into React state in an
  effect. No hydration mismatch, no cascading render on mount, and carts stay in
  sync across browser tabs for free.
- Only the SKU and quantity are persisted. Price is always re-read from the
  catalogue, so a stale localStorage entry can never sell at last month's price.
- The cart clamps every line to `inventory.onHand`, so it cannot oversell.
- **Catalogue filters are plain links**, not client state — they work with
  JavaScript disabled and each filtered view is individually shareable.
- Dimensions render as spec-sheet fractions (`35¾"`, not `35.75"`), because that
  is what is printed on the installation guide the customer is holding when they
  measure their opening.
- schema.org `HomeGoodsStore` on every page and `Product`/`Offer` on each
  product page, both fed from the same records as the visible page.
