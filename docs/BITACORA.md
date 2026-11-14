# Bitácora de Pedidos y Desarrollo - Palabra Diaria

Este documento registra cronológicamente cada solicitud realizada, las acciones ejecutadas por el equipo técnico, los entregables generados y los commits asociados en el repositorio.

---

## Índice de Entregas

| # | Fecha / Sesión | Solicitud | Entregable Principal | Commit Asignado |
| :-: | :--- | :--- | :--- | :--- |
| **1** | 2026-11-14 | Creación de proyecto base Next.js 16 | Proyecto `biblia_api` (Next.js 16.4.6, App Router, TS, Tailwind) | `6a14161` |
| **2** | 2026-11-14 | Definición de producto y arquitectura (Tech Lead) | Documento de concepto y arquitectura MVP | `4d1b3cb` |
| **3** | 2026-11-14 | Inicialización y verificación de Git | Verificación del repositorio y primer commit de docs | `4d1b3cb` |
| **4** | 2026-11-14 | Reglas de agentes, entorno, limpieza y estructura | `AGENTS.md`, `.env.local.example`, estructura de carpetas y build verificado | `f3017a7` |
| **5** | 2026-11-14 | Commit convencional de configuración inicial | Commit formal de setup y reglas del proyecto | `f3017a7` |
| **6** | 2026-11-14 | Registro continuo de pedidos | Bitácora viva en `docs/BITACORA.md` | `24eeb7a` |
| **7** | 2026-11-14 | Capa de acceso a API.Bible y Route Handlers proxy | Tipos en `src/types/bible.ts`, cliente servidor en `src/lib/bible.ts` y 5 Route Handlers | `c12cd87` |
| **8** | 2026-11-14 | Layout global, navegación móvil/escritorio y rutas base | `Header`, `BottomNav`, `Footer`, fuentes serif/sans y 5 rutas | `4eb2735` |
| **9** | 2026-11-14 | Implementación de portada (`/`) con versículo diario | `src/data/verses.ts`, `src/lib/daily.ts`, `VerseCard`, `ShareButton` y PPR | `0af818f` |
| **10** | 2026-11-14 | Módulo de lectura `/leer` con libros, capítulos y visor | `/leer`, `/leer/[bookId]`, `/leer/[bookId]/[chapterId]`, `VersionSelector`, `FontSizeControl` | `5c6d90c` |
| **11** | 2026-11-14 | Política de documentación previa de cada pedido | Bitácora actualizada al inicio de cada solicitud | `ecd84b2` |
| **12** | 2026-11-14 | Módulo de memorización con modos, niveles y racha | `/memorizar`, `MemorizationPractice`, ejercicios por modo, `useMemorizationProgress` | `cef8c11` |
| **13** | 2026-11-14 | Re-especificación de `/memorizar` (lista, dominio 0-3, hook SSR) | `useLocalStorage`, `VerseList`, `PracticeCard`, `StreakBadge`, `AddVerseForm` | *Pendiente de commit* |

---

## Detalle de Solicitudes y Entregables

### Pedido 1: Creación del Proyecto Base
* **Solicitud**: Crear un proyecto nuevo con Next.js 16 y App Router, desarrollado en TypeScript y estilizado con Tailwind CSS, con el nombre `biblia_api`.
* **Acciones ejecutadas**:
  - Inicialización con `create-next-app` versión `16.4.6` (React 19, Tailwind v4 Turbopack).
  - Configuración con soporte de TypeScript estricto y App Router activado por defecto.
* **Archivos clave**: `package.json`, `tsconfig.json`, `src/app/layout.tsx`.
* **Commit**: `6a14161` (*Initial commit from Create Next App*).

---

### Pedido 2: Concepción y Arquitectura del Producto (Rol Tech Lead)
* **Solicitud**: Definir la concepción de la app móvil "Palabra Diaria" para evangelizar, discipular y memorizar usando API.Bible (https://rest.api.bible/v1). Generar el documento `docs/CONCEPTO.md` cubriendo:
  1. Problema y 3 perfiles de usuario.
  2. Alcance del MVP (qué entra y qué no entra para pocas horas).
  3. Mapa de rutas App Router (`/`, `/leer`, `/memorizar`, `/evangelizar`, `/discipulado`, `/buscar`).
  4. Endpoints de API.Bible a utilizar.
  5. Decisión de arquitectura (Server vs Client Components, API Key protegida con Route Handlers / Proxy).
  6. Riesgos (cuotas, licencias de traducciones, fallos de red) y mitigaciones.
  7. Estrategia de Git con Conventional Commits y commits atómicos.
* **Acciones ejecutadas**:
  - Creación del documento técnico de referencia [`docs/CONCEPTO.md`](docs/CONCEPTO.md).
* **Archivos clave**: `docs/CONCEPTO.md`.

---

### Pedido 3: Inicialización y Puesta a Punto de Git
* **Solicitud**: Inicializar Git en el proyecto.
* **Acciones ejecutadas**:
  - Verificación del estado del repositorio Git creado por Next.js.
  - Validación de la configuración de usuario (`Carlos Tamayo <c.tamayo1974@gmail.com>`).
  - Registro del primer commit convencional con la documentación del concepto.
* **Commit**: `4d1b3cb` (`docs: definir concepto de producto y arquitectura mvp`).

---

### Pedido 4: Reglas del Proyecto, Variables de Entorno, Limpieza y Estructura
* **Solicitud**:
  1. Crear `AGENTS.md` con reglas del proyecto (Next.js 16 con `await params`/`await searchParams`, TypeScript estricto sin `any`, Server Components por defecto, API key segura solo en backend, Tailwind mobile-first, interfaz en español, componentes de responsabilidad única).
  2. Crear `.env.local.example` con `BIBLE_API_KEY=`, `BIBLE_API_BASE_URL=https://rest.api.bible/v1` y `BIBLE_DEFAULT_ID=`, verificando que `.env.local` esté en `.gitignore`.
  3. Limpiar la página de inicio por defecto de `create-next-app`.
  4. Crear la estructura de carpetas: `src/lib`, `src/components`, `src/app/api`, `src/types`, `src/data`.
  5. Ejecutar `npm run build` para validar que compila sin errores.
* **Acciones ejecutadas**:
  - Creación de [`AGENTS.md`](../AGENTS.md) con todas las directrices técnicas obligatorias.
  - Creación de [`.env.local.example`](../.env.local.example) y ajuste de `.gitignore` para permitir rastrear ejemplos sin filtrar credenciales reales.
  - Rediseño limpio de [`src/app/page.tsx`](../src/app/page.tsx) y [`src/app/layout.tsx`](../src/app/layout.tsx) adaptados al concepto móvil en español.
  - Creación de las 5 carpetas modulares con archivos `.gitkeep`.
  - Validación de compilación exitosa con Turbopack (`0 errores`).
* **Archivos clave**: `AGENTS.md`, `.env.local.example`, `.gitignore`, `src/app/page.tsx`, `src/app/layout.tsx`, directorios en `src/`.

---

### Pedido 5: Registro del Commit de Configuración
* **Solicitud**: Registrar commit con el mensaje: `chore: inicializa Next.js 16 con Tailwind, reglas del proyecto y variables de entorno de ejemplo`.
* **Acciones ejecutadas**:
  - Staging de los 10 archivos generados y modificados.
  - Creación del commit formal en la rama `main`.
* **Commit**: `f3017a7` (`chore: inicializa Next.js 16 con Tailwind, reglas del proyecto y variables de entorno de ejemplo`).

---

### Pedido 6: Documentación Continua de Pedidos
* **Solicitud**: Documentar de forma acumulativa y progresiva cada pedido realizado en el proyecto.
* **Acciones ejecutadas**:
  - Creación de esta bitácora centralizada en [`docs/BITACORA.md`](docs/BITACORA.md).
  - Compromiso de actualización automática tras cada nuevo requerimiento del usuario.
* **Commit**: `24eeb7a` (`docs: agregar bitacora de pedidos y desarrollo`).

---

### Pedido 7: Capa de Acceso a API.Bible y Route Handlers Proxy
* **Solicitud**:
  1. `src/types/bible.ts`: Tipos TypeScript sin `any` para Bible, Book, Chapter, Verse, Passage y SearchResult.
  2. `src/lib/bible.ts`: Cliente exclusivo de servidor (`server-only`) con funciones tipadas `getBibles`, `getBooks`, `getChapter`, `getPassage`, `getVerse` y `searchBible`. Manejo de headers `api-key`, variables de entorno y parámetros de limpieza de texto (`content-type=text`, `include-verse-numbers=false`).
  3. Route Handlers en App Router como proxy interno (`GET /api/bibles`, `GET /api/books`, `GET /api/passage`, `GET /api/verse`, `GET /api/search`, y `/api/chapter`) validando parámetros y retornando formato uniforme `{ data }` o `{ error }` con códigos 400, 502 y 500.
  4. Mantener la UI intacta y documentar instrucciones de prueba con `curl`.
* **Acciones ejecutadas**:
  - Instalación del paquete `server-only`.
  - Creación de [`src/types/bible.ts`](../src/types/bible.ts) con tipado completo y sin `any`.
  - Creación de [`src/lib/bible.ts`](../src/lib/bible.ts) con `import "server-only"`, validaciones de variables de entorno y cacheo HTTP.
  - Creación de los Route Handlers proxy en `src/app/api/{bibles,books,passage,verse,search,chapter}/route.ts`.
  - Verificación exitosa de compilación con `npm run build` (Turbopack y comprobación de tipos OK).
* **Archivos clave**: `src/types/bible.ts`, `src/lib/bible.ts`, `src/app/api/**/route.ts`, `package.json`.
* **Corrección técnica (Fix)**:
  - Detección de error 404 por tipografía en `.env.local` (`/v.1` con punto en lugar de `/v1`).
  - Remoción de espacio en blanco inicial en la clave `BIBLE_API_KEY`.
  - Robustecimiento en [`src/lib/bible.ts`](../src/lib/bible.ts) con sanitización automática (`trim()` y normalización de URL).
  - Verificación exitosa de conexión directa con API.Bible y respuesta de la versión NTV (`826f63861180e056-01`).
* **Commit**: `c12cd87` (`feat(api): agrega servicio de API.Bible y route handlers proxy`).

---

### Pedido 8: Layout Global, Navegación Móvil/Escritorio y Rutas Base
* **Solicitud**:
  1. `src/app/layout.tsx`: Metadata en español, `lang="es"`, fuente serif para texto bíblico (`Lora`) y sans para la interfaz (`Geist`) usando `next/font`.
  2. Componentes:
     - Header con logo "Palabra Diaria" y navegación de escritorio (Inicio, Leer, Memorizar, Evangelizar, Discipulado).
     - `BottomNav` fija para móvil con iconos de `lucide-react` y etiquetas.
     - `Footer` con atribución: *"Texto bíblico obtenido de API.Bible"*.
  3. Paleta sobria y cálida (`stone` y `amber`), soporte para modo claro/oscuro con clases `dark:`, contraste accesible y áreas táctiles de mínimo 44px.
  4. Rutas vacías con título y texto temporal: `/`, `/leer`, `/memorizar`, `/evangelizar`, `/discipulado`.
  5. Diseño responsivo para 375px y escritorio. Respetar `AGENTS.md` y verificar compilación con `npm run build`.
* **Acciones ejecutadas**:
  - Instalación de dependencia `lucide-react`.
  - Configuración tipográfica con `Geist` (sans) y `Lora` (serif) en [`src/app/layout.tsx`](../src/app/layout.tsx) y [`src/app/globals.css`](../src/app/globals.css).
  - Creación de [`src/components/Header.tsx`](../src/components/Header.tsx) con logo y barra de navegación de escritorio con indicador de ruta activa.
  - Creación de [`src/components/BottomNav.tsx`](../src/components/BottomNav.tsx) fijo en móvil (`md:hidden`), con navegación táctil (mínimo 44px) e iconos (`Home`, `BookOpen`, `Brain`, `Share2`, `Sprout`).
  - Creación de [`src/components/Footer.tsx`](../src/components/Footer.tsx) con atribución a API.Bible y padding inferior adaptado a la barra móvil.
  - Creación/actualización de las 5 páginas: [`src/app/page.tsx`](../src/app/page.tsx), [`src/app/leer/page.tsx`](../src/app/leer/page.tsx), [`src/app/memorizar/page.tsx`](../src/app/memorizar/page.tsx), [`src/app/evangelizar/page.tsx`](../src/app/evangelizar/page.tsx) y [`src/app/discipulado/page.tsx`](../src/app/discipulado/page.tsx).
  - Verificación exitosa de compilación con Turbopack (`14/14` páginas generadas sin errores).
* **Archivos clave**: `src/app/layout.tsx`, `src/app/globals.css`, `src/components/{Header,BottomNav,Footer}.tsx`, `src/app/{page,leer,memorizar,evangelizar,discipulado}/page.tsx`.
* **Commit**: `4eb2735` (`feat(ui): agrega layout responsive, navegación y rutas base`).

---

### Pedido 9: Portada Principal con Versículo Diario y Módulos de Acceso Rápido
* **Solicitud**:
  1. `src/data/verses.ts`: Lista curada de 60 referencias bíblicas en formato API.Bible con categorías (`evangelio`, `crecimiento`, `memorizar`).
  2. `src/lib/daily.ts`: Algoritmo determinista para seleccionar el versículo diario según el día del año (mismo versículo para todos los usuarios).
  3. `src/app/page.tsx` (Server Component): Consultar versículo con `getVerse()` de `src/lib/bible.ts` y presentarlo en `VerseCard` con texto legible, referencia, botón "Compartir" y enlace "Memorizar este versículo" (`/memorizar?ref=...`).
  4. Tres tarjetas de acceso rápido debajo: Evangelizar, Discipulado y Memorizar.
  5. Separación limpia: `VerseCard` como Server Component y `ShareButton` como Client Component (`navigator.share` con fallback a portapapeles).
* **Acciones ejecutadas**:
  - Creación de [`src/data/verses.ts`](../src/data/verses.ts) con 60 versículos curados clasificados y tipados estrictamente.
  - Creación de [`src/lib/daily.ts`](../src/lib/daily.ts) con función matemática determinista basada en el día ordinal del año en UTC.
  - Creación de [`src/components/ShareButton.tsx`](../src/components/ShareButton.tsx) (Client Component) con soporte para Web Share API, fallback a `navigator.clipboard` y feedback táctil accesible.
  - Creación de [`src/components/VerseCard.tsx`](../src/components/VerseCard.tsx) (Server Component) con tipografía editorial `Lora`, badges temáticos y enlaces accesibles.
  - Actualización de [`src/app/page.tsx`](../src/app/page.tsx) con arquitectura de **Partial Prerendering (PPR)** de Next.js 16 (`<Suspense fallback={<VerseCardSkeleton />}>`), garantizando renderizado instantáneo del cascarón estático y streaming del versículo dinámico.
  - Verificación exitosa de compilación (`Route (app): ◐ / (Partial Prerender)`).
* **Archivos clave**: `src/data/verses.ts`, `src/lib/daily.ts`, `src/components/ShareButton.tsx`, `src/components/VerseCard.tsx`, `src/app/page.tsx`.
* **Commit**: `0af818f` (`feat(home): muestra versículo del día con Server Component y botón compartir`).

---

### Pedido 10: Módulo de Lectura (`/leer`) con Navegación de Libros y Capítulos
* **Solicitud**:
  1. `/leer` (Server Component): Lista de libros agrupados en Antiguo y Nuevo Testamento en una cuadrícula responsive.
  2. `/leer/[bookId]` (Server Component con `await params`): Lista de capítulos del libro seleccionado.
  3. `/leer/[bookId]/[chapterId]` (Server Component con `await params`): Visor del capítulo con `getChapter`, botones "Anterior" y "Siguiente" y breadcrumb.
  4. Client Component `VersionSelector`: Selector de traducción conectado a `/api/bibles`, persistido en `localStorage` y propagado en la URL vía `searchParams`.
  5. Client Component `FontSizeControl`: Ajuste de tamaño de fuente (`A-` / `A+`) persistido en `localStorage`, ancho óptimo de lectura de 65 caracteres (`max-w-[65ch]`) e interlineado amplio.
* **Acciones ejecutadas**:
  - Implementación de [`src/lib/canon.ts`](../src/lib/canon.ts) para agrupar canónicamente los 66 libros en Antiguo y Nuevo Testamento.
  - Creación de funciones `getBook` y `getBookChapters` en [`src/lib/bible.ts`](../src/lib/bible.ts).
  - Creación de [`src/components/VersionSelector.tsx`](../src/components/VersionSelector.tsx) (Client Component) con llamadas a `/api/bibles`, sincronización con `localStorage` y actualización reactiva de URL con `useTransition`.
  - Creación de [`src/components/FontSizeControl.tsx`](../src/components/FontSizeControl.tsx) y [`src/components/ChapterReader.tsx`](../src/components/ChapterReader.tsx) (Client Component) con lectura cómoda editorial, párrafos justificados, ancho `65ch` y navegación entre capítulos.
  - Creación de rutas dinámicas:
    - [`src/app/leer/page.tsx`](../src/app/leer/page.tsx): Portada del lector con cuadrícula de libros agrupada.
    - [`src/app/leer/[bookId]/page.tsx`](../src/app/leer/[bookId]/page.tsx): Selector de capítulos con migas de pan.
    - [`src/app/leer/[bookId]/[chapterId]/page.tsx`](../src/app/leer/[bookId]/[chapterId]/page.tsx): Lector de capítulo completo con navegación anterior/siguiente.
  - Configuración de suspensión con `Partial Prerendering (PPR)` en Next.js 16 para streaming de contenido dinámico.
  - Verificación exitosa de compilación (`16/16` rutas válidas).
* **Archivos clave**: `src/lib/canon.ts`, `src/components/VersionSelector.tsx`, `src/components/FontSizeControl.tsx`, `src/components/ChapterReader.tsx`, `src/app/leer/**/page.tsx`.
* **Commit**: `5c6d90c` (`feat(leer): agrega lector por libro y capítulo con selector de versión y tamaño de letra`).

---

### Pedido 11: Política de Documentación Previa de Cada Pedido
* **Solicitud**: Documentar en `docs/BITACORA.md` cada petición del usuario **antes** de comenzar a resolverla, manteniendo el registro cronológico siempre al día.
* **Acciones ejecutadas**:
  - Actualización del índice de entregas con el commit real del Pedido 10 (`5c6d90c`).
  - Alta de esta política como procedimiento permanente del proyecto: cada nueva solicitud se registra primero (índice + detalle) y luego se ejecuta.
  - Registro del estado *Pendiente de commit* hasta cerrar cada pedido con su commit convencional.
* **Archivos clave**: `docs/BITACORA.md`.

---

### Pedido 12: Módulo de Memorización con Modos, Niveles y Racha
* **Solicitud**: Implementar el módulo `/memorizar` con práctica interactiva de memorización, incluyendo varios **modos** de ejercicios, **niveles** de dificultad y una **racha** de constancia persistida en `localStorage`. Commit final: `feat(memorizar): agrega práctica de memorización con modos, niveles y racha en localStorage`.
* **Alcance acordado**:
  1. Tres modos: **Completar** (palabras ocultas), **Ordenar** (reconstruir la frase) y **Escribir** (de memoria).
  2. Cuatro niveles de dificultad (Fácil, Intermedio, Difícil, Maestría) que ajustan la ayuda de cada modo.
  3. Racha diaria, mejor racha, sesiones y versículos dominados en `localStorage`.
  4. Selector de versículo desde la lista curada y desde `?ref=` (deep link del inicio).
  5. Server Component que resuelve el versículo y Client Component para la práctica.
* **Acciones ejecutadas**:
  - Tipos en [`src/types/memorization.ts`](../src/types/memorization.ts): `MemorizationMode`, `MemorizationLevelValue`, `MemorizationLevelInfo`, `MemorizationProgress`, `PracticeVerse`.
  - Lógica pura en [`src/lib/memorization.ts`](../src/lib/memorization.ts): catálogos de modos y niveles, tokenización y normalización de texto, aleatoriedad determinista con semilla, ocultamiento de palabras, ordenamiento (`shuffleWords`) y cálculo de racha (`registerPractice`) con validación de datos de `localStorage`.
  - Hooks de cliente: [`useMemorizationProgress.ts`](../src/hooks/useMemorizationProgress.ts) (racha, mejor racha, sesiones y versículos logrados en `biblia_memorizar_progreso`) y [`useMemorizationPreferences.ts`](../src/hooks/useMemorizationPreferences.ts) (modo y nivel en `biblia_memorizar_preferencias`).
  - Componentes en [`src/components/memorizar/`](../src/components/memorizar/):
    - `MemorizationStreak.tsx`: racha, mejor racha y versículos logrados.
    - `MemorizationModeSelector.tsx` y `MemorizationLevelSelector.tsx`: selección accesible de modo y nivel.
    - `VersePicker.tsx`: selector de versículo desde la lista curada (agrupado por categoría).
    - `FillBlanksExercise.tsx` (modo Completar), `OrderWordsExercise.tsx` (modo Ordenar) y `TypeVerseExercise.tsx` (modo Escribir).
    - `MemorizationPractice.tsx`: orquestador con cambio de versículo vía `/api/verse`, celebración y "Siguiente versículo".
  - Página [`src/app/memorizar/page.tsx`](../src/app/memorizar/page.tsx) como Server Component con `await searchParams`, lectura de `?ref=`, fallback al versículo del día ante referencias inválidas y `Suspense` para PPR.
  - Verificación: `npm run build` OK (`◐ /memorizar` Partial Prerender) y prueba real con `next start` (`?ref=PHP.4.13` y ref inválida).
* **Archivos clave**: `src/types/memorization.ts`, `src/lib/memorization.ts`, `src/hooks/useMemorizationProgress.ts`, `src/hooks/useMemorizationPreferences.ts`, `src/components/memorizar/*`, `src/app/memorizar/page.tsx`.
* **Commit**: `cef8c11` (`feat(memorizar): agrega práctica de memorización con modos, niveles y racha en localStorage`).

---

### Pedido 13: Re-especificación de `/memorizar` (Lista, Dominio 0-3 y Hook SSR)
* **Solicitud**: Reimplementar `/memorizar` como herramienta de memorización diaria, principalmente **Client Component** con `useState`/`useEffect`, con estos requisitos:
  1. Estado persistido en `localStorage`: lista de versículos en memorización (referencia, texto, fecha de inicio, **nivel de dominio 0-3** y última práctica) y **racha de días consecutivos**.
  2. Hook propio [`src/hooks/useLocalStorage.ts`](../src/hooks/useLocalStorage.ts) **seguro para SSR** (lee `localStorage` solo dentro de `useEffect`).
  3. Flujo de práctica por versículo con 3 modos: **Leer**, **Completar** (palabras al azar ocultas) y **Recitar** (de memoria, con **porcentaje de acierto** y tolerancia a mayúsculas y signos).
  4. Al acertar sube el nivel de dominio y la racha; racha visible con contador.
  5. Si la URL trae `?ref=JHN.3.16` (botón del home), obtener el texto desde `/api/verse` y agregarlo a la lista.
  6. Campo para agregar versículos por referencia (ej. `ROM.8.28`) con **validación de formato**.
  7. Dividir en componentes pequeños: `VerseList`, `PracticeCard`, `StreakBadge`, `AddVerseForm` (sin concentrar toda la lógica en un archivo).
* **Nota**: Reemplaza la implementación del Pedido 12 (se eliminan los componentes/hooks anteriores del módulo).
* **Acciones ejecutadas**:
  - Hook genérico SSR-safe [`src/hooks/useLocalStorage.ts`](../src/hooks/useLocalStorage.ts): estado inicial = valor por defecto (sin desajuste de hidratación), lectura de `localStorage` dentro de `useEffect`, opción `parse` para sanear datos y `isLoaded`.
  - Modelo en [`src/types/memorization.ts`](../src/types/memorization.ts): `MemorizedVerse` (referencia, texto, fecha de inicio, dominio 0-3, última práctica) y `MemorizationStore` (versículos, racha, última fecha).
  - Lógica pura en [`src/lib/memorization.ts`](../src/lib/memorization.ts): validación/normalización de referencias (`LIBRO.CAPÍTULO.VERSÍCULO`), tokenización, ocultamiento determinista de palabras, `computeAccuracy` por subsecuencia común más larga (tolera mayúsculas y signos), `recordPractice` (racha + dominio) y `parseStore` con saneamiento.
  - Componentes en [`src/components/memorizar/`](../src/components/memorizar/): `StreakBadge`, `AddVerseForm`, `VerseList`, `PracticeCard` y los modos `ReadingMode`, `FillBlankMode` y `ReciteMode` (con medidor de acierto).
  - Orquestador cliente [`MemorizationTool.tsx`](../src/components/memorizar/MemorizationTool.tsx): `useLocalStorage`, lectura de `?ref=` con `useSearchParams`, alta vía `/api/verse`, selección y eliminación de versículos.
  - Página [`src/app/memorizar/page.tsx`](../src/app/memorizar/page.tsx): Server Component delgado con `metadata` y `Suspense` que monta el Client Component.
  - Eliminación de los archivos del Pedido 12 (`MemorizationPractice`, `MemorizationStreak`, selectores, `VersePicker`, ejercicios y hooks de progreso/preferencias).
  - **Corrección (Fix)**: el patrón de referencia no aceptaba libros numerados de dos letras (`1CO.10.13`, `2TI.3.16`, `1JN.4.19`); se ajustó a `^(?:[1-3][A-Z]{2}|[A-Z]{3})\.\d{1,3}\.\d{1,3}$`.
  - Verificación: pruebas de lógica pura en Node (31/31 OK: validación, acierto, ocultamiento, racha y dominio), `npm run build` OK (`○ /memorizar` estático) y smoke test con `next start` (`/memorizar`, `?ref=JHN.3.16` y `/api/verse`).
* **Archivos clave**: `src/hooks/useLocalStorage.ts`, `src/types/memorization.ts`, `src/lib/memorization.ts`, `src/components/memorizar/*`, `src/app/memorizar/page.tsx`.
