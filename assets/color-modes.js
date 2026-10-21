// Bootstrap color modes: https://getbootstrap.com/docs/6.0/customize/color-modes/
(() => {
  const modes = ['light', 'dark', 'auto'];
  let theme = 'auto';

  try {
    const saved = localStorage.getItem('theme');
    if (modes.includes(saved)) theme = saved;
  } catch {
    // Theme switching still works when storage is unavailable.
  }

  const applyTheme = () => {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-bs-theme');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  };

  // Run before the stylesheet loads to avoid flashing the wrong theme.
  applyTheme();

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const label = document.getElementById('theme-label');
    const buttons = document.querySelectorAll('[data-bs-theme-value]');

    const updatePicker = () => {
      label.textContent = theme[0].toUpperCase() + theme.slice(1);
      toggle.setAttribute('aria-label', `Choose color theme (current: ${theme})`);
      buttons.forEach(button => {
        const selected = button.dataset.bsThemeValue === theme;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
    };

    buttons.forEach(button => button.addEventListener('click', () => {
      theme = button.dataset.bsThemeValue;
      try {
        localStorage.setItem('theme', theme);
      } catch {
        // Keep the selection for this page even if it cannot be persisted.
      }
      applyTheme();
      updatePicker();
      toggle.focus();
    }));

    updatePicker();
  });
})();
