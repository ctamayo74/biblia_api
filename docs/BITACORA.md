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
| **8** | 2026-11-14 | Layout global, navegación móvil/escritorio y rutas base | `Header`, `BottomNav`, `Footer`, fuentes serif/sans y 5 rutas | `0c0fefd` |

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
* **Commit**: `0c0fefd` (`feat(ui): agrega layout responsive, navegación y rutas base`).
