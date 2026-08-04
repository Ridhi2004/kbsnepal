import type { Metadata } from "next";
import { Noto_Serif_Devanagari, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const display = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "नेपाल खुद्रा व्यापार संघ | KBS Nepal",
  description:
    "नेपाल खुद्रा व्यापार संघको आधिकारिक वेबसाइट — संस्थाको बारेमा, कार्यक्रमहरु, आजको बजार मूल्य र जानकारी।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ne" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
