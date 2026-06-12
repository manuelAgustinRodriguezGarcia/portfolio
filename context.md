# Context — Portfolio Manuel Rodriguez Garcia

Documento de referencia con todos los datos, contenido y decisiones del portfolio actual. Útil como base para rediseñar o rehacer el sitio.

---

## Identidad personal

| Campo | Valor |
|-------|-------|
| **Nombre completo** | Manuel Rodriguez Garcia |
| **Iniciales / alias nav** | MRG |
| **Rol / título** | Desarrollador Frontend *(EN: Frontend Developer)* |
| **Ubicación** | Barracas, CABA — Argentina |
| **Teléfono** | +54 11 3889 9722 |
| **Email** | manuelrodriguezgarcia.wd@gmail.com |
| **LinkedIn** | https://www.linkedin.com/in/manuel-agustin-rodriguez-garcia |
| **LinkedIn (handle)** | manuel-agustin-rodriguez-garcia |
| **GitHub** | https://github.com/manuelAgustinRodriguezGarcia |
| **GitHub (handle)** | manuelAgustinRodriguezGarcia |
| **Avatar** | `/avatar.png` (usado en hero, nav y logo; no está en el repo versionado) |

---

## SEO y metadata

| Campo | Valor |
|-------|-------|
| **Title** | Manuel Rodriguez Garcia \| Frontend Developer |
| **Description** | Portfolio de Manuel Rodriguez Garcia — Desarrollador Frontend. Interfaces modernas, React, TypeScript, Next.js. |
| **Idioma HTML por defecto** | `es` |

---

## Propuesta de valor (mensajes clave)

### Hero

- **Saludo (ES):** Hola, soy
- **Saludo (EN):** Hi, I'm
- **CTA principal (ES):** Conocer más → `#profile`
- **CTA secundaria:** Contacto → `#contact`

### Headline de perfil

**ES:** Una web funcional no alcanza. **Una web memorable, sí!**

**EN:** A functional site is not enough. **A memorable site, yes!**

### Bloques de perfil (4 párrafos)

1. Ayudo a **empresas y emprendedores** a ganar confianza online y convertir visitas en oportunidades con interfaces claras, rápidas y con atención obsesiva al detalle.

2. Una web que representa a tu marca cambia cómo los usuarios te perciben: **menos dudas**, **más consultas** y sobre todo más **confianza generada** en el usuario.

3. Una página puede ser **funcional** y aún así sentirse fría. Yo busco experiencias **memorables** donde conviven la usabilidad clara y el criterio visual, sin renunciar a ninguna de las dos.

4. Me reconocen por la **atención al detalle** al crear soluciones web: código limpio, interacciones fluidas y como resultado una experiencia destacable para los usuarios.

> Nota: en el código las claves son `line1`, `line2`, `line5`, `line6` (no existen line3 ni line4).

---

## Experiencia laboral

### 1. Epirco Group — Desarrollador Frontend

- **Período (ES):** Sep 2025 - Actualidad
- **Período (EN):** Sep 2025 - Present
- **Modalidad:** Remoto 100% online

**Responsabilidades:**
- Desarrollo de aplicaciones web con React JS
- Trabajo en conjunto con desarrolladores backend y diseñadores UX
- Participación en el diseño UX y decisiones sobre los proyectos
- Edición de prototipados en Figma

### 2. Freelance — Desarrollador Frontend Freelance

- **Período (ES):** Abr 2023 - Ago 2025
- **Período (EN):** Apr 2023 - Aug 2025

**Responsabilidades:**
- Desarrollo de interfaces responsivas con React, TypeScript y JavaScript
- Integración de APIs REST
- Uso de Git y GitHub para control de versiones
- Aplicación de principios SOLID en proyectos personales
- Creación de sitios con WordPress, Elementor y Shopify
- Colaboración con herramientas de IA (Claude, ChatGPT, Cursor, BlackBox)

---

## Educación

| Título | Institución | Período |
|--------|-------------|---------|
| Tecnicatura en Desarrollo Web *(EN: Web Development Associate Degree)* | Escuela Da Vinci | 2025 - Actualidad / Present |
| Curso de Front End Developer *(EN: Front End Developer Course)* | Coderhouse | 2023-2024 |

---

## Idiomas

| Idioma | Nivel |
|--------|-------|
| Español | Nativo |
| Inglés | Avanzado C2 (MCER / CEFR) |

---

## Habilidades técnicas

### Frontend
HTML, CSS, SCSS, Tailwind, JavaScript, TypeScript, React, Next.js

### UI y diseño
Photoshop, Illustrator, Bootstrap, Figma

### Backend y DB
PHP, SQL, Express

### Control de versiones
GitHub

### CMS y herramientas *(definido en i18n pero no renderizado en la UI actual)*
WordPress, Elementor, Shopify

---

## Estructura del sitio actual

Single-page con scroll suave y anclas:

| Sección | ID | Contenido |
|---------|-----|-----------|
| Hero | `#hero` | Saludo, nombre animado (typewriter), rol, CTAs, avatar flotante, partículas de fondo |
| Perfil | `#profile` | Headline + 4 bloques numerados |
| Experiencia | `#experience` | Timeline de trabajos |
| Estudios | `#education` | Tarjetas de formación + idiomas |
| Habilidades | `#skills` | Grid de 4 categorías (Frontend, UI, Backend, Version control) |
| Contacto | `#contact` | Tarjetas: teléfono, email, ubicación, LinkedIn, GitHub |

### Navegación

- Sobre mí → `#profile`
- Experiencia → `#experience`
- Estudios → `#education`
- Habilidades → `#skills`
- Contacto → `#contact`

---

## Funcionalidades de la UI actual

- **i18n:** Español (default) e Inglés — toggle en nav
- **Tema:** Dark (default) / Light — toggle en nav
- **Animaciones:** Framer Motion (fade-in, stagger, scroll reveal)
- **Hero:** Efecto typewriter del nombre (Manuel → Manuel Rodriguez → Manuel Rodriguez Garcia) con alternancia de color violeta
- **Hero:** Partículas animadas en canvas (`HeroParticles`)
- **Nav:** Sticky, cambia al hacer scroll; en mobile aparece al salir del hero
- **Nav mobile:** Menú hamburguesa con animación ladder
- **Settings panel:** Agrupa theme + language toggle
- **Scroll spy:** Resalta sección activa en nav según posición del viewport
- **Accesibilidad:** Escape cierra menús; focus-visible con outline cyan

---

## Lo que NO tiene el portfolio actual

- Sección de **proyectos / portfolio de trabajos**
- Sección de **testimonios / clientes**
- **CV descargable**
- **Blog**
- Skills de **CMS** visibles en la UI (solo en JSON de traducciones)
- **Open Graph / Twitter cards** en metadata
- **Schema.org** (Person, ProfilePage)
- **Favicon** personalizado (solo assets default de Next)

---

## Stack técnico

| Categoría | Tecnología |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Lenguaje | TypeScript |
| Estilos | SCSS Modules |
| Animaciones | Framer Motion |
| Partículas | tsparticles / react-tsparticles (instalado; hero usa canvas custom) |
| i18n | i18next + react-i18next |
| Iconos | lucide-react |
| Package manager | pnpm (lock presente) |

### Scripts

```bash
pnpm dev      # desarrollo
pnpm build    # build producción
pnpm start    # servidor producción
pnpm lint     # eslint
```

---

## Diseño visual (tokens)

### Tema oscuro (default)

| Token | Valor |
|-------|-------|
| Background | `#07070a` |
| Text | `rgba(255, 255, 255, 0.92)` |
| Text muted | `rgba(255, 255, 255, 0.66)` |
| Surface | `rgba(255, 255, 255, 0.04)` |
| Border | `rgba(255, 255, 255, 0.10)` |
| Accent (violet) | `#7c3aed` |
| Accent 2 (cyan) | `#22d3ee` |
| Purple rain | `#d70dff` |

### Tema claro

| Token | Valor |
|-------|-------|
| Background | `#f7f7fb` |
| Text | `rgba(10, 10, 14, 0.92)` |
| Accent | `#6d28d9` |
| Accent 2 | `#0891b2` |

### Tipografía y forma

- **Font:** System UI stack (ui-sans-serif, Segoe UI, Roboto, etc.)
- **Border radius:** 10px / 14px / 20px
- **Paleta general:** Dark mode con acentos violeta + cyan; estética moderna/minimal

---

## Archivos fuente del contenido

| Contenido | Archivo |
|-----------|---------|
| Textos ES | `app/i18n/locales/es.json` |
| Textos EN | `app/i18n/locales/en.json` |
| Layout + metadata | `app/layout.tsx` |
| Componente principal | `app/components/PortfolioContent.tsx` |
| Variables de diseño | `app/styles/_variables.scss` |
| Config i18n | `app/i18n/config.ts` |

---

## Notas para el rediseño

1. **Público objetivo implícito:** Empresas y emprendedores que necesitan presencia web profesional.
2. **Diferenciador:** Atención al detalle, interfaces memorables (no solo funcionales), confianza y conversión.
3. **Stack de marca personal:** React, TypeScript, Next.js — alineado con el rol de Frontend Developer.
4. **Experiencia reciente:** Epirco Group (desde Sep 2025) + formación activa en Da Vinci.
5. **Oportunidades de mejora:** Agregar proyectos con links/demo, mostrar skills CMS, mejorar SEO social, favicon propio, posible sección "Servicios" derivada del copy de perfil.

---

*Generado a partir del estado actual del repositorio — Jun 2026.*
