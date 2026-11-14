# Concepto del Producto: Palabra Diaria

## 1. Problema y Usuarios Objetivo

### Problema
La lectura y estudio bíblico en dispositivos móviles suele verse interrumpido por interfaces saturadas, sobrecarga de información y falta de dinamismo práctico. Muchos creyentes y personas interesadas desean interactuar con la Biblia en su rutina diaria con propósitos específicos (compartir su fe, crecer espiritualmente o memorizar pasajes), pero las herramientas actuales no están optimizadas para acciones rápidas de 2 a 5 minutos en el celular.

### Perfiles de Usuario (Personas)
1. **Carlos (El Buscador / Evangelismo)**:
   - *Contexto*: 22 años, estudiante. No asiste a una iglesia regularmente, pero busca respuestas a momentos de ansiedad, duda o propósito.
   - *Necesidad*: Encontrar versículos temáticos directos en lenguaje comprensible y poder compartirlos fácilmente por WhatsApp o redes sociales.
2. **Elena (La Nueva Creyente / Discipulado)**:
   - *Contexto*: 34 años, profesional y madre. Recientemente comenzó a congregarse y desea entender los fundamentos de la fe cristiana.
   - *Necesidad*: Guías de lectura cortas y estructuradas por temas esenciales (oración, perdón, gracia) con explicaciones prácticas y sin jerga teológica compleja.
3. **Mateo (El Cristiano Comprometido / Memorización)**:
   - *Contexto*: 28 años, líder de jóvenes. Desea cultivar la disciplina de memorizar la Escritura mientras viaja en transporte público.
   - *Necesidad*: Una herramienta móvil interactiva tipo juego (ocultamiento progresivo de palabras) que le permita retener un versículo clave al día.

---

## 2. Alcance del MVP

El MVP está dimensionado para desarrollarse y desplegarse en pocas horas, validando la propuesta de valor sin sobreingeniería.

### Qué ENTRA en el MVP
- **Home**: Versículo del día destacado con acceso directo táctil a los tres ejes (evangelizar, discipular, memorizar).
- **Módulo `/memorizar`**: Práctica interactiva básica con un botón para ocultar/revelar palabras progresivamente del versículo del día.
- **Módulo `/evangelizar`**: Tarjetas temáticas predefinidas (ej. Esperanza, Salvación, Ansiedad, Paz) con botón para copiar al portapapeles y compartir mediante Web Share API (WhatsApp/SMS).
- **Módulo `/discipulado`**: 3 a 5 lecciones fundamentales estáticas con pasajes bíblicos incrustados y preguntas de aplicación personal.
- **Módulo `/leer`**: Selector simple de libro y capítulo con visor de texto limpio y tipografía legible para móvil.
- **Módulo `/buscar`**: Búsqueda textual básica de palabras o frases mediante la API.
- **Persistencia mínima**: Uso de `localStorage` para recordar el último versículo practicado o completado.

### Qué NO ENTRA en el MVP
- Sistema de autenticación de usuarios (login, registro, contraseñas).
- Base de datos relacional externa o backend con persistencia en la nube.
- Audio bíblico o sincronización de voz.
- Comparador multiversión simultáneo.
- Planes de lectura complejos con calendarios y notificaciones push nativas.
- Foros, notas comunitarias o comentarios exegéticos.

---

## 3. Mapa de Rutas (Next.js App Router)

| Ruta | Propósito | Tipo de Renderizado |
| :--- | :--- | :--- |
| `/` | Portada con el versículo del día y accesos rápidos a las funciones clave. | Server Component (RSC) |
| `/leer` | Visor de lectura bíblica por libro y capítulo. | RSC (lector) + Client Component (selectores) |
| `/memorizar` | Dinámica interactiva para memorizar el versículo activo. | Client Component (interactividad de juego) |
| `/evangelizar` | Catálogo de tarjetas temáticas listas para compartir. | RSC (catálogo) + Client Component (botón compartir) |
| `/discipulado` | Lecciones guiadas de crecimiento espiritual básico. | RSC (contenido) |
| `/buscar` | Interfaz de búsqueda de términos bíblicos. | Client Component (input reactivo y resultados) |
| `/api/bible/[...path]` | Route Handler como proxy hacia API.Bible. | Backend / Edge Runtime |

---

## 4. Endpoints de API.Bible Requeridos

Base URL: `https://rest.api.bible/v1`

1. `GET /bibles`: Identificar y fijar el identificador (`bibleId`) de la versión en español adecuada.
2. `GET /bibles/{bibleId}/books`: Obtener la lista canónica de libros (para el selector de `/leer`).
3. `GET /bibles/{bibleId}/chapters/{chapterId}`: Cargar el contenido completo de un capítulo para lectura.
4. `GET /bibles/{bibleId}/passages/{passageId}`: Obtener pasajes puntuales o rangos de versículos para lecciones de discipulado.
5. `GET /bibles/{bibleId}/verses/{verseId}`: Consultar un versículo específico para la dinámica de memorización y el versículo diario.
6. `GET /bibles/{bibleId}/search?query={q}`: Ejecutar búsquedas de términos y concordancias en `/buscar`.

---

## 5. Decisión de Arquitectura: Server vs. Client Components & Proxy

### Server Components (RSC por defecto)
- **Por qué**: Entregan HTML listo para renderizar desde el servidor, eliminando bundles innecesarios de JavaScript en el cliente.
- **Dónde se usan**:
  - Layout general y cabeceras.
  - Páginas de lectura (`/leer`), artículos de discipulado (`/discipulado`) y contenido estático de `/evangelizar`.
  - Fetching inicial de datos bíblicos con cacheo nativo (`fetch` con `next: { revalidate: 86400 }`).
- **Beneficio móvil**: Carga instantánea incluso en redes móviles con baja cobertura (3G/4G) y consumo de datos reducido.

### Client Components (`"use client"`)
- **Por qué**: Requeridos exclusivamente donde existe estado local interactivo, manipulación del DOM o APIs del navegador.
- **Dónde se usan**:
  - Dinámica de memorización (estado de palabras visibles/ocultas, botón de reiniciar).
  - Integración con Web Share API y portapapeles (`navigator.clipboard`).
  - Inputs con filtrado en tiempo real en `/buscar`.
  - Selectores desplegables de libros y capítulos.

### Seguridad y Route Handlers (BFF / Proxy)
- **Regla Crítica**: La clave de acceso (`api-key`) de API.Bible **NUNCA** debe exponerse en el navegador o en variables de entorno con prefijo `NEXT_PUBLIC_`.
- **Implementación**: Se utilizarán Route Handlers en `src/app/api/bible/...` como capa intermedia (Backend-for-Frontend):
  1. El cliente o los componentes del servidor hacen peticiones a `/api/bible/...`.
  2. El Route Handler inyecta el encabezado confidencial `api-key: process.env.API_BIBLE_KEY`.
  3. El proxy valida, sanitiza y cachea respuestas frecuentes, protegiendo las credenciales y mitigando el consumo innecesario de cuota.

---

## 6. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
| :--- | :--- | :--- |
| **Límites de cuota (Rate Limiting)** | Bloqueo temporal de peticiones si hay alto tráfico de peticiones concurrentes. | Implementar cacheo HTTP en Next.js con tiempos de vida largos (`revalidate` de 24 horas a 7 días). El texto bíblico es inmutable. |
| **Licencias y Derechos de Autor** | Algunas traducciones hispanas modernas (ej. NVI, NBLA) exigen licencias comerciales o permisos especiales. | Priorizar para el desarrollo y MVP versiones en español de dominio público o con licencias de uso libre disponibles en API.Bible (ej. Reina Valera 1909 u otra versión abierta), incluyendo siempre la atribución requerida por el titular. |
| **Inestabilidad de Red Móvil** | Pantallas en blanco o errores cuando el usuario pierde señal en la calle o transporte. | 1. Incluir un conjunto de versículos y lecciones embebidos como fallback local (JSON estático).<br>2. Diseñar componentes `loading.tsx` y `error.tsx` con opciones claras de reintento offline-friendly. |

---

## 7. Estrategia de Git y Control de Versiones

### Convención de Commits (Conventional Commits)
Se utilizará el estándar de Conventional Commits en español o inglés técnico estándar:
- `feat:` Nueva característica para el usuario (ej. `feat: agregar vista de memorizacion interactiva`).
- `fix:` Corrección de errores (ej. `fix: corregir decodificacion html en visor de capitulos`).
- `refactor:` Mejoras internas de código sin alterar la funcionalidad (ej. `refactor: modularizar cliente http para api.bible`).
- `docs:` Cambios o creación de documentación (ej. `docs: definir concepto de producto y arquitectura mvp`).
- `chore:` Tareas de mantenimiento, dependencias o configuración (ej. `chore: configurar variables de entorno para api.bible`).

### Regla de Oro
- **Un commit por funcionalidad (Atómico)**: Cada commit debe representar una unidad de trabajo autocontenida que no rompa el build del proyecto. Evitar megacomits con múltiples pantallas o refactorizaciones mezcladas.
