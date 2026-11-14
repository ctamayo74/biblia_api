import type { EvangelismStep, JourneyClosing } from "@/types/evangelism";

/**
 * Ruta de evangelismo: seis pasos sencillos que presentan el evangelio.
 *
 * Los `passageId` usan el formato de API.Bible. Los pasajes con rango deben
 * repetir el libro y el capítulo (ej. "EPH.2.8-EPH.2.9"), ya que la forma
 * abreviada ("EPH.2.8-9") es rechazada por la API.
 */
export const EVANGELISM_STEPS: EvangelismStep[] = [
  {
    id: "amor-de-dios",
    title: "Dios te ama",
    passageId: "JHN.3.16",
    reference: "Juan 3:16",
    message:
      "Antes de cualquier otra cosa, quiero que sepas esto: Dios te ama profundamente. No es una idea lejana, es el punto de partida de toda la historia.",
  },
  {
    id: "todos-pecamos",
    title: "Todos hemos pecado",
    passageId: "ROM.3.23",
    reference: "Romanos 3:23",
    message:
      "A veces creemos que podemos ser buenos por nosotros mismos, pero la Biblia dice que todos nos hemos alejado de Dios. Reconocerlo no es para hundirnos, sino para entender por qué necesitamos ayuda.",
  },
  {
    id: "castigo-del-pecado",
    title: "El castigo del pecado",
    passageId: "ROM.6.23",
    reference: "Romanos 6:23",
    message:
      "El pecado tiene consecuencias reales: nos separa de Dios, la fuente de la vida. Es la parte difícil de la historia, pero es necesaria para entender el regalo que viene después.",
  },
  {
    id: "cristo-murio-por-nosotros",
    title: "Cristo murió por nosotros",
    passageId: "ROM.5.8",
    reference: "Romanos 5:8",
    message:
      "Aquí está la buena noticia: Dios no nos dejó solos. Jesús cargó con nuestras faltas y entregó su vida en nuestro lugar, mostrando su amor incluso cuando no lo merecíamos.",
  },
  {
    id: "salvacion-por-gracia",
    title: "La salvación es por gracia",
    passageId: "EPH.2.8-EPH.2.9",
    reference: "Efesios 2:8-9",
    message:
      "No podemos ganar el perdón con esfuerzos ni buenas obras. La salvación es un regalo que Dios nos da por amor; solo hay que recibirlo con fe.",
  },
  {
    id: "recibir-a-cristo",
    title: "Recibir a Cristo",
    passageId: "ROM.10.9-ROM.10.10",
    reference: "Romanos 10:9-10",
    message:
      "La fe se vuelve concreta cuando confesamos con la boca y creemos en el corazón que Jesús es el Señor. Es una decisión personal y sencilla, que puedes tomar hoy.",
  },
];

/** Cierre del recorrido: oración sugerida y siguientes pasos. */
export const EVANGELISM_CLOSING: JourneyClosing = {
  title: "Puedes orar así",
  intro:
    "Si este recorrido tocó tu corazón, puedes hablar con Dios ahora mismo. No hay fórmula mágica ni palabras perfectas: él escucha a quien lo busca con sinceridad.",
  prayer:
    "Señor Jesús, reconozco que te necesito. Gracias por amarme y por entregar tu vida por mí. Me arrepiento de mis pecados y hoy te recibo como mi Señor y Salvador. Perdóname, transfórmame y guíame cada día. Amén.",
  nextSteps: [
    {
      title: "Dar los primeros pasos",
      description:
        "Lecciones sencillas para crecer en la fe y conocer mejor a Dios.",
      href: "/discipulado",
    },
    {
      title: "Leer la Biblia",
      description: "Empieza por el Evangelio de Juan, capítulo por capítulo.",
      href: "/leer",
    },
    {
      title: "Memorizar su Palabra",
      description: "Guarda versículos en tu corazón para toda la vida.",
      href: "/memorizar",
    },
  ],
};
