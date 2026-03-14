function navigateTo(page, filter) {
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
  content.className = 'p-6 animate-fade-in';

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
  completedQuestions = new Set();
  quizScores = {};
  currentQuizQuestion = 0;
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

  // Lang switcher
  const langBtn = document.getElementById('lang-switch');
  if (langBtn) {
    langBtn.addEventListener('click', () => switchLanguage(langBtn.dataset.switchTo));
  }

  updateStaticUI();
  updateCategoryCounts();
  navigateTo('home');
});
