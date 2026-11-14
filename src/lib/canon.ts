import type { Book } from "@/types/bible";

/**
 * Libros del Antiguo Testamento canónico (39 libros en orden bíblico).
 */
export const OLD_TESTAMENT_IDS = new Set([
  "GEN", "EXO", "LEV", "NUM", "DEU",
  "JOS", "JDG", "RUT", "1SA", "2SA",
  "1KI", "2KI", "1CH", "2CH", "EZR",
  "NEH", "EST", "JOB", "PSA", "PRO",
  "ECC", "SNG", "ISA", "JER", "LAM",
  "EZK", "DAN", "HOS", "JOL", "AMO",
  "OBA", "JON", "MIC", "NAM", "HAB",
  "ZEP", "HAG", "ZEC", "MAL",
]);

/**
 * Libros del Nuevo Testamento canónico (27 libros en orden bíblico).
 */
export const NEW_TESTAMENT_IDS = new Set([
  "MAT", "MRK", "LUK", "JHN", "ACT",
  "ROM", "1CO", "2CO", "GAL", "EPH",
  "PHP", "COL", "1TH", "2TH", "1TI",
  "2TI", "TIT", "PHM", "HEB", "JAS",
  "JAM", "1PE", "2PE", "1JN", "2JN",
  "3JN", "JUD", "REV",
]);

export interface PartitionedBooks {
  oldTestament: Book[];
  newTestament: Book[];
  otherBooks: Book[];
}

/**
 * Agrupa una lista de libros según su pertenencia al Antiguo o Nuevo Testamento.
 */
export function partitionBooks(books: Book[]): PartitionedBooks {
  const oldTestament: Book[] = [];
  const newTestament: Book[] = [];
  const otherBooks: Book[] = [];

  for (const book of books) {
    const id = book.id.toUpperCase();
    if (OLD_TESTAMENT_IDS.has(id)) {
      oldTestament.push(book);
    } else if (NEW_TESTAMENT_IDS.has(id)) {
      newTestament.push(book);
    } else {
      otherBooks.push(book);
    }
  }

  return { oldTestament, newTestament, otherBooks };
}
