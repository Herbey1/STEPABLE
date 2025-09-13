# Stepable — App Design Spec (UI/UX)

> **Alcance:** Documento exclusivamente de **diseño de producto (UI/UX)**. Define identidad visual, arquitectura de información, componentes, patrones de interacción, estados, accesibilidad, contenidos y plantillas de página. **Queda fuera**: arquitectura de backend, modelos de datos, pipelines de IA, y detalles de integraciones técnicas.

---

## 0) Principios de Diseño

1) **Aprender haciendo:** cada lección culmina en una acción concreta (p. ej., redactar un PR con la plantilla real).  
2) **Una sola fuente de verdad:** todo el curso refleja las guías oficiales del proyecto.  
3) **Guardrails, no bloqueos:** el sistema sugiere y valida con claridad sin fricción.  
4) **Claridad y ritmo corto:** bloques pequeños, feedback inmediato, progreso visible.  
5) **Inclusivo por diseño:** accesibilidad AA, lenguaje claro, soporte ES/EN desde el inicio.

---

## 1) Identidad Visual (Design Tokens)

### 1.1 Colores (branding)
- `text`: `#090a0c`  
- `background`: `#d8dfee`  
- `primary`: `#7592e1`  
- `secondary`: `#0950c3`  
- `accent`: `#43bbd0`

**Neutrales (Tailwind sugeridos):** `zinc/gray` para bordes, fondos de tarjetas y estados deshabilitados.  
**Semánticos:** éxito (emerald/teal), aviso (amber), error (rose/red). Usar variantes 500–700 para contrastes AA.

**Roles de color:**
- Botón primario, CTAs, enlaces destacados → `primary`.  
- Encabezados de sección, resaltes técnicos → `secondary`.  
- Progreso, badges, info → `accent`.  
- Tarjetas: fondo blanco, borde `gray-200/300` con sombra suave.  
- Enlaces: `primary` con subrayado al hover.

### 1.2 Tipografía
- **Familia:** Nunito (heading & body)
- **Pesos:** 400 (normal), 700 (bold)
- **Escala modular:**  
  `sm: .750rem` · `base: 1rem` · `xl: 1.333rem` · `2xl: 1.777rem` · `3xl: 2.369rem` · `4xl: 3.158rem` · `5xl: 4.210rem`

**Uso:**  
- Títulos de página: `text-3xl/4xl`, semánticos `<h1>`–`<h3>`.  
- Copys y listas: `text-base`/`text-sm` con `leading-relaxed`.

### 1.3 Espaciado, radios, sombras, motion
- **Espaciado:** escala Tailwind (4–96). Ritmo vertical 8/12/16.  
- **Radios:** tarjetas/modales `rounded-2xl`; inputs/botones `rounded-lg`.  
- **Sombras:** `shadow-sm` y `shadow-md` (difusas, no duras).  
- **Motion:** transiciones 150–250ms; micro-animaciones en progreso/feedback; respetar `prefers-reduced-motion`.

### 1.4 Focus & estados
- **Focus ring:** `ring-2` con `ring-primary` + `ring-offset-2` sobre fondo claro.  
- **Hover/Active:** opacidad -10%/presión ligera.  
- **Disabled:** 60% opacidad + cursor `not-allowed`.

---

## 2) Arquitectura de Información & Navegación

### 2.1 Mapa
- **Auth** → **Home** (Proyectos) → **Proyecto**  
  - **Biblioteca** (Guías & Plantillas)  
  - **Onboarding**  
    - **Plan** (módulos/lecciones)  
    - **Player** (lectura → práctica → quizz)  
  - **Integraciones** *(UI de configuración; sin detalle técnico)*  
  - **Ajustes** (roles, códigos, idioma)

### 2.2 Patrones de navegación
- **Topbar** con selector de proyecto + perfil.  
- **Sidebar** contextual por proyecto con tabs: Biblioteca, Onboarding, Integraciones, Ajustes.  
- **Breadcrumbs** opcionales en Player para orientarse dentro del curso.

---

## 3) Plantillas de Página (Templates)

### 3.1 Auth
- **Login/Registro/Recuperar**: layout sencillo, tarjeta centrada, ilustración mínima.  
- Inputs con descripciones, errores inline y link a soporte.

### 3.2 Home (Proyectos)
- Tarjetas de proyecto: nombre, stack, progreso de onboarding (si publicado).  
- CTA primario “Crear proyecto”. Vacío con CTA y ayuda.

### 3.3 Proyecto → Biblioteca
- Tabla/lista con: Título, Tipo (Guía/Plantilla), Formato (MD/PDF), Última edición.  
- Acciones: Subir, Editar/Previsualizar MD, Reemplazar archivo.  
- Vacío: tarjeta “Sube primero tu guía de PR”.

### 3.4 Proyecto → Onboarding → Plan
- Vista tipo lista/tabla con **Módulos** y **Lecciones** (orden, tipo: read/practice/quiz).  
- Estados: *borrador/publicado*.  
- Acciones: generar plan (IA), reordenar, editar textos, publicar v1.

### 3.5 Proyecto → Onboarding → Player
- **Header** con título y progreso.  
- **Contenido** (lectura con enlaces a guías).  
- **Práctica** (área lateral o pestaña): PR Simulator / Ticket / Naming / Tests.  
- **Quizz** con feedback inmediato y reintentos con pistas.  
- Barra inferior: Navegar a **Anterior/Siguiente**.

### 3.6 Proyecto → Integraciones (UI)
- Tarjeta de conexión (GitHub): estado conectado/desconectado, selección de repos (checkbox), **Guardrails** seleccionables (labels, plantilla PR, comentario guía, detección JIRA-###, checks básicos).  
- Mensajería clara de “opcional para el onboarding”.

### 3.7 Proyecto → Ajustes
- **Roles** (Owner/Admin, Member) visualización y cambios.  
- **Códigos de ingreso**: generar, expiración, usos, dominio permitido.  
- **Idioma** a nivel proyecto.

---

## 4) Biblioteca de Componentes (UI)

### 4.1 Átomos
- **Button** (primario, secundario, outline, ghost, link; con loading).  
- **Input / Textarea / Select** (labels arriba, ayuda debajo, error inline).  
- **Checkbox / Radio / Switch** (grupos con leyenda).  
- **Badge** (progreso, tipo de lección, estado publicado/borrador).  
- **Tag** (stack/tecnología).  
- **Tooltip**, **Avatar**, **Progress**, **Separator**, **Skeleton**, **Toast**, **Alert**.

### 4.2 Moléculas
- **Card** (título, descripción, acciones).  
- **Steps** (pendiente / en curso / completo) + tooltips.  
- **Markdown Editor/Viewer** (pestañas MD/Preview, contador de caracteres, pegado de código).  
- **QuizItem** (MCQ, VF, respuesta corta con hints).  
- **RulePreview** (regex de naming con chips “válido/ inválido”).

### 4.3 Organismos
- **Sidebar de Proyecto** (tabs, iconos lucide).  
- **Course Player** (header con progreso, panel de contenido, panel de práctica, barra de navegación).  
- **PR Simulator (UI)**: editor con plantilla (secciones colapsables), checklist de criterios, validador de forma en vivo, previsualización de resultado.  
- **Ticket Simulator (UI)**: formulario según plantilla (Given/When/Then), validación de campos obligatorios, tips contextuales.  
- **Assistant Dock**: chat flotante con atajos (“genera descripción de PR”, “propón título de ticket”, “explica guía”).

---

## 5) Interacciones & Estados

### 5.1 Patrones de feedback
- **Inline** (debajo del control) para errores de formulario.  
- **Banners** para mensajes globales (éxito/aviso/error).  
- **Toasts** para acciones rápidas (guardar, publicar).  
- **Vacíos** con guía + CTA (ilustración mínima y enlaces a docs).  
- **Skeletons** para carga de listas/tablas.

### 5.2 Validaciones visibles (MVP)
- **PR:** presencia de secciones, claridad mínima, referencia a ticket si aplica (mostrar checks ✓/✗ por criterio).  
- **Naming/Branch/Commit:** vista de ejemplos + regex con resaltado; feedback “esperado vs. ingresado”.  
- **Ticket:** campos obligatorios y formato Gherkin con ejemplos de placeholder.  
- **Tests (teórico‑práctico):** preguntas con explicación al fallar y opción de reintento.

### 5.3 Estados de lección y progreso
- Lección: *no iniciada / en curso / completa*.  
- Módulo: porcentaje completado.  
- Barra de progreso en Player y resumen en Home/Proyecto.

---

## 6) Accesibilidad (AA) & i18n

- **Teclado:** orden lógico de tab, `Enter/Espacio` en controles, atajos básicos (Siguiente lección).  
- **Lectores de pantalla:** roles/labels/alt correctos; `aria-live` en toasts/feedback.  
- **Contraste:** textos ≥ 4.5:1; verificar primarios sobre blanco y viceversa.  
- **Motion:** respetar `prefers-reduced-motion`.  
- **i18n:** ES/EN; no hardcodear; evitar jerga; glosario contextual en Player.

---

## 7) Contenido & Microcopy

- **Tono:** claro, directo, empático.  
- **Botones:** verbo + objetivo (“Crear proyecto”, “Validar PR”).  
- **Errores:** explicar causa + acción (“Falta la sección ‘Pruebas’. Añádela o marca el checklist”).  
- **Ayudas:** tooltips y ejemplos breves (máx. 2 líneas). 

---

## 8) Responsive & Layout

- **Breakpoints Tailwind:** `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.  
- **Contenedores:** ancho máx. de lectura ~`prose` en Player; panel lateral colapsable en `md`-.  
- **Mobile:** bottom sheet para acciones principales, navegación por tabs; Assistant Dock en botón flotante.

---

## 9) Notificaciones (UI)

- **Toasts**: confirmaciones rápidas (guardar, publicar, conexión hecha).  
- **Banners**: cambios de estado mayores (onboarding publicado, código generado).  
- **Emails**: solo referencia visual (asunto + CTA); la composición real queda fuera de este doc.

---

## 10) QA de Diseño (Checklist)

- Contrastes AA aprobados (incluye estados hover/focus).  
- Navegación por teclado completa en Auth, Biblioteca y Player.  
- Estados de vacío/loading/error presentes en cada template.  
- Copys revisados ES/EN, longitud en botones ≤ 24 caracteres.  
- Progresos coherentes entre Plan y Player.  
- Validaciones visibles y entendibles sin contexto técnico.  
- Responsividad probada en `sm`, `md`, `lg`.

---

## 12) Anexos

### 12.1 Guía rápida de componentes por vista
- **Biblioteca:** Table/List, Card, Markdown Viewer, Empty State, Upload.  
- **Plan:** Data List, Drag handle (reordenar), Badge de tipo, Button publicar.  
- **Player:** Steps, Progress, Tabs (Contenido/Práctica/Quizz), Checklist, Hint, Toast.

### 12.2 Focus Ring (spec)
- Elementos interactivos: `ring-2 ring-primary ring-offset-2` sobre `background`.  
- En tarjetas clicables, además: `outline-none` + `ring-offset-background`.

