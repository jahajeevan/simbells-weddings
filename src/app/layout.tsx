import type { Metadata } from "next";
import { Fraunces, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { PageTransition } from "@/components/PageTransition";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "SimBells Wedding & Events | Premium Wedding Planner in Trichy",
    template: "%s | SimBells Weddings & Events",
  },
  description:
    "SimBells Weddings & Events — Trichy's most trusted wedding planner. Complete weddings from ₹1 Lakh. Photography, decoration, catering, entertainment & more. Call 99650 57920.",
  keywords: [
    "wedding planner trichy",
    "wedding events trichy",
    "wedding photography trichy",
    "wedding decoration trichy",
    "birthday event planner trichy",
    "corporate event planner trichy",
    "event management company trichy",
    "simbells weddings",
    "bridal makeup trichy",
    "baby shower trichy",
  ],
  authors: [{ name: "SimBells Weddings & Events" }],
  creator: "SimBells Weddings & Events",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SimBells Weddings & Events",
    title: "SimBells Wedding & Events | Premium Wedding Planner in Trichy",
    description:
      "You Dream It. We Make It. Complete wedding packages from ₹1 Lakh. Trichy's #1 event management company.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "SimBells Weddings & Events",
              description: "Premium wedding and event management company in Trichy",
              telephone: ["+919965057920", "+916381226958"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "K.P.R.S Towers, Tennur High Road, Tennur",
                addressLocality: "Trichy",
                postalCode: "620017",
                addressCountry: "IN",
              },
              openingHours: "Mo-Su 09:00-21:00",
              priceRange: "₹₹",
              sameAs: [
                "https://instagram.com/simbells_event_planner",
                "https://facebook.com/simbells_events",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
