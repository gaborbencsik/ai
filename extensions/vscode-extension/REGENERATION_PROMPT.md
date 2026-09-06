# OMP Annotator VS Code Extension — regeneration prompt

```text
Build a complete, installable VS Code extension named "OMP Annotator", with package name `omp-markdown-annotator` and version 0.2.0. Do not create a prototype, mock, incomplete scaffold, placeholder, or TODO.

Goal:
Allow users to annotate rendered Markdown, image files, and PlantUML diagrams, then send those annotations to a local OMP annotator bridge.

Requirements:
- VS Code engine: ^1.96.0
- CommonJS extension entry point
- extension.js must be bundleable with esbuild
- The only runtime dependency is markdown-it
- Build dependency: esbuild
- @vscode/vsce may be used to produce the VSIX package
- No external frontend framework
- Use JavaScript, HTML templates, and CSS
- Use a CSP nonce for every webview script
- Default webview CSP: default-src 'none'
- Allow only the required localResourceRoots

File structure:
- package.json
- package-lock.json
- extension.js
- media/annotator-core.js
- media/main.js
- media/image.js
- media/main.css
- media/image.css
- README.md

Register three custom editors:

1. `ompMarkdownAnnotator.preview`
   - Display name: OMP Annotatable Markdown Preview
   - Extensions: .md, .markdown, .mdown, .mkd
   - Priority: option
   - Markdown-it configuration:
     html=false, linkify=true, typographer=true
   - Automatically open the active local Markdown file in `ViewColumn.Beside`
   - Do not open the same document repeatedly
   - Rerender live when the document changes

2. `ompMarkdownAnnotator.imagePreview`
   - Display name: OMP Annotatable Image Preview
   - Extensions: .png, .jpg, .jpeg, .gif, .webp, .bmp
   - Priority: option
   - Open only through a command, editor title action, or Explorer context menu
   - Include the document's parent directory in localResourceRoots

3. `ompMarkdownAnnotator.pumlPreview`
   - Display name: OMP Annotatable PlantUML Preview
   - Extensions: .puml, .plantuml, .iuml, .wsd
   - Priority: option
   - Open only through a command or context menu
   - Rerender 400 ms after editing stops

Commands:
- ompMarkdownAnnotator.openPreview
- ompMarkdownAnnotator.openImagePreview
- ompMarkdownAnnotator.openPumlPreview

Command behavior:
- Accept a URI, resourceUri, or a URI derived from the active editor
- If no matching file is available, open a showOpenDialog file picker
- Show precise VS Code error messages on failure

Configuration:
- ompMarkdownAnnotator.bridgeHost
  - string, default: 127.0.0.1
- ompMarkdownAnnotator.bridgePort
  - number, default: 4747, range: 1–65535
- ompMarkdownAnnotator.plantumlServerUrl
  - string, default: https://www.plantuml.com/plantuml
- ompMarkdownAnnotator.plantumlJarPath
  - string, default: empty
  - When set, it takes precedence over the remote server

OMP bridge:
1. GET `http://<host>:<port>/__bridge/config`
   - Timeout: 2000 ms
   - Verify that the response contains a string sessionId
2. POST `/__bridge/send`
   - Timeout: 5000 ms
   - Content-Type: application/json
   - Payload:
     {
       sessionId,
       pageUrl,
       pageTitle,
       subject: "markdown" | "image" | "puml",
       client: "omp-vscode/0.2.0",
       capturedAt,
       message,
       annotations
     }
3. Do not send an empty annotation list.
4. After a successful send, post a `sent` message to the webview and clear its queue.
5. On failure, leave webview state unchanged and show an informative VS Code error message.

Shared webview annotation shell:
- Use `acquireVsCodeApi()`
- Preserve these values with `getState()` and `setState()`:
  - annotations
  - armed
  - the active image tool for image previews
- Add a bottom-left badge with separate pencil and count zones
- Start disarmed
- Allow the pencil to arm the annotator for exactly one annotation
- Provide a floating comment popover
- Provide a sidebar with the annotation list, batch message field, deletion, and Send button
- Provide hover and selected frame overlays
- Provide toast notifications
- Escape: close the comment popover and disarm
- Cmd/Ctrl+Enter: save the comment
- Cmd/Ctrl+Shift+Enter: save and send
- Send only when the queue is non-empty
- Automatically disarm after each saved annotation
- Keep shared behavior in `annotator-core.js`; do not duplicate it in surface-specific scripts

Markdown and PlantUML annotations:
- Use the same `main.js` interaction layer for both surfaces
- Support selected rendered text and clicked semantic elements
- Markdown block targets:
  p, h1–h6, li, blockquote, pre, tr, img, hr
- SVG targets:
  g, text, rect, ellipse, polygon, path, line, circle
- Generate a stable CSS path relative to the `#preview` root
- For table rows, derive an informative label from cell text
- Annotation shape:
  {
    id,
    createdAt,
    surface: "markdown" | "puml",
    kind: "comment" | "element",
    xpath,
    elementSnippet,
    selectedText,
    note,
    bbox
  }
- Create annotations from clicks or selections only while armed
- Preserve the existing queue when rendered content updates

Image annotations:
- Display the image in a scalable stage
- Position a canvas overlay exactly over the displayed image
- Provide two tools:
  - Rect: drag to create a rectangle
  - Point: click to place a point
- Allow drawing only while armed
- Treat rectangles below a consistent minimum size as points, or reject them consistently
- Store every coordinate in normalized and native-pixel form:
  {
    xNorm, yNorm, wNorm, hNorm,
    xPx, yPx, wPx, hPx,
    imageWidth, imageHeight
  }
- Annotation shape:
  {
    id,
    createdAt,
    surface: "image",
    kind: "rect" | "point",
    region,
    note
  }
- Redraw pending annotations after resize
- Give each annotation a numbered visual marker

PlantUML:
- When plantumlJarPath is set:
  - Run `java -Djava.awt.headless=true -jar <jar> -tsvg -pipe`
  - Write the source to stdin
  - maxBuffer: 32 MiB
- Otherwise:
  - Implement PlantUML raw-deflate plus the custom PlantUML base64 encoding
  - GET `<server>/svg/<encoded>`
  - Timeout: 15000 ms
- Remove XML declarations and DOCTYPE declarations
- Thoroughly sanitize external SVG: remove active content, event handlers, script and foreignObject elements, and unsafe URLs
- On render failure, display an embedded error SVG with escaped content
- Keep the webview CSP restricted to sources that are strictly required

package.json:
- Define the required activationEvents
- Define commands and editor/title, editor/context, and explorer/context menu entries
- Declare all three customEditors
- Declare all four configuration properties
- Set main to ./dist/extension.js
- Add scripts for:
  - build
  - syntax checking every JavaScript file
  - package
- Include only dist/**, media/**, and README.md in the VSIX package

README:
- Installation and VSIX build instructions
- The three supported surfaces
- Using /listen
- Bridge port configuration
- Annotation workflow and keyboard shortcuts
- Payload format
- PlantUML server/JAR behavior
- Known limitations

Before finishing:
1. Run syntax checks.
2. Build the extension.
3. Create the VSIX package.
4. Verify that the package contains every required media file.
5. Provide concise manual smoke tests for Markdown, images, and PlantUML.
```