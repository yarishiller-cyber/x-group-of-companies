/* capmap.js — interactive operating-model diagram (state-driven cross-highlighting).
   Zero dependencies. State = ONE attribute: section#capmap.dataset.active */
(function () {
  "use strict";
  var section = document.getElementById("capmap");
  if (!section) return;

  var svg = section.querySelector(".capmap-wires");
  var liveRegion = section.querySelector(".capmap-live");
  var chips = Array.prototype.slice.call(section.querySelectorAll(".chip[data-cap]"));
  var cards = Array.prototype.slice.call(section.querySelectorAll(".capmap-card"));

  // Captions matrix: capability → brand → text
  var captions = {
    finance: {
      doors: "One financial standard across all brands",
      hydraulic: "Consolidated reporting, budgeting and cash management",
      allegro: "Group-level controls and reporting"
    },
    procurement: {
      doors: "Doors, springs and openers bought at scale",
      hydraulic: "Hydraulic components, vehicles and fuel at group rates",
      allegro: "Shared software licences and vendor leverage"
    },
    people: {
      doors: "Shared recruiting, training and WorkSafeBC compliance",
      hydraulic: "Field crews staffed through group hiring systems",
      allegro: "Specialist and technical recruiting support"
    },
    technology: {
      doors: "Shared CRM, dispatch and telephony",
      hydraulic: "Same dispatch stack, industrial workflows",
      allegro: "The Group's technology centre of gravity"
    },
    growth: {
      doors: "Local brand systems, SEO and reputation",
      hydraulic: "Industrial customer acquisition and analytics",
      allegro: "Attribution and analytics across the portfolio"
    },
    operations: {
      doors: "Shared dispatch, process design, field quality",
      hydraulic: "One-hour response target, group-run dispatch",
      allegro: "Turns operating data into better systems"
    },
    strategy: {
      doors: "Where the next local brand launches",
      hydraulic: "Proof the platform extends beyond doors",
      allegro: "Core of the international technology thesis"
    }
  };

  var pinned = false; // Track if state is pinned (last activation was a click)

  // Announce state change to aria-live
  function announce() {
    var cap = section.dataset.active;
    if (!cap) { liveRegion.textContent = ""; return; }
    var lines = [];
    cards.forEach(function (card) {
      var text = captions[cap] && captions[cap][card.dataset.brand];
      if (text) lines.push(card.querySelector("h3").textContent + ": " + text + ";");
    });
    liveRegion.textContent = lines.join(" ");
  }

  // Update aria-pressed on all chips
  function syncChips() {
    var cap = section.dataset.active;
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", chip.dataset.cap === cap ? "true" : "false");
    });
  }

  // Set state
  function setState(cap) {
    section.dataset.active = cap || "";
    pinned = !!cap;
    syncChips();
    announce();
    recomputeWires();
  }

  // Clear state
  function clearState() {
    setState("");
    pinned = false;
  }

  // Toggle on click
  function onChipClick(e) {
    var chip = e.target.closest(".chip[data-cap]");
    if (!chip) return;
    var cap = chip.dataset.cap;
    if (section.dataset.active === cap) clearState();
    else setState(cap);
  }

  // Hover preview (only on fine pointer + hover-capable devices)
  var canHover = window.matchMedia && window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  function onPointerOver(e) {
    if (!canHover || pinned) return;
    var chip = e.target.closest(".chip[data-cap]");
    if (chip) setState(chip.dataset.cap);
  }

  function onPointerOut(e) {
    if (!canHover || pinned) return;
    if (!e.relatedTarget || !section.contains(e.relatedTarget)) clearState();
  }

  // Keyboard preview
  function onFocusIn(e) {
    if (pinned) return;
    var chip = e.target.closest(".chip[data-cap]");
    if (chip) setState(chip.dataset.cap);
  }

  function onFocusOut(e) {
    if (pinned) return;
    if (!e.relatedTarget || !section.contains(e.relatedTarget)) clearState();
  }

  // Dismiss on Escape
  function onKeyDown(e) {
    if (e.key === "Escape") { e.preventDefault(); clearState(); }
  }

  // Dismiss pinned state on document click outside
  function onDocumentClick(e) {
    if (pinned && !section.contains(e.target)) clearState();
  }

  // SVG wire geometry
  function recomputeWires() {
    var sectionRect = section.getBoundingClientRect();
    svg.innerHTML = "";
    svg.setAttribute("viewBox", "0 0 " + sectionRect.width + " " + sectionRect.height);

    chips.forEach(function (chip) {
      var chipRect = chip.getBoundingClientRect();
      var x1 = chipRect.left - sectionRect.left + chipRect.width / 2;
      var y1 = chipRect.top - sectionRect.top + chipRect.height;

      cards.forEach(function (card) {
        var cardRect = card.getBoundingClientRect();
        var x2 = cardRect.left - sectionRect.left + cardRect.width / 2;
        var y2 = cardRect.top - sectionRect.top;

        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        var cy = (y1 + y2) / 2;
        path.setAttribute("d", "M " + x1 + " " + y1 + " C " + x1 + " " + cy + ", " + x2 + " " + cy + ", " + x2 + " " + y2);
        path.setAttribute("data-for", chip.dataset.cap);
        path.setAttribute("data-to", card.dataset.brand);
        path.setAttribute("pathLength", "1");
        svg.appendChild(path);
      });
    });
  }

  // ResizeObserver (throttled via requestAnimationFrame)
  var resizeScheduled = false;
  var resizeObserver = new ResizeObserver(function () {
    if (!resizeScheduled) {
      resizeScheduled = true;
      requestAnimationFrame(function () {
        recomputeWires();
        resizeScheduled = false;
      });
    }
  });
  resizeObserver.observe(section);

  // Event listeners (delegated on section)
  section.addEventListener("click", onChipClick);
  if (canHover) {
    section.addEventListener("pointerover", onPointerOver);
    section.addEventListener("pointerout", onPointerOut);
  }
  section.addEventListener("focusin", onFocusIn);
  section.addEventListener("focusout", onFocusOut);
  section.addEventListener("keydown", onKeyDown);
  document.addEventListener("click", onDocumentClick);

  // Initial render
  recomputeWires();
})();
