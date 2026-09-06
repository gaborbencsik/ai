(() => {
  const initial = window.__OMP_INITIAL__ || {};
  const shell = window.OMP.createShell({ initial });

  const wrap = document.getElementById("canvas-wrap");
  const stage = document.getElementById("stage");
  const img = document.getElementById("image");
  const canvas = document.getElementById("overlay");
  const ctx = canvas.getContext("2d");
  const toolbar = document.getElementById("toolbar");

  if (!shell.state.tool) shell.state.tool = "rect";

  let natural = { w: 0, h: 0 };
  let display = { w: 0, h: 0 };
  let drawing = null; // { x0, y0, x1, y1 } in display coords

  img.src = initial.imageUri;
  img.addEventListener("load", () => {
    natural = { w: img.naturalWidth || 1, h: img.naturalHeight || 1 };
    layout();
  });
  img.addEventListener("error", () => {
    shell.showToast(`Image failed to load: ${initial.pageTitle}`);
  });
  window.addEventListener("resize", layout);
  shell.onChange(redraw);

  function layout() {
    const rect = img.getBoundingClientRect();
    display.w = rect.width;
    display.h = rect.height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(display.w * dpr));
    canvas.height = Math.max(1, Math.round(display.h * dpr));
    canvas.style.width = `${display.w}px`;
    canvas.style.height = `${display.h}px`;
    redraw();
  }

  function toNorm(px, py) {
    if (!display.w || !display.h) return { xNorm: 0, yNorm: 0 };
    return { xNorm: px / display.w, yNorm: py / display.h };
  }

  function redraw() {
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, display.w || canvas.width, display.h || canvas.height);
    const regions = shell.state.annotations.filter((a) => a.surface === "image" && a.region);
    regions.forEach((annotation, index) => drawRegion(annotation.region, index + 1));
    if (drawing) drawPendingRect(drawing);
  }

  function drawRegion(region, badge) {
    if (!display.w || !display.h) return;
    if (region.kind === "rect") {
      const x = region.xNorm * display.w;
      const y = region.yNorm * display.h;
      const w = (region.wNorm || 0) * display.w;
      const h = (region.hNorm || 0) * display.h;
      ctx.fillStyle = "#f9731630";
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 2;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
      paintBadge(x, y, badge);
    } else if (region.kind === "point") {
      const x = region.xNorm * display.w;
      const y = region.yNorm * display.h;
      ctx.fillStyle = "#f97316cc";
      ctx.strokeStyle = "#7a3a10";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      paintBadge(x + 10, y - 22, badge);
    }
  }

  function paintBadge(x, y, n) {
    const label = String(n);
    ctx.font = "12px system-ui, -apple-system, sans-serif";
    const w = ctx.measureText(label).width + 10;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(x, y - 18, w, 18);
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "top";
    ctx.fillText(label, x + 5, y - 16);
  }

  function drawPendingRect(d) {
    const x = Math.min(d.x0, d.x1);
    const y = Math.min(d.y0, d.y1);
    const w = Math.abs(d.x1 - d.x0);
    const h = Math.abs(d.y1 - d.y0);
    ctx.strokeStyle = "#3b82f6";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.setLineDash([]);
  }

  function localCoords(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(display.w, event.clientX - rect.left)),
      y: Math.max(0, Math.min(display.h, event.clientY - rect.top)),
    };
  }

  function setTool(tool) {
    shell.state.tool = tool;
    toolbar.querySelectorAll("button[data-tool]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tool === tool);
    });
  }
  setTool(shell.state.tool);

  toolbar.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-tool]");
    if (btn) setTool(btn.dataset.tool);
  });

  canvas.addEventListener("mousedown", (event) => {
    if (!shell.state.armed) return;
    if (event.button !== 0) return;
    const p = localCoords(event);
    if (shell.state.tool === "rect") {
      drawing = { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
      event.preventDefault();
    }
  });
  canvas.addEventListener("mousemove", (event) => {
    if (!drawing) return;
    const p = localCoords(event);
    drawing.x1 = p.x;
    drawing.y1 = p.y;
    redraw();
  });
  canvas.addEventListener("mouseup", (event) => {
    if (!shell.state.armed) return;
    const p = localCoords(event);
    if (shell.state.tool === "point") {
      const n = toNorm(p.x, p.y);
      openRegionComment({ kind: "point", xNorm: n.xNorm, yNorm: n.yNorm, wNorm: 0, hNorm: 0 }, p.x, p.y);
    } else if (drawing) {
      const x = Math.min(drawing.x0, drawing.x1);
      const y = Math.min(drawing.y0, drawing.y1);
      const w = Math.abs(drawing.x1 - drawing.x0);
      const h = Math.abs(drawing.y1 - drawing.y0);
      drawing = null;
      if (w < 4 || h < 4) {
        redraw();
        return;
      }
      const start = toNorm(x, y);
      const end = toNorm(x + w, y + h);
      openRegionComment({
        kind: "rect",
        xNorm: start.xNorm,
        yNorm: start.yNorm,
        wNorm: end.xNorm - start.xNorm,
        hNorm: end.yNorm - start.yNorm,
      }, x + w / 2, y + h);
    }
  });
  canvas.addEventListener("mouseleave", () => {
    if (drawing) {
      drawing = null;
      redraw();
    }
  });

  function openRegionComment(region, anchorX, anchorY) {
    const canvasRect = canvas.getBoundingClientRect();
    const rect = new DOMRect(canvasRect.left + anchorX - 8, canvasRect.top + anchorY - 8, 16, 16);
    const frameRect = region.kind === "rect"
      ? new DOMRect(
          canvasRect.left + region.xNorm * display.w,
          canvasRect.top + region.yNorm * display.h,
          region.wNorm * display.w,
          region.hNorm * display.h,
        )
      : rect;
    const pctX = (region.xNorm * 100).toFixed(1);
    const pctY = (region.yNorm * 100).toFixed(1);
    const pctW = (region.wNorm * 100).toFixed(1);
    const pctH = (region.hNorm * 100).toFixed(1);
    const label = region.kind === "rect"
      ? `rect @ ${pctX}%,${pctY}% (${pctW}%×${pctH}%)`
      : `point @ ${pctX}%,${pctY}%`;
    shell.openComment(
      { selectedText: "", label, rect, frameRect },
      () => ({
        kind: region.kind,
        surface: "image",
        region: {
          xNorm: region.xNorm,
          yNorm: region.yNorm,
          wNorm: region.wNorm,
          hNorm: region.hNorm,
          xPx: Math.round(region.xNorm * natural.w),
          yPx: Math.round(region.yNorm * natural.h),
          wPx: Math.round(region.wNorm * natural.w),
          hPx: Math.round(region.hNorm * natural.h),
          imageWidth: natural.w,
          imageHeight: natural.h,
        },
      }),
    );
  }

  // Prevent text-selection cursor when armed.
  stage.addEventListener("selectstart", (event) => {
    if (shell.state.armed) event.preventDefault();
  });
})();
