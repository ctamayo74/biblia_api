import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const sansFont = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serifFont = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Palabra Diaria - Escritura para cada día",
    template: "%s | Palabra Diaria",
  },
  description:
    "Lectura, memorización y discipulado bíblico diario en español para dispositivos móviles y escritorio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${sansFont.variable} ${serifFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-stone-900 dark:bg-stone-950 dark:text-stone-100 dark:selection:bg-amber-950 dark:selection:text-amber-200">
        <Suspense>
          <Header />
        </Suspense>
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <Suspense>
          <BottomNav />
        </Suspense>
      </body>
    </html>
  );
}
