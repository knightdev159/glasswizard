import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The cart is per-visitor and has nothing to index.
      disallow: ["/cart"],
    },
    sitemap: "https://glasswizard.com/sitemap.xml",
  };
}
