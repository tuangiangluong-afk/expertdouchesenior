import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { getCurrentYearSEO } from "@/lib/date";
import StructuredData from "@/components/seo/StructuredData";
import AttributionTracker from "@/components/AttributionTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const canonicalDomain = headersList.get("x-irve-canonical-domain") || "expertdouchesenior.com";
  const path = headersList.get("x-irve-path") || "";
  const baseUrl = `https://${canonicalDomain}`;

  return {
  title: {
    template: `%s | Expert Douche Senior ${getCurrentYearSEO()}`,
    default: `Expert Douche Senior - Douche Sécurisée & PMR ${getCurrentYearSEO()}`,
  },
  description: "Installation de douches sécurisées et italiennes PMR pour seniors. Éligible MaPrimeAdapt'. Devis gratuit sous 24h.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: `${baseUrl}${path}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Expert Douche Senior - Douche Sécurisée & PMR",
    description: "Installation de douches sécurisées et italiennes PMR pour seniors. Éligible MaPrimeAdapt'. Devis gratuit sous 24h.",
    siteName: "Expert Douche Senior",
    locale: "fr_FR",
    type: "website",
    url: `${baseUrl}${path}`,
    images: [
      {
        url: `${baseUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Expert Douche Senior - Douches sécurisées seniors et PMR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Douche Senior - Douche Sécurisée & PMR",
    description: "Installation de douches sécurisées et italiennes PMR pour seniors. Éligible MaPrimeAdapt'. Devis gratuit.",
    images: [`${baseUrl}/images/og-image.png`],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.png",
    apple: "/icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon.ico",
      }
    ]
  },
  };
}export const viewport: Viewport = {
  themeColor: "#0d9488",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-ML4JB88N');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${outfit.variable} font-sans antialiased bg-neutral-900 text-neutral-50`}
      >
        <StructuredData />
        <GoogleAnalytics GA_MEASUREMENT_ID="G-SBRK53310F" />
        <AttributionTracker />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-ML4JB88N"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
