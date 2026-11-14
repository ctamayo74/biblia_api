// ============================================================================
// Tipos del módulo de memorización (modos, niveles y progreso persistido)
// ============================================================================

/** Modos de práctica disponibles para memorizar un versículo. */
export type MemorizationMode = "completar" | "ordenar" | "escribir";

/** Valores numéricos de dificultad del ejercicio. */
export type MemorizationLevelValue = 1 | 2 | 3 | 4;

/** Descripción de un modo de práctica. */
export interface MemorizationModeInfo {
  value: MemorizationMode;
  label: string;
  description: string;
}

/**
 * Descripción de un nivel de dificultad.
 * Cada modo interpreta sus proporciones de ayuda de forma distinta.
 */
export interface MemorizationLevelInfo {
  value: MemorizationLevelValue;
  label: string;
  description: string;
  /** Proporción de palabras que se ocultan en el modo "Completar". */
  hiddenRatio: number;
  /** Proporción de palabras que se entregan ya ordenadas en el modo "Ordenar". */
  preFilledRatio: number;
  /** Proporción de palabras que se muestran como pista en el modo "Escribir". */
  hintRatio: number;
}

/** Progreso del usuario guardado en localStorage. */
export interface MemorizationProgress {
  /** Días consecutivos practicando. */
  streak: number;
  /** Mejor racha histórica alcanzada. */
  bestStreak: number;
  /** Última fecha de práctica en formato ISO corto (YYYY-MM-DD) o null. */
  lastPracticedDate: string | null;
  /** Total de sesiones completadas (una por día). */
  totalSessions: number;
  /** Identificadores de los versículos completados correctamente. */
  masteredVerseIds: string[];
}

/** Datos mínimos de un versículo listo para practicar en el cliente. */
export interface PracticeVerse {
  id: string;
  reference: string;
  content: string;
}
