import type { DiscipleshipDay } from "@/types/discipleship";

/**
 * Plan de discipulado de 7 días para nuevos creyentes.
 *
 * Los `passageId` usan el formato de capítulo completo de API.Bible
 * (ej. "JHN.1" = Juan 1). El `chapterId` coincide con el `passageId`
 * y `bookId` es el prefijo, de modo que se puede enlazar al lector.
 */
export const DISCIPLESHIP_PLAN: DiscipleshipDay[] = [
  {
    day: 1,
    title: "Conocer a Jesús",
    passageId: "JHN.1",
    reference: "Juan 1",
    bookId: "JHN",
    chapterId: "JHN.1",
    reflection:
      "Juan presenta a Jesús como la Palabra que da vida y luz. ¿Qué te llama la atención de cómo describe a Jesús?",
    prayer:
      "Jesús, gracias por venir a buscarme. Ayúdame a conocerte cada día más. Amén.",
    action:
      "Anota en tus notas una frase de Juan 1 que quieras recordar hoy.",
  },
  {
    day: 2,
    title: "El llamado a seguirle",
    passageId: "MRK.1",
    reference: "Marcos 1",
    bookId: "MRK",
    chapterId: "MRK.1",
    reflection:
      "Jesús llamó a sus discípulos a seguirle y dejarlo todo. ¿Qué te está pidiendo Dios dejar para seguirle mejor?",
    prayer:
      "Señor, quiero seguirte con un corazón dispuesto. Guíame en cada decisión. Amén.",
    action:
      "Identifica una cosa que te distrae de Dios y propónte un cambio concreto esta semana.",
  },
  {
    day: 3,
    title: "Vivir en el Espíritu",
    passageId: "ROM.8",
    reference: "Romanos 8",
    bookId: "ROM",
    chapterId: "ROM.8",
    reflection:
      "Romanos 8 habla de una vida libre y segura en Dios. ¿En qué área de tu vida necesitas confiar más en el Espíritu Santo?",
    prayer:
      "Padre, gracias porque nada me separará de tu amor. Lléname de tu Espíritu y dame paz. Amén.",
    action:
      "Cuando sientas preocupación hoy, detente y respira orando: «Dios está conmigo».",
  },
  {
    day: 4,
    title: "Confiar en el Buen Pastor",
    passageId: "PSA.23",
    reference: "Salmos 23",
    bookId: "PSA",
    chapterId: "PSA.23",
    reflection:
      "El salmista dice que el Señor es su pastor y nada le falta. ¿Qué necesidad quieres poner hoy en sus manos?",
    prayer:
      "Señor, tú eres mi pastor; confío en tu cuidado. Guíame por caminos de justicia. Amén.",
    action:
      "Anota una necesidad concreta y entrégala a Dios en oración durante esta semana.",
  },
  {
    day: 5,
    title: "Buscar primero el Reino",
    passageId: "MAT.6",
    reference: "Mateo 6",
    bookId: "MAT",
    chapterId: "MAT.6",
    reflection:
      "Jesús nos enseña a no vivir ansiosos y a confiar en el Padre. ¿Por qué cosas te cuesta más confiar en Dios?",
    prayer:
      "Padre, ayúdame a buscar primero tu Reino y a confiar en que cuidarás de mí. Amén.",
    action:
      "Ora el Padrenuestro (Mateo 6:9-13) con calma, pensando en cada frase.",
  },
  {
    day: 6,
    title: "Fe que se pone en práctica",
    passageId: "JAS.1",
    reference: "Santiago 1",
    bookId: "JAS",
    chapterId: "JAS.1",
    reflection:
      "Santiago dice que seamos hacedores de la Palabra y no solo oidores. ¿Qué verdad ya conoces que necesitas poner en práctica?",
    prayer:
      "Dios, dame fuerzas para vivir lo que creo y ser constante en la prueba. Amén.",
    action:
      "Elige una enseñanza de esta semana y ponla en práctica hoy con alguien.",
  },
  {
    day: 7,
    title: "La comunidad de la fe",
    passageId: "ACT.2",
    reference: "Hechos 2",
    bookId: "ACT",
    chapterId: "ACT.2",
    reflection:
      "Los primeros creyentes vivían su fe en comunidad. ¿Con quién puedes compartir y crecer en tu fe?",
    prayer:
      "Señor, gracias por tu iglesia. Ayúdame a caminar acompañado y a servir con alegría. Amén.",
    action:
      "Contacta a un creyente o a tu iglesia y propón reunirse para orar o leer la Biblia juntos.",
  },
];

/** Número total de días del plan. */
export const DISCIPLESHIP_TOTAL_DAYS = DISCIPLESHIP_PLAN.length;

/** Obtiene el día del plan por su número, o `undefined` si no existe. */
export function getDiscipleshipDay(day: number): DiscipleshipDay | undefined {
  return DISCIPLESHIP_PLAN.find((item) => item.day === day);
}
