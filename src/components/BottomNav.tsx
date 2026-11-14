"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Brain, Share2, Sprout } from "lucide-react";

interface BottomNavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/leer", label: "Leer", icon: BookOpen },
  { href: "/memorizar", label: "Memorizar", icon: Brain },
  { href: "/evangelizar", label: "Evangelizar", icon: Share2 },
  { href: "/discipulado", label: "Discipulado", icon: Sprout },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200/80 bg-stone-50/95 backdrop-blur-md md:hidden dark:border-stone-800 dark:bg-stone-950/95"
    >
      <div className="flex h-16 items-center justify-around px-2 max-w-lg mx-auto">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-md px-1 py-1.5 transition-colors ${
                isActive
                  ? "text-amber-700 dark:text-amber-400 font-semibold"
                  : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`h-5 w-5 transition-transform ${
                  isActive ? "scale-110" : ""
                }`}
                aria-hidden={true}
              />
              <span className="text-[10px] tracking-tight leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
