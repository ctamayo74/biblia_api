"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/leer", label: "Leer" },
  { href: "/buscar", label: "Buscar" },
  { href: "/memorizar", label: "Memorizar" },
  { href: "/evangelizar", label: "Evangelizar" },
  { href: "/discipulado", label: "Discipulado" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/90">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo / Marca */}
        <Link
          href="/"
          className="flex min-h-[44px] min-w-[44px] items-center gap-2.5 rounded-lg py-2 text-stone-900 transition-opacity hover:opacity-90 dark:text-stone-100"
          aria-label="Palabra Diaria - Ir al inicio"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-700 text-stone-50 shadow-xs dark:bg-amber-600">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="font-serif text-lg font-bold tracking-tight">
            Palabra Diaria
          </span>
        </Link>

        {/* Navegación de Escritorio */}
        <nav
          aria-label="Navegación principal de escritorio"
          className="hidden md:flex items-center gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-amber-100/70 text-amber-900 font-semibold dark:bg-amber-950/50 dark:text-amber-300"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-900 dark:hover:text-stone-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
