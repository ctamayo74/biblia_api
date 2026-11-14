// ============================================================================
// Tipos de Entidades y Respuestas para API.Bible (https://rest.api.bible/v1)
// ============================================================================

export interface BibleLanguage {
  id: string;
  name: string;
  nameLocal: string;
  script: string;
  scriptDirection: string;
}

export interface BibleCountry {
  id: string;
  name: string;
  nameLocal: string;
}

export interface Bible {
  id: string;
  dblId?: string;
  abbreviation: string;
  abbreviationLocal: string;
  name: string;
  nameLocal: string;
  description: string | null;
  descriptionLocal: string | null;
  language: BibleLanguage;
  countries: BibleCountry[];
  type: string;
  updatedAt: string;
  audioBibles?: BibleAudioSummary[];
}

export interface BibleAudioSummary {
  id: string;
  name: string;
  nameLocal: string;
  description?: string;
}

export interface ChapterSummary {
  id: string;
  bibleId: string;
  number: string;
  bookId: string;
  reference?: string;
}

export interface Book {
  id: string;
  bibleId: string;
  abbreviation: string;
  name: string;
  nameLong: string;
  chapters?: ChapterSummary[];
}

export interface NavigationReference {
  id: string;
  bookId?: string;
  number?: string;
}

export interface Chapter {
  id: string;
  bibleId: string;
  number: string;
  bookId: string;
  content: string;
  reference: string;
  verseCount: number;
  copyright?: string;
  next?: NavigationReference;
  previous?: NavigationReference;
}

export interface Verse {
  id: string;
  orgId?: string;
  bibleId: string;
  bookId: string;
  chapterId: string;
  content: string;
  reference: string;
  verseCount: number;
  copyright?: string;
  next?: NavigationReference;
  previous?: NavigationReference;
}

export interface Passage {
  id: string;
  bibleId: string;
  orgId?: string;
  content: string;
  reference: string;
  verseCount: number;
  copyright?: string;
}

export interface SearchVerseMatch {
  id: string;
  orgId?: string;
  bibleId: string;
  bookId: string;
  chapterId: string;
  text: string;
  reference: string;
}

export interface SearchPassageMatch {
  id: string;
  bibleId: string;
  reference: string;
  content: string;
}

export interface SearchResult {
  query: string;
  limit: number;
  offset: number;
  total: number;
  verseCount: number;
  verses: SearchVerseMatch[];
  passages?: SearchPassageMatch[];
}

// ============================================================================
// Envoltorios estándar de API.Bible
// ============================================================================

export interface BibleApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

// ============================================================================
// Envoltorios de respuesta para los Route Handlers (Proxy interno)
// ============================================================================

export type ProxySuccessResponse<T> = {
  data: T;
  error?: never;
};

export type ProxyErrorResponse = {
  data?: never;
  error: string;
  details?: unknown;
};

export type ProxyApiResponse<T> = ProxySuccessResponse<T> | ProxyErrorResponse;
