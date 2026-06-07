(function () {
  'use strict';

  var LANG_KEY = 'cardlab-lang';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var I18N = {
    en: {
      'meta.title': 'Digitalizate.pe - Soluciones digitales',
      'nav.brand': 'Digitalizate.pe',
      'nav.lang': 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©',
      'hero.eyebrow': 'Soluciones digitales',
      'hero.title': 'Tecnología para negocios que crecen',
      'hero.sub':
        'Glass, neon depth, and tactile motion â€” hover cards for parallax, then open the spotlight deck. Built to scale from prototype to production.',
      'hero.cta1': 'Ver soluciones',
      'hero.cta2': 'Rutas destacadas',
      'sec.grid': 'Soluciones Digitalizate.pe',
      'sec.grid.sub': 'Explora nuestras áreas principales: software, hardware con soporte digital, capacitaciones, comunidad y diseño gráfico.',
      'sec.orbit': 'Rutas destacadas',
      'sec.orbit.sub': 'Cuatro rutas para iniciar o fortalecer la presencia digital de tu negocio.',
      'card.orb.title': 'Producto de software',
      'card.orb.text': 'Sistemas web, puntos de venta, automatizaciones y plataformas a medida.',
      'card.chamfer.title': 'Productos de hardware',
      'card.chamfer.text': 'Equipos, componentes y soluciones físicas para que tu infraestructura trabaje sin fricción. Además, soporte digital y acompañamiento para mejorar, mantener y escalar tus herramientas digitales.',
      'card.brutal.title': 'Capacitaciones',
      'card.brutal.text': 'Talleres prácticos para aprender herramientas digitales con proyectos reales.',
      'card.cinema.title': 'Únete a nosotros',
      'card.cinema.text': 'Forma parte de una comunidad que crea y entrega tecnología con impacto real.',
      'card.facet.title': 'Diseño gráfico',
      'card.facet.text': 'Identidad visual, piezas comerciales y contenido para comunicar mejor tu marca.',
      'card.stack.title': 'Productos de hardware',
      'card.stack.text': 'Equipos, componentes, soporte digital y acompañamiento para mantener tus herramientas digitales.',
      'cta.more': 'Consultar',
      'carousel.1t': 'Software',
      'carousel.1d': 'Aplicaciones, sistemas y automatizaciones hechas a la medida.',
      'carousel.2t': 'Hardware',
      'carousel.2d': 'Equipos y componentes seleccionados para trabajar con estabilidad.',
      'carousel.3t': 'Capacitaciones',
      'carousel.3d': 'Aprendizaje práctico para equipos, emprendedores y estudiantes.',
      'carousel.4t': 'Diseño',
      'carousel.4d': 'Piezas gráficas e identidad visual para vender con claridad.',
      'footer.note': 'Digitalizate.pe - Soluciones digitales para negocios en movimiento.',
    },
    ar: {
      'meta.title': 'Ù…Ø®ØªØ¨Ø± Ø§Ù„Ø¨Ø·Ø§Ù‚Ø§Øª Ø«Ù„Ø§Ø«ÙŠØ© Ø§Ù„Ø£Ø¨Ø¹Ø§Ø¯',
      'nav.brand': 'Ù…Ø®ØªØ¨Ø± Ø§Ù„Ø¨Ø·Ø§Ù‚Ø§Øª',
      'nav.lang': 'English',
      'hero.eyebrow': 'Ù…Ø®ØªØ¨Ø± Ø£Ø´ÙƒØ§Ù„ ØªÙØ§Ø¹Ù„ÙŠ',
      'hero.title': 'Ø¨Ø·Ø§Ù‚Ø§Øª ÙˆØ§Ø¬Ù‡Ø© Ø¨Ø¹Ù…Ù‚ Ø¨ØµØ±ÙŠ',
      'hero.sub':
        'Ø²Ø¬Ø§Ø¬ØŒ Ù†ÙŠÙˆÙ†ØŒ ÙˆØ­Ø±ÙƒØ© Ù„Ù…Ø³ÙŠØ© â€” Ù…Ø±Ù‘Ø± Ø¹Ù„Ù‰ Ø§Ù„Ø¨Ø·Ø§Ù‚Ø§Øª Ù„Ù„Ø¹Ù…Ù‚ØŒ Ø«Ù… Ø§ÙØªØ­ Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ù…Ù…ÙŠØ². Ø¬Ø§Ù‡Ø² Ù…Ù† Ø§Ù„Ù†Ù…ÙˆØ°Ø¬ Ø¥Ù„Ù‰ Ø§Ù„Ø¥Ù†ØªØ§Ø¬.',
      'hero.cta1': 'Ø§Ø³ØªÙƒØ´Ù Ø§Ù„Ø´Ø¨ÙƒØ©',
      'hero.cta2': 'Ø¹Ø±Ø¶ Ù…Ù…ÙŠØ²',
      'sec.grid': 'Ù†Ø¸Ø§Ù… Ø§Ù„Ø£Ø´ÙƒØ§Ù„',
      'sec.grid.sub': 'Ø³ØªØ© Ø£Ù†Ù…Ø§Ø·: Ø²Ø¬Ø§Ø¬ Ø¯Ø§Ø¦Ø±ÙŠØŒ Ù‚Øµ Ù…Ø§Ø¦Ù„ØŒ Ø³Ø·Ø­ ØµÙ„Ø¨ØŒ Ø¹Ø±ÙŠØ¶ Ø³ÙŠÙ†Ù…Ø§Ø¦ÙŠØŒ ÙˆØ¬Ù‡ Ø¨Ù„ÙˆØ±ÙŠØŒ Ø·Ø¨Ù‚Ø§Øª Ù…ÙƒØ¯Ø³Ø©.',
      'sec.orbit': 'Ø¹Ø±Ø¶ Ù…Ù…ÙŠØ²',
      'sec.orbit.sub': 'Ø£Ø±Ø¨Ø¹ Ù„ÙˆØ­Ø§Øª ÙÙŠ Ù…Ø³Ø±Ø­ Ø£ÙÙ‚ÙŠ Ø«Ø§Ø¨Øª â€” Ø£Ø³Ù‡Ù…ØŒ Ù†Ù‚Ø§Ø·ØŒ Ù„ÙˆØ­Ø© Ù…ÙØ§ØªÙŠØ­ØŒ ÙˆØ³Ø­Ø¨.',
      'card.orb.title': 'Ø²Ø¬Ø§Ø¬ Ø¯Ø§Ø¦Ø±ÙŠ',
      'card.orb.text': 'Ø¬Ø³Ù… Ù†Ø§Ø¹Ù… Ù…Ø¹ Ø²Ø¬Ø§Ø¬ Ù…ÙƒØ¯Ø³ ÙˆØ­Ù„Ù‚Ø§Øª Ø¹Ù…Ù‚.',
      'card.chamfer.title': 'Ù‚Øµ Ù…Ø§Ø¦Ù„',
      'card.chamfer.text': 'Ø²ÙˆØ§ÙŠØ§ Ø¯Ù‚ÙŠÙ‚Ø© Ø¹Ø¨Ø± clip-path â€” ÙˆØ§Ø¶Ø­ Ø¹Ù„Ù‰ Ø§Ù„ÙˆØ§Ø¬Ù‡Ø§Øª Ø§Ù„Ø¯Ø§ÙƒÙ†Ø©.',
      'card.brutal.title': 'Ø³Ø·Ø­ ØµÙ„Ø¨',
      'card.brutal.text': 'Ø¥Ø·Ø§Ø± Ø¹Ø§Ù„ÙŠ Ø§Ù„ØªØ¨Ø§ÙŠÙ† ÙˆØ¸Ù„ Ø­Ø§Ø¯ ÙˆØ´Ø±ÙŠØ· Ù„ÙˆÙ†ÙŠ.',
      'card.cinema.title': 'Ø¹Ø±ÙŠØ¶ Ø³ÙŠÙ†Ù…Ø§Ø¦ÙŠ',
      'card.cinema.text': 'Ù„ÙˆØ­Ø© Ø£ÙÙ‚ÙŠØ© Ù„Ù„Ù…Ù‚Ø§ÙŠÙŠØ³ Ø£Ùˆ Ø¨Ø·Ø§Ù‚Ø§Øª Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ….',
      'card.facet.title': 'ÙˆØ¬Ù‡ Ø¨Ù„ÙˆØ±ÙŠ',
      'card.facet.text': 'ØªØ¯Ø±Ø¬ Ø²Ø§ÙˆÙŠ Ù…Ø¹ Ù„Ù…Ø¹Ø§Ù† Ù…Ù†Ø´ÙˆØ±ÙŠ.',
      'card.stack.title': 'Ø·Ø¨Ù‚Ø§Øª',
      'card.stack.text': 'Ø«Ù„Ø§Ø« Ø·Ø¨Ù‚Ø§Øª Ø¹Ø§Ø¦Ù…Ø© Ù…Ø¹ Ø§Ù†Ø²ÙŠØ§Ø­ Ø¨Ø³ÙŠØ· Ø¹Ù†Ø¯ Ø§Ù„Ù…Ø±ÙˆØ±.',
      'cta.more': 'ÙØªØ­',
      'carousel.1t': 'Ø¥Ø´Ø§Ø±Ø©',
      'carousel.1d': 'Ù…ÙŠØ²Ø§Ù†ÙŠØ§Øª Ø§Ù„ØªØ£Ø®ÙŠØ± ÙˆØ§Ù„ØªØªØ¨Ø¹ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±.',
      'carousel.2t': 'Ø´Ø¨ÙƒØ©',
      'carousel.2d': 'Ø¹Ù‚Ø¯ Ù…ÙˆØ²Ø¹Ø© Ù…Ø¹ Ø­Ù„Ù‚Ø§Øª ØµØ­Ø©.',
      'carousel.3t': 'Ø®Ø²Ù†Ø©',
      'carousel.3d': 'Ø­Ù…ÙˆÙ„Ø© Ù…Ø´ÙØ±Ø© ÙÙŠ Ø§Ù„Ø³ÙƒÙˆÙ†.',
      'carousel.4t': 'Ù†Ø¨Ø¶',
      'carousel.4d': 'Ø¨Ø« Ù„Ø­Ø¸ÙŠ Ø¥Ù„Ù‰ Ø§Ù„Ø­Ø§ÙØ©.',
      'footer.note': 'Ø¨ÙÙ†ÙŠ Ø¨Ù€ HTML Ø¯Ù„Ø§Ù„ÙŠ ÙˆØªØ­ÙˆÙŠÙ„Ø§Øª CSS Ø«Ù„Ø§Ø«ÙŠØ© Ø§Ù„Ø£Ø¨Ø¹Ø§Ø¯.',
    },
  };

  function getLang() {
    return localStorage.getItem(LANG_KEY) || 'en';
  }

  function applyLang(lang) {
    var pack = I18N[lang] || I18N.en;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem(LANG_KEY, lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key && pack[key]) el.textContent = pack[key];
    });

    var langBtn = document.querySelector('[data-lang-toggle]');
    if (langBtn) {
      langBtn.textContent = lang === 'en' ? I18N.en['nav.lang'] : I18N.ar['nav.lang'];
      langBtn.setAttribute('aria-label', lang === 'en' ? 'Switch to Arabic' : 'Ø§Ù„ØªØ¨Ø¯ÙŠÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠØ©');
    }
  }

  function initLang() {
    var btn = document.querySelector('[data-lang-toggle]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      applyLang(getLang() === 'en' ? 'ar' : 'en');
    });
    applyLang(getLang());
  }

  function initReveal() {
    var blocks = [].slice.call(document.querySelectorAll('.section--reveal'));
    if (!blocks.length) return;
    if (reduced) {
      blocks.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        });
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    blocks.forEach(function (el) {
      io.observe(el);
    });
  }

  function initHeroMotion() {
    var shell = document.querySelector('[data-hero-motion]');
    if (!shell || reduced) return;
    var motionFrame = 0;
    var pendingEvent = null;
    shell.addEventListener('mousemove', function (e) {
      pendingEvent = e;
      if (motionFrame) return;
      motionFrame = requestAnimationFrame(function () {
        var r = shell.getBoundingClientRect();
        var x = (pendingEvent.clientX - r.left) / r.width - 0.5;
        var y = (pendingEvent.clientY - r.top) / r.height - 0.5;
        shell.style.setProperty('--hx', (x * 28).toFixed(1) + 'px');
        shell.style.setProperty('--hy', (y * 22).toFixed(1) + 'px');
        motionFrame = 0;
      });
    }, { passive: true });
    shell.addEventListener('mouseleave', function () {
      cancelAnimationFrame(motionFrame);
      motionFrame = 0;
      shell.style.setProperty('--hx', '0px');
      shell.style.setProperty('--hy', '0px');
    });
  }

  /* â€”â€”â€” Spotlight stage carousel (2D translate; viewport dir=ltr for stable math) â€”â€”â€” */
  function initCarousel() {
    var root = document.querySelector('[data-carousel]');
    if (!root) return;
    var viewport = root.querySelector('[data-carousel-viewport]');
    var track = root.querySelector('[data-carousel-track]');
    var panels = [].slice.call(root.querySelectorAll('[data-carousel-panel]'));
    var prev = root.querySelector('[data-carousel-prev]');
    var next = root.querySelector('[data-carousel-next]');
    var dots = [].slice.call(root.querySelectorAll('[data-carousel-dots] button'));
    var live = root.querySelector('[data-carousel-live]');
    var n = panels.length;
    if (n < 1 || !track || !viewport) return;

    var idx = 0;
    var w = 0;
    var swipe = { active: false, startX: 0, pid: null };

    function measure() {
      w = viewport.clientWidth || 0;
      if (w < 1) return;
      panels.forEach(function (p) {
        p.style.flex = '0 0 ' + w + 'px';
        p.style.width = w + 'px';
        p.style.maxWidth = w + 'px';
      });
    }

    function announce() {
      if (!live) return;
      var lang = getLang();
      live.textContent =
        lang === 'ar' ? 'Ø§Ù„Ø´Ø±ÙŠØ­Ø© ' + (idx + 1) + ' Ù…Ù† ' + n : 'Ruta ' + (idx + 1) + ' de ' + n;
    }

    function render() {
      if (w < 1) measure();
      var offset = -idx * w;
      if (!reduced) {
        track.style.transition = 'transform 0.55s cubic-bezier(0.2, 0.85, 0.25, 1)';
      } else {
        track.style.transition = 'none';
      }
      track.style.transform = 'translate3d(' + offset + 'px,0,0)';
      dots.forEach(function (d, j) {
        var on = j === idx;
        d.classList.toggle('is-active', on);
        d.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      announce();
    }

    function go(delta) {
      idx = (idx + delta + n * 100) % n;
      render();
    }

    measure();
    if (w < 1) {
      requestAnimationFrame(function () {
        measure();
        render();
      });
    } else {
      render();
    }

    if (typeof ResizeObserver !== 'undefined') {
      var ro = new ResizeObserver(function () {
        measure();
        render();
      });
      ro.observe(viewport);
    } else {
      window.addEventListener('resize', function () {
        measure();
        render();
      });
    }

    if (prev)
      prev.addEventListener('click', function (e) {
        e.stopPropagation();
        var rtlNow = document.documentElement.getAttribute('dir') === 'rtl';
        go(rtlNow ? 1 : -1);
      });
    if (next)
      next.addEventListener('click', function (e) {
        e.stopPropagation();
        var rtlNow = document.documentElement.getAttribute('dir') === 'rtl';
        go(rtlNow ? -1 : 1);
      });

    dots.forEach(function (d, j) {
      d.addEventListener('click', function () {
        idx = j;
        render();
      });
    });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        var rtlNow = document.documentElement.getAttribute('dir') === 'rtl';
        go(rtlNow ? 1 : -1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        var rtlNow = document.documentElement.getAttribute('dir') === 'rtl';
        go(rtlNow ? -1 : 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        idx = 0;
        render();
      } else if (e.key === 'End') {
        e.preventDefault();
        idx = n - 1;
        render();
      }
    });

    viewport.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      swipe.active = true;
      swipe.startX = e.clientX;
      swipe.pid = e.pointerId;
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch (err) {}
    });

    viewport.addEventListener('pointerup', function (e) {
      if (!swipe.active || e.pointerId !== swipe.pid) return;
      swipe.active = false;
      swipe.pid = null;
      var dx = e.clientX - swipe.startX;
      if (Math.abs(dx) < 40) return;
      if (dx < 0) go(1);
      else go(-1);
    });

    viewport.addEventListener('pointercancel', function () {
      swipe.active = false;
      swipe.pid = null;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initLang();
      initReveal();
      initHeroMotion();
      initCarousel();
    });
  } else {
    initLang();
    initReveal();
    initHeroMotion();
    initCarousel();
  }
})();

