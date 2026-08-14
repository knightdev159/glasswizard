"use client";

import { useState } from "react";
import type { ProductImage } from "@/data/types";
import { ProductImageView } from "./product-image";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="rounded-card border border-ink-200 bg-ink-50/60 p-6">
        <ProductImageView
          image={current}
          sizes="(max-width: 1024px) 92vw, 46vw"
          priority
          className="aspect-square"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}: ${image.alt}`}
              aria-current={i === active}
              className={`rounded-lg border bg-ink-50/60 p-2 transition ${
                i === active
                  ? "border-frost-500 ring-1 ring-frost-500"
                  : "border-ink-200 hover:border-ink-300"
              }`}
            >
              <ProductImageView
                image={image}
                sizes="80px"
                badge={false}
                className="h-16 w-16"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
