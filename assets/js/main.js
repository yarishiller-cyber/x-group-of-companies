/* main.js — header state, mobile nav, and a self-contained scroll-reveal.
   No external dependencies: reveals work offline and never trap content hidden. */
(function () {
  "use strict";
  var root = document.documentElement;

  // ---- Sticky header state ----
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.setAttribute("data-scrolled", "");
      else header.removeAttribute("data-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---- Mobile navigation ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("mobile-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.hidden = open;
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { toggle.setAttribute("aria-expanded", "false"); nav.hidden = true; }
    });
  }

  // ---- Header dropdown (touch + keyboard; hover is handled in CSS) ----
  var ddButtons = Array.prototype.slice.call(document.querySelectorAll(".nav-top"));
  function closeAllDD(except) {
    ddButtons.forEach(function (b) { if (b !== except) b.setAttribute("aria-expanded", "false"); });
  }
  ddButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var open = btn.getAttribute("aria-expanded") === "true";
      closeAllDD(btn);
      btn.setAttribute("aria-expanded", String(!open));
    });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAllDD(null); });
  document.addEventListener("click", function (e) { if (!e.target.closest(".has-dd")) closeAllDD(null); });

  // ---- Pointer parallax for floating tile clusters (home hero, people) ----
  // Fine pointers only; reduced-motion users get the static layout. The
  // container's --px/--py drive each tile's translate via its own --d depth.
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!reduceMotion && finePointer) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-parallax]"), function (box) {
      var host = box.closest("section") || box, raf = null, tx = 0, ty = 0;
      host.addEventListener("pointermove", function (e) {
        var r = host.getBoundingClientRect();
        tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
        ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
        if (!raf) raf = requestAnimationFrame(function () {
          box.style.setProperty("--px", tx.toFixed(3)); box.style.setProperty("--py", ty.toFixed(3)); raf = null;
        });
      });
      host.addEventListener("pointerleave", function () { box.style.setProperty("--px", 0); box.style.setProperty("--py", 0); });
    });
  }

  // ---- Hover groups: hovering/focusing [data-key] in one container highlights
  //      every [data-key] match across all containers of the same group
  //      (territory map legend ↔ map, market cards ↔ world map). ----
  (function () {
    var groups = {};
    Array.prototype.forEach.call(document.querySelectorAll("[data-hover-group]"), function (box) {
      var g = box.getAttribute("data-hover-group"); (groups[g] = groups[g] || []).push(box);
    });
    Object.keys(groups).forEach(function (g) {
      var boxes = groups[g];
      var items = [];
      boxes.forEach(function (b) { items = items.concat(Array.prototype.slice.call(b.querySelectorAll("[data-key]"))); });
      function set(key, also) {
        var keys = key ? [key].concat((also || "").split(" ").filter(Boolean)) : [];
        var all = keys.indexOf("*") !== -1;
        boxes.forEach(function (b) { b.classList.toggle("is-dim", !!key); });
        items.forEach(function (el) { el.classList.toggle("is-on", !!key && (all || keys.indexOf(el.getAttribute("data-key")) !== -1)); });
      }
      items.forEach(function (el) {
        var key = el.getAttribute("data-key"); if (!key) return;
        var also = el.getAttribute("data-also") || "";
        el.addEventListener("pointerenter", function () { set(key, also); });
        el.addEventListener("focusin", function () { set(key, also); });
        el.addEventListener("pointerleave", function () { set(null); });
        el.addEventListener("focusout", function () { set(null); });
      });
    });
  })();

  // ---- Scroll reveal ----
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealables = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  function revealAll() { revealables.forEach(function (el) { el.classList.add("is-in"); }); }

  if (reduce || !("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  // Stagger: give each child of a [data-stagger] group an increasing delay.
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    Array.prototype.slice.call(group.children).forEach(function (child, i) {
      if (!child.hasAttribute("data-reveal")) child.setAttribute("data-reveal", "");
      child.style.transitionDelay = Math.min(i * 70, 500) + "ms";
      if (revealables.indexOf(child) === -1) revealables.push(child);
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  revealables.forEach(function (el) { io.observe(el); });

  // Failsafe: if anything is still hidden after 3s, reveal it.
  setTimeout(revealAll, 3000);
})();
