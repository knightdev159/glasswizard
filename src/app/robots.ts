import type { MetadataRoute } from "next";
import { company } from "@/data/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The cart is per-visitor and has nothing to index.
      disallow: ["/cart"],
    },
    sitemap: `${company.siteUrl}/sitemap.xml`,
  };
}
