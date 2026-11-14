<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Reglas del Proyecto: Palabra Diaria

Estas reglas son de cumplimiento obligatorio para todo agente o desarrollador que trabaje en este repositorio:

1. **Next.js 16 y App Router**:
   - Todo el desarrollo utiliza App Router (`src/app`).
   - **`params` y `searchParams` son asíncronos**: En Next.js 16, `params` y `searchParams` en `page.tsx`, `layout.tsx` y Route Handlers son `Promise`. Deben consumirse siempre con `await params` o `await searchParams` (ejemplo: `const { id } = await params;`).

2. **TypeScript Estricto**:
   - Prohibido el uso de `any`.
   - Definir interfaces y tipos explícitos para todas las respuestas de API.Bible, propiedades de componentes y estados en `src/types/`.
   - Mantener tipado estricto en funciones y utilidades.

3. **Arquitectura de Componentes (Server vs. Client)**:
   - **Server Components (RSC) por defecto**: Todo componente es Server Component a menos que requiera interacción explícita.
   - `"use client"` únicamente cuando sea estrictamente necesario para:
     - Manejo de estado (`useState`, `useReducer`).
     - Efectos y ciclo de vida (`useEffect`).
     - Eventos del navegador y APIs cliente (`onClick`, `onChange`, `navigator.clipboard`, Web Share API, `localStorage`).
   - Mantener los Client Components en las hojas del árbol de renderizado para minimizar el tamaño del bundle.

4. **Seguridad y Manejo de la API Key**:
   - La API key de API.Bible (`BIBLE_API_KEY`) **NUNCA** debe utilizarse en componentes cliente ni exponerse con prefijo `NEXT_PUBLIC_`.
   - Todo acceso externo a API.Bible se realiza en el servidor mediante utilidades en `src/lib/` o Route Handlers (`src/app/api/`) que actúan como proxy / BFF.

5. **Estilos y Diseño Mobile-First**:
   - Uso exclusivo de **Tailwind CSS**.
   - Enfoque **mobile-first**: Diseñar y estructurar primero para pantallas verticales de smartphones, utilizando prefijos responsivos (`sm:`, `md:`, `lg:`) para pantallas más grandes.
   - Garantizar áreas táctiles accesibles (mínimo 44x44px para botones/enlaces).

6. **Idioma de la Interfaz**:
   - Todos los textos visibles al usuario, mensajes de error, placeholders, estados de carga y etiquetas de accesibilidad deben estar en **español**.

7. **Modularidad y Responsabilidad Única**:
   - Cada componente debe tener una única responsabilidad bien definida.
   - Nombres descriptivos y semánticos para archivos y componentes (ej. `VerseCard.tsx`, `DailyVerseSection.tsx`, `ShareButton.tsx`).
