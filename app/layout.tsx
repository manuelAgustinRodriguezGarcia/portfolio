import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.scss";
import I18nProvider from "@/app/components/I18nProvider";
import ThemeInit from "@/app/components/layout/ThemeInit";
import PersonSchema from "@/app/components/seo/PersonSchema";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Manuel Rodriguez Garcia | Fullstack Developer",
    template: "%s | Manuel Rodriguez Garcia",
  },
  description:
    "Portfolio de Manuel Rodriguez Garcia — Desarrollador Fullstack. Interfaces modernas, React, TypeScript, Next.js.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Manuel Rodriguez Garcia | Fullstack Developer",
    description:
      "Portfolio de Manuel Rodriguez Garcia — Desarrollador Fullstack. Interfaces modernas, React, TypeScript, Next.js.",
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Rodriguez Garcia | Fullstack Developer",
    description:
      "Portfolio de Manuel Rodriguez Garcia — Desarrollador Fullstack. Interfaces modernas, React, TypeScript, Next.js.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${geist.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}else if(window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.dataset.theme='light';}else{document.documentElement.dataset.theme='dark';}}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </head>
      <body>
        <PersonSchema />
        <ThemeInit />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
