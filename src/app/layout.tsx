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
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.displayName} — Refrigerators and cooling equipment, sold online`,
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

/** schema.org OnlineStore — the business sells only online, so this is an
 *  online business with a registered address and phone hours, not a
 *  LocalBusiness with a geo pin and opening hours. It reads from the same
 *  company record the footer does. */
function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: company.displayName,
    legalName: company.legalName,
    description: company.description,
    url: company.siteUrl,
    naics: company.industry.naicsCode,
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: company.contact.phone,
      email: company.contact.email,
      areaServed: "US",
      hoursAvailable: [
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
