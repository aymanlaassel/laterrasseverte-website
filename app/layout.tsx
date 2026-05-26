import type { Metadata } from "next";
import { EB_Garamond, Pinyon_Script, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
  weight: "400",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laterrasseverte.ma"),
  title: "La Terrasse Verte — Restaurant · Café · Salon de Thé",
  description:
    "Le goût spécial à La Terrasse Verte. Restaurant, café et salon de thé à Temara — petits déjeuners, plats maison, mqilat, pizzas, crêpes et boissons fraîches. Ouvert 7h–23h.",
  keywords: [
    "La Terrasse Verte",
    "restaurant Temara",
    "café Temara",
    "salon de thé Maroc",
    "petit déjeuner Temara",
    "mqila",
    "rfissa",
    "couscous Temara",
  ],
  openGraph: {
    title: "La Terrasse Verte",
    description: "Restaurant · Café · Salon de Thé — Temara",
    type: "website",
    locale: "fr_MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${garamond.variable} ${pinyon.variable} ${mono.variable}`}
    >
      <body className="relative">{children}</body>
    </html>
  );
}
