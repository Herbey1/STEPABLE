# Stack Tecnológico - Stepable

Este documento describe el conjunto de tecnologías, frameworks y herramientas seleccionadas para construir la plataforma Stepable, basándose en los requerimientos funcionales (`product.md`) y las especificaciones de diseño (`design.md`).

## 1. Core Stack (Frontend & Framework)

La base de nuestra aplicación web.

* **Framework: [Next.js](https://nextjs.org/) (App Router)**

  * **Razón:** Nos proporciona una estructura robusta con renderizado del lado del servidor (SSR) y generación estática (SSG), ideal para el rendimiento y SEO. El App Router facilita la organización de layouts anidados, justo lo que necesitamos para las vistas de "Proyecto" con su sidebar contextual.

* **Librería UI: [React](https://react.dev/)**

  * **Razón:** Es el estándar de la industria para construir interfaces de usuario interactivas y componentizadas. Su ecosistema maduro nos da acceso a un sinfín de herramientas y librerías.

* **Lenguaje: [TypeScript](https://www.typescriptlang.org/)**

  * **Razón:** Añade seguridad de tipos al código, lo que reduce errores en tiempo de ejecución y mejora drásticamente la experiencia de desarrollo, el autocompletado y la refactorización a largo plazo.

## 2. Backend & Base de Datos (BaaS)

Para manejar datos, autenticación y lógica de servidor, optamos por una solución integrada que nos permita movernos rápido.

* **Plataforma: [Supabase](https://supabase.com/)**

  * **Razón:** Es la alternativa de código abierto a Firebase que nos ofrece todo lo que necesitamos en un solo lugar:

    * **PostgreSQL Database:** Una base de datos relacional potente para almacenar usuarios, proyectos, guías, plantillas y el progreso del onboarding.

    * **Authentication:** Soluciona el registro, login y gestión de usuarios (incluyendo proveedores como GitHub si se desea en el futuro).

    * **Storage:** Perfecto para que los usuarios suban y gestionen sus documentos de onboarding (MD/PDF).

    * **Edge Functions:** Para ejecutar lógica de backend segura (ej. generar códigos de invitación, interactuar con la API de GitHub) sin mantener un servidor tradicional.

    * **Vector/Embeddings (pgvector):** Indispensable para la funcionalidad del asistente de IA, permitiendo realizar búsquedas semánticas (RAG) sobre los documentos del proyecto.

## 3. UI & Styling

La implementación visual seguirá las directrices del `design.md`.

* **CSS Framework: [Tailwind CSS](https://tailwindcss.com/)**

  * **Razón:** Es un framework "utility-first" que nos permite construir diseños complejos y a medida de forma muy rápida, sin salir del HTML. El `design.md` ya está orientado a su sistema de tokens (colores, espaciado, etc.).

* **Componentes: [shadcn/ui](https://ui.shadcn.com/)**

  * **Razón:** No es una librería de componentes tradicional. Nos proporciona componentes accesibles y personalizables que podemos copiar y pegar en nuestro proyecto. Usa Tailwind CSS para el estilo, lo que garantiza una integración perfecta con nuestro design system.

* **Iconos: [Lucide React](https://lucide.dev/)**

  * **Razón:** Una librería de iconos simple, bonita y ligera, explícitamente mencionada en el `design.md`.

## 4. Automatización & Orquestación

Para las integraciones con servicios de terceros.

* **Plataforma: [n8n](https://n8n.io/)**

  * **Razón:** Es una herramienta de automatización de flujos de trabajo de bajo código. Tal como se describe en `product.md`, la usaremos para orquestar las interacciones complejas con GitHub, Jira, Trello y Slack, gestionando webhooks y acciones de API de una manera visual y sostenible.

## 5. Hosting & Despliegue

* **Plataforma: [Vercel](https://vercel.com/)**

  * **Razón:** Es la plataforma de los creadores de Next.js. Ofrece una integración perfecta, despliegues automáticos con cada `git push`, dominios de previsualización por cada Pull Request y un rendimiento global excelente.