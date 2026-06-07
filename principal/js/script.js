(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initReveal() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll(".section--reveal"));
    if (!blocks.length) return;

    if (reduced || !("IntersectionObserver" in window)) {
      blocks.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    blocks.forEach(function (el) {
      io.observe(el);
    });
  }

  function initHeroMotion() {
    var shell = document.querySelector("[data-hero-motion]");
    if (!shell || reduced) return;

    shell.addEventListener("mousemove", function (event) {
      var rect = shell.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;
      shell.style.setProperty("--hx", (x * 28).toFixed(1) + "px");
      shell.style.setProperty("--hy", (y * 22).toFixed(1) + "px");
    });

    shell.addEventListener("mouseleave", function () {
      shell.style.setProperty("--hx", "0px");
      shell.style.setProperty("--hy", "0px");
    });
  }

  function initCarousel() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;

    var viewport = root.querySelector("[data-carousel-viewport]");
    var track = root.querySelector("[data-carousel-track]");
    var panels = Array.prototype.slice.call(root.querySelectorAll("[data-carousel-panel]"));
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-carousel-dots] button"));
    var live = root.querySelector("[data-carousel-live]");
    var index = 0;
    var width = 0;
    var swipe = { active: false, startX: 0, pointerId: null };

    if (!viewport || !track || !panels.length) return;

    function measure() {
      width = viewport.clientWidth || 0;
      panels.forEach(function (panel) {
        panel.style.flex = "0 0 " + width + "px";
        panel.style.width = width + "px";
        panel.style.maxWidth = width + "px";
      });
    }

    function announce() {
      if (live) live.textContent = "Ruta " + (index + 1) + " de " + panels.length;
    }

    function render() {
      if (width < 1) measure();
      track.style.transition = reduced ? "none" : "transform 0.55s cubic-bezier(0.2, 0.85, 0.25, 1)";
      track.style.transform = "translate3d(" + -index * width + "px, 0, 0)";
      dots.forEach(function (dot, dotIndex) {
        var active = dotIndex === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
      announce();
    }

    function go(delta) {
      index = (index + delta + panels.length) % panels.length;
      render();
    }

    measure();
    render();

    if ("ResizeObserver" in window) {
      new ResizeObserver(function () {
        measure();
        render();
      }).observe(viewport);
    } else {
      window.addEventListener("resize", function () {
        measure();
        render();
      });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        go(-1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        go(1);
      });
    }

    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener("click", function () {
        index = dotIndex;
        render();
      });
    });

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "Home") {
        event.preventDefault();
        index = 0;
        render();
      } else if (event.key === "End") {
        event.preventDefault();
        index = panels.length - 1;
        render();
      }
    });

    viewport.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      swipe.active = true;
      swipe.startX = event.clientX;
      swipe.pointerId = event.pointerId;
      try {
        viewport.setPointerCapture(event.pointerId);
      } catch (error) {}
    });

    viewport.addEventListener("pointerup", function (event) {
      var deltaX;
      if (!swipe.active || event.pointerId !== swipe.pointerId) return;
      swipe.active = false;
      swipe.pointerId = null;
      deltaX = event.clientX - swipe.startX;
      if (Math.abs(deltaX) < 40) return;
      go(deltaX < 0 ? 1 : -1);
    });

    viewport.addEventListener("pointercancel", function () {
      swipe.active = false;
      swipe.pointerId = null;
    });
  }

  function init() {
    initReveal();
    initHeroMotion();
    initCarousel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
