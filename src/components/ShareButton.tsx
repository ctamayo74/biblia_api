"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface ShareButtonProps {
  reference: string;
  text: string;
  className?: string;
}

export function ShareButton({ reference, text, className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const cleanText = text.trim();
    const shareContent = `"${cleanText}" — ${reference}\n\nLeído en Palabra Diaria`;

    // 1. Intentar compartir nativamente en móviles
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Versículo del Día: ${reference}`,
          text: shareContent,
        });
        return;
      } catch (error) {
        // Si el usuario canceló el diálogo nativo, no hacemos nada
        if ((error as { name?: string }).name === "AbortError") {
          return;
        }
      }
    }

    // 2. Fallback: Copiar al portapapeles
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // En caso de denegación de permisos de portapapeles
        setCopied(false);
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-all hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700 ${className}`}
      aria-label={copied ? "Copiado al portapapeles" : "Compartir versículo"}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span className="text-emerald-600 dark:text-emerald-400">¡Copiado!</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4 text-stone-500 dark:text-stone-400" aria-hidden="true" />
          <span>Compartir</span>
        </>
      )}
    </button>
  );
}
