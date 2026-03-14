function openSidebar() {
  document.getElementById('sidebar').classList.add('translate-x-0');
  document.getElementById('sidebar-overlay').classList.remove('hidden');
  const btn = document.getElementById('sidebar-toggle');
  if (btn) {
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', _ui && _ui.nav ? _ui.nav.closeMenu : 'Chiudi menu');
  }
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('translate-x-0');
  document.getElementById('sidebar-overlay').classList.add('hidden');
  const btn = document.getElementById('sidebar-toggle');
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', _ui && _ui.nav ? _ui.nav.openMenu : 'Apri menu');
  }
}

function isSidebarOpen() {
  return document.getElementById('sidebar').classList.contains('translate-x-0');
}

function navigateTo(page, filter) {
  if (!window.matchMedia('(min-width: 768px)').matches && isSidebarOpen()) {
    closeSidebar();
  }
  currentPage = page;
  currentFilter = filter || currentFilter;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.querySelector('[data-page="' + page + '"]') || document.querySelector('[data-filter="' + filter + '"]');
  if (activeNav) activeNav.classList.add('active');

  const u = _ui;
  const titles = {
    home: u.nav.home,
    techniques: u.nav.techniques,
    detail: currentTechnique ? currentTechnique.name : '',
    quiz: u.nav.quiz,
    about: u.nav.about
  };
  document.getElementById('page-title').textContent = titles[page] || page;

  const content = document.getElementById('content');
  content.innerHTML = '';
  content.className = 'p-4 md:p-6 flex-1 min-w-0 animate-fade-in';

  if (page === 'home') renderHome();
  else if (page === 'techniques') renderTechniques();
  else if (page === 'detail') renderDetail();
  else if (page === 'quiz') renderQuiz();
  else if (page === 'about') renderAbout();
}

async function switchLanguage(lang) {
  i18n.setLang(lang);
  // Reset state on language change
  currentPage = 'home';
  currentTechnique = null;
  currentFilter = 'all';
  exploredTechniques = new Set();
  quizSelections = {};
  quizScores = {};
  currentQuizQuestion = 0;
  quizResultsVisible = false;
  techniqueQuizState = { answered: false, selected: null };

  await i18n.loadLocale(lang);
  updateStaticUI();
  updateCategoryCounts();
  navigateTo('home');
}

document.addEventListener('DOMContentLoaded', async () => {
  const lang = i18n.getLang();
  await i18n.loadLocale(lang);

  // Wire up nav
  document.querySelectorAll('.nav-item[data-page]').forEach(el =>
    el.addEventListener('click', () => navigateTo(el.dataset.page))
  );
  document.querySelectorAll('.nav-item[data-filter]').forEach(el =>
    el.addEventListener('click', () => navigateTo('techniques', el.dataset.filter))
  );

  // Sidebar toggle (mobile)
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      if (isSidebarOpen()) closeSidebar();
      else openSidebar();
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches && isSidebarOpen()) {
      closeSidebar();
    }
  });

  // Lang switcher
  const langBtn = document.getElementById('lang-switch');
  if (langBtn) {
    langBtn.addEventListener('click', () => switchLanguage(langBtn.dataset.switchTo));
  }

  updateStaticUI();
  updateCategoryCounts();
  navigateTo('home');
});
