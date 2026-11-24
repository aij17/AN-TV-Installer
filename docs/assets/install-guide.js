document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const code = document.getElementById(button.dataset.copy);
    if (!code) return;
    const value = code.textContent;
    let copied = false;
    try { await navigator.clipboard.writeText(value); copied = true; } catch (_) {
      const area = document.createElement('textarea');
      area.value = value; area.style.position = 'fixed'; area.style.opacity = '0';
      document.body.append(area); area.select();
      try { copied = document.execCommand('copy'); } catch (_) {}
      area.remove(); button.focus();
    }
    if (!copied) { window.prompt('انسخ الأوامر التالية:', value); return; }
    button.textContent = 'تم النسخ ✓';
    window.setTimeout(() => { button.textContent = 'نسخ الأوامر'; }, 2000);
  });
});
