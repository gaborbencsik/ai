// OMP Annotator — background service worker (v0.2, on-demand injection).
//
// Responsibilities:
//   • Bridge probe: GET http://127.0.0.1:<port>/__bridge/ping — is a bridge alive?
//   • On-demand injection: user clicks the badge → popup asks background to
//     inject content.js + content.css into the active tab.
//   • Re-inject after navigation for tabs the user has previously activated.
//   • Badge counter reflects cross-tab queued annotations.
//
// The content script is NOT registered in the manifest — it lives in
// web_accessible_resources and is injected with chrome.scripting.
//
// Settings + queue live in chrome.storage.local; the background worker is
// the single writer.

const DEFAULT_SETTINGS = { host: "127.0.0.1", port: 4747 };
const STORAGE_KEYS = { settings: "settings", queue: "queue", activated: "activated" };

async function readSettings() {
  const stored = await chrome.storage.local.get(STORAGE_KEYS.settings);
  return { ...DEFAULT_SETTINGS, ...(stored[STORAGE_KEYS.settings] ?? {}) };
}

async function writeSettings(patch) {
  const next = { ...(await readSettings()), ...patch };
  await chrome.storage.local.set({ [STORAGE_KEYS.settings]: next });
  return next;
}

function bridgeBase(settings) {
  return `http://${settings.host}:${settings.port}`;
}

// Tab-tracking sets are process-local (service workers restart, but Chrome
// keeps the Set instance for the lifetime of one worker). For durability we
// also persist the activated set in storage so a worker restart doesn't
// forget which tabs the user opted in to.
const injectedTabs = new Set();
const activatedTabs = new Set();

async function loadActivated() {
  const stored = await chrome.storage.local.get(STORAGE_KEYS.activated);
  const list = Array.isArray(stored[STORAGE_KEYS.activated]) ? stored[STORAGE_KEYS.activated] : [];
  for (const id of list) activatedTabs.add(id);
}
async function persistActivated() {
  await chrome.storage.local.set({ [STORAGE_KEYS.activated]: [...activatedTabs] });
}

async function probeBridge() {
  const settings = await readSettings();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1500);
  try {
    const res = await fetch(`${bridgeBase(settings)}/__bridge/ping`, { cache: "no-store", signal: controller.signal });
    if (!res.ok) return { alive: false, status: res.status };
    const body = await res.json().catch(() => ({}));
    if (body?.service !== "omp-annotator") return { alive: false, error: "not an omp-annotator bridge" };
    return { alive: true, sessionId: body.sessionId, port: body.port };
  } catch (err) {
    return { alive: false, error: String(err) };
  } finally {
    clearTimeout(timer);
  }
}

async function injectIntoTab(tabId) {
  if (injectedTabs.has(tabId)) return true;
  try {
    await chrome.scripting.insertCSS({ target: { tabId }, files: ["content.css"] });
    await chrome.scripting.executeScript({ target: { tabId }, files: ["content.js"] });
    injectedTabs.add(tabId);
    return true;
  } catch (err) {
    console.warn("[omp-annotator] injection failed:", err);
    return false;
  }
}

async function refreshBadge() {
  try {
    const all = await chrome.storage.local.get(null);
    let total = 0;
    for (const [key, value] of Object.entries(all)) {
      if (key.startsWith("omp-annot:") && Array.isArray(value)) total += value.length;
    }
    const text = total > 0 ? String(total) : "";
    await chrome.action.setBadgeText({ text });
    if (total > 0) await chrome.action.setBadgeBackgroundColor({ color: "#f97316" });
  } catch {
    // action API may not be initialised yet during install
  }
}

// Re-inject content script when an activated tab finishes navigating.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") injectedTabs.delete(tabId);
  if (changeInfo.status === "complete" && activatedTabs.has(tabId)) {
    injectIntoTab(tabId);
  }
});

// Clean up local tracking when a tab closes.
chrome.tabs.onRemoved.addListener((tabId) => {
  injectedTabs.delete(tabId);
  if (activatedTabs.delete(tabId)) persistActivated();
});

chrome.runtime.onInstalled.addListener(async () => {
  await loadActivated();
  await refreshBadge();
});
chrome.runtime.onStartup.addListener(async () => {
  await loadActivated();
  await refreshBadge();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.queue || Object.keys(changes).some((k) => k.startsWith("omp-annot:"))) {
    refreshBadge();
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      switch (msg?.op) {
        case "getSettings":
          sendResponse({ ok: true, settings: await readSettings() });
          return;
        case "setSettings":
          sendResponse({ ok: true, settings: await writeSettings(msg.patch ?? {}) });
          return;
        case "probeBridge":
          sendResponse({ ok: true, health: await probeBridge() });
          return;
        case "activateTab": {
          const tabId = msg.tabId;
          if (typeof tabId !== "number") return sendResponse({ ok: false, error: "tabId required" });
          const ok = await injectIntoTab(tabId);
          if (ok) {
            activatedTabs.add(tabId);
            await persistActivated();
          }
          sendResponse({ ok, tabId });
          return;
        }
        case "deactivateTab": {
          const tabId = msg.tabId;
          if (typeof tabId !== "number") return sendResponse({ ok: false, error: "tabId required" });
          injectedTabs.delete(tabId);
          activatedTabs.delete(tabId);
          await persistActivated();
          sendResponse({ ok: true });
          return;
        }
        case "getBridgeInfo": {
          const settings = await readSettings();
          sendResponse({ ok: true, base: bridgeBase(settings), ...settings });
          return;
        }
        case "annotCount":
          await refreshBadge();
          sendResponse({ ok: true });
          return;
        default:
          sendResponse({ ok: false, error: `unknown op: ${msg?.op}` });
      }
    } catch (err) {
      sendResponse({ ok: false, error: String(err) });
    }
  })();
  return true;
});
