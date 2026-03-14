function navigateTo(page, filter) {
  currentPage = page;
  currentFilter = filter || currentFilter;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.querySelector(`[data-page="${page}"]`) || document.querySelector(`[data-filter="${filter}"]`);
  if (activeNav) activeNav.classList.add('active');

  const titles = { home: 'Panoramica', techniques: 'Tutte le Tecniche', detail: currentTechnique?.name || 'Dettaglio', quiz: 'Test Resistenza', about: 'Informazioni' };
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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item[data-page]').forEach(el => el.addEventListener('click', () => navigateTo(el.dataset.page)));
  document.querySelectorAll('.nav-item[data-filter]').forEach(el => el.addEventListener('click', () => navigateTo('techniques', el.dataset.filter)));
  updateCategoryCounts();
  navigateTo('home');
});
