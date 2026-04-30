import type { Metadata } from "next";
import { DM_Mono, Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-dm-mono" });

export const metadata: Metadata = {
  title: "SynergySo - Architectural Intelligence for the Visionary Market",
  description: "Interactive 3D real estate tours powered by AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${fraunces.variable} ${dmMono.variable} min-h-screen overflow-x-hidden bg-brand-bg font-sans font-light tracking-normal text-brand-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
