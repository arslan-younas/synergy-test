import type { Metadata } from "next";
import { DM_Mono, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "SynergySo — Every listing, walkable.",
  description: "SynergySo turns a 15-minute phone walkthrough into a shareable, interactive 3D tour your buyers can explore, question, and fall in love with — from anywhere in the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${manrope.variable} ${dmMono.variable} min-h-screen overflow-x-hidden bg-ink font-sans text-white antialiased selection:bg-accent selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
