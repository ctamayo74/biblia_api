// ============================================================================
// Tipos del recorrido de evangelismo paso a paso
// ============================================================================

/** Paso de la ruta de evangelismo con sus datos estáticos. */
export interface EvangelismStep {
  /** Identificador estable del paso. */
  id: string;
  /** Título pastoral del paso (ej. "Dios te ama"). */
  title: string;
  /** Identificador de pasaje para API.Bible (ej. "JHN.3.16" o "EPH.2.8-EPH.2.9"). */
  passageId: string;
  /** Referencia legible para mostrar (ej. "Juan 3:16"). */
  reference: string;
  /** Explicación breve y respetuosa que acompaña al versículo. */
  message: string;
}

/** Paso con el texto bíblico ya obtenido en el servidor. */
export interface JourneyStep extends EvangelismStep {
  /** Texto bíblico limpio (vacío si no se pudo cargar). */
  text: string;
}

/** Enlace de la sección "Siguientes pasos". */
export interface NextStep {
  /** Título visible del enlace. */
  title: string;
  /** Descripción breve del enlace. */
  description: string;
  /** Ruta interna de destino (ej. "/discipulado"). */
  href: string;
}

/** Cierre del recorrido: invitación a orar y siguientes pasos. */
export interface JourneyClosing {
  /** Título de la invitación a orar. */
  title: string;
  /** Introducción pastoral antes de la oración. */
  intro: string;
  /** Texto de la oración sugerida. */
  prayer: string;
  /** Enlaces de la sección "Siguientes pasos". */
  nextSteps: NextStep[];
}
