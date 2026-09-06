(() => {
  const globalScope = window;
  globalScope.OMP = globalScope.OMP || {};

  globalScope.OMP.createShell = function createShell({ initial }) {
    const vscode = acquireVsCodeApi();
    const state = vscode.getState() ?? { annotations: [], armed: false };
    let candidate = null;
    const changeListeners = [];

    const badge = document.getElementById("badge");
    const sidebar = document.getElementById("sidebar");
    const list = document.getElementById("annotations");
    const comment = document.getElementById("comment");
    const commentText = comment.querySelector("textarea");
    const quote = comment.querySelector("blockquote");
    const toast = document.getElementById("toast");
    const selectedFrame = document.getElementById("selected-frame");
    const hoverFrame = document.getElementById("hover-frame");
    const titleEl = document.getElementById("document-title");
    const batchMessage = document.getElementById("batch-message");
    const sendBtn = document.getElementById("send");
    const closeBtn = document.getElementById("close");

    if (titleEl) titleEl.textContent = initial?.pageTitle || "";

    function persist() {
      vscode.setState({ annotations: state.annotations, armed: state.armed });
    }

    function escapeHtml(value) {
      return String(value ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
      }[c]));
    }

    function refresh() {
      badge.classList.toggle("armed", state.armed);
      badge.classList.toggle("queued", state.annotations.length > 0);
      badge.querySelector("strong").textContent = String(state.annotations.length);
      document.body.classList.toggle("armed", state.armed);
      list.replaceChildren();
      if (state.annotations.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "No pending annotations.";
        list.appendChild(empty);
      }
      state.annotations.forEach((annotation, index) => {
        const row = document.createElement("li");
        const body = document.createElement("div");
        body.innerHTML = `<b>${escapeHtml(annotation.note || "(no note)")}</b><small>${escapeHtml(annotation.label)}</small>`;
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "×";
        remove.title = "Remove annotation";
        remove.addEventListener("click", () => {
          state.annotations.splice(index, 1);
          persist();
          refresh();
        });
        row.append(body, remove);
        list.appendChild(row);
      });
      persist();
      for (const cb of changeListeners) cb();
    }

    function arm() {
      state.armed = !state.armed;
      if (!state.armed) clearFrames();
      refresh();
      showToast(state.armed ? "Annotator armed" : "Annotator disarmed");
    }

    function frame(el, rect) {
      if (!el) return;
      el.style.display = "block";
      el.style.left = `${rect.left}px`;
      el.style.top = `${rect.top}px`;
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
    }

    function clearFrames() {
      if (hoverFrame) hoverFrame.style.display = "none";
      if (selectedFrame) selectedFrame.style.display = "none";
    }

    function openComment(next, onSave) {
      candidate = { data: next, onSave };
      quote.textContent = next.selectedText || next.label || "";
      commentText.value = "";
      comment.hidden = false;
      const width = 340;
      const left = Math.max(12, Math.min(innerWidth - width - 12, next.rect.left + next.rect.width / 2 - width / 2));
      const top = Math.max(12, next.rect.bottom + 10);
      comment.style.left = `${left}px`;
      comment.style.top = `${top}px`;
      if (next.frameRect) frame(selectedFrame, next.frameRect);
      setTimeout(() => commentText.focus(), 0);
    }

    function closeComment() {
      comment.hidden = true;
      candidate = null;
      if (selectedFrame) selectedFrame.style.display = "none";
    }

    function saveComment() {
      if (!candidate) return;
      const id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}${Math.random()}`).slice(0, 8);
      const note = commentText.value.trim();
      const extra = candidate.onSave ? (candidate.onSave({ id, note }) ?? {}) : {};
      state.annotations.push({
        id,
        createdAt: new Date().toISOString(),
        note,
        label: candidate.data.label || "",
        selectedText: candidate.data.selectedText || "",
        ...extra,
      });
      state.armed = false;
      closeComment();
      clearFrames();
      sidebar.dataset.open = "true";
      refresh();
      showToast("Annotation queued");
    }

    function send() {
      if (!state.annotations.length) return showToast("No annotations to send");
      vscode.postMessage({
        type: "send",
        annotations: state.annotations,
        message: batchMessage.value,
      });
    }

    function showToast(text) {
      toast.textContent = text;
      toast.dataset.show = "true";
      clearTimeout(showToast.timer);
      showToast.timer = setTimeout(() => { toast.dataset.show = "false"; }, 1800);
    }

    badge.addEventListener("click", (event) => {
      if (event.target === badge.querySelector("strong") && state.annotations.length > 0) {
        sidebar.dataset.open = "true";
      } else {
        arm();
      }
    });
    closeBtn.addEventListener("click", () => { sidebar.dataset.open = "false"; });
    comment.addEventListener("click", (event) => {
      if (event.target.dataset.action === "cancel") closeComment();
      if (event.target.dataset.action === "save") saveComment();
    });
    commentText.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeComment();
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        const wantsSend = event.shiftKey;
        saveComment();
        if (wantsSend) send();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && comment.hidden) {
        state.armed = false;
        clearFrames();
        refresh();
      }
    });
    sendBtn.addEventListener("click", send);

    window.addEventListener("message", (event) => {
      if (event.data?.type === "sent") {
        state.annotations = [];
        batchMessage.value = "";
        sidebar.dataset.open = "false";
        refresh();
        showToast("Annotations sent to OMP");
      }
    });

    refresh();

    return {
      vscode,
      state,
      refresh,
      arm,
      showToast,
      clearFrames,
      openComment,
      closeComment,
      escapeHtml,
      hoverFrame,
      selectedFrame,
      onChange(cb) { changeListeners.push(cb); },
      frame,
      get candidate() { return candidate; },
    };
  };
})();
