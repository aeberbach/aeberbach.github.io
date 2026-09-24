// Initialize theme before page render to prevent a flash of the wrong theme.
// Mode is one of: 'light' | 'dark' | 'auto' (auto follows the OS). The resolved
// light/dark value drives [data-theme]; the chosen mode drives [data-theme-mode]
// (used to highlight the active toggle button).
(function () {
  var mode = localStorage.getItem('theme') || 'auto';
  var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  var el = document.documentElement;
  el.dataset.theme = mode === 'auto' ? system : mode;
  el.dataset.themeMode = mode;

  // Restore the sidebar shown/hidden choice before render to avoid a layout flash.
  if (localStorage.getItem('sidebar') === 'hidden') {
    el.dataset.sidebar = 'hidden';
  }
})();
