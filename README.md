# Alexis Bonino — Portfolio Personal

> **Diseño UX/UI · Córdoba, Argentina**  
> Portfolio personal con dirección de arte editorial, sobrio y tipográfico. Realizado a mano en HTML5, CSS3 y JavaScript vanilla.

---

## 🏛️ Identidad Visual & Concepto

- **Estilo editorial**: Inspirado en publicaciones de diseño y monografías de autor.
- **Paleta casi monocromática**:
  - Fondo papel cálido: `#F6F4F0`
  - Texto principal (casi negro): `#1A1A1A`
  - Texto secundario (gris medio cálido): `#6B6864`
  - Color de acento discreto: Terracota apagado (`#A85A44`)
  - Sin gradientes, sin glassmorphism, sin sombras pesadas ni tarjetas genéricas.
- **Tipografía**:
  - Títulos: **Newsreader** (Google Fonts) en peso 300 (light) con cursiva para énfasis.
  - Textos y navegación: **Hanken Grotesk** (Google Fonts) en pesos 300 y 400.

---

## 📂 Estructura del Proyecto

```text
pagina para entregar/
├── index.html              # Estructura semántica, SEO y Open Graph
├── css/
│   └── styles.css          # Estilo editorial, tipografía, composición responsive
├── js/
│   └── main.js             # Proyectos dinámicos, layout alternado, fallback neutro
├── server.js               # Servidor local ligero de desarrollo
├── package.json            # Comando npm run dev
├── assets/
│   ├── foto.jpg            # Fotografía de Alexis Bonino
│   ├── favicon.svg         # Favicon vectorial
│   └── proyectos/          # Capturas reales de escritorio y móvil
│       ├── paraiso-desktop.png (y .jpg)
│       ├── paraiso-mobile.png (y .jpg)
│       ├── jireh-desktop.png (y .jpg)
│       ├── jireh-mobile.png (y .jpg)
│       ├── adalia-desktop.png (y .jpg)
│       └── adalia-mobile.png (y .jpg)
└── README.md
```

---

## 📖 Secciones

1. **Header**: Nombre a la izquierda y navegación limpia a la derecha (`Proyectos`, `Sobre mí`, `Contacto`). En móvil, menú simple sin adornos.
2. **Hero**: Nombre en gran tamaño y la línea `"Diseñador UX/UI · Córdoba, Argentina"`, con amplio espacio en blanco.
3. **Proyectos** (Foco principal):
   - Layout editorial alternado: composición de imágenes a un lado y texto al otro.
   - Número grande y fino (`01`, `02`, `03`).
   - Título y descripción concisa exacta.
   - Captura de escritorio con captura móvil superpuesta.
   - Enlace discreto `"Visitar sitio →"`.
4. **Sobre mí**: Fotografía en formato editorial y texto breve con edad (20 años), formación y ubicación.
5. **Contacto**: Invitación en texto y enlaces directos a Email, WhatsApp, Instagram y LinkedIn (sin Behance).
6. **Footer**: Nombre y año dinámico.

---

## 💻 Desarrollo local y Despliegue

### En local:
- Podés hacer doble clic directamente en `index.html`.
- O ejecutar en terminal:
  ```powershell
  npm run dev
  ```
  *(Abre `http://localhost:3000`)*

### Para publicar:
- **Cloudflare Pages / GitHub Pages**: Arrastrá la carpeta completa o conectá tu repositorio. No requiere comandos de build.
