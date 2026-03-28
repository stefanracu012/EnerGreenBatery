import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { OrganizationJsonLd } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL = "https://www.energreenbatery.ro";
const SITE_NAME = "EnerGreenBatery";
const SITE_TITLE = "EnerGreenBatery — Energie solară pentru viitorul tău";
const SITE_DESCRIPTION =
  "Soluții fotovoltaice complete pentru case și afaceri în Suceava și toată România. Panouri solare, invertoare, baterii de stocare, instalare profesională și mentenanță. Economisește la energia electrică cu EnerGreenBatery.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "panouri solare",
    "panouri fotovoltaice",
    "energie solară",
    "fotovoltaice",
    "sisteme fotovoltaice",
    "instalare panouri solare",
    "invertoare solare",
    "baterii stocare energie",
    "energie verde",
    "energie regenerabilă",
    "EnerGreenBatery",
    "energreen",
    "Suceava",
    "România",
    "prosumator",
    "on-grid",
    "off-grid",
    "hybrid",
    "economie energie",
    "casa verde",
    "subvenție panouri solare",
    "montaj fotovoltaice",
    "mentenanță panouri solare",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "EnerGreenBatery — Energie solară",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/icon-512.png"],
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
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
  other: {
    "theme-color": "#019444",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=yes",
    "geo.region": "RO-SV",
    "geo.placename": "Suceava",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <OrganizationJsonLd />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
