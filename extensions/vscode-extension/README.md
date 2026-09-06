# OMP Annotator

VS Code extension for annotating rendered Markdown, PNG images, and PlantUML diagrams. Sends the annotation batch to the OMP agent chat that is running the local annotator bridge.

## Install

```sh
cd vscode-extension
npm install
npm run package
code --install-extension omp-markdown-annotator-0.2.0.vsix
```

Reload VS Code after installation.

## Surfaces

The extension registers three custom editors under **Reopen Editor With…**:

| Editor | Files | Interaction |
|---|---|---|
| OMP Annotatable Markdown Preview | `.md`, `.markdown`, `.mdown`, `.mkd` | Select rendered text or click a block (paragraph, heading, list item, code fence, table row). |
| OMP Annotatable Image Preview | `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.bmp` | Drag a rectangle or drop a point on the image; coordinates stored as normalized (0–1) and native pixels. |
| OMP Annotatable PlantUML Preview | `.puml`, `.plantuml`, `.iuml`, `.wsd` | Rendered to SVG server-side; click an SVG element (group, shape, text) or select rendered text. |

## Use

1. In the target OMP agent chat, run `/listen`. The command prints the bridge port.
2. If the port is not `4747`, set **OMP Annotator: Bridge Port** in VS Code settings.
3. Open the target file. For Markdown, the annotator opens beside automatically; for PNG or PUML, run the matching **OMP: Open Annotatable … Preview** from the palette, editor title bar, or context menu.
4. Click the bottom-left pencil to arm the annotator.
5. Capture the annotation:
   - **Markdown / PUML:** select rendered text or click a block/SVG element.
   - **Image:** choose the **Rect** or **Point** tool in the toolbar, then drag or click on the canvas.
6. Enter a comment; save with the button or `Cmd/Ctrl+Enter`.
7. Open the queue by clicking its count and choose **Send to OMP**. `Cmd/Ctrl+Shift+Enter` saves and sends immediately.

The bridge inserts the batch as a user turn in the OMP session. Pending annotations remain in the webview state until a successful send.

## Configuration

| Setting | Default | Purpose |
|---|---|---|
| `ompMarkdownAnnotator.bridgeHost` | `127.0.0.1` | Host of the OMP annotator bridge. |
| `ompMarkdownAnnotator.bridgePort` | `4747` | Port printed by `/listen`. |
| `ompMarkdownAnnotator.plantumlServerUrl` | `https://www.plantuml.com/plantuml` | PlantUML rendering server. |
| `ompMarkdownAnnotator.plantumlJarPath` | *(empty)* | Absolute path to `plantuml.jar`. When set, renders offline via `java -jar` and overrides the server URL. |

## Payload shape

Every annotation is posted to `/__bridge/send` with a `subject` field distinguishing surfaces (`markdown` | `image` | `puml`). Each annotation additionally carries a `surface` marker plus type-specific fields:

- Markdown / PUML: `xpath`, `elementSnippet`, `selectedText`, `kind: "comment" | "element"`.
- Image: `kind: "rect" | "point"`, `region: { xNorm, yNorm, wNorm, hNorm, xPx, yPx, wPx, hPx, imageWidth, imageHeight }`.

## Scope

- VS Code does not allow an extension to inject scripts into the built-in Markdown / image preview. This extension therefore ships opt-in custom editors.
- The Markdown editor auto-opens beside; image and PUML editors are command-only to avoid hijacking the built-in viewers.
- PUML `!include` directives are not resolved locally before submission; the render server / jar resolves them if reachable.
