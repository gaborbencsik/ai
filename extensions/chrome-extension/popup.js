// OMP Annotator — popup logic.
//
// Two states:
//   1. Content script NOT injected on the active tab -> show Activate.
//   2. Injected + bridge alive -> show the live section with a "Open in-page
//      panel" shortcut. Popup is intentionally light; the sidebar/toolbar in
//      the tab does the heavy lifting.

const $ = (sel) => document.querySelector(sel);
const els = {
  status: $("#status"),
  host: $("#host"),
  port: $("#port"),
  probe: $("#probe"),
  save: $("#save"),
  probeInfo: $("#probeInfo"),
  activate: $("#activate"),
  activateSec: $("#activateSection"),
  liveSec: $("#liveSection"),
  openSidebar: $("#openSidebar"),
  pageTitle: $("#pageTitle"),
  pageUrl: $("#pageUrl"),
  queueCount: $("#queueCount"),
  toast: $("#toast"),
};

let activeTab = null;

function setStatus(text, mod) {
  els.status.className = `status status--${mod}`;
  els.status.textContent = text;
}
function toast(text, ms = 1600) {
  els.toast.textContent = text;
  els.toast.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (els.toast.hidden = true), ms);
}

function ask(op, extra) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ op, ...(extra ?? {}) }, (res) => {
      if (chrome.runtime.lastError) return resolve({ ok: false, error: chrome.runtime.lastError.message });
      resolve(res ?? { ok: false, error: "no response" });
    });
  });
}

function askContent(tabId, message) {
  return new Promise((resolve) => {
    try {
      chrome.tabs.sendMessage(tabId, message, (res) => {
        if (chrome.runtime.lastError) return resolve({ ok: false, error: chrome.runtime.lastError.message });
        resolve(res ?? { ok: false, error: "no response" });
      });
    } catch (err) {
      resolve({ ok: false, error: String(err) });
    }
  });
}

async function loadSettings() {
  const r = await ask("getSettings");
  if (!r.ok) return;
  els.host.value = r.settings.host;
  els.port.value = r.settings.port;
}

async function probeBridge() {
  setStatus("probing…", "unknown");
  const r = await ask("probeBridge");
  if (r?.ok && r.health?.alive) {
    setStatus(`bridge :${r.health.port ?? els.port.value}`, "ok");
    els.probeInfo.innerHTML = `Bridge alive — session <code>${r.health.sessionId ?? "?"}</code>.`;
    return true;
  }
  setStatus("bridge offline", "err");
  els.probeInfo.textContent = r?.health?.error
    ? `Bridge probe failed: ${r.health.error}`
    : `Bridge not reachable. Run /listen in OMP.`;
  return false;
}

async function refresh() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  activeTab = tab || null;
  if (!activeTab) { setStatus("no tab", "err"); return; }

  const alive = await probeBridge();

  // Ask the content script for its state — if it responds, it's injected.
  const state = await askContent(activeTab.id, { type: "get_state" });
  if (state?.ok && state.bridge) {
    els.activateSec.hidden = true;
    els.liveSec.hidden = false;
    els.pageTitle.textContent = state.pageTitle || "(untitled)";
    els.pageUrl.textContent = state.pageUrl || "";
    els.queueCount.textContent = state.count ?? 0;
  } else {
    els.activateSec.hidden = false;
    els.liveSec.hidden = true;
    els.activate.disabled = !alive;
  }
}

// ─── Wiring ──────────────────────────────────────────────────────────
els.probe.addEventListener("click", probeBridge);
els.save.addEventListener("click", async () => {
  const patch = { host: els.host.value.trim() || "127.0.0.1", port: Number(els.port.value) || 4747 };
  const r = await ask("setSettings", { patch });
  if (r?.ok) { toast("Saved"); refresh(); }
});
els.activate.addEventListener("click", async () => {
  if (!activeTab) return;
  els.activate.disabled = true;
  const r = await ask("activateTab", { tabId: activeTab.id });
  if (r?.ok) {
    toast("Activated");
    // Give the content script a moment to boot and register its message listener.
    setTimeout(refresh, 300);
  } else {
    toast(`Activation failed: ${r?.error ?? "unknown"}`, 2400);
    els.activate.disabled = false;
  }
});
els.openSidebar.addEventListener("click", async () => {
  if (!activeTab) return;
  await askContent(activeTab.id, { type: "open_sidebar" });
  window.close();
});

loadSettings().then(refresh);
