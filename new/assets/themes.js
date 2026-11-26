(() => {
  const themes = {
    field: 'Field',
    studio: 'Studio',
    blueprint: 'Blueprint',
    timber: 'Timber',
    basalt: 'Basalt',
  };
  const root = document.documentElement;
  const storageKey = 'rhyder-theme';
  const isTheme = (value) => Object.hasOwn(themes, value);

  try {
    const saved = localStorage.getItem(storageKey);
    if (isTheme(saved)) root.dataset.theme = saved;
  } catch {
    // The default theme is available even when browser storage is disabled.
  }

  document.addEventListener('DOMContentLoaded', () => {
    const control = document.createElement('div');
    control.className = 'theme-switcher';
    control.setAttribute('role', 'group');
    control.setAttribute('aria-label', 'Website theme');

    for (const [value, name] of Object.entries(themes)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = name;
      button.setAttribute('aria-pressed', String(value === root.dataset.theme));
      button.addEventListener('click', () => {
        const active = control.querySelector('[aria-pressed="true"]');
        active?.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-pressed', 'true');
        root.dataset.theme = value;
        try {
          localStorage.setItem(storageKey, value);
        } catch {
          // The selected theme still applies to the current page.
        }
      });
      control.append(button);
    }

    document.body.classList.add('has-theme-switcher');
    document.body.append(control);
  });
})();
