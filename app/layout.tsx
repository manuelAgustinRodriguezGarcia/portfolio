import type { Metadata } from "next";
import "./globals.scss";
import I18nProvider from "./components/I18nProvider";
import LanguageToggle from "./components/LanguageToggle";

export const metadata: Metadata = {
  title: "Manuel Rodriguez Garcia | Frontend Developer",
  description: "Portfolio de Manuel Rodriguez Garcia — Desarrollador Frontend. Interfaces modernas, React, TypeScript, Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <I18nProvider>
          <LanguageToggle />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
