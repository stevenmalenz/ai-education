const tabGroups = document.querySelectorAll("[data-tabs]");

tabGroups.forEach((group) => {
  const buttons = group.querySelectorAll("[role='tab']");
  const panels = group.querySelectorAll("[role='tabpanel']");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("aria-controls");

      buttons.forEach((item) => item.setAttribute("aria-selected", "false"));
      panels.forEach((panel) => panel.classList.remove("active"));

      button.setAttribute("aria-selected", "true");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    const text = target.innerText.trim();
    const setTemporaryLabel = (label) => {
      const original = button.textContent;
      button.textContent = label;
      window.setTimeout(() => {
        button.textContent = original;
      }, 1300);
    };

    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(text);
      setTemporaryLabel("Copied");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (copied) {
        setTemporaryLabel("Copied");
        return;
      }

      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      setTemporaryLabel("Selected");
    }
  });
});
