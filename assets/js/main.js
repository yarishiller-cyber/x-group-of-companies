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
