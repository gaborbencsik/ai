// OMP Annotator — content script (v0.2).
//
// Injected on demand by the background worker when the user clicks
// Activate in the popup. Provides:
//   • hover-outline + element-click annotation
//   • text-selection annotation with quick-action toolbar
//   • kind-based annotations (delete / good / comment / element)
//   • in-page sidebar with the queue, an optional message, and Send
//   • WebSocket link to the bridge for agent-driven reload / highlight
//   • idempotent init — re-injecting is a no-op
//
// Storage: `omp-annot:<sessionId>` — one queue per bridge session,
// isolated from any previous run.

(() => {
  if (window.__ompAnnotatorLoaded) return;
  window.__ompAnnotatorLoaded = true;

  const STORAGE_PREFIX = "omp-annot:";
  const ctxAlive = () => {
    try { return !!(chrome && chrome.runtime && chrome.runtime.id && chrome.storage?.local); }
    catch { return false; }
  };
  if (!ctxAlive()) {
    console.warn("[omp-annotator] extension context invalid — reload the tab");
    return;
  }

  const state = {
    bridge: null,   // { base, port, sessionId, wsUrl }
    ws: null,
    wsRetryTimer: null,
    hoveredEl: null,
    hoverOverlay: null,
    selPop: null,
    selOverlay: null,
    selInfo: null,
    selEl: null,
    sidebar: null,
    sidebarOpen: false,
    badge: null,
    reloadPill: null,
    reloadTimer: null,
    modalOpen: false,
    armed: false,
  };

  // ─── Bridge discovery ────────────────────────────────────────────────
  function askBackground(op, payload) {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage({ op, ...(payload ?? {}) }, (res) => {
          if (chrome.runtime.lastError) return resolve({ ok: false, error: chrome.runtime.lastError.message });
          resolve(res ?? { ok: false, error: "no response" });
        });
      } catch (err) {
        resolve({ ok: false, error: String(err) });
      }
    });
  }

  async function detectBridge() {
    const info = await askBackground("getBridgeInfo");
    if (!info?.ok) return null;
    try {
      const r = await fetch(`${info.base}/__bridge/config`, { cache: "no-store", credentials: "omit" });
      if (!r.ok) return null;
      const cfg = await r.json();
      if (typeof cfg?.sessionId !== "string") return null;
      return { base: info.base, port: cfg.port, sessionId: cfg.sessionId, wsUrl: cfg.wsUrl };
    } catch {
      return null;
    }
  }

  // ─── XPath / snippet / bbox ─────────────────────────────────────────
  function xpathFor(el) {
    if (!(el instanceof Element)) return "";
    if (el.id && document.querySelectorAll(`[id="${CSS.escape(el.id)}"]`).length === 1) {
      return `//*[@id="${el.id}"]`;
    }
    const parts = [];
    let cur = el;
    while (cur && cur.nodeType === 1 && cur !== document.documentElement) {
      const tag = cur.tagName.toLowerCase();
      let idx = 1;
      let sib = cur.previousElementSibling;
      while (sib) {
        if (sib.tagName === cur.tagName) idx++;
        sib = sib.previousElementSibling;
      }
      parts.unshift(`${tag}[${idx}]`);
      if (cur.parentElement?.id &&
          document.querySelectorAll(`[id="${CSS.escape(cur.parentElement.id)}"]`).length === 1) {
        parts.unshift(`//*[@id="${cur.parentElement.id}"]`);
        return parts.join("/").replace(/^\/\/\*\[@id="([^"]+)"\]\//, '//*[@id="$1"]/');
      }
      cur = cur.parentElement;
    }
    return `/html/${parts.join("/")}`;
  }

  function snippetFor(el) {
    const clone = el.cloneNode(false);
    const open = clone.outerHTML || "";
    const inner = (el.textContent || "").trim().slice(0, 240);
    return open.replace(/>\s*<\/[^>]+>$/, `>${inner}</${el.tagName.toLowerCase()}>`);
  }

  function bboxFor(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height };
  }

  function xpathQuery(xp) {
    try {
      const r = document.evaluate(xp, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
      return r.singleNodeValue;
    } catch { return null; }
  }

  // ─── Storage (per bridge session) ───────────────────────────────────
  const storageKey = () => `${STORAGE_PREFIX}${state.bridge.sessionId}`;

  async function loadAnnotations() {
    if (!state.bridge || !ctxAlive()) return [];
    try {
      const key = storageKey();
      const res = await chrome.storage.local.get(key);
      return Array.isArray(res[key]) ? res[key] : [];
    } catch (err) {
      console.warn("[omp-annotator] storage.get failed:", err);
      return [];
    }
  }

  async function saveAnnotations(list) {
    if (!state.bridge || !ctxAlive()) return;
    try {
      await chrome.storage.local.set({ [storageKey()]: list });
      askBackground("annotCount");
    } catch (err) {
      console.warn("[omp-annotator] storage.set failed:", err);
    }
  }

  async function addAnnotation(a) {
    const list = await loadAnnotations();
    const wasEmpty = list.length === 0;
    list.push(a);
    await saveAnnotations(list);
    await refreshSidebar();
    await refreshBadge();
    if (wasEmpty) openSidebar();
    return list.length;
  }

  async function doDelete(id) {
    const list = (await loadAnnotations()).filter((a) => a.id !== id);
    await saveAnnotations(list);
    await refreshSidebar();
    await refreshBadge();
    return list.length;
  }

  async function doClear() {
    await saveAnnotations([]);
    await refreshSidebar();
    await refreshBadge();
  }

  async function doSend(message) {
    if (!state.bridge) return { ok: false, error: "no_bridge" };
    const list = await loadAnnotations();
    if (list.length === 0) return { ok: false, error: "empty_queue" };
    const payload = {
      sessionId: state.bridge.sessionId,
      pageUrl: location.href,
      pageTitle: document.title,
      client: "omp-chrome/0.2.0",
      capturedAt: new Date().toISOString(),
      message: message || "",
      annotations: list,
    };
    try {
      const r = await fetch(`${state.bridge.base}/__bridge/send`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) return { ok: false, error: `http_${r.status}` };
      await saveAnnotations([]);
      await refreshSidebar();
      await refreshBadge();
      return { ok: true, count: list.length };
    } catch (err) {
      return { ok: false, error: String(err) };
    }
  }

  // ─── Arm mode ───────────────────────────────────────────────────────
  // The extension is DISARMED by default: normal browsing, no hover
  // outlines, no click hijack, no selection toolbar. Clicking the ✎ zone
  // on the bottom-left badge arms it for exactly one annotation, then it
  // auto-disarms.
  function arm() {
    if (state.armed) return;
    state.armed = true;
    document.documentElement.classList.add("omp-annot-armed");
    if (state.badge) state.badge.classList.add("omp-annot-badge--armed");
    toast("Annotator armed — pick one element or select text", 1600);
  }

  function disarm() {
    if (!state.armed) return;
    state.armed = false;
    document.documentElement.classList.remove("omp-annot-armed");
    if (state.badge) state.badge.classList.remove("omp-annot-badge--armed");
    setHovered(null);
    // Only clear the sel toolbar if it isn't mid-comment; user might have
    // opened the comment popover and we shouldn't drop their draft.
    if (state.selPop?.dataset.show !== "1") hideSelBar();
  }

  // ─── UI: floating badge (bottom-left) ──────────────────────────────
  function installBadge() {
    if (state.badge) return;
    const el = document.createElement("div");
    el.id = "omp-annot-badge";
    // Event delegation: refreshBadge() rewrites innerHTML, so per-child
    // listeners would be lost. The parent-level listener routes clicks by
    // data-act on the child that received the event.
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const act = e.target?.dataset?.act
        ?? e.target?.closest?.("[data-act]")?.dataset?.act;
      if (act === "sidebar") return openSidebar();
      // Default (including clicks on the ✎ or the badge chrome): toggle arm.
      if (state.armed) disarm();
      else arm();
    });
    document.documentElement.appendChild(el);
    state.badge = el;
    refreshBadge();
  }

  async function refreshBadge() {
    if (!state.badge) return;
    const list = await loadAnnotations();
    state.badge.innerHTML =
      `<span class="omp-annot-badge__arm" data-act="arm" title="Arm annotator (one shot)">✎</span>`
      + `<span class="omp-annot-badge__count" data-act="sidebar" title="Open queue">${list.length}</span>`;
    state.badge.classList.toggle("omp-annot-badge--has-queue", list.length > 0);
    state.badge.classList.toggle("omp-annot-badge--armed", state.armed);
    // Badge stays visible when the sidebar is open; the sidebar sits on
    // the right, the badge on the left, so there is no overlap and the
    // user can re-arm without closing the queue.
    state.badge.style.display = "";
  }

  // ─── UI: in-page sidebar ────────────────────────────────────────────
  function installSidebar() {
    if (state.sidebar) return;
    const el = document.createElement("aside");
    el.id = "omp-annot-sidebar";
    el.dataset.open = "0";
    el.innerHTML = `
      <header class="omp-annot-sb__header">
        <div>
          <div class="omp-annot-sb__title">OMP Annotator</div>
          <div class="omp-annot-sb__sub"></div>
        </div>
        <button class="omp-annot-sb__close" title="Close">×</button>
      </header>
      <div class="omp-annot-sb__hint">Select text, or click any element, to annotate.</div>
      <ul class="omp-annot-sb__list"></ul>
      <footer class="omp-annot-sb__footer">
        <textarea class="omp-annot-sb__msg" placeholder="Optional message to the agent…"></textarea>
        <div class="omp-annot-sb__row">
          <button class="omp-annot-sb__btn omp-annot-sb__btn--ghost" data-act="clear">Clear</button>
          <button class="omp-annot-sb__btn omp-annot-sb__btn--primary" data-act="send">Send to OMP</button>
        </div>
      </footer>
    `;
    document.documentElement.appendChild(el);
    swallowKeys(el.querySelector(".omp-annot-sb__msg"));

    el.querySelector(".omp-annot-sb__close").addEventListener("click", closeSidebar);
    el.addEventListener("click", handleSidebarClick);
    el.addEventListener("mouseover", handleSidebarHover);
    el.addEventListener("mouseout", handleSidebarHoverOut);
    state.sidebar = el;
  }

  async function handleSidebarClick(e) {
    const del = e.target.closest?.(".omp-annot-sb__del");
    if (del?.dataset?.id) {
      await doDelete(del.dataset.id);
      return;
    }
    const act = e.target.dataset?.act;
    if (act === "clear") {
      await doClear();
      toast("Cleared");
      return;
    }
    if (act === "send") {
      const msgEl = state.sidebar.querySelector(".omp-annot-sb__msg");
      const btn = state.sidebar.querySelector('[data-act="send"]');
      btn.disabled = true;
      const r = await doSend((msgEl.value || "").trim());
      btn.disabled = false;
      if (r.ok) {
        msgEl.value = "";
        toast(`Sent ${r.count} annotation${r.count === 1 ? "" : "s"} → OMP`);
      } else {
        toast(`Send failed: ${r.error}`);
      }
    }
  }

  function handleSidebarHover(e) {
    const li = e.target.closest?.("li[data-xpath]");
    if (!li) return;
    const el = xpathQuery(li.dataset.xpath);
    if (el) {
      el.classList.add("omp-annot-selected-outline");
      li._targetEl = el;
    }
  }
  function handleSidebarHoverOut(e) {
    const li = e.target.closest?.("li[data-xpath]");
    if (!li?._targetEl) return;
    li._targetEl.classList.remove("omp-annot-selected-outline");
    li._targetEl = null;
  }

  function openSidebar() {
    if (!state.sidebar) return;
    state.sidebarOpen = true;
    state.sidebar.dataset.open = "1";
    refreshSidebar();
  }
  function closeSidebar() {
    if (!state.sidebar) return;
    state.sidebarOpen = false;
    state.sidebar.dataset.open = "0";
  }

  const KIND_ICON = { delete: "🗑", good: "👍", comment: "💬", element: "📌", highlight: "🖍", note: "🗒" };

  async function refreshSidebar() {
    if (!state.sidebar || !state.bridge) return;
    const list = await loadAnnotations();
    state.sidebar.querySelector(".omp-annot-sb__sub").textContent =
      `session ${state.bridge.sessionId} · ${list.length} pending`;
    const listEl = state.sidebar.querySelector(".omp-annot-sb__list");
    listEl.innerHTML = "";
    if (list.length === 0) {
      const li = document.createElement("li");
      li.className = "omp-annot-sb__empty";
      li.textContent = "No annotations yet.";
      listEl.appendChild(li);
    } else {
      for (const a of list) {
        const li = document.createElement("li");
        li.dataset.xpath = a.xpath;
        const icon = KIND_ICON[a.kind] || "🗒";
        li.innerHTML = `
          <div class="omp-annot-sb__row">
            <span class="omp-annot-sb__kind">${icon}</span>
            <div class="omp-annot-sb__body">
              <div class="omp-annot-sb__note"></div>
              <div class="omp-annot-sb__path" title=""></div>
            </div>
            <button class="omp-annot-sb__del" data-id="${a.id}" title="Delete">✕</button>
          </div>
        `;
        li.querySelector(".omp-annot-sb__note").textContent =
          a.note?.trim() || a.selectedText?.trim().slice(0, 80) || `(${a.kind ?? "note"})`;
        const pathEl = li.querySelector(".omp-annot-sb__path");
        pathEl.textContent = a.xpath;
        pathEl.title = a.xpath;
        listEl.appendChild(li);
      }
    }
    state.sidebar.querySelector('[data-act="send"]').disabled = list.length === 0;
    state.sidebar.querySelector('[data-act="clear"]').disabled = list.length === 0;
  }

  // ─── UI: comment popover ────────────────────────────────────────────
  // Clicking an element or selecting text opens this popover directly.
  // No intermediate 3-button (Delete / Good / Comment) toolbar — the user
  // asked for a single "write a comment" surface, since the sidebar's
  // per-row controls already cover delete-after-the-fact.
  function installSelBar() {
    if (state.selPop) return;
    const pop = document.createElement("div");
    pop.id = "omp-annot-selpop";
    pop.dataset.show = "0";
    pop.innerHTML = `
      <div class="omp-annot-sp__quote"></div>
      <textarea placeholder="Comment on the selection / element…"></textarea>
      <div class="omp-annot-sp__actions">
        <button data-act="cancel">Cancel</button>
        <button data-act="save" class="omp-annot-sp__save">Save comment</button>
      </div>
    `;
    document.documentElement.appendChild(pop);
    swallowKeys(pop);
    pop.addEventListener("mousedown", (e) => e.stopPropagation());
    const ta = pop.querySelector("textarea");
    const save = () => {
      const note = (ta.value || "").trim();
      if (!note) return ta.focus();
      quickAdd("comment", note);
    };
    pop.addEventListener("click", (e) => {
      const act = e.target.dataset?.act;
      if (act === "cancel") hideSelBar();
      if (act === "save") save();
    });
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hideSelBar();
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          // Cmd+Shift+Enter → save + send
          save();
          setTimeout(() => doSend("").then((r) => toast(r.ok
            ? `Sent ${r.count} annotation${r.count === 1 ? "" : "s"} → OMP`
            : `Send failed: ${r.error}`)), 50);
        } else {
          save();
        }
      }
    });
    state.selPop = pop;
  }

  // Position the popover near `rect`, clamped to the viewport. Prefers
  // above the target; falls back below when the target is too close to
  // the top of the viewport.
  function openCommentPop(rect) {
    if (!state.selInfo || !state.selPop) return;
    const q = state.selPop.querySelector(".omp-annot-sp__quote");
    q.textContent = state.selInfo.text.length > 140
      ? state.selInfo.text.slice(0, 140) + "…"
      : state.selInfo.text;
    // Show first so offsetWidth/Height are measurable.
    state.selPop.dataset.show = "1";
    const w = state.selPop.offsetWidth || 320;
    const h = state.selPop.offsetHeight || 140;
    let top = rect.top + scrollY - h - 8;
    if (rect.top < h + 12) top = rect.bottom + scrollY + 8;
    let left = rect.left + scrollX + rect.width / 2 - w / 2;
    const maxLeft = scrollX + document.documentElement.clientWidth - w - 8;
    left = Math.max(scrollX + 8, Math.min(left, maxLeft));
    state.selPop.style.top = `${Math.max(scrollY + 4, top)}px`;
    state.selPop.style.left = `${left}px`;
    const ta = state.selPop.querySelector("textarea");
    ta.value = "";
    setTimeout(() => ta.focus(), 0);
  }

  function hideSelBar() {
    if (state.selPop) state.selPop.dataset.show = "0";
    if (state.selEl) { state.selEl.classList.remove("omp-annot-selected-outline"); state.selEl = null; }
    if (state.selOverlay) state.selOverlay.style.display = "none";
    state.selInfo = null;
  }


  async function quickAdd(kind, note) {
    if (!state.selInfo) { hideSelBar(); return; }
    const a = {
      id: crypto.randomUUID().slice(0, 8),
      createdAt: new Date().toISOString(),
      xpath: state.selInfo.xpath,
      elementSnippet: state.selInfo.snippet,
      note,
      selectedText: state.selInfo.text,
      kind,
      pageUrl: location.href,
      pageTitle: document.title,
      bbox: state.selInfo.bbox,
    };
    const count = await addAnnotation(a);
    const verb = kind === "delete" ? "Marked" : kind === "good" ? "Liked" : "Commented";
    toast(`${verb} (${count} pending)`);
    try { window.getSelection().removeAllRanges(); } catch { /* ignore */ }
    hideSelBar();
    // One-shot arm mode: return to normal browsing after a single capture.
    disarm();
  }

  // ─── Selection + element capture ─────────────────────────────────────
  function currentSelectionText() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return "";
    return (sel.toString() || "").trim();
  }

  function anchorOf(sel) {
    if (!sel || sel.rangeCount === 0) return null;
    let n = sel.getRangeAt(0).commonAncestorContainer;
    if (n && n.nodeType === 3) n = n.parentElement;
    return n instanceof Element ? n : null;
  }

  function captureSelection() {
    const sel = window.getSelection();
    const text = currentSelectionText();
    if (!text) return null;
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) return null;
    const anchor = anchorOf(sel);
    return {
      kind: "selection",
      text,
      xpath: anchor ? xpathFor(anchor) : "",
      snippet: anchor ? snippetFor(anchor) : text.slice(0, 240),
      bbox: { x: rect.left + scrollX, y: rect.top + scrollY, w: rect.width, h: rect.height },
      rect,
    };
  }

  function showSelBarForSelection() {
    const info = captureSelection();
    if (!info) return;
    if (state.selEl) { state.selEl.classList.remove("omp-annot-selected-outline"); state.selEl = null; }
    state.selInfo = info;
    installSelBar();
    openCommentPop(info.rect);
  }

  function showSelBarForElement(el) {
    const rect = el.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) return;
    state.selInfo = {
      kind: "element",
      text: (el.textContent || "").trim().slice(0, 240),
      xpath: xpathFor(el),
      snippet: snippetFor(el),
      bbox: bboxFor(el),
      rect,
    };
    installSelBar();
    if (state.selEl) state.selEl.classList.remove("omp-annot-selected-outline");
    state.selEl = el;
    el.classList.add("omp-annot-selected-outline");
    positionOverlay(state.selOverlay, el);
    openCommentPop(rect);
  }

  // ─── Chrome UI / interactive-element guards ─────────────────────────
  const OWN_IDS = "#omp-annot-badge, #omp-annot-sidebar, #omp-annot-selpop, #omp-annot-toast, #omp-annot-reload";
  const INTERACTIVE = 'a,button,input,textarea,select,label,summary,details,[role="button"],[role="tab"],[contenteditable="true"]';
  function isOwnUi(el) { return !!el?.closest?.(OWN_IDS); }
  function isInteractive(el) { return !!el?.closest?.(INTERACTIVE); }

  // "Topmost" target promotion. Users almost never want to annotate an
  // inline `<span>`, `<em>`, or plain text node nested inside a paragraph
  // — they want the surrounding block. Walk up while the current element
  // is inline/contents, stopping at:
  //   * an atomic replaced element (img/video/iframe/canvas/svg, form
  //     controls) — those ARE their own semantic unit
  //   * the first block-level ancestor (display: block/flex/grid/list-item
  //     /table*/flow-root)
  //   * body/documentElement, in which case we return the original
  const ATOMIC_TAGS = new Set([
    "IMG", "VIDEO", "AUDIO", "IFRAME", "CANVAS", "SVG", "PICTURE",
    "INPUT", "BUTTON", "SELECT", "TEXTAREA", "OBJECT", "EMBED",
  ]);
  function promoteTarget(el) {
    let cur = el;
    while (cur && cur !== document.body && cur !== document.documentElement) {
      if (ATOMIC_TAGS.has(cur.tagName)) return cur;
      const disp = getComputedStyle(cur).display;
      if (!disp.startsWith("inline") && disp !== "contents") return cur;
      cur = cur.parentElement;
    }
    return el;
  }

  function onMouseMove(e) {
    if (!state.armed) return;
    if (state.modalOpen) return;
    const raw = e.target;
    if (isOwnUi(raw) || raw === document.body || raw === document.documentElement) {
      setHovered(null); return;
    }
    if (currentSelectionText()) { setHovered(null); return; }
    setHovered(promoteTarget(raw));
  }

  // Fixed-position frame overlays. Anchored via getBoundingClientRect
  // and repositioned on scroll (see the init block below). They are the
  // authoritative visual indicator; the CSS classes on the target are
  // kept as a fallback for sites that don't clip outlines.
  function installOverlays() {
    if (state.hoverOverlay && state.selOverlay) return;
    const hov = document.createElement("div");
    hov.id = "omp-annot-hover-overlay";
    hov.style.display = "none";
    document.documentElement.appendChild(hov);
    state.hoverOverlay = hov;
    const sel = document.createElement("div");
    sel.id = "omp-annot-sel-overlay";
    sel.style.display = "none";
    document.documentElement.appendChild(sel);
    state.selOverlay = sel;
  }
  function positionOverlay(overlay, el) {
    if (!overlay || !el) return;
    const r = el.getBoundingClientRect();
    if (!r || (r.width === 0 && r.height === 0)) { overlay.style.display = "none"; return; }
    overlay.style.top = `${r.top}px`;
    overlay.style.left = `${r.left}px`;
    overlay.style.width = `${r.width}px`;
    overlay.style.height = `${r.height}px`;
    overlay.style.display = "";
  }
  function setHovered(el) {
    if (state.hoveredEl === el) return;
    if (state.hoveredEl) state.hoveredEl.classList.remove("omp-annot-hover-outline");
    state.hoveredEl = el;
    if (el) {
      el.classList.add("omp-annot-hover-outline");
      positionOverlay(state.hoverOverlay, el);
    } else if (state.hoverOverlay) {
      state.hoverOverlay.style.display = "none";
    }
  }

  function onClickCapture(e) {
    // Clicks on our own UI (badge, sidebar, toolbars) must never be
    // hijacked regardless of arm state, otherwise the badge itself
    // stops working.
    if (isOwnUi(e.target)) return;
    if (!state.armed) return;
    if (currentSelectionText()) return;
    const raw = e.target;
    if (!raw || raw === document.body || raw === document.documentElement) return;
    // Promote to the semantic container (block-level or atomic replaced
    // element) so nested inline text nodes don't produce useless span
    // annotations.
    const el = promoteTarget(raw);
    // Armed = annotator owns every click. Links, buttons, <select>,
    // <summary>, dropdowns — nothing native fires; the target is captured
    // for annotation instead.
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    showSelBarForElement(el);
  }

  // While armed, swallow the events that could trigger native activation
  // BEFORE the click reaches its handler:
  //   * `<select>` opens on mousedown
  //   * links/buttons/`<summary>` activate on click
  //   * drag begins on dragstart
  //   * forms POST on submit
  //   * the browser context menu shows on contextmenu (right / long-press)
  //   * middle/aux clicks open new tabs
  //   * touch scroll on links can navigate on touchend
  // Text-selection drag on ordinary text nodes must keep working, so
  // mousedown/pointerdown/touchstart are ONLY swallowed when the target
  // is an interactive control.
  function onArmSuppress(e) {
    if (isOwnUi(e.target)) return;
    if (!state.armed) return;
    const gated = e.type === "mousedown"
      || e.type === "pointerdown"
      || e.type === "touchstart";
    if (gated && !isInteractive(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
  }

  // ─── Reload pill (agent → browser) ──────────────────────────────────
  function showReloadPill(reason, auto) {
    let pill = state.reloadPill;
    if (!pill) {
      pill = document.createElement("div");
      pill.id = "omp-annot-reload";
      pill.innerHTML = `
        <span class="omp-annot-reload__spin">↺</span>
        <span class="omp-annot-reload__text"><b>Reload</b><span class="omp-annot-reload__reason"></span></span>
        <button class="omp-annot-reload__close" title="Dismiss">×</button>
      `;
      pill.addEventListener("click", (e) => {
        if (e.target.closest?.(".omp-annot-reload__close")) {
          clearTimeout(state.reloadTimer);
          state.reloadTimer = null;
          pill.remove();
          state.reloadPill = null;
          return;
        }
        location.reload();
      });
      document.documentElement.appendChild(pill);
      state.reloadPill = pill;
    }
    pill.querySelector(".omp-annot-reload__reason").textContent = reason ? ` · ${reason}` : "";
    pill.dataset.auto = auto ? "1" : "0";
    clearTimeout(state.reloadTimer);
    if (auto && !isUserBusy()) {
      state.reloadTimer = setTimeout(() => location.reload(), 1400);
    }
  }

  function isUserBusy() {
    return state.modalOpen
      || (state.selPop?.dataset.show === "1")
      || (state.sidebarOpen && document.activeElement?.closest?.("#omp-annot-sidebar"));
  }

  // ─── WebSocket to bridge ────────────────────────────────────────────
  function connectWs() {
    if (!state.bridge?.wsUrl) return;
    clearTimeout(state.wsRetryTimer);
    try {
      const ws = new WebSocket(state.bridge.wsUrl);
      state.ws = ws;
      ws.addEventListener("message", onWsMessage);
      ws.addEventListener("close", () => {
        state.ws = null;
        state.wsRetryTimer = setTimeout(connectWs, 2000);
      });
      ws.addEventListener("error", () => { try { ws.close(); } catch { /* ignore */ } });
    } catch {
      state.wsRetryTimer = setTimeout(connectWs, 2000);
    }
  }

  function onWsMessage(ev) {
    let msg;
    try { msg = JSON.parse(ev.data); } catch { return; }
    if (msg?.type === "hello") return;
    if (msg?.type === "reload") return showReloadPill(msg.reason || "", msg.auto !== false);
    if (msg?.type === "highlight" && msg.xpath) return doHighlight(msg.xpath);
  }

  function doHighlight(xp) {
    const el = xpathQuery(xp);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("omp-annot-selected-outline");
    setTimeout(() => el.classList.remove("omp-annot-selected-outline"), 1600);
  }

  // ─── Helpers ────────────────────────────────────────────────────────
  function swallowKeys(el) {
    if (!el) return;
    const stop = (e) => e.stopPropagation();
    el.addEventListener("keydown", stop);
    el.addEventListener("keyup", stop);
    el.addEventListener("keypress", stop);
  }

  function toast(msg, ms = 1600) {
    let el = document.getElementById("omp-annot-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "omp-annot-toast";
      document.documentElement.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = "1";
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.style.opacity = "0"; }, ms);
  }

  // ─── Popup ↔ content bridge ─────────────────────────────────────────
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    (async () => {
      if (msg?.type === "get_state") {
        const list = state.bridge ? await loadAnnotations() : [];
        sendResponse({
          ok: !!state.bridge,
          bridge: state.bridge,
          pageUrl: location.href,
          pageTitle: document.title,
          count: list.length,
        });
        return;
      }
      if (msg?.type === "open_sidebar") { openSidebar(); sendResponse({ ok: true }); return; }
      if (msg?.type === "send") {
        const r = await doSend((msg.message ?? "").trim());
        sendResponse(r);
        return;
      }
      sendResponse({ ok: false, error: "unknown" });
    })();
    return true;
  });

  // ─── Init ───────────────────────────────────────────────────────────
  (async () => {
    state.bridge = await detectBridge();
    if (!state.bridge) {
      toast("OMP Annotator bridge not reachable — run /listen in your OMP session, then activate again.", 3200);
      return;
    }
    installBadge();
    installSidebar();
    installSelBar();
    installOverlays();
    connectWs();
    refreshBadge();
    document.addEventListener("mousemove", onMouseMove, true);
    document.addEventListener("click", onClickCapture, true);
    // Neutralise native activation on every relevant event, capture phase
    // + non-passive so preventDefault() actually stops navigation, drag,
    // form submit, dropdown open, context menu, etc.
    for (const type of ["mousedown", "pointerdown", "touchstart", "auxclick", "dblclick", "contextmenu", "dragstart", "submit"]) {
      document.addEventListener(type, onArmSuppress, { capture: true, passive: false });
    }
    document.addEventListener("mouseup", (e) => {
      if (isOwnUi(e.target)) return;
      if (!state.armed) return;
      setTimeout(() => { if (currentSelectionText()) showSelBarForSelection(); }, 0);
    }, true);
    document.addEventListener("selectionchange", () => {
      if (state.selPop?.dataset.show === "1") return;
      if (state.selInfo?.kind === "element") return;
      if (!currentSelectionText()) hideSelBar();
    });
    document.addEventListener("scroll", () => {
      // Keep the sel overlay glued to its target while the user is
      // typing; hide the hover overlay because the cursor might have
      // left the previous target during the scroll.
      setHovered(null);
      if (state.selEl) positionOverlay(state.selOverlay, state.selEl);
      if (state.selPop?.dataset.show === "1") return;
      hideSelBar();
    }, true);
    window.addEventListener("resize", hideSelBar);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { hideSelBar(); disarm(); }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "Enter") {
        if (e.target?.closest?.("#omp-annot-selpop")) return;
        e.preventDefault();
        e.stopPropagation();
        doSend("").then((r) => toast(r.ok
          ? `Sent ${r.count} annotation${r.count === 1 ? "" : "s"} → OMP`
          : `Send failed: ${r.error}`));
      }
    }, true);
    document.addEventListener("mousedown", (e) => {
      if (state.selPop?.dataset.show === "1" && !isOwnUi(e.target)) hideSelBar();
    }, true);
    toast(`OMP Annotator ready · click ✎ in the bottom-left to arm · session ${state.bridge.sessionId}`, 2200);
  })();
})();
