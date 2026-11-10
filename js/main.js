/**
 * ====================================================================
 * ALEXIS BONINO — Portfolio Personal
 * Inspiración editorial & interactiva estilo Perry Wang 2023
 * 
 * Stack: JavaScript Vanilla + GSAP / ScrollTrigger / Lenis (CDN)
 * ====================================================================
 */

'use strict';

/* ====================================================================
   1. DATOS DE LOS PROYECTOS
   (Datos exactos según especificación)
   ==================================================================== */
const PROYECTOS = [
  {
    number: '01',
    title: 'El Paraíso Casa de Campo',
    type: 'Sitio informativo · 2026',
    year: '2026',
    description: 'Sitio de un lugar para pasar el día, cuyo atractivo principal es la gran cantidad de actividades que ofrece.',
    link: 'https://elparaisocasadecampo.pages.dev/',
    bgColor: '#E7E9E4', // Fondo desaturado y suave propio del proyecto
    images: {
      desktop: 'assets/proyectos/paraiso-desktop.png',
      mobile: 'assets/proyectos/paraiso-mobile.png',
      fallbackDesktop: 'assets/proyectos/paraiso-desktop.jpg',
      fallbackMobile: 'assets/proyectos/paraiso-mobile.jpg'
    }
  },
  {
    number: '02',
    title: 'Jireh&Co',
    type: 'Sitio de emprendimiento · 2026',
    year: '2026',
    description: 'Sitio de un emprendimiento de juguetes didácticos para niños.',
    link: 'https://jireh-bak.pages.dev/',
    bgColor: '#EBE5DE', // Tono cálido desaturado
    images: {
      desktop: 'assets/proyectos/jireh-desktop.png',
      mobile: 'assets/proyectos/jireh-mobile.png',
      fallbackDesktop: 'assets/proyectos/jireh-desktop.jpg',
      fallbackMobile: 'assets/proyectos/jireh-mobile.jpg'
    }
  },
  {
    number: '03',
    title: 'Adalia',
    type: 'Sitio de marca · 2026',
    year: '2026',
    description: 'Sitio de una marca de papelería botánica.',
    link: 'https://adalia.pages.dev/',
    bgColor: '#E9E4E4', // Tono neutro sutil
    images: {
      desktop: 'assets/proyectos/adalia-desktop.png',
      mobile: 'assets/proyectos/adalia-mobile.png',
      fallbackDesktop: 'assets/proyectos/adalia-desktop.jpg',
      fallbackMobile: 'assets/proyectos/adalia-mobile.jpg'
    }
  }
];

/* ====================================================================
   2. GENERADOR DE PLACEHOLDER GRIS NEUTRO (Regla del prompt)
   "Si falta una imagen en assets/, mostrá un marco gris neutro con el
   nombre del proyecto."
   ==================================================================== */
function getNeutralPlaceholder(title, isMobile = false) {
  const width = isMobile ? 600 : 1200;
  const height = isMobile ? 1000 : 750;
  const escapedTitle = title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#DFDCD6" />
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="#CCC8C0" stroke-width="1" />
      <text x="${width / 2}" y="${height / 2 - 10}" font-family="'Newsreader', Georgia, serif" font-size="${isMobile ? '24' : '32'}" font-style="italic" font-weight="300" fill="#141414" text-anchor="middle">
        ${escapedTitle}
      </text>
      <text x="${width / 2}" y="${height / 2 + 25}" font-family="'Hanken Grotesk', -apple-system, sans-serif" font-size="${isMobile ? '12' : '14'}" font-weight="400" fill="#6B6864" text-anchor="middle" letter-spacing="0.08em">
        ${isMobile ? 'CAPTURA MOBILE' : 'CAPTURA DESKTOP'}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

window.handleImageError = function (imgElement, projectName, isMobile = false) {
  const currentSrc = imgElement.src || '';

  // Probar alternativa .jpg si falló .png
  if (!imgElement.dataset.triedJpg && /\.png$/i.test(currentSrc)) {
    imgElement.dataset.triedJpg = 'true';
    imgElement.src = currentSrc.replace(/\.png$/i, '.jpg');
    return;
  }

  // Probar alternativa .png si falló .jpg
  if (!imgElement.dataset.triedPng && /\.jpe?g$/i.test(currentSrc)) {
    imgElement.dataset.triedPng = 'true';
    imgElement.src = currentSrc.replace(/\.jpe?g$/i, '.png');
    return;
  }

  // Si ninguna existe, mostrar marco gris neutro con el nombre
  if (imgElement.dataset.fallbackApplied) return;
  imgElement.dataset.fallbackApplied = 'true';
  imgElement.src = getNeutralPlaceholder(projectName, isMobile);
};

/* ====================================================================
   3. RENDERIZADO DINÁMICO DE PROYECTOS
   Cada proyecto ocupa casi una pantalla completa, con marco de color suave,
   captura grande desktop y versión mobile en celulares.
   ==================================================================== */
function renderProjects() {
  const container = document.getElementById('proyectos-container');
  if (!container) return;

  const html = PROYECTOS.map((proyecto) => {
    return `
      <article class="project-card" data-project-link="${proyecto.link}">
        <div class="project-inner" style="--project-bg: ${proyecto.bgColor};">
          
          <!-- Encabezado editorial superior del proyecto -->
          <header class="project-header">
            <div class="project-meta-left">
              <span class="project-number">${proyecto.number}</span>
              <div class="project-title-group">
                <h3 class="project-name">${proyecto.title}</h3>
                <span class="project-type">${proyecto.type}</span>
              </div>
            </div>

            <div class="project-meta-right">
              <span class="project-year">${proyecto.year}</span>
            </div>
          </header>

          <!-- Marco de captura con fondo suave y parallax -->
          <a 
            href="${proyecto.link}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="project-frame"
            data-cursor-project="true"
            aria-label="Abrir sitio web de ${proyecto.title} en una nueva pestaña"
          >
            <div class="project-media-wrap">
              <!-- Captura Desktop (visible en tablet / escritorio) -->
              <img 
                src="${proyecto.images.desktop}" 
                alt="Captura de escritorio de ${proyecto.title}" 
                class="project-img project-img--desktop" 
                loading="lazy"
                onerror="window.handleImageError(this, '${proyecto.title.replace(/'/g, "\\'")}', false);"
              />

              <!-- Captura Mobile (visible en dispositivos móviles) -->
              <img 
                src="${proyecto.images.mobile}" 
                alt="Captura de celular de ${proyecto.title}" 
                class="project-img project-img--mobile" 
                loading="lazy"
                onerror="window.handleImageError(this, '${proyecto.title.replace(/'/g, "\\'")}', true);"
              />

              <!-- Botón flotante para dispositivos táctiles o fallback sin cursor custom -->
              <div class="project-hover-badge" aria-hidden="true">
                <span>Ver sitio ↗</span>
              </div>
            </div>
          </a>

          <!-- Pie del proyecto: descripción concisa y link discreto -->
          <footer class="project-footer">
            <p class="project-description">${proyecto.description}</p>
            <a 
              href="${proyecto.link}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="project-cta-link"
              aria-label="Ver el sitio de ${proyecto.title} en una nueva pestaña"
            >
              <span>Ver sitio</span>
              <span class="arrow-glyph" aria-hidden="true">→</span>
            </a>
          </footer>

        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = html;
}

/* ====================================================================
   4. PANTALLA DE CARGA (Preloader breve, máx 1.5s)
   ==================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hidePreloader = () => {
    if (preloader.classList.contains('is-hidden')) return;
    preloader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');

    // Desencadenar animación del hero tras ocultar preloader
    setTimeout(() => {
      document.body.classList.add('hero-ready');
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 200);
  };

  // Garantizar cierre en máximo 1.2 segundos para una experiencia ágil
  window.addEventListener('load', () => {
    setTimeout(hidePreloader, 750);
  });

  // Timeout de seguridad si el evento load demora
  setTimeout(hidePreloader, 1300);
}

/* ====================================================================
   5. MENÚ LATERAL (Botón "@", cerrar con X o ESC)
   ==================================================================== */
function initSideMenu() {
  const menuTrigger = document.getElementById('menu-trigger');
  const menuClose = document.getElementById('menu-close');
  const sideDrawer = document.getElementById('side-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!menuTrigger || !sideDrawer) return;

  let lastActiveElement = null;

  function openMenu() {
    lastActiveElement = document.activeElement;
    sideDrawer.classList.add('is-open');
    if (drawerBackdrop) drawerBackdrop.classList.add('is-open');
    menuTrigger.setAttribute('aria-expanded', 'true');
    sideDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-locked');

    // Foco accesible al botón de cerrar
    if (menuClose) {
      setTimeout(() => menuClose.focus(), 150);
    }
  }

  function closeMenu() {
    sideDrawer.classList.remove('is-open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('is-open');
    menuTrigger.setAttribute('aria-expanded', 'false');
    sideDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-locked');

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  menuTrigger.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMenu);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideDrawer.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Atrapado de foco accesible (Focus Trap)
  sideDrawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = sideDrawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  });
}

/* ====================================================================
   6. CURSOR PERSONALIZADO (Solo en escritorio con mouse)
   ==================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const cursorLabel = document.getElementById('cursor-label');
  if (!cursor) return;

  // Desactivar en táctiles o si prefiere reducción de movimiento
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReduced) {
    cursor.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let isHoveringLink = false;
  let isHoveringProject = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('is-active');
  });

  // Render loop fluido con inercia elegante
  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Escuchar hovers sobre links y botones
  function attachCursorListeners() {
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (!el.closest('[data-cursor-project]')) {
          cursor.classList.add('cursor-hover-link');
          isHoveringLink = true;
        }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover-link');
        isHoveringLink = false;
      });
    });

    const projectFrames = document.querySelectorAll('[data-cursor-project]');
    projectFrames.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover-project');
        if (cursorLabel) cursorLabel.textContent = 'Ver sitio ↗';
        isHoveringProject = true;
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover-project');
        if (cursorLabel) cursorLabel.textContent = '';
        isHoveringProject = false;
      });
    });
  }

  attachCursorListeners();

  // Ocultar al salir de la ventana
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-active');
  });
}

/* ====================================================================
   7. SCROLL SUAVE CON LENIS (CDN) & INTEGRACIÓN GSAP
   ==================================================================== */
let lenisInstance = null;

function initSmoothScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    // Sincronizar Lenis con GSAP ScrollTrigger
    if (window.gsap && window.ScrollTrigger) {
      lenisInstance.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }
}

/* ====================================================================
   8. ANIMACIONES CON GSAP & SCROLLTRIGGER
   (Revelado de frase palabra por palabra, parallax en marcos y fotos)
   ==================================================================== */
function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal-on-scroll, .statement-word').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Revelado progresivo de la frase de presentación
    const statementText = document.querySelector('.statement-headline');
    if (statementText) {
      // Envolver cada palabra en un span para revelar palabra por palabra al hacer scroll
      const rawText = statementText.textContent.trim();
      const words = rawText.split(/\s+/);
      statementText.innerHTML = words
        .map((w) => `<span class="statement-word">${w}</span>`)
        .join(' ');

      const wordSpans = statementText.querySelectorAll('.statement-word');

      gsap.fromTo(
        wordSpans,
        { opacity: 0.18, y: 4 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.section-statement',
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.8
          }
        }
      );
    }

    // 2. Parallax suave en las imágenes de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      const desktopImg = card.querySelector('.project-img--desktop');
      if (desktopImg) {
        gsap.fromTo(
          desktopImg,
          { yPercent: -5, scale: 1.04 },
          {
            yPercent: 5,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });

    // 3. Parallax sutil en la foto de Sobre Mí
    const aboutPhoto = document.querySelector('.about-photo');
    if (aboutPhoto) {
      gsap.fromTo(
        aboutPhoto,
        { yPercent: -6, scale: 1.05 },
        {
          yPercent: 6,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.section-about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }

    // 4. Aparición suave de elementos genéricos
    gsap.utils.toArray('.reveal-on-scroll').forEach((elem) => {
      gsap.fromTo(
        elem,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

  } else {
    // Fallback nativo con IntersectionObserver si no cargó el CDN de GSAP
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-on-scroll, .statement-headline, .project-card').forEach((el) => {
      observer.observe(el);
    });
  }
}

/* ====================================================================
   9. AÑO DINÁMICO EN FOOTER
   ==================================================================== */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ====================================================================
   10. SCROLL INDICATOR CLICK
   ==================================================================== */
function initScrollIndicator() {
  const indicator = document.getElementById('scroll-indicator-btn');
  if (!indicator) return;

  indicator.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById('statement-section') || document.getElementById('proyectos');
    if (target) {
      if (lenisInstance) {
        lenisInstance.scrollTo(target, { offset: -40 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

/* ====================================================================
   INICIALIZACIÓN
   ==================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initPreloader();
  initSideMenu();
  initCustomCursor();
  initSmoothScroll();
  initScrollAnimations();
  initDynamicYear();
  initScrollIndicator();
});
