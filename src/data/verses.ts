export type VerseCategory = "evangelio" | "crecimiento" | "memorizar";

export interface CuratedVerse {
  id: string;
  referenceName: string;
  category: VerseCategory;
  theme: string;
}

export const CURATED_VERSES: CuratedVerse[] = [
  // ==========================================
  // Categoría: Evangelio (20 versículos)
  // ==========================================
  {
    id: "JHN.3.16",
    referenceName: "Juan 3:16",
    category: "evangelio",
    theme: "El amor incondicional de Dios",
  },
  {
    id: "ROM.3.23",
    referenceName: "Romanos 3:23",
    category: "evangelio",
    theme: "La necesidad universal de salvación",
  },
  {
    id: "ROM.6.23",
    referenceName: "Romanos 6:23",
    category: "evangelio",
    theme: "La dádiva de vida eterna",
  },
  {
    id: "ROM.5.8",
    referenceName: "Romanos 5:8",
    category: "evangelio",
    theme: "Cristo murió por nosotros",
  },
  {
    id: "ROM.10.9",
    referenceName: "Romanos 10:9",
    category: "evangelio",
    theme: "Confesión y salvación por la fe",
  },
  {
    id: "EPH.2.8",
    referenceName: "Efesios 2:8",
    category: "evangelio",
    theme: "Salvos por gracia mediante la fe",
  },
  {
    id: "JHN.1.12",
    referenceName: "Juan 1:12",
    category: "evangelio",
    theme: "Hijos de Dios por la fe",
  },
  {
    id: "JHN.14.6",
    referenceName: "Juan 14:6",
    category: "evangelio",
    theme: "Jesús es el camino, la verdad y la vida",
  },
  {
    id: "ACT.4.12",
    referenceName: "Hechos 4:12",
    category: "evangelio",
    theme: "Salvación en ningún otro nombre",
  },
  {
    id: "2CO.5.17",
    referenceName: "2 Corintios 5:17",
    category: "evangelio",
    theme: "Nueva criatura en Cristo",
  },
  {
    id: "1PE.3.18",
    referenceName: "1 Pedro 3:18",
    category: "evangelio",
    theme: "Cristo murió una sola vez para llevarnos a Dios",
  },
  {
    id: "1JN.1.9",
    referenceName: "1 Juan 1:9",
    category: "evangelio",
    theme: "Fidelidad de Dios para perdonar",
  },
  {
    id: "ISA.53.5",
    referenceName: "Isaías 53:5",
    category: "evangelio",
    theme: "Por sus llagas fuimos sanados",
  },
  {
    id: "MAT.11.28",
    referenceName: "Mateo 11:28",
    category: "evangelio",
    theme: "Descanso para los trabajados y cargados",
  },
  {
    id: "REV.3.20",
    referenceName: "Apocalipsis 3:20",
    category: "evangelio",
    theme: "La invitación personal de Jesús",
  },
  {
    id: "JHN.10.10",
    referenceName: "Juan 10:10",
    category: "evangelio",
    theme: "Vida abundante en Cristo",
  },
  {
    id: "ROM.8.1",
    referenceName: "Romanos 8:1",
    category: "evangelio",
    theme: "Ninguna condenación para los que están en Cristo",
  },
  {
    id: "TIT.3.5",
    referenceName: "Tito 3:5",
    category: "evangelio",
    theme: "Salvados por su misericordia, no por obras",
  },
  {
    id: "HEB.7.25",
    referenceName: "Hebreos 7:25",
    category: "evangelio",
    theme: "Salvación perpetua e intercesión",
  },
  {
    id: "1TI.1.15",
    referenceName: "1 Timoteo 1:15",
    category: "evangelio",
    theme: "Jesús vino al mundo para salvar pecadores",
  },

  // ==========================================
  // Categoría: Crecimiento (Discipulado) (20 versículos)
  // ==========================================
  {
    id: "ROM.8.28",
    referenceName: "Romanos 8:28",
    category: "crecimiento",
    theme: "Todas las cosas obran para bien",
  },
  {
    id: "PRO.3.5",
    referenceName: "Proverbios 3:5",
    category: "crecimiento",
    theme: "Confianza plena en el Señor",
  },
  {
    id: "PRO.3.6",
    referenceName: "Proverbios 3:6",
    category: "crecimiento",
    theme: "Reconocer a Dios en cada decisión",
  },
  {
    id: "JOS.1.9",
    referenceName: "Josué 1:9",
    category: "crecimiento",
    theme: "Esfuerzo, valentía y presencia de Dios",
  },
  {
    id: "ISA.41.10",
    referenceName: "Isaías 41:10",
    category: "crecimiento",
    theme: "No temas, porque Yo estoy contigo",
  },
  {
    id: "JER.29.11",
    referenceName: "Jeremías 29:11",
    category: "crecimiento",
    theme: "Planes de paz y esperanza para tu futuro",
  },
  {
    id: "MAT.6.33",
    referenceName: "Mateo 6:33",
    category: "crecimiento",
    theme: "Buscar primero el reino de Dios",
  },
  {
    id: "2TI.3.16",
    referenceName: "2 Timoteo 3:16",
    category: "crecimiento",
    theme: "La utilidad e inspiración de la Escritura",
  },
  {
    id: "GAL.5.22",
    referenceName: "Gálatas 5:22",
    category: "crecimiento",
    theme: "El fruto del Espíritu Santo",
  },
  {
    id: "JAM.1.5",
    referenceName: "Santiago 1:5",
    category: "crecimiento",
    theme: "Sabiduría dada por Dios a quien la pide",
  },
  {
    id: "ROM.12.2",
    referenceName: "Romanos 12:2",
    category: "crecimiento",
    theme: "Renovación mental y voluntad de Dios",
  },
  {
    id: "1CO.10.13",
    referenceName: "1 Corintios 10:13",
    category: "crecimiento",
    theme: "Fidelidad de Dios ante la prueba",
  },
  {
    id: "COL.3.23",
    referenceName: "Colosenses 3:23",
    category: "crecimiento",
    theme: "Hacer todo como para el Señor",
  },
  {
    id: "MIC.6.8",
    referenceName: "Miqueas 6:8",
    category: "crecimiento",
    theme: "Justicia, misericordia y humildad",
  },
  {
    id: "1TH.5.16",
    referenceName: "1 Tesalonicenses 5:16",
    category: "crecimiento",
    theme: "Alegría constante en Dios",
  },
  {
    id: "1TH.5.17",
    referenceName: "1 Tesalonicenses 5:17",
    category: "crecimiento",
    theme: "Perseverancia continua en la oración",
  },
  {
    id: "1TH.5.18",
    referenceName: "1 Tesalonicenses 5:18",
    category: "crecimiento",
    theme: "Agradecimiento en toda circunstancia",
  },
  {
    id: "LAM.3.22",
    referenceName: "Lamentaciones 3:22",
    category: "crecimiento",
    theme: "Las misericordias del Señor nunca cesan",
  },
  {
    id: "LAM.3.23",
    referenceName: "Lamentaciones 3:23",
    category: "crecimiento",
    theme: "Nuevas misericordias cada mañana",
  },
  {
    id: "HEB.12.2",
    referenceName: "Hebreos 12:2",
    category: "crecimiento",
    theme: "Puestos los ojos en Jesús",
  },

  // ==========================================
  // Categoría: Memorizar (20 versículos)
  // ==========================================
  {
    id: "PSA.23.1",
    referenceName: "Salmos 23:1",
    category: "memorizar",
    theme: "El Señor es mi pastor, nada me faltará",
  },
  {
    id: "PHP.4.13",
    referenceName: "Filipenses 4:13",
    category: "memorizar",
    theme: "Fortaleza en Cristo para toda circunstancia",
  },
  {
    id: "PHP.4.6",
    referenceName: "Filipenses 4:6",
    category: "memorizar",
    theme: "Vencer la ansiedad por medio de la oración",
  },
  {
    id: "PHP.4.7",
    referenceName: "Filipenses 4:7",
    category: "memorizar",
    theme: "La paz de Dios que sobrepasa entendimiento",
  },
  {
    id: "PSA.119.105",
    referenceName: "Salmos 119:105",
    category: "memorizar",
    theme: "Lámpara a los pies y lumbrera al camino",
  },
  {
    id: "PSA.119.11",
    referenceName: "Salmos 119:11",
    category: "memorizar",
    theme: "Guardar la palabra en el corazón",
  },
  {
    id: "PSA.46.1",
    referenceName: "Salmos 46:1",
    category: "memorizar",
    theme: "Refugio y fortaleza en tiempos de angustia",
  },
  {
    id: "PSA.91.1",
    referenceName: "Salmos 91:1",
    category: "memorizar",
    theme: "El abrigo del Altísimo",
  },
  {
    id: "PSA.91.2",
    referenceName: "Salmos 91:2",
    category: "memorizar",
    theme: "El Señor, mi refugio y castillo",
  },
  {
    id: "PSA.103.1",
    referenceName: "Salmos 103:1",
    category: "memorizar",
    theme: "Bendice, alma mía, al Señor",
  },
  {
    id: "PSA.103.2",
    referenceName: "Salmos 103:2",
    category: "memorizar",
    theme: "No olvidar ninguno de sus beneficios",
  },
  {
    id: "PSA.27.1",
    referenceName: "Salmos 27:1",
    category: "memorizar",
    theme: "Luz, salvación y fortaleza",
  },
  {
    id: "PSA.34.8",
    referenceName: "Salmos 34:8",
    category: "memorizar",
    theme: "Probar y ver la bondad de Dios",
  },
  {
    id: "PSA.37.4",
    referenceName: "Salmos 37:4",
    category: "memorizar",
    theme: "Deleite en el Señor y deseos del corazón",
  },
  {
    id: "PSA.37.5",
    referenceName: "Salmos 37:5",
    category: "memorizar",
    theme: "Encomendar el camino al Señor",
  },
  {
    id: "ISA.40.31",
    referenceName: "Isaías 40:31",
    category: "memorizar",
    theme: "Nuevas fuerzas para los que esperan en Dios",
  },
  {
    id: "ISA.26.3",
    referenceName: "Isaías 26:3",
    category: "memorizar",
    theme: "Paz perfecta para quien confía",
  },
  {
    id: "2TI.1.7",
    referenceName: "2 Timoteo 1:7",
    category: "memorizar",
    theme: "Espíritu de poder, amor y dominio propio",
  },
  {
    id: "HEB.11.1",
    referenceName: "Hebreos 11:1",
    category: "memorizar",
    theme: "La naturaleza de la fe",
  },
  {
    id: "1JN.4.19",
    referenceName: "1 Juan 4:19",
    category: "memorizar",
    theme: "Le amamos porque Él nos amó primero",
  },
];
