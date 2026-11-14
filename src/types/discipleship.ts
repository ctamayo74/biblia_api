// ============================================================================
// Tipos del plan de discipulado para nuevos creyentes
// ============================================================================

/** Un día del plan de discipulado. */
export interface DiscipleshipDay {
  /** Número del día (1-7). */
  day: number;
  /** Título temático del día. */
  title: string;
  /** Identificador de pasaje para API.Bible (ej. "JHN.1"). */
  passageId: string;
  /** Referencia legible para mostrar (ej. "Juan 1"). */
  reference: string;
  /** Identificador del libro (ej. "JHN") para enlazar al lector. */
  bookId: string;
  /** Identificador del capítulo (ej. "JHN.1") para enlazar al lector. */
  chapterId: string;
  /** Pregunta de reflexión personal. */
  reflection: string;
  /** Oración corta sugerida. */
  prayer: string;
  /** Acción práctica para el día. */
  action: string;
}

/** Estado persistido en localStorage con el progreso del plan. */
export interface DiscipleshipProgressStore {
  /** Números de los días completados. */
  completedDays: number[];
}
