# Proceso de Vibe Coding: Palabra Diaria

> Registro del ciclo completo de desarrollo asistido por IA: concepción, prompts, iteraciones, decisiones técnicas, desafíos y su resolución.
> El detalle cronológico de cada pedido, con archivos y commits, está en [`docs/BITACORA.md`](BITACORA.md).

## 1. Resumen del proyecto

**Palabra Diaria** es una app web en español para **evangelizar, discipular y memorizar versículos a diario**, que consume [API.Bible](https://docs.api.bible).

| Aspecto | Detalle |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Partial Prerendering) |
| Lenguaje | TypeScript estricto, sin `any` |
| Estilos | Tailwind CSS v4, mobile-first, modo claro/oscuro |
| API externa | API.Bible (`https://rest.api.bible/v1`) a través de Route Handlers propios |
| Estado en el cliente | `useState`, `useEffect` y un hook propio `useLocalStorage` (SSR-safe) |
| Control de versiones | Git + Conventional Commits, un commit por funcionalidad |
| Despliegue | Vercel |

**Rutas:** `/` (versículo del día), `/leer`, `/memorizar`, `/evangelizar`, `/discipulado`, `/buscar`.

## 2. Herramientas de IA utilizadas

| Etapa | Herramienta | Modelo | Nota |
|---|---|---|---|
| Pedido 1 en adelante | **Antigravity** (CLI) | Gemini 3.8 Flash (High) | Creación del proyecto y primeras fases |
| Resto del desarrollo | **OpenCode** | _(completar: modelo usado)_ | Se agotó la cuota de Antigravity y se continuó con OpenCode usando los mismos prompts |

**Cambio de herramienta a mitad del proyecto.** Como los prompts estaban escritos por fases, autocontenidos y con las reglas del proyecto en `AGENTS.md`, el cambio de herramienta no rompió el flujo: el nuevo agente leyó `AGENTS.md` y `docs/BITACORA.md` y retomó el trabajo con el mismo contexto. _(Completar: en qué pedido ocurrió el cambio.)_

## 3. Metodología de trabajo

1. **Un prompt por fase.** Cada prompt tiene objetivo, restricciones y criterio de verificación.
2. **Reglas persistentes** en `AGENTS.md` (Next.js 16 con `await params`, TypeScript estricto, Server Components por defecto, API key solo en el servidor, Tailwind mobile-first, UI en español).
3. **Bitácora viva** (`docs/BITACORA.md`): desde el Pedido 11 cada solicitud se documenta **antes** de ejecutarla. Esto permitió retomar el trabajo con otra herramienta sin perder contexto.
4. **Validación después de cada fase:** `npm run build`, `npm run lint`, pruebas con `curl` o `next start` y, cuando hizo falta, pruebas en navegador headless.
5. **Un commit convencional por funcionalidad**, con mensaje descriptivo.

## 4. Prompts principales utilizados

Los prompts se aplicaron en este orden. Entre paréntesis aparece el pedido de la bitácora y el commit resultante.

### Fase 0: Concepción del proyecto (Pedido 2 · `4d1b3cb`)

```text
Actúa como un tech lead que acompaña a un desarrollador junior. Necesito concebir una app web llamada "Palabra Diaria" que consume API.Bible (https://rest.api.bible/v1) para tres propósitos: evangelizar, discipular y memorizar versículos a diario. Público: hispanohablantes, uso principal en móvil.

Genera un documento docs/CONCEPTO.md con:
1. Problema y usuarios objetivo (3 perfiles).
2. Alcance del MVP (qué entra y qué NO entra) pensado para ejecutarse en pocas horas.
3. Mapa de rutas con App Router (mínimo 5): /, /leer, /memorizar, /evangelizar, /discipulado, más /buscar si cabe.
4. Qué endpoints de API.Bible se usan: /bibles, /bibles/{bibleId}/books, /bibles/{bibleId}/chapters/{chapterId}, /bibles/{bibleId}/passages/{passageId}, /bibles/{bibleId}/verses/{verseId}, /bibles/{bibleId}/search.
5. Decisión de arquitectura: qué es Server Component y qué es Client Component, y por qué la API key vive solo en el servidor (Route Handlers como proxy).
6. Riesgos (límites de la API, licencias de versiones bíblicas, errores de red) y cómo se mitigan.
7. Estrategia de Git: commits convencionales (feat, fix, refactor, docs, chore) y un commit por funcionalidad.

No escribas código todavía. Sé concreto y breve.
```

### Pedido 1: Creación del proyecto base (`6a14161`)

Prompt inicial escrito directamente en Antigravity:

```text
crea un proyecto nuevo con Next.js 16 y App Router, el proyecto debe desarrollarse utilizando Typescript, y para los estilos utilizaremos Tailwind CSS. nombra el proyecto biblia_api
```

### Fase 1: Reglas del proyecto, entorno y estructura (Pedidos 4 y 5 · `f3017a7`)

```text
Revisa el proyecto Next.js recién creado (Next.js 16, App Router, TypeScript, Tailwind) y haz lo siguiente:

1. Crea un archivo AGENTS.md con las reglas del proyecto que debes seguir en todas las tareas siguientes:
   - Next.js 16 con App Router. Recuerda que en esta versión `params` y `searchParams` son asíncronos (se usa `await params`).
   - TypeScript estricto, sin `any`.
   - Server Components por defecto; "use client" solo cuando se necesite estado, efectos o eventos del navegador.
   - La API key de API.Bible NUNCA se usa en componentes cliente ni se expone con NEXT_PUBLIC_.
   - Tailwind para estilos, diseño mobile-first.
   - Textos de interfaz en español.
   - Cada componente con una sola responsabilidad y nombres descriptivos.
2. Crea .env.local.example con BIBLE_API_KEY=, BIBLE_API_BASE_URL=https://rest.api.bible/v1 y BIBLE_DEFAULT_ID= (sin valores reales). Verifica que .env.local esté en .gitignore.
3. Limpia la página de inicio por defecto de create-next-app.
4. Crea la estructura de carpetas: src/lib, src/components, src/app/api, src/types, src/data.
5. Ejecuta el build para confirmar que compila sin errores.

Muéstrame los archivos creados antes de continuar.
```

### Fase 2: Capa de servicio y Route Handlers (Pedido 7 · `c12cd87`)

```text
Crea la capa de acceso a API.Bible con estas especificaciones:

1. src/types/bible.ts: tipos TypeScript para Bible, Book, Chapter, Verse, Passage y SearchResult, según las respuestas de API.Bible (todas envuelven el resultado en `data`).

2. src/lib/bible.ts (solo servidor, con `import "server-only"`): funciones tipadas
   - getBibles(language = "spa")
   - getBooks(bibleId)
   - getChapter(bibleId, chapterId)
   - getPassage(bibleId, passageId)
   - getVerse(bibleId, verseId)
   - searchBible(bibleId, query)
   Todas leen BIBLE_API_KEY y BIBLE_API_BASE_URL de process.env, envían el header `api-key`, lanzan un Error con mensaje claro si la respuesta no es ok, y usan content-type=text y include-verse-numbers=false cuando aplique para obtener texto limpio.

3. Route Handlers (App Router) que actúan como proxy interno:
   - GET /api/bibles
   - GET /api/books?bibleId=
   - GET /api/passage?bibleId=&passageId=
   - GET /api/verse?bibleId=&verseId=
   - GET /api/search?bibleId=&q=
   Valida parámetros, devuelve JSON consistente { data } o { error } con códigos HTTP correctos (400, 502, 500).

4. No toques la UI todavía. Explícame cómo probar cada endpoint con curl contra `npm run dev`.
```

### Fase 3: Layout, navegación y diseño base responsive (Pedido 8 · `4eb2735`)

```text
Crea el layout global de la app:

1. src/app/layout.tsx: metadata en español (title, description), lang="es", fuente legible para lectura (usa next/font con una fuente serif para el texto bíblico y una sans para la interfaz).
2. Componentes:
   - Header con el logo "Palabra Diaria" y navegación de escritorio (Inicio, Leer, Memorizar, Evangelizar, Discipulado).
   - BottomNav fija para móvil con iconos y etiquetas (usa lucide-react).
   - Footer con atribución: "Texto bíblico obtenido de API.Bible".
3. Paleta sobria y cálida, con modo claro y oscuro mediante clases de Tailwind (dark:). Contraste accesible, botones táctiles de al menos 44px.
4. Crea las rutas vacías con un título y texto temporal: /, /leer, /memorizar, /evangelizar, /discipulado.
5. Debe verse bien en 375px de ancho y en escritorio.

Respeta AGENTS.md. Al terminar, ejecuta el build.
```

### Fase 4: Home con el Versículo del Día (Pedido 9 · `0af818f`)

```text
Implementa la página de inicio (/):

1. Crea src/data/verses.ts con una lista curada de 60 referencias en formato de API.Bible (ej. "JHN.3.16", "ROM.8.28", "PSA.23.1", "PHP.4.13"...), cada una con una categoría: "evangelio", "crecimiento" o "memorizar".
2. Crea src/lib/daily.ts con una función que elige el versículo del día de forma determinista según el día del año (el mismo para todos los usuarios ese día).
3. En src/app/page.tsx (Server Component) obtén el versículo con getVerse() de src/lib/bible.ts y muéstralo en un componente VerseCard: texto grande y legible, referencia, botones "Compartir" y "Memorizar este versículo" (este último enlaza a /memorizar?ref=...).
4. Debajo, tres tarjetas de acceso rápido: Evangelizar, Discipulado, Memorizar.
5. Maneja el caso de que la API falle sin romper la página (el error lo atenderá error.tsx más adelante, por ahora lanza el error).

Mantén VerseCard como componente de servidor; el botón Compartir debe ser un Client Component pequeño y separado (usa navigator.share con fallback a copiar al portapapeles).
```

### Fase 5: Lector bíblico (Pedido 10 · `5c6d90c`)

```text
Implementa la ruta /leer con navegación por libro y capítulo:

1. /leer (Server Component): lista los libros de la Biblia (getBooks) agrupados en Antiguo y Nuevo Testamento, como una cuadrícula responsive.
2. /leer/[bookId]: lista los capítulos del libro (recuerda `await params`).
3. /leer/[bookId]/[chapterId]: muestra el capítulo con getChapter, con botones "Anterior" y "Siguiente" y un breadcrumb.
4. Un Client Component VersionSelector que permita cambiar la versión bíblica (usa /api/bibles) y guarde la elección en localStorage mediante useState + useEffect, y la aplique a la URL con searchParams.
5. Un Client Component FontSizeControl (A- / A+) para el tamaño del texto, persistido en localStorage.

Estilo tipo lectura cómoda: ancho máximo de 65 caracteres, interlineado amplio.
```

### Fase 6: Memorizar (Pedido 13 · `bd2554b`; primera versión en Pedido 12 · `cef8c11`)

```text
Implementa /memorizar, una herramienta de memorización diaria. Debe ser principalmente Client Component y usar useState y useEffect:

1. Estado persistido en localStorage: lista de versículos en memorización (referencia, texto, fecha de inicio, nivel de dominio 0-3, última práctica) y racha de días consecutivos.
2. Hook personalizado src/hooks/useLocalStorage.ts, seguro para SSR (lee localStorage solo dentro de useEffect para evitar errores de hidratación).
3. Flujo de práctica por versículo, con 3 modos:
   - Leer: muestra el versículo completo.
   - Completar: oculta palabras al azar y el usuario las escribe.
   - Recitar: oculta el texto y el usuario lo escribe de memoria; se compara con tolerancia a mayúsculas y signos y se muestra el porcentaje de acierto.
4. Al acertar, sube el nivel de dominio y la racha. Muestra la racha con un contador visible.
5. Si la URL trae ?ref=JHN.3.16 (viene del botón "Memorizar" del home), obtén el texto desde /api/verse y agrégalo a la lista.
6. Un campo para agregar versículos por referencia (ej. "ROM.8.28") con validación del formato.

Divide en componentes pequeños (VerseList, PracticeCard, StreakBadge, AddVerseForm). No pongas toda la lógica en un solo archivo.
```

### Fase 7: Evangelizar (Pedido 14 · `9f06b10`)

```text
Implementa /evangelizar como una guía para compartir el evangelio:

1. En src/data/evangelio.ts define una ruta de 6 pasos con su versículo cada uno, por ejemplo: Dios te ama (JHN.3.16), todos pecamos (ROM.3.23), el castigo del pecado (ROM.6.23), Cristo murió por nosotros (ROM.5.8), la salvación es por gracia (EPH.2.8-9), recibir a Cristo (ROM.10.9-10).
2. La página (Server Component) obtiene los pasajes con getPassage y los muestra como un recorrido paso a paso con tarjetas.
3. Un Client Component StepNavigator para avanzar y retroceder entre pasos, con indicador de progreso.
4. Botón "Compartir este paso" y un enlace final con una invitación a orar (texto de oración sugerida) y una sección "Siguientes pasos" que lleve a /discipulado.
5. Tono pastoral, sencillo y respetuoso.
```

### Fase 8: Discipulado (Pedido 15 · `59c8f9b`)

```text
Implementa /discipulado como un plan de 7 días para nuevos creyentes:

1. src/data/plan-discipulado.ts: 7 días con título, pasaje de lectura (ej. Juan 1, Marcos 1, Romanos 8...), una pregunta de reflexión, una oración corta y una acción práctica.
2. La página lista los 7 días con su progreso; /discipulado/[dia] (con `await params`) muestra el pasaje (getPassage), la reflexión, la oración y la acción.
3. Un Client Component DayCheckbox que marque el día como completado, persistido en localStorage con el hook useLocalStorage, y una barra de progreso global.
4. Un campo de notas personales por día guardadas en localStorage (useState + useEffect).
5. Validación del parámetro `dia`: si no está entre 1 y 7, usa notFound().
```

### Fase 9: Búsqueda (Pedido 16 · `ea89498`)

```text
Agrega la ruta /buscar:
1. Un formulario Client Component con useState y debounce de 400 ms que llama a /api/search.
2. Muestra resultados con referencia y fragmento de texto, con estado "buscando...", estado vacío y estado de error.
3. Cada resultado enlaza al capítulo correspondiente en /leer y tiene un botón "Memorizar".
4. Cancela las peticiones anteriores con AbortController dentro de useEffect.
Agrega el enlace en la navegación.
```

### Fase 10: Loading UI y Error UI (Pedido 17 · `27d711b`)

```text
Agrega el manejo de estados de carga y error con las convenciones de App Router:

1. loading.tsx en la raíz y en /leer, /leer/[bookId], /leer/[bookId]/[chapterId], /evangelizar y /discipulado/[dia], con skeletons animados de Tailwind (animate-pulse) que imiten el diseño real.
2. error.tsx (Client Component, recibe `error` y `reset`) en la raíz y en los segmentos con llamadas a la API: mensaje amable en español, botón "Reintentar" que llama a reset(), sin mostrar detalles técnicos al usuario (loguea el error en consola).
3. not-found.tsx global con enlace de regreso al inicio.
4. global-error.tsx para errores del layout raíz.
5. Simula un fallo (por ejemplo una API key inválida temporal) para verificar que el error UI aparece, y luego restáurala.
```

### Fase 11: Revisión crítica del código generado

```text
Haz una revisión de código completa del proyecto como un revisor senior. Revisa:

1. Seguridad: confirma que BIBLE_API_KEY nunca llega al bundle del cliente (busca usos en archivos con "use client"), que .env.local no está versionado y que los Route Handlers validan entradas.
2. Next.js 16: uso correcto de `await params`/`searchParams`, de "use client" solo donde hace falta, y de metadata.
3. TypeScript: elimina cualquier `any`, tipos incompletos o aserciones innecesarias.
4. React: dependencias de useEffect, cleanup de efectos, errores de hidratación con localStorage, keys en listas.
5. Accesibilidad: etiquetas, contraste, foco visible, aria-label en botones con solo icono, jerarquía de encabezados.
6. Código duplicado y componentes demasiado grandes.

Entrégame una lista priorizada (crítico / importante / menor) con archivo y línea, SIN modificar nada todavía.
```

### Fase 12: Corrección de errores

```text
Corrige los hallazgos críticos e importantes del informe de revisión, uno por uno. Para cada uno:
1. Explica brevemente la causa.
2. Aplica el cambio mínimo necesario.
3. Ejecuta `npm run build` y el linter para verificar.

Al terminar, ejecuta `npx eslint .` y `npx tsc --noEmit` y corrige cualquier error restante. No agregues funcionalidades nuevas en este paso.
```

### Fase 13: Optimización

```text
Optimiza la app para producción:

1. Rendimiento: aplica caché a las llamadas a API.Bible desde el servidor (los capítulos y versículos no cambian; usa la caché de fetch de Next.js 16 con `next: { revalidate: 86400 }` o el mecanismo de caché recomendado en esta versión) y evita llamadas duplicadas en una misma página.
2. Reemplaza imágenes por next/image si hay alguna, y carga perezosa de componentes pesados con next/dynamic.
3. SEO y compartir: metadata dinámica con generateMetadata en /leer/[bookId]/[chapterId] y /discipulado/[dia], Open Graph básico y favicon.
4. PWA ligera: manifest.webmanifest con nombre, iconos y theme_color para poder instalarla en el celular.
5. Revisa que no haya console.log olvidados.
6. Ejecuta el build y muéstrame el resumen de tamaños por ruta. Si hay una ruta anormalmente pesada, explica por qué.
```

### Fase 14: Documentación y despliegue

```text
Prepara el proyecto para entrega:

1. Escribe un README.md profesional en español con: descripción, capturas (deja marcadores), stack, rutas, cómo obtener la API key de API.Bible, instrucciones para correr en local (.env.local), decisiones de arquitectura, y una sección "Proceso con IA" que resuma cómo se usó Antigravity por fases.
2. Verifica que .env.local.example esté completo y que no haya secretos en el historial (`git log -p | grep -i "api"` para comprobarlo).
3. Dame la lista de pasos exactos para desplegar en Vercel: importar el repo de GitHub, configurar las variables BIBLE_API_KEY, BIBLE_API_BASE_URL y BIBLE_DEFAULT_ID en Settings → Environment Variables, desplegar y probar la URL pública.
4. Genera una lista de verificación post-despliegue (cada ruta, loading, error, responsive en móvil).
```

> **Estado de las fases 11 a 14:** _(completar con lo realizado y sus commits; si alguna no se ejecutó, indicarlo aquí)._

## 5. Iteraciones realizadas con la IA

| # | Iteración | Qué pasó | Resultado |
|---|---|---|---|
| 1 | **Memorizar: de Completar/Ordenar/Escribir a Leer/Completar/Recitar** | El Pedido 12 produjo una primera versión con tres modos (Completar, Ordenar, Escribir), cuatro niveles de dificultad y hooks separados. Al comparar con lo que necesitaba, se re-especificó el módulo (Pedido 13) con lista de versículos, dominio 0-3, hook `useLocalStorage` SSR-safe y porcentaje de acierto | Se eliminó el código anterior y se reimplementó con componentes más pequeños (`VerseList`, `PracticeCard`, `StreakBadge`, `AddVerseForm`) |
| 2 | **Home con Partial Prerendering** | La primera versión del versículo del día bloqueaba el render. Se envolvió en `Suspense` con un skeleton | El cascarón estático carga al instante y el versículo llega por streaming |
| 3 | **Skeletons compartidos (DRY)** | En la Fase 10, cada página tenía su skeleton local. Se movieron a `src/components/skeletons/` | Los mismos skeletons sirven para `Suspense` y para `loading.tsx` |
| 4 | **`ErrorState` reutilizable** | Los 8 `error.tsx` repetían la misma lógica | Un solo componente con título contextual, y 8 envoltorios delgados |
| 5 | **Reutilización de `?ref=`** | El botón "Memorizar" de `/buscar` no necesitó lógica nueva | Se aprovechó el parámetro `?ref=` que `/memorizar` ya procesaba |
| 6 | **`ShareButton` generalizado** | Nació para el versículo del día y se reutilizó en `/evangelizar` | Se añadió la prop opcional `label` |

## 6. Decisiones técnicas

| Decisión | Motivo |
|---|---|
| **API key solo en el servidor** (`import "server-only"` + Route Handlers como proxy) | La documentación de API.Bible desaconseja exponer la clave en el cliente. Ningún componente cliente la ve ni hay variables `NEXT_PUBLIC_` |
| **Respuesta uniforme `{ data }` / `{ error }`** con 400, 502 y 500 | Errores predecibles para el cliente y para el error UI |
| **Server Components por defecto**, Client Components solo con estado, efectos o eventos del navegador | Menos JavaScript en el cliente y mejor rendimiento |
| **Partial Prerendering + `Suspense`** en rutas con datos dinámicos | Shell estático instantáneo y streaming del contenido de la API |
| **`useLocalStorage` propio, SSR-safe** (lee `localStorage` solo dentro de `useEffect`) | Evita errores de hidratación |
| **Persistencia en `localStorage`** y no en base de datos | Alcance MVP en tiempo limitado, sin cuentas de usuario |
| **Versículo del día determinista** por día ordinal del año en UTC | Todos los usuarios ven el mismo versículo el mismo día, sin base de datos |
| **Lista curada de 60 versículos** con categorías | Control pastoral del contenido y menos llamadas a la API |
| **Sanitización de variables de entorno** (`trim()` y normalización de URL) | Previene errores de configuración (ver desafío 1) |
| **Ruta `/api/chapter` adicional** | La UI del lector la necesitaba aparte de las 5 rutas planeadas |
| **Bitácora documentada antes de cada pedido** | Trazabilidad y continuidad al cambiar de herramienta |
| **Conventional Commits**, un commit por funcionalidad | Historial legible para la presentación |

## 7. Desafíos encontrados y cómo se resolvieron

### 1. Error 404 al conectar con API.Bible (Pedido 7)
- **Síntoma:** todas las llamadas devolvían 404.
- **Causa:** dos errores en `.env.local`: la URL tenía `/v.1` (con punto) en lugar de `/v1`, y la `BIBLE_API_KEY` tenía un espacio al inicio.
- **Solución con IA:** se diagnosticó probando la conexión directa a la API. Se corrigió el archivo y se **robusteció `src/lib/bible.ts`** con `trim()` y normalización de URL, para que el error no se repita.
- **Verificación:** respuesta correcta de la versión NTV (`826f63861180e056-01`).

### 2. Rangos de versículos devolvían HTTP 502 (Pedido 14)
- **Síntoma:** `/evangelizar` fallaba en los pasos con rango (`EPH.2.8-9`, `ROM.10.9-10`).
- **Causa:** API.Bible exige repetir libro y capítulo en el final del rango; la forma abreviada devuelve 400, que el proxy traducía a 502.
- **Solución:** se cambió a `EPH.2.8-EPH.2.9` y `ROM.10.9-ROM.10.10`, y se verificó contra la API en vivo. Además, `/evangelizar` usa `Promise.allSettled` para degradar con gracia si un pasaje falla.
- **Lección:** el prompt original traía el formato abreviado; la validación contra la API real corrigió el prompt.

### 3. La validación de referencias rechazaba libros numerados (Pedido 13)
- **Síntoma:** `1CO.10.13`, `2TI.3.16` y `1JN.4.19` eran rechazadas por `AddVerseForm`.
- **Causa:** la expresión regular solo aceptaba tres letras.
- **Solución:** se cambió a `^(?:[1-3][A-Z]{2}|[A-Z]{3})\.\d{1,3}\.\d{1,3}$`. Se escribieron pruebas de lógica pura en Node (31 de 31 correctas).

### 4. `notFound()` respondía 200 en lugar de 404 (Pedido 15)
- **Síntoma:** `/discipulado/99` mostraba la UI 404 pero con estado HTTP 200.
- **Causa:** con `cacheComponents` activado, `notFound()` en tiempo de petición se ejecuta después de enviar el shell. Es un comportamiento documentado de Next.js 16.
- **Solución:** se mantuvo la UI 404 con `<meta name="robots" content="noindex">` para que los buscadores no la indexen, y se documentó la limitación. Un 404 real exigiría validar en el Proxy.

### 5. Verificar la UI de error bajo PPR (Pedido 17)
- **Síntoma:** al probar con una API key inválida, `curl` no mostraba la UI de error.
- **Causa:** con PPR el error viaja en el payload RSC y lo renderiza el **cliente**, no el servidor.
- **Solución:** se verificó con **Chromium headless (Playwright)**. Se confirmó el título contextual, "Reintentar" y "Volver al inicio", y que **no se filtraban** detalles técnicos (`BIBLE_API_KEY`, `403 Forbidden`, `digest`). Después se restauró la clave y se vació `.next/cache`.
- **Hallazgo:** `/evangelizar` no muestra error porque usa `Promise.allSettled` (comportamiento intencional); su `error.tsx` queda como red de seguridad.

### 6. Diferencia de API en Next.js 16: `reset` y `retry` (Pedido 17)
- **Síntoma:** en Next.js 16 el prop estable de los error boundaries es `retry`, mientras que el prompt pedía `reset`.
- **Solución:** `reset` sigue disponible y documentado, así que se respetó el requisito y se dejó anotado en la bitácora.

### 7. Hallazgos de lint preexistentes
- Persisten 2 errores y 3 advertencias en `ChapterReader`, `VersionSelector` y `FontSizeControl`, detectados desde el Pedido 15.
- Se reservaron para las fases de revisión y corrección (Fases 11 y 12). _(Actualizar con el resultado.)_

### 8. Cuota agotada en Antigravity
- **Síntoma:** se agotó la cuota de la herramienta de IA a mitad del proyecto.
- **Solución:** se continuó con OpenCode. Fue posible gracias a `AGENTS.md` (reglas persistentes), a los prompts por fases y a `docs/BITACORA.md`, que dio contexto completo al nuevo agente.

## 8. Historial de commits

| # | Commit | Mensaje |
|:-:|---|---|
| 1 | `6a14161` | Initial commit from Create Next App |
| 2 | `4d1b3cb` | docs: definir concepto de producto y arquitectura mvp |
| 3 | `f3017a7` | chore: inicializa Next.js 16 con Tailwind, reglas del proyecto y variables de entorno de ejemplo |
| 4 | `24eeb7a` | docs: agregar bitacora de pedidos y desarrollo |
| 5 | `c12cd87` | feat(api): agrega servicio de API.Bible y route handlers proxy |
| 6 | `4eb2735` | feat(ui): agrega layout responsive, navegación y rutas base |
| 7 | `0af818f` | feat(home): muestra versículo del día con Server Component y botón compartir |
| 8 | `5c6d90c` | feat(leer): agrega lector por libro y capítulo con selector de versión y tamaño de letra |
| 9 | `cef8c11` | feat(memorizar): agrega práctica de memorización con modos, niveles y racha en localStorage |
| 10 | `bd2554b` | feat(memorizar): reimplementa modulo con lista, dominio 0-3 y hook useLocalStorage SSR |
| 11 | `9f06b10` | feat(evangelizar): guia paso a paso para compartir el evangelio con oracion y siguientes pasos |
| 12 | `59c8f9b` | feat(discipulado): plan de 7 dias con progreso, notas y detalle por dia |
| 13 | `ea89498` | feat(buscar): busqueda de la Biblia con debounce, estados y acciones por resultado |
| 14 | `27d711b` | feat(estados): loading, error, not-found y global-error con skeletons reutilizables |

> Para regenerar la lista completa: `git log --oneline --reverse`. _(Agregar aquí los commits posteriores: revisión, correcciones, optimización, documentación.)_

## 9. Ciclo de Vibe Coding: cobertura

| Etapa del ciclo | Evidencia |
|---|---|
| Concepción inicial | Fase 0, `docs/CONCEPTO.md` |
| Prompts efectivos | Sección 4: objetivo, restricciones y verificación en cada prompt |
| Generación iterativa de componentes | Fases 2 a 10, un commit por funcionalidad |
| Validación y revisión del código | Builds, lint, `curl`, `next start`, Playwright y Fase 11 |
| Corrección de errores | Sección 7 y Fase 12 |
| Optimización | Fase 13 y PPR desde el Pedido 9 |
| Despliegue en producción | Fase 14, Vercel _(agregar URL pública)_ |

## 10. Enlaces

- **Repositorio:** _(URL de GitHub)_
- **App desplegada:** _(URL de Vercel)_
- **Bitácora completa:** [`docs/BITACORA.md`](BITACORA.md)
- **Concepto y arquitectura:** [`docs/CONCEPTO.md`](CONCEPTO.md)

## 11. Lecciones aprendidas

1. **Los prompts por fases con restricciones claras producen código más consistente** que los prompts amplios.
2. **`AGENTS.md` y la bitácora hacen portable el proyecto entre herramientas de IA.** Cambiar de Antigravity a OpenCode no detuvo el trabajo.
3. **Hay que validar contra la API real.** Un formato de rango que parecía correcto en el prompt falló en producción de datos.
4. **La IA acelera, pero la revisión es humana.** Cada pedido terminó con build, lint y pruebas antes del commit.
5. **Re-especificar es mejor que parchear.** El Pedido 13 reemplazó al 12 y el resultado fue más limpio.
