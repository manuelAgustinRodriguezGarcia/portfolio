import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.scss";
import I18nProvider from "@/app/components/I18nProvider";
import ThemeInit from "@/app/components/layout/ThemeInit";
import PersonSchema from "@/app/components/seo/PersonSchema";

const display = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Manuel Rodriguez Garcia | Frontend Developer",
    template: "%s | Manuel Rodriguez Garcia",
  },
  description:
    "Portfolio de Manuel Rodriguez Garcia — Desarrollador Frontend. Interfaces modernas, React, TypeScript, Next.js.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Manuel Rodriguez Garcia | Frontend Developer",
    description:
      "Portfolio de Manuel Rodriguez Garcia — Desarrollador Frontend. Interfaces modernas, React, TypeScript, Next.js.",
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Rodriguez Garcia | Frontend Developer",
    description:
      "Portfolio de Manuel Rodriguez Garcia — Desarrollador Frontend. Interfaces modernas, React, TypeScript, Next.js.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
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
