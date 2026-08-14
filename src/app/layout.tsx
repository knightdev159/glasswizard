import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { company } from "@/data/company";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glasswizard.com"),
  title: {
    default: `${company.displayName} — Refrigerators delivered and installed in Miami`,
    template: `%s | ${company.displayName}`,
  },
  description: company.description,
  openGraph: {
    type: "website",
    siteName: company.displayName,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

/** schema.org LocalBusiness — this is what puts the Miami address into the
 *  knowledge panel and local pack, so it reads from the same company record
 *  the footer does. */
function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    name: company.legalName,
    alternateName: company.displayName,
    description: company.description,
    url: "https://glasswizard.com",
    telephone: company.contact.phone,
    email: company.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: company.geo.latitude,
        longitude: company.geo.longitude,
      },
      geoRadius: "60000",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd()) }}
        />
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
