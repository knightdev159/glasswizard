import Image from "next/image";
import type { ProductImage as ProductImageData } from "@/data/types";

/**
 * Renders a catalogue image and, critically, tells the truth about what it is.
 *
 * Images marked `pending` carry a visible badge so a dimensional reference
 * render is never mistaken for a photograph of the unit in our warehouse.
 * Once real dealer photography replaces the file and `source` flips to
 * "own-photo", the badge disappears with no other change.
 */
export function ProductImageView({
  image,
  sizes,
  priority = false,
  className = "",
  badge = true,
}: {
  image: ProductImageData;
  sizes: string;
  priority?: boolean;
  className?: string;
  badge?: boolean;
}) {
  const isVector = image.src.endsWith(".svg");

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={isVector}
        className="object-contain"
      />
      {badge && image.source === "pending" && (
        <span className="absolute bottom-2 left-2 rounded-full border border-ink-200 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-500 backdrop-blur">
          Reference render
        </span>
      )}
    </div>
  );
}
