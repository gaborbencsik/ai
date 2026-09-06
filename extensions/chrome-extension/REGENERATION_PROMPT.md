# OMP Annotator Chrome Extension — regeneration prompt

```text
Build a complete, production-ready, dependency-free Chrome Manifest V3 extension named "OMP Annotator". Do not create a prototype, mock, incomplete scaffold, placeholder, or TODO. The result must load directly as an unpacked extension.

File structure:
- manifest.json
- background.js
- content.js
- content.css
- popup.html
- popup.js
- popup.css
- README.md
- launch-chrome.sh

Technology and packaging:
- Native JavaScript, HTML, and CSS
- Chrome Manifest V3
- Module-based service worker
- No external runtime dependencies
- Version: 0.2.0
- Permissions: storage, activeTab, scripting, tabs
- Host permissions for localhost and 127.0.0.1
- Do not declare content_scripts in the manifest
- Inject content.js and content.css only after explicit user activation
- Make content.js initialization idempotent

Bridge protocol:
- Default host: 127.0.0.1
- Default port: 4747
- GET /__bridge/ping:
  - 1500 ms timeout
  - Accept the bridge only when the JSON `service` field equals "omp-annotator"
- GET /__bridge/config:
  - Read `sessionId` and `wsUrl`
- POST /__bridge/send:
  - Content-Type: application/json
  - Payload:
    {
      sessionId,
      pageUrl,
      pageTitle,
      client: "omp-chrome/0.2.0",
      capturedAt,
      message,
      annotations
    }
- WebSocket:
  - Handle {"type":"reload","reason":"...","auto":true}
  - Handle {"type":"highlight","xpath":"..."}
  - Reconnect every 2 seconds after disconnection

Popup:
- Display bridge status
- Provide editable host and port fields
- Provide Save and Probe buttons
- Provide an "Activate on this tab" button
- On an activated tab, show the page title, URL, and pending annotation count
- Provide an "Open in-page panel" button
- Show a clear, user-friendly error on restricted Chrome pages

Service worker:
- Store settings and activated tab IDs in chrome.storage.local
- Make the service worker the sole writer of these records
- Inject CSS first, then JavaScript, through chrome.scripting
- Reinject into activated tabs after navigation
- Remove closed tabs from tracking
- Set the extension action badge to the total number of entries across all `omp-annot:<sessionId>` queues
- Use an orange badge background when the count is positive
- Handle these runtime operations:
  getSettings, setSettings, probeBridge, activateTab, deactivateTab,
  getBridgeInfo, annotCount

Injected page UI:
- Add a floating bottom-left badge with separately clickable pencil and count zones
- Start disarmed
- Clicking the pencil arms the annotator for exactly one annotation
- While armed:
  - Use a crosshair cursor
  - Show a dashed blue frame around the hovered target
  - Automatically disarm after saving the next annotation
  - Escape cancels armed mode
- Promote inline nodes to their nearest meaningful block-level container
- Keep IMG, VIDEO, AUDIO, IFRAME, CANVAS, SVG, PICTURE, INPUT, BUTTON,
  SELECT, TEXTAREA, OBJECT, and EMBED as atomic targets
- Never capture the annotator's own UI as an annotation target

Native event handling:
- While armed, prevent links, buttons, selects, summary/details controls,
  form submission, context menus, drag, double-click, and auxiliary-click activation
- Preserve mouse events needed for text selection over ordinary text
- Ensure the annotator's own controls always remain functional
- Use capture-phase and non-passive listeners where required

Annotations:
- Support annotations on selected text and clicked elements
- Open a comment popover near the target and clamp it to the viewport
- Reject empty comments
- Cmd/Ctrl+Enter: save
- Cmd/Ctrl+Shift+Enter: save, then send the complete queue
- Annotation shape:
  {
    id,
    createdAt,
    xpath,
    elementSnippet,
    note,
    selectedText,
    kind: "comment",
    pageUrl,
    pageTitle,
    bbox: {x,y,w,h}
  }
- Prefer a unique element ID when generating XPath; otherwise generate a stable absolute element path
- Keep elementSnippet informative and no longer than 240 characters

Storage and sidebar:
- Use one storage key per bridge session: `omp-annot:<sessionId>`
- List annotations in an in-page sidebar
- Provide per-row deletion and highlight the original target while hovering a row
- Provide a batch message field, Clear button, and Send to OMP button
- Clear the queue only after a successful send
- Preserve all data after a failed send
- Automatically open the sidebar after the first annotation is added

Agent-driven signals:
- For reload messages, show a top-center reload pill
- Reload immediately when the pill is clicked
- When auto=true, reload after approximately 1400 ms only if the user is not editing a comment or interacting with the sidebar
- For highlight messages, resolve the XPath, scroll the target into the center, and highlight it for approximately 1600 ms

UI requirements:
- Light, compact appearance sufficiently isolated from host-page styles
- High z-index
- Accessible labels and explicit button types
- Clear offline, armed, pending, success, and error states
- No framework and no remotely loaded executable code

The README must document:
- Unpacked installation
- Starting the bridge with /listen
- Host and port configuration
- Annotation workflow
- Keyboard shortcuts
- WebSocket signals
- Known Chrome limitations

Before finishing:
1. Check the syntax of every JavaScript file.
2. Validate that the manifest can be loaded.
3. List every created file.
4. Provide a concise manual smoke-test procedure.
```