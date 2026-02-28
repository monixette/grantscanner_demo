/* ============================================================
   Grant Scanner — app.js (shared across all pages)
   Theme toggle, burger menu, countdown, breadcrumb hover
   ============================================================ */

(function () {
  'use strict';

  /* ── Theme (always starts light; toggle works within session) ── */
  function initTheme() {
    applyTheme('light');
  }
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    const btn = document.getElementById('themeToggle');
    const lbl = document.getElementById('mobileThemeLabel');
    if (btn) btn.textContent = t === 'dark' ? '🌙' : '☀️';
    if (lbl) lbl.textContent = t === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode';
  }
  window.toggleTheme = function () {
    const cur = document.documentElement.getAttribute('data-theme');
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  };
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', window.toggleTheme);
  initTheme();

  /* ── Burger ── */
  const burger = document.getElementById('burgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      const bars = burger.querySelectorAll('span');
      if (open) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
        burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  /* ── Countdown ── */
  const daysEl = document.getElementById('daysLeft');
  if (daysEl) {
    const deadline = new Date('2026-03-27T23:30:00-06:00');
    const diff = Math.max(0, Math.ceil((deadline - new Date()) / 86400000));
    daysEl.textContent = diff;
  }

}());
