# OMP Annotator

Companion browser extension for the `.omp/extensions/annotator/` OMP
extension. Adds a lightweight annotation toolbar to every HTML page and
streams reviewer notes back into the OMP session that ran `/listen`.

## Install (unpacked)

1. Start OMP, run `/listen` in the session where you want annotations to
   land. This starts a Bun.serve bridge on `http://127.0.0.1:4747` (falls
   back through `4748..4756` if that port is busy) and prints the exact URL.
2. Chrome: `chrome://extensions` -> Developer mode -> **Load unpacked** ->
   pick the `chrome-extension/` directory of this repo.
3. Click the OMP Annotator toolbar icon on any HTTP(S) page. Popup shows
   the bridge state. If `bridge offline`, adjust the host/port to match
   the URL that `/listen` printed and hit Save + Probe. When the pill turns
   green, click **Activate on this tab**.
4. On the page:
   - the bottom-**left** pill is the annotator badge: `✎ N`. It starts
     **disarmed** so the page behaves normally.
   - click the `✎` zone once to **arm** — the badge glows orange, the
     cursor becomes a crosshair, and **native page behavior is fully
     suppressed**: links do not navigate, buttons do not fire, dropdowns
     (`<select>`, `<summary>`, custom menus), drag, and context menus
     are all blocked. The next hover/click/selection is captured, then
     the extension auto-disarms after exactly one annotation.
   - hover any element -> the target auto-promotes to the nearest
     **block-level or atomic container** (so a hover on a `<span>` or
     `<em>` highlights the surrounding `<p>`; images, buttons, and form
     controls stay themselves). A dashed blue frame overlay marks it.
   - click captures the promoted element and opens a **comment popover**
     near it (no Delete / Good / Comment three-button bar; the sidebar's
     per-row ✕ handles removal after the fact)
   - select text -> the same comment popover pops above the selection
   - `Cmd/Ctrl+Enter` in the Comment box saves; `Cmd/Ctrl+Shift+Enter`
     saves and immediately sends the queue
   - click the count zone (`N`) on the badge to open the in-page
     sidebar; hovering an annotation there highlights its target
   - `Esc` cancels arm mode and closes any open toolbar
   - hit **Send to OMP** in the sidebar to flush - the queue lands as a
     single formatted user turn in the OMP session (idle sessions start
     a new turn immediately; streaming sessions receive it as a
     `deliverAs: followUp` so the current run is never interrupted)

## Agent-driven signals

The bridge also serves a WebSocket at `/__bridge/ws`. The OMP extension
publishes:

- `{"type":"reload","reason":"...","auto":true}` when the agent calls
  `annotator_reload_page`. Attached tabs get a top-center pill; if the
  user is idle it auto-refreshes after ~1.4s.
- `{"type":"highlight","xpath":"..."}` when the agent calls
  `annotator_highlight`. Attached tabs scroll the matching element into
  view and flash an outline.

## Files

- `manifest.json` - MV3 manifest. **No `content_scripts`**: `content.js`
  is `web_accessible_resources` and injected on demand by the popup.
- `background.js` - service worker: bridge probe, `chrome.scripting`
  injection, badge counter, re-inject on navigation for activated tabs.
- `content.js` + `content.css` - the on-page UI (hover/selection
  toolbar, comment popover, sidebar, reload pill, WebSocket client).
- `popup.html` / `popup.js` / `popup.css` - the toolbar popup: settings,
  bridge probe, activate button.

## Known limits

- The extension cannot see `chrome://` or extension-page URLs (Chrome
  policy). Everything else is fair game because the bridge is loopback +
  same-origin-checked and content-script injection is opt-in per tab.
- One bridge per OMP session; a second `/listen` in the same session
  returns the running one. Different OMP sessions on `4747`, `4748`, ...
  can coexist thanks to port probing.
