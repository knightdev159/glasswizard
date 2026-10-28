import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { categories, products } from "@/data/products";

const BASE = company.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { path: "", priority: 1 },
    { path: "/refrigerators", priority: 0.9 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/policies/delivery", priority: 0.4 },
    { path: "/policies/returns", priority: 0.4 },
    { path: "/policies/warranty", priority: 0.4 },
  ].map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${BASE}/refrigerators?category=${c.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productPages = products.map((p) => ({
    url: `${BASE}/refrigerators/${p.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
