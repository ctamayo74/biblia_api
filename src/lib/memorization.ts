import type {
  MemorizationLevelInfo,
  MemorizationLevelValue,
  MemorizationMode,
  MemorizationModeInfo,
  MemorizationProgress,
} from "@/types/memorization";

/** Clave de localStorage donde se guarda el progreso de memorización. */
export const MEMORIZATION_STORAGE_KEY = "biblia_memorizar_progreso";

/** Clave de localStorage donde se guardan las preferencias de práctica. */
export const MEMORIZATION_PREFS_STORAGE_KEY = "biblia_memorizar_preferencias";

/** Catálogo de modos de práctica disponibles. */
export const MEMORIZATION_MODES: MemorizationModeInfo[] = [
  {
    value: "completar",
    label: "Completar",
    description: "Rellena las palabras que se ocultan del versículo.",
  },
  {
    value: "ordenar",
    label: "Ordenar",
    description: "Reconstruye el versículo ordenando sus palabras.",
  },
  {
    value: "escribir",
    label: "Escribir",
    description: "Escribe el versículo completo de memoria.",
  },
];

/** Catálogo de niveles de dificultad. */
export const MEMORIZATION_LEVELS: MemorizationLevelInfo[] = [
  {
    value: 1,
    label: "Fácil",
    description: "Muchas pistas y pocas palabras ocultas.",
    hiddenRatio: 0.3,
    preFilledRatio: 0.4,
    hintRatio: 0.4,
  },
  {
    value: 2,
    label: "Intermedio",
    description: "Equilibrio entre pistas y esfuerzo.",
    hiddenRatio: 0.5,
    preFilledRatio: 0.25,
    hintRatio: 0.25,
  },
  {
    value: 3,
    label: "Difícil",
    description: "Casi sin pistas: memorización real.",
    hiddenRatio: 0.7,
    preFilledRatio: 0.1,
    hintRatio: 0.1,
  },
  {
    value: 4,
    label: "Maestría",
    description: "Sin ayudas: recítalo de memoria.",
    hiddenRatio: 1,
    preFilledRatio: 0,
    hintRatio: 0,
  },
];

/** Progreso inicial de un usuario nuevo. */
export const EMPTY_PROGRESS: MemorizationProgress = {
  streak: 0,
  bestStreak: 0,
  lastPracticedDate: null,
  totalSessions: 0,
  masteredVerseIds: [],
};

/** Devuelve la configuración de un nivel por su valor. */
export function getLevelInfo(value: MemorizationLevelValue): MemorizationLevelInfo {
  return (
    MEMORIZATION_LEVELS.find((level) => level.value === value) ??
    MEMORIZATION_LEVELS[0]
  );
}

/** Divide el texto bíblico en palabras, descartando espacios vacíos. */
export function tokenizeVerse(text: string): string[] {
  return text.split(/\s+/).filter((word) => word.length > 0);
}

/** Normaliza una palabra para comparaciones tolerantes (sin tildes, mayúsculas ni signos). */
export function normalizeWord(word: string): string {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, "");
}

/** Normaliza una frase completa para comparaciones tolerantes. */
export function normalizePhrase(text: string): string {
  return tokenizeVerse(text).map(normalizeWord).join(" ");
}

/** Genera un entero sin signo estable a partir de una cadena. */
function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Generador pseudoaleatorio determinista (mulberry32) a partir de una semilla. */
export function createSeededRandom(seed: string): () => number {
  let state = hashString(seed) || 1;
  return function random(): number {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let temp = Math.imul(state ^ (state >>> 15), 1 | state);
    temp = (temp + Math.imul(temp ^ (temp >>> 7), 61 | temp)) ^ temp;
    return ((temp ^ (temp >>> 14)) >>> 0) / 4294967296;
  };
}

/** Baraja una lista de palabras de forma determinista. */
export function shuffleWords(words: string[], seed: string): string[] {
  const result = [...words];
  const random = createSeededRandom(seed);

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

/**
 * Selecciona de forma determinista los índices de las palabras a ocultar.
 * Garantiza al menos una palabra oculta cuando la proporción es mayor que cero.
 */
export function getHiddenWordIndices(
  words: string[],
  ratio: number,
  seed: string
): number[] {
  if (words.length === 0 || ratio <= 0) {
    return [];
  }

  const targetCount =
    ratio >= 1
      ? words.length
      : Math.min(words.length, Math.max(1, Math.round(words.length * ratio)));

  const indices = words.map((_, index) => index);
  const random = createSeededRandom(seed);

  for (let index = indices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [indices[index], indices[swapIndex]] = [indices[swapIndex], indices[index]];
  }

  return indices.slice(0, targetCount).sort((a, b) => a - b);
}

/** Devuelve la fecha de hoy en formato ISO corto (UTC). */
export function getTodayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/** Diferencia en días completos entre dos claves ISO cortas. */
function daysBetween(fromKey: string, toKey: string): number {
  const from = Date.parse(`${fromKey}T00:00:00Z`);
  const to = Date.parse(`${toKey}T00:00:00Z`);

  if (Number.isNaN(from) || Number.isNaN(to)) {
    return Number.NaN;
  }

  return Math.round((to - from) / 86400000);
}

/** Indica si el usuario ya practicó en la fecha indicada. */
export function hasPracticedToday(
  progress: MemorizationProgress,
  date: Date = new Date()
): boolean {
  return progress.lastPracticedDate === getTodayKey(date);
}

/**
 * Registra una sesión completada y recalcula la racha.
 * - Misma fecha: no incrementa la racha.
 * - Día consecutivo: incrementa la racha.
 * - Hueco mayor: reinicia la racha a 1.
 */
export function registerPractice(
  progress: MemorizationProgress,
  verseId: string,
  date: Date = new Date()
): MemorizationProgress {
  const today = getTodayKey(date);
  const alreadyPracticedToday = progress.lastPracticedDate === today;

  let streak = progress.streak;

  if (!alreadyPracticedToday) {
    const gap = progress.lastPracticedDate
      ? daysBetween(progress.lastPracticedDate, today)
      : Number.POSITIVE_INFINITY;

    streak = gap === 1 ? progress.streak + 1 : 1;
  }

  const masteredVerseIds = progress.masteredVerseIds.includes(verseId)
    ? progress.masteredVerseIds
    : [...progress.masteredVerseIds, verseId];

  return {
    streak,
    bestStreak: Math.max(progress.bestStreak, streak),
    lastPracticedDate: today,
    totalSessions: alreadyPracticedToday
      ? progress.totalSessions
      : progress.totalSessions + 1,
    masteredVerseIds,
  };
}

/** Valida y normaliza un progreso leído de localStorage. */
export function parseProgress(raw: string | null): MemorizationProgress {
  if (!raw) {
    return EMPTY_PROGRESS;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<MemorizationProgress>;

    return {
      streak: typeof parsed.streak === "number" ? parsed.streak : 0,
      bestStreak: typeof parsed.bestStreak === "number" ? parsed.bestStreak : 0,
      lastPracticedDate:
        typeof parsed.lastPracticedDate === "string"
          ? parsed.lastPracticedDate
          : null,
      totalSessions:
        typeof parsed.totalSessions === "number" ? parsed.totalSessions : 0,
      masteredVerseIds: Array.isArray(parsed.masteredVerseIds)
        ? parsed.masteredVerseIds.filter(
            (id): id is string => typeof id === "string"
          )
        : [],
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

/** Preferencias de práctica persistidas (modo y nivel elegidos). */
export interface MemorizationPreferences {
  mode: MemorizationMode;
  level: MemorizationLevelValue;
}

/** Preferencias por defecto para un usuario nuevo. */
export const DEFAULT_PREFERENCES: MemorizationPreferences = {
  mode: "completar",
  level: 2,
};

/** Valida y normaliza las preferencias leídas de localStorage. */
export function parsePreferences(raw: string | null): MemorizationPreferences {
  if (!raw) {
    return DEFAULT_PREFERENCES;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<MemorizationPreferences>;

    const mode = MEMORIZATION_MODES.some((item) => item.value === parsed.mode)
      ? (parsed.mode as MemorizationMode)
      : DEFAULT_PREFERENCES.mode;

    const level = MEMORIZATION_LEVELS.some((item) => item.value === parsed.level)
      ? (parsed.level as MemorizationLevelValue)
      : DEFAULT_PREFERENCES.level;

    return { mode, level };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}
