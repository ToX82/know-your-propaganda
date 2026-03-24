window.slugMaps = { it: null, en: null };
let initialHashHandled = false;

/* ─── SIDEBAR ──────────────────────────────────────── */
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
};

/* ─── HASH ROUTING ─────────────────────────────────── */
function getHashRoute() {
  const hash = location.hash.slice(1);
  console.log('getHashRoute - hash:', hash);

  if (!hash) return { page: 'home' };
  const parts = hash.split('/');
  console.log('getHashRoute - parts:', parts);

  if (parts.length >= 3 && i18n.supported.includes(parts[0]) && parts[1] === 'technique' && parts[2]) {
    const lang = parts[0];
    const slug = parts[2];
    console.log('getHashRoute - matched technique route:', { page: 'detail', lang, slug });
    return { page: 'detail', lang, slug };
  }

  if (parts[0] === 'detail' && parts[1]) return { page: 'detail', id: parseInt(parts[1], 10) };
  if (parts[0] === 'techniques' && parts[1]) return { page: 'techniques', filter: parts[1] };

  console.log('getHashRoute - default route:', { page: parts[0] || 'home' });
  return { page: parts[0] || 'home' };
}

function updateMetaDescription() {
  const meta = document.querySelector('meta[name="description"]');
  if (meta && typeof techniques !== 'undefined') {
    meta.setAttribute('content', 'Learn to spot ' + techniques.length + ' propaganda techniques. Take the Resistance Test and earn your Agent rank.');
  }
}

function updateHash(page, extra) {
  let hash = '';

  if (page === 'technique') {
    const lang = _lang || 'it';
    hash = `#${lang}/technique/${extra}`;
  } else {
    hash = '#' + page;
    if (page === 'detail' && extra) hash += '/' + extra;
    if (page === 'techniques' && extra && extra !== 'all') hash += '/' + extra;
  }

  if (location.hash !== hash) {
    history.pushState(null, '', hash);
  }
}

/* ─── NAVIGATION ───────────────────────────────────── */
function navigateTo(page, filter) {
  if (!window.matchMedia('(min-width: 768px)').matches && isSidebarOpen()) {
    closeSidebar();
  }
  currentPage = page;
  if (filter) currentFilter = filter;

  // Update hash
  if (page === 'detail' && currentTechnique) {
    const slug = window.slugify(currentTechnique.name);
    updateHash('technique', slug);
  } else if (page === 'techniques' && filter && filter !== 'all') {
    updateHash('techniques', filter);
  } else {
    updateHash(page);
  }

  // Update active nav
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.querySelector('[data-page="' + page + '"]') || document.querySelector('[data-filter="' + filter + '"]');
  if (activeNav) activeNav.classList.add('active');

  // Update title
  const u = _ui;
  const titles = {
    home: u.nav.home,
    techniques: u.nav.techniques,
    detail: currentTechnique ? currentTechnique.name : '',
    quiz: u.nav.quiz,
    about: u.nav.about,
    analyzer: u.nav.analyzer || (typeof _lang !== 'undefined' && _lang === 'it' ? 'Analizzatore' : 'Analyzer'),
    training: u.nav.training || (typeof _lang !== 'undefined' && _lang === 'it' ? 'Allenamento' : 'Training')
  };
  document.getElementById('page-title').textContent = titles[page] || page;

  // Render content
  const content = document.getElementById('content');
  content.innerHTML = '';
  content.className = 'p-4 md:p-6 lg:p-8 flex-1 min-w-0 animate-fade-in';

  if (page === 'home') renderHome();
  else if (page === 'techniques') renderTechniques();
  else if (page === 'detail') renderDetail();
  else if (page === 'quiz') renderQuiz();
  else if (page === 'about') renderAbout();
  else if (page === 'analyzer') renderAnalyzer();
  else if (page === 'training') renderTraining();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHashRoute() {
  const route = getHashRoute();
  console.log('handleHashRoute - Route:', route, 'initialHashHandled:', initialHashHandled);

  if (route.page === 'detail' && route.slug) {
    console.log('Processing technique slug route. Current lang:', _lang, 'Route lang:', route.lang, 'Slug:', route.slug);

    if (route.lang && route.lang !== _lang) {
      console.log('Switching language from', _lang, 'to', route.lang);
      switchLanguage(route.lang);
      return;
    }

    const t = window.findTechniqueBySlug(_lang, route.slug);
    if (t) {
      currentTechnique = t;
      exploredTechniques.add(t.id);
      KYP.saveExplored();
      KYP.addLastVisited(t.id);
      updateProgress();

      initialHashHandled = true;
      navigateTo('detail');
      return;
    } else {
      console.error('Technique not found for slug:', route.slug);
    }
  }

  if (route.page === 'techniques' && route.filter) {
    currentFilter = route.filter;
  }

  const validPages = ['home', 'techniques', 'quiz', 'about', 'analyzer', 'training'];
  navigateTo(validPages.includes(route.page) ? route.page : 'home', route.filter);
  initialHashHandled = true;
}

async function switchLanguage(lang) {
  i18n.setLang(lang);
  currentPage = 'home';
  currentTechnique = null;
  currentFilter = 'all';
  exploredTechniques = new Set();
  masteredTechniques = new Set();
  lastVisited = [];
  quizSelections = {};
  quizScores = {};
  currentQuizQuestion = 0;
  quizResultsVisible = false;
  quizStarted = false;
  quizStreak = 0;
  quizMaxStreak = 0;
  quizStartTime = null;
  techniqueQuizState = { answered: false, selected: null };

  await i18n.loadLocale(lang);
  window.slugMaps[lang] = window.createSlugMap(techniques, lang);
  updateStaticUI();
  updateCategoryCounts();
  updateMetaDescription();
  handleHashRoute();
}

/* ─── INIT ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  KYP.loadAll();
  const lang = i18n.getLang();
  await i18n.loadLocale(lang);
  window.slugMaps[lang] = window.createSlugMap(techniques, lang);

  // Wire nav
  document.querySelectorAll('.nav-item[data-page]').forEach(function(el) {
    el.addEventListener('click', function() {
      navigateTo(el.dataset.page);
    });
  });
  document.querySelectorAll('.nav-item[data-filter]').forEach(function(el) {
    el.addEventListener('click', function() {
      navigateTo('techniques', el.dataset.filter);
    });
  });

  // Sidebar
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => isSidebarOpen() ? closeSidebar() : openSidebar());
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches && isSidebarOpen()) closeSidebar();
  });

  // Hash change
  window.addEventListener('hashchange', handleHashRoute);

  // Lang switch
  const langBtn = document.getElementById('lang-switch');
  if (langBtn) {
    langBtn.addEventListener('click', function() {
      switchLanguage(langBtn.dataset.switchTo);
    });
  }

  updateStaticUI();
  updateCategoryCounts();
  updateMetaDescription();
  handleHashRoute();
});
