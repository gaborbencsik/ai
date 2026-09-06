(() => {
  const initial = window.__OMP_INITIAL__ || {};
  const shell = window.OMP.createShell({ initial });
  const preview = document.getElementById("preview");
  preview.innerHTML = initial.html || "";
  let hovered = null;

  const BLOCK_TAGS = /^(P|H[1-6]|LI|BLOCKQUOTE|PRE|TR|IMG|HR)$/;
  const SVG_LEAVES = /^(text|rect|ellipse|polygon|path|line|circle)$/;

  function semanticTarget(raw) {
    let node = raw;
    while (node && node !== preview) {
      const tag = node.tagName;
      if (tag && BLOCK_TAGS.test(tag)) return node;
      if (tag === "g" && (node.id || (node.classList && node.classList.length))) return node;
      if (tag && SVG_LEAVES.test(tag)) {
        const group = node.closest("g[id], g[class]");
        if (group && preview.contains(group)) return group;
        return node;
      }
      node = node.parentElement;
    }
    return raw.closest("p,h1,h2,h3,h4,h5,h6,li,blockquote,pre,tr,img,hr,g,text,rect,ellipse,polygon,path,line,circle") ?? raw;
  }

  function cssPath(element) {
    const parts = [];
    let node = element;
    while (node && node !== preview) {
      const siblings = node.parentElement
        ? Array.from(node.parentElement.children).filter((item) => item.tagName === node.tagName)
        : [];
      const suffix = siblings.length > 1 ? `:nth-of-type(${siblings.indexOf(node) + 1})` : "";
      parts.unshift(`${node.tagName.toLowerCase()}${suffix}`);
      node = node.parentElement;
    }
    return `#preview > ${parts.join(" > ")}`;
  }

  function makeCandidate(target, selectedText, rect = target.getBoundingClientRect()) {
    const rowCells = target.tagName === "TR"
      ? Array.from(target.cells).map((cell) => cell.textContent.trim().replace(/\s+/g, " "))
      : null;
    const rowLabel = rowCells ? rowCells.filter(Boolean).join(" | ") : "";
    const rawLabel = rowLabel
      || (target.textContent || target.getAttribute?.("id") || target.tagName || "").trim().replace(/\s+/g, " ")
      || target.tagName
      || "element";
    return {
      target,
      selectedText,
      rect,
      frameRect: rect,
      label: String(rawLabel).slice(0, 240),
      xpath: cssPath(target),
      elementSnippet: (target.outerHTML || "").slice(0, 400),
    };
  }

  function selectionCandidate() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return null;
    const text = selection.toString().trim();
    if (!text) return null;
    const range = selection.getRangeAt(0);
    if (!preview.contains(range.commonAncestorContainer)) return null;
    const node = range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentElement
      : range.commonAncestorContainer;
    const target = semanticTarget(node);
    return makeCandidate(target, text, range.getBoundingClientRect());
  }

  function armedOpen(cand) {
    shell.openComment(cand, () => ({
      kind: cand.selectedText ? "comment" : "element",
      xpath: cand.xpath,
      elementSnippet: cand.elementSnippet,
      surface: initial.mode || "markdown",
    }));
  }

  preview.addEventListener("mousemove", (event) => {
    if (!shell.state.armed || !preview.contains(event.target)) return;
    const target = semanticTarget(event.target);
    if (target === hovered) return;
    hovered = target;
    shell.frame(shell.hoverFrame, target.getBoundingClientRect());
  });
  preview.addEventListener("mouseleave", () => { shell.hoverFrame.style.display = "none"; });
  preview.addEventListener("click", (event) => {
    if (!shell.state.armed) return;
    event.preventDefault();
    event.stopPropagation();
    const sel = selectionCandidate();
    armedOpen(sel ?? makeCandidate(semanticTarget(event.target), ""));
  }, true);
  preview.addEventListener("mouseup", () => {
    if (!shell.state.armed) return;
    const sel = selectionCandidate();
    if (sel) armedOpen(sel);
  });

  window.addEventListener("message", (event) => {
    if (event.data?.type === "render") {
      preview.innerHTML = event.data.html || event.data.svg || "";
      hovered = null;
      shell.clearFrames();
    }
  });
  window.addEventListener("scroll", shell.clearFrames, true);
  window.addEventListener("resize", shell.clearFrames);
})();
