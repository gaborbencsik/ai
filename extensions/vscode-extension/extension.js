const vscode = require("vscode");
const MarkdownIt = require("markdown-it");
const zlib = require("zlib");
const { execFile } = require("child_process");

const CLIENT = "omp-vscode/0.2.0";
const MD_VIEW = "ompMarkdownAnnotator.preview";
const IMG_VIEW = "ompMarkdownAnnotator.imagePreview";
const PUML_VIEW = "ompMarkdownAnnotator.pumlPreview";

const RE_MD = /\.(?:md|markdown|mdown|mkd)$/i;
const RE_IMG = /\.(?:png|jpe?g|gif|webp|bmp)$/i;
const RE_PUML = /\.(?:puml|plantuml|iuml|wsd)$/i;

const markdownRenderer = new MarkdownIt({ html: false, linkify: true, typographer: true });

function activate(context) {
  const bridge = new Bridge();
  const mdProvider = new MarkdownProvider(context, bridge);
  const imgProvider = new ImageProvider(context, bridge);
  const pumlProvider = new PumlProvider(context, bridge);

  const opened = new Set();
  const autoOpenMarkdown = async (uri) => {
    if (!uri || uri.scheme !== "file" || !RE_MD.test(uri.path)) return;
    const key = uri.toString();
    if (opened.has(key)) return;
    opened.add(key);
    try {
      await vscode.commands.executeCommand("vscode.openWith", uri, MD_VIEW, vscode.ViewColumn.Beside);
    } catch (error) {
      opened.delete(key);
      void vscode.window.showErrorMessage(`Could not open the OMP Markdown Annotator: ${error.message}`);
    }
  };

  const openWith = (viewType, matcher, filters, label) => async (arg) => {
    const target = await resolveUri(arg, matcher, filters);
    if (!target) {
      void vscode.window.showErrorMessage(`No ${label} file was selected for the OMP annotator.`);
      return;
    }
    opened.delete(target.toString());
    try {
      await vscode.commands.executeCommand("vscode.openWith", target, viewType, vscode.ViewColumn.Beside);
    } catch (error) {
      void vscode.window.showErrorMessage(`Could not open the OMP ${label} annotator: ${error.message}`);
    }
  };

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(MD_VIEW, mdProvider, {
      webviewOptions: { retainContextWhenHidden: true },
      supportsMultipleEditorsPerDocument: false,
    }),
    vscode.window.registerCustomEditorProvider(IMG_VIEW, imgProvider, {
      webviewOptions: { retainContextWhenHidden: true },
      supportsMultipleEditorsPerDocument: false,
    }),
    vscode.window.registerCustomEditorProvider(PUML_VIEW, pumlProvider, {
      webviewOptions: { retainContextWhenHidden: true },
      supportsMultipleEditorsPerDocument: false,
    }),
    vscode.window.onDidChangeActiveTextEditor((editor) => void autoOpenMarkdown(editor?.document.uri)),
    vscode.commands.registerCommand(
      "ompMarkdownAnnotator.openPreview",
      openWith(MD_VIEW, RE_MD, { Markdown: ["md", "markdown", "mdown", "mkd"] }, "Markdown"),
    ),
    vscode.commands.registerCommand(
      "ompMarkdownAnnotator.openImagePreview",
      openWith(IMG_VIEW, RE_IMG, { Images: ["png", "jpg", "jpeg", "gif", "webp", "bmp"] }, "image"),
    ),
    vscode.commands.registerCommand(
      "ompMarkdownAnnotator.openPumlPreview",
      openWith(PUML_VIEW, RE_PUML, { PlantUML: ["puml", "plantuml", "iuml", "wsd"] }, "PlantUML"),
    ),
  );

  void autoOpenMarkdown(vscode.window.activeTextEditor?.document.uri);
}

async function resolveUri(arg, matcher, filters) {
  const candidates = [
    arg,
    arg?.resourceUri,
    vscode.window.activeTextEditor?.document.uri,
    vscode.window.tabGroups.activeTabGroup.activeTab?.input?.uri,
    ...vscode.window.visibleTextEditors.map((editor) => editor.document.uri),
    ...vscode.workspace.textDocuments.map((doc) => doc.uri),
  ];
  const found = candidates.find((c) => c instanceof vscode.Uri && c.scheme === "file" && matcher.test(c.path));
  if (found) return found;
  const selected = await vscode.window.showOpenDialog({
    canSelectFiles: true,
    canSelectFolders: false,
    canSelectMany: false,
    filters,
    openLabel: "Open Annotatable Preview",
  });
  return selected?.[0];
}

class Bridge {
  async send(uri, annotations, message, subject) {
    if (!Array.isArray(annotations) || annotations.length === 0) {
      void vscode.window.showWarningMessage("There are no annotations to send.");
      return false;
    }
    const config = vscode.workspace.getConfiguration("ompMarkdownAnnotator");
    const host = config.get("bridgeHost", "127.0.0.1");
    const port = config.get("bridgePort", 4747);
    const base = `http://${host}:${port}`;
    try {
      const cfgResponse = await fetch(`${base}/__bridge/config`, { signal: AbortSignal.timeout(2000) });
      if (!cfgResponse.ok) throw new Error(`bridge returned HTTP ${cfgResponse.status}`);
      const bridgeCfg = await cfgResponse.json();
      if (typeof bridgeCfg.sessionId !== "string") throw new Error("unexpected bridge response");
      const pageUrl = uri.toString();
      const pageTitle = vscode.workspace.asRelativePath(uri, false);
      const payload = {
        sessionId: bridgeCfg.sessionId,
        pageUrl,
        pageTitle,
        subject,
        client: CLIENT,
        capturedAt: new Date().toISOString(),
        message: typeof message === "string" ? message : "",
        annotations: annotations.map((annotation) => ({ ...annotation, pageUrl, pageTitle })),
      };
      const response = await fetch(`${base}/__bridge/send`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error(`bridge returned HTTP ${response.status}`);
      void vscode.window.showInformationMessage(
        `Sent ${annotations.length} ${subject} annotation${annotations.length === 1 ? "" : "s"} to OMP.`,
      );
      return true;
    } catch (error) {
      void vscode.window.showErrorMessage(
        `OMP annotator bridge unavailable at ${base}. Run /listen in the target agent chat, then check the configured port. ${error.message}`,
      );
      return false;
    }
  }
}

function buildHtml({ webview, extensionUri, nonce, cspExtras, scripts, styles = [], initialPayload, bodyMarkup }) {
  const baseStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "main.css"));
  const initialJson = escapeJson(initialPayload);
  const styleLinks = styles
    .map((rel) => `<link rel="stylesheet" href="${webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", rel))}">`)
    .join("\n  ");
  const scriptTags = scripts
    .map((rel) => `<script nonce="${nonce}" src="${webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", rel))}"></script>`)
    .join("\n  ");
  const styleSrc = cspExtras?.styleUnsafeInline
    ? `${webview.cspSource} 'unsafe-inline'`
    : webview.cspSource;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} data: blob:; style-src ${styleSrc}; script-src 'nonce-${nonce}';">
  <link rel="stylesheet" href="${baseStyleUri}">
  ${styleLinks}
  <title>OMP Annotatable Preview</title>
</head>
<body>
  ${bodyMarkup}
  <script nonce="${nonce}">window.__OMP_INITIAL__ = ${initialJson};</script>
  ${scriptTags}
</body>
</html>`;
}

const SIDEBAR_MARKUP = `<button id="badge" type="button" title="Arm annotator"><span>✎</span><strong>0</strong></button>
  <aside id="sidebar" aria-label="Annotations">
    <header><div><b>OMP Annotations</b><small id="document-title"></small></div><button id="close" type="button">×</button></header>
    <p class="hint">Arm the annotator, then select text, click a rendered block, or drag a region.</p>
    <ol id="annotations"></ol>
    <footer><textarea id="batch-message" placeholder="Optional message for the agent"></textarea><button id="send" type="button">Send to OMP</button></footer>
  </aside>
  <section id="comment" hidden role="dialog" aria-label="Add annotation"><blockquote></blockquote><textarea placeholder="Comment"></textarea><div><button data-action="cancel">Cancel</button><button class="primary" data-action="save">Save</button></div></section>
  <div id="hover-frame"></div><div id="selected-frame"></div><div id="toast" role="status"></div>`;

class MarkdownProvider {
  constructor(context, bridge) {
    this.context = context;
    this.bridge = bridge;
  }

  async openCustomDocument(uri) {
    return { uri, dispose() {} };
  }

  async resolveCustomEditor(document, panel) {
    const webview = panel.webview;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, "media")],
    };
    const render = (source) => markdownRenderer.render(source);
    const bytes = await vscode.workspace.fs.readFile(document.uri);
    const nonce = randomNonce();
    webview.html = buildHtml({
      webview,
      extensionUri: this.context.extensionUri,
      nonce,
      scripts: ["annotator-core.js", "main.js"],
      initialPayload: {
        mode: "markdown",
        html: render(Buffer.from(bytes).toString("utf8")),
        pageTitle: vscode.workspace.asRelativePath(document.uri, false),
      },
      bodyMarkup: `<main id="preview" class="markdown-body" aria-label="Markdown preview"></main>\n  ${SIDEBAR_MARKUP}`,
    });

    const watcher = vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document.uri.toString() === document.uri.toString()) {
        void webview.postMessage({ type: "render", html: render(event.document.getText()) });
      }
    });
    panel.onDidDispose(() => watcher.dispose());

    webview.onDidReceiveMessage(async (message) => {
      if (message?.type === "send") {
        const sent = await this.bridge.send(document.uri, message.annotations, message.message, "markdown");
        if (sent) void webview.postMessage({ type: "sent" });
      }
      if (message?.type === "error") void vscode.window.showErrorMessage(message.message);
    });
  }
}

class ImageProvider {
  constructor(context, bridge) {
    this.context = context;
    this.bridge = bridge;
  }

  async openCustomDocument(uri) {
    return { uri, dispose() {} };
  }

  async resolveCustomEditor(document, panel) {
    const webview = panel.webview;
    const parent = vscode.Uri.joinPath(document.uri, "..");
    webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, "media"),
        parent,
      ],
    };
    const nonce = randomNonce();
    const imageUri = webview.asWebviewUri(document.uri).toString();
    webview.html = buildHtml({
      webview,
      extensionUri: this.context.extensionUri,
      nonce,
      scripts: ["annotator-core.js", "image.js"],
      styles: ["image.css"],
      initialPayload: {
        mode: "image",
        imageUri,
        pageTitle: vscode.workspace.asRelativePath(document.uri, false),
      },
      bodyMarkup: `<div id="toolbar" role="toolbar" aria-label="Image annotator tools">
    <button type="button" data-tool="rect" class="active" title="Rectangle (drag)">▭ Rect</button>
    <button type="button" data-tool="point" title="Point (click)">◉ Point</button>
    <span class="toolbar-hint">Arm ✎, drag a rectangle or click a point.</span>
  </div>
  <div id="stage"><div id="canvas-wrap"><img id="image" alt=""><canvas id="overlay"></canvas></div></div>
  ${SIDEBAR_MARKUP}`,
    });

    webview.onDidReceiveMessage(async (message) => {
      if (message?.type === "send") {
        const sent = await this.bridge.send(document.uri, message.annotations, message.message, "image");
        if (sent) void webview.postMessage({ type: "sent" });
      }
      if (message?.type === "error") void vscode.window.showErrorMessage(message.message);
    });
  }
}

class PumlProvider {
  constructor(context, bridge) {
    this.context = context;
    this.bridge = bridge;
  }

  async openCustomDocument(uri) {
    return { uri, dispose() {} };
  }

  async resolveCustomEditor(document, panel) {
    const webview = panel.webview;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, "media")],
    };
    const nonce = randomNonce();
    const source = await readText(document.uri);
    const initialSvg = await renderPuml(source).catch((error) => svgError(error.message));
    webview.html = buildHtml({
      webview,
      extensionUri: this.context.extensionUri,
      nonce,
      cspExtras: { styleUnsafeInline: true },
      scripts: ["annotator-core.js", "main.js"],
      initialPayload: {
        mode: "puml",
        html: initialSvg,
        pageTitle: vscode.workspace.asRelativePath(document.uri, false),
      },
      bodyMarkup: `<main id="preview" class="puml-body" aria-label="PlantUML preview"></main>\n  ${SIDEBAR_MARKUP}`,
    });

    let renderTimer = null;
    const rerender = async () => {
      try {
        const svg = await renderPuml(await readText(document.uri));
        await webview.postMessage({ type: "render", html: svg });
      } catch (error) {
        await webview.postMessage({ type: "render", html: svgError(error.message) });
      }
    };
    const watcher = vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document.uri.toString() !== document.uri.toString()) return;
      clearTimeout(renderTimer);
      renderTimer = setTimeout(rerender, 400);
    });
    panel.onDidDispose(() => {
      watcher.dispose();
      clearTimeout(renderTimer);
    });

    webview.onDidReceiveMessage(async (message) => {
      if (message?.type === "send") {
        const sent = await this.bridge.send(document.uri, message.annotations, message.message, "puml");
        if (sent) void webview.postMessage({ type: "sent" });
      }
      if (message?.type === "error") void vscode.window.showErrorMessage(message.message);
    });
  }
}

async function readText(uri) {
  const bytes = await vscode.workspace.fs.readFile(uri);
  return Buffer.from(bytes).toString("utf8");
}

async function renderPuml(source) {
  const config = vscode.workspace.getConfiguration("ompMarkdownAnnotator");
  const jar = (config.get("plantumlJarPath", "") || "").trim();
  if (jar) return renderPumlViaJar(source, jar);
  const server = (config.get("plantumlServerUrl", "https://www.plantuml.com/plantuml") || "").replace(/\/+$/, "");
  if (!server) throw new Error("plantumlServerUrl is empty and plantumlJarPath is unset");
  return renderPumlViaServer(source, server);
}

async function renderPumlViaServer(source, server) {
  const encoded = plantumlEncode(source);
  const url = `${server}/svg/${encoded}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`PlantUML server HTTP ${response.status} @ ${server}`);
  const svg = await response.text();
  return sanitizeSvg(svg);
}

function renderPumlViaJar(source, jarPath) {
  return new Promise((resolve, reject) => {
    const child = execFile(
      "java",
      ["-Djava.awt.headless=true", "-jar", jarPath, "-tsvg", "-pipe"],
      { maxBuffer: 32 * 1024 * 1024, encoding: "utf8" },
      (error, stdout, stderr) => {
        if (error) return reject(new Error(`plantuml.jar failed: ${stderr || error.message}`));
        resolve(sanitizeSvg(stdout));
      },
    );
    child.stdin.on("error", reject);
    child.stdin.end(source);
  });
}

function sanitizeSvg(svg) {
  if (!svg) return svgError("empty SVG response");
  return svg
    .replace(/<\?xml[^?]*\?>/g, "")
    .replace(/<!DOCTYPE[^>]*>/g, "")
    .trim();
}

function svgError(message) {
  const safe = String(message ?? "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 96"><rect width="480" height="96" fill="#fde2e2"/><text x="14" y="34" font-family="monospace" font-size="13" fill="#b91c1c">PlantUML render failed:</text><text x="14" y="58" font-family="monospace" font-size="11" fill="#7f1d1d">${safe.slice(0, 240)}</text><text x="14" y="80" font-family="monospace" font-size="10" fill="#7f1d1d">Set plantumlServerUrl or plantumlJarPath in settings.</text></svg>`;
}

// PlantUML text encoding: raw deflate + custom base64 alphabet.
function plantumlEncode(text) {
  const deflated = zlib.deflateRawSync(Buffer.from(text, "utf8"), { level: 9 });
  return encode64(deflated);
}

function encode6bit(b) {
  if (b < 10) return String.fromCharCode(48 + b);
  b -= 10;
  if (b < 26) return String.fromCharCode(65 + b);
  b -= 26;
  if (b < 26) return String.fromCharCode(97 + b);
  b -= 26;
  if (b === 0) return "-";
  if (b === 1) return "_";
  return "?";
}

function append3bytes(b1, b2, b3) {
  const c1 = b1 >> 2;
  const c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
  const c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
  const c4 = b3 & 0x3F;
  return encode6bit(c1 & 0x3F) + encode6bit(c2 & 0x3F) + encode6bit(c3 & 0x3F) + encode6bit(c4 & 0x3F);
}

function encode64(bytes) {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i];
    const b2 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b3 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    out += append3bytes(b1, b2, b3);
  }
  return out;
}

function randomNonce() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

function deactivate() {}

module.exports = { activate, deactivate };
