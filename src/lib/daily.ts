import { CURATED_VERSES, CuratedVerse } from "@/data/verses";

/**
 * Calcula el número ordinal del día dentro del año (1..366) para una fecha dada en UTC.
 * Utilizar UTC previene variaciones indeseadas por zonas horarias entre servidor y cliente.
 */
export function getDayOfYear(date: Date = new Date()): number {
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const currentDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const diffInMilliseconds = currentDate.getTime() - startOfYear.getTime();
  const millisecondsInDay = 1000 * 60 * 60 * 24;

  return Math.floor(diffInMilliseconds / millisecondsInDay) + 1;
}

/**
 * Selecciona el versículo del día de manera determinista a partir del día del año.
 * Todos los usuarios recibirán exactamente el mismo versículo durante las 24 horas del día.
 */
export function getDailyVerseReference(date: Date = new Date()): CuratedVerse {
  const dayOfYear = getDayOfYear(date);
  // Operación módulo sobre la lista curada de versículos
  const index = (dayOfYear - 1) % CURATED_VERSES.length;
  const safeIndex = index >= 0 ? index : 0;

  return CURATED_VERSES[safeIndex];
}
