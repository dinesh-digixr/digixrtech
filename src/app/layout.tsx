import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ui/ChatWidget";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digixr — Agentic AI — Engineered Right, Equitable to All",
  description:
    "We engineer production-grade AI agents through four lifecycle stages — Context, Build, Secure, Assure. Transformative AI with security and fairness built in, not bolted on.",
  metadataBase: new URL("https://digixr.com"),
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    title: "Digixr — Agentic AI — Engineered Right, Equitable to All",
    description:
      "We engineer production-grade AI agents through four lifecycle stages — Context, Build, Secure, Assure. Transformative AI with security and fairness built in, not bolted on.",
    url: "https://digixr.com",
    siteName: "Digixr Technologies",
    images: [
      {
        url: "/images/og-home.png",
        width: 1200,
        height: 630,
        alt: "Digixr Technologies — Agentic AI, Engineered Right, Equitable to All",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digixr — Agentic AI — Engineered Right, Equitable to All",
    description:
      "Production-grade AI agents — Context, Build, Secure, Assure. Security and fairness built in, not bolted on.",
    images: ["/images/og-home.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${outfit.variable} ${plusJakarta.className}`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
