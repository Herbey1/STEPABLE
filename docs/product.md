# Stepable

Stepable es una plataforma de onboarding práctico para equipos de software que convierte la forma de trabajar de cada proyecto en pasos claros y ejecutables. Centraliza la “verdad oficial” (estilo de código, convenciones de nombres, flujo de PR, estructura de tickets y tests), ofrece plantillas y checklists por rol, y guía a cada nuevo integrante hasta su primer merge con integraciones a GitHub/Jira/Trello/Slack (orquestadas con n8n) y apoyo de un agente de IA que redacta/válida PRs y tickets según los estándares del equipo.

---

## MVP (indispensable)

### Autenticación y cuentas
- Registro por email (verificación), login, recuperación de contraseña.
- Perfil básico (nombre, avatar, idioma).

### Proyectos y acceso
- Crear/editar proyecto (el creador es Owner).
- Código de ingreso tipo Classroom (expira, límite de usos, filtro por dominio).
- Roles por proyecto: Owner/Admin, Member (RBAC mínimo).

### Biblioteca del proyecto (fuente de verdad)
- Subir/editar documentos (MD/PDF): guía de PR, estilo de código, naming (ramas/commits/variables), estrategia de tests, guía de tickets (reemplaza Trello/Jira).
- Plantillas: `PULL_REQUEST_TEMPLATE.md`, `CONTRIBUTING.md`, `.editorconfig`, linters/formatters, plantilla de ticket (en Markdown).

### Conexión con GitHub (opcional, por proyecto)
- Conectar organización/repos (GitHub App u OAuth de app).
- Seleccionar repos relevantes para el onboarding.
- Guardrails del primer PR: etiquetas, validación de plantilla, comentario guía, detección de ticket `JIRA-###` (si el equipo usa esa convención en texto), checks básicos (linter/CI si existen).
- Implementable directo desde backend o vía n8n como orquestador de webhooks/acciones GitHub.

### Generación del onboarding (LLM + RAG)
- Ingesta: documentos subidos + README/CONTRIBUTING + ejemplos de PR/commits del repo (si GitHub conectado).
- Indexación (embeddings) con metadatos (stack, reglas, umbrales).
- Plan didáctico automático → grafo de módulos y lecciones.
- Contenidos con ejemplos del propio proyecto y enlaces a las guías.

### Recorrido tipo "Duolingo"
- Módulos → lecciones → práctica → quizz con feedback inmediato.
- Progresión educativa con reintentos con pistas.

### Ejercicios y evaluación (in-app, sin sandbox)
- **Redacción de PR (simulada):** editor con la plantilla del proyecto; evaluación de:
  - Estructura, claridad, vínculo a ticket (texto), riesgos, tests mencionados, alineación con guías.
- **Naming/ramas/commits:** validación por reglas/regex definidas por el proyecto.
- **Ticket (simulado):** formulario según tu plantilla de tickets; validación de campos y criterios (Given/When/Then).
- **Tests mínimos (teórico-práctico):** preguntas de criterio, lectura de salidas de CI si hay GitHub conectado (p. ej., interpretar un log).

### Asistente permanente (chat burbuja)
- Q&A con RAG sobre tus documentos y (si aplica) el repo.
- Acciones rápidas: “genera descripción de PR”, “propón título de ticket”, “explica esta guía”.

### Notificaciones
- Email: ingreso aprobado, curso publicado.

---

## Flujos Clave

- **Admin** crea proyecto → sube guías y plantillas → *(opcional)* conecta GitHub → genera y **publica Onboarding v1**.
- **Miembro** se une con código → completa módulos (PR, naming, tickets, tests) → pasa quizzes → está **preparado para trabajar** en el proyecto.
