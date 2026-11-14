// ============================================================================
// Tipos del módulo de memorización diaria
// ============================================================================

/** Modos de práctica disponibles para un versículo. */
export type MemorizationMode = "leer" | "completar" | "recitar";

/** Nivel de dominio de un versículo (0 = nuevo, 3 = dominado). */
export type MasteryLevel = 0 | 1 | 2 | 3;

/** Versículo guardado en la lista de memorización. */
export interface MemorizedVerse {
  /** Identificador de API.Bible (ej. "JHN.3.16"). */
  id: string;
  /** Referencia legible (ej. "Juan 3:16"). */
  reference: string;
  /** Texto bíblico limpio. */
  text: string;
  /** Fecha de inicio en formato ISO. */
  startedAt: string;
  /** Nivel de dominio actual (0-3). */
  masteryLevel: MasteryLevel;
  /** Fecha de la última práctica en formato ISO, o null. */
  lastPracticedAt: string | null;
}

/** Estado completo persistido en localStorage. */
export interface MemorizationStore {
  /** Versículos en proceso de memorización. */
  verses: MemorizedVerse[];
  /** Días consecutivos de práctica. */
  streak: number;
  /** Última fecha de práctica en formato ISO corto (YYYY-MM-DD) o null. */
  lastPracticeDate: string | null;
}

/** Resultado de intentar agregar un versículo por referencia. */
export interface AddVerseResult {
  ok: boolean;
  error?: string;
}
