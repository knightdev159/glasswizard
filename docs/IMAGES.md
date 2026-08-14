# Product imagery

## The rule

**This store displays only images GLASSWIZARD LLC owns or is licensed to use.**

Manufacturer and retailer product photography — the images that come back from a
Google image search for a model number — is copyrighted by Samsung, LG, GE,
Bosch, Whirlpool, Best Buy, Home Depot and so on. Using it on a storefront that
sells those products is a real liability, not a technicality: it is the kind of
thing that produces a takedown notice or an invoice, and appliance
manufacturers do enforce it against dealers.

There are three legitimate routes to real photography, in the order most
appliance dealers use them.

## 1. Manufacturer dealer portals (the normal answer)

Every brand in this catalogue runs an asset library for authorised dealers. You
get access with your reseller agreement, and the licence explicitly covers
selling their product. This is where essentially all dealer product imagery
comes from.

| Brand | Portal |
| --- | --- |
| Samsung | Samsung Dealer Portal → Marketing Assets |
| LG | LG Partner Portal → Digital Asset Management |
| GE / GE Profile | GE Appliances Dealer Center → Product Images |
| Bosch | Bosch Home Professional → Media Library |
| KitchenAid / Whirlpool | Whirlpool Trade Partner Portal |
| Frigidaire | Electrolux Dealer Resource Center |

Ask your rep for "high-resolution product imagery and the accompanying licence
terms" when you set up each dealer account.

## 2. Syndication feeds

Icecat, Syndigo and Salsify distribute manufacturer-authorised images and
specification data under licence. Useful if you expand past a few dozen SKUs and
want images and specs to arrive together and stay current. Paid, and worth it at
scale.

## 3. Photograph your own units

You have the actual appliances in the warehouse. A white sweep, a couple of
softboxes and a tripod produces imagery no competitor has, and it is
unambiguously yours. It also lets you show the thing customers actually want to
see and manufacturers never photograph: the unit next to a tape measure, the
back of the cabinet, the state of the door seals.

## What is in the repo right now

`public/products/<SKU>/*.svg` — generated reference renders, not photographs.

They are not generic boxes. Each one is drawn at the **true width-to-height
ratio** from that model's published dimensions, with the door and drawer splits
matching its actual configuration, so a counter-depth Bosch reads narrow and
tall and the 30-inch Frigidaire reads short and squat. Every render carries its
model number and dimensions in the caption and is labelled a reference render.

Regenerate them after changing any product's dimensions:

```bash
npm run generate:images
```

## Swapping in real photography

1. Drop the files into `public/products/<SKU>/`, named `01.jpg`, `02.jpg`, …
2. In `src/data/products.ts`, update that product's `images` array — change the
   `src` extension and set `source: "own-photo"`.
3. Done. No component changes.

Two things happen automatically when `source` flips to `"own-photo"`:

- the **Reference render** badge disappears from the image, and
- `scripts/generate-product-images.mjs` will refuse to overwrite that file on
  the next run, so a regeneration can never clobber real photography.

That badge is the mechanism enforcing the rule at the top of this file. A
dimensional render is never presented as a photograph of a unit on our floor.

### Recommended specs for your own photos

- 2000 × 2000 px minimum, square, product centred
- Pure white or very light neutral background
- JPEG at ~85% quality, or WebP
- One straight-on front view as `01`, then detail shots — interior, dispenser,
  drawer configuration — as `02` onward
- Write a real `alt` string for each. It is what a screen-reader user gets, and
  it is indexed.
