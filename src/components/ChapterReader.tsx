"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FontSizeControl, FontSizeLevel } from "@/components/FontSizeControl";
import { ShareButton } from "@/components/ShareButton";
import type { Chapter } from "@/types/bible";

interface ChapterReaderProps {
  chapter: Chapter;
  bibleId: string;
  bookId: string;
}

const STORAGE_FONT_KEY = "biblia_font_size";

const FONT_SIZE_CLASSES: Record<FontSizeLevel, string> = {
  sm: "text-base leading-relaxed sm:text-lg sm:leading-loose",
  md: "text-lg leading-loose sm:text-xl sm:leading-loose",
  lg: "text-xl leading-loose sm:text-2xl sm:leading-loose",
  xl: "text-2xl leading-loose sm:text-3xl sm:leading-loose",
};

export function ChapterReader({
  chapter,
  bibleId,
  bookId,
}: ChapterReaderProps) {
  const [fontSize, setFontSize] = useState<FontSizeLevel>("md");

  // Recuperar tamaño de fuente guardado en localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_FONT_KEY) as FontSizeLevel | null;
    if (saved && (saved === "sm" || saved === "md" || saved === "lg" || saved === "xl")) {
      setFontSize(saved);
    }
  }, []);

  function handleFontSizeChange(newSize: FontSizeLevel) {
    setFontSize(newSize);
    localStorage.setItem(STORAGE_FONT_KEY, newSize);
  }

  // Sanitizar el texto limpio en párrafos
  const paragraphs = chapter.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // Parámetros de consulta para mantener la versión activa en la navegación
  const queryParam = bibleId ? `?bibleId=${encodeURIComponent(bibleId)}` : "";

  return (
    <div className="flex flex-col gap-6">
      {/* Barra de herramientas de lectura */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 pb-4 dark:border-stone-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Modo Lectura
        </span>

        <div className="flex items-center gap-2">
          <FontSizeControl
            currentSize={fontSize}
            onChange={handleFontSizeChange}
          />

          <ShareButton
            reference={chapter.reference}
            text={paragraphs.slice(0, 2).join(" ")}
          />
        </div>
      </div>

      {/* Contenedor del texto bíblico estilo editorial (máximo 65 caracteres por línea) */}
      <article
        aria-label={`Lectura de ${chapter.reference}`}
        className="mx-auto w-full max-w-[65ch] py-2"
      >
        <div
          className={`space-y-6 font-serif text-stone-900 transition-all dark:text-stone-100 ${FONT_SIZE_CLASSES[fontSize]}`}
        >
          {paragraphs.map((para, index) => (
            <p key={index} className="text-justify indent-4 sm:indent-6">
              {para}
            </p>
          ))}
        </div>

        {chapter.copyright && (
          <div className="mt-12 border-t border-stone-200/60 pt-4 text-xs text-stone-400 dark:border-stone-800 dark:text-stone-600">
            {chapter.copyright}
          </div>
        )}
      </article>

      {/* Navegación entre capítulos (Anterior / Siguiente) */}
      <nav
        aria-label="Navegación de capítulos"
        className="mx-auto flex w-full max-w-[65ch] items-center justify-between border-t border-stone-200/80 pt-6 dark:border-stone-800"
      >
        {chapter.previous ? (
          <Link
            href={`/leer/${chapter.previous.bookId || bookId}/${chapter.previous.id}${queryParam}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:border-amber-600 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-500"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Capítulo Anterior</span>
          </Link>
        ) : (
          <div className="min-h-[44px]" />
        )}

        {chapter.next ? (
          <Link
            href={`/leer/${chapter.next.bookId || bookId}/${chapter.next.id}${queryParam}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:border-amber-600 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-500"
          >
            <span>Siguiente Capítulo</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <div className="min-h-[44px]" />
        )}
      </nav>
    </div>
  );
}
