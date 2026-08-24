import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { StoreProvider } from "@/context/StoreProvider";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAISON SAVAGE — The Savage Haute Couture",
  description:
    "Ultra-high-end luxury fashion house. Bespoke atelier tailoring, high jewelry, python leather goods and animal-motif jacquard silk, crafted in Paris.",
  keywords: [
    "luxury fashion",
    "haute couture",
    "MAISON SAVAGE",
    "high jewelry",
    "bespoke tailoring",
  ],
  openGraph: {
    title: "MAISON SAVAGE — The Savage Haute Couture",
    description:
      "Ultra-high-end luxury fashion house. Bespoke atelier tailoring, high jewelry, python leather goods and animal-motif jacquard silk.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-obsidian text-cream">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}