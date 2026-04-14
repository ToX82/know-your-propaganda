function getLevelFor(count) {
  const levels = (_ui && _ui.nav && Array.isArray(_ui.nav.levels)) ? _ui.nav.levels : [];
  if (!levels.length) return null;
  let current = levels[0], next = null;
  for (let i = 0; i < levels.length; i++) {
    if (count >= levels[i].min) current = levels[i];
    if (count < levels[i].min && !next) next = levels[i];
  }
  return { current, next };
}

function updateProgress() {
  const count = exploredTechniques.size;
  const total = techniques.length;
  const lvl = getLevelFor(count);
  const bar = document.getElementById('progress-bar');
  const text = document.getElementById('progress-text');
  const explored = document.getElementById('explored-count');

  if (lvl && lvl.current) {
    const curMin = lvl.current.min;
    const nextMin = lvl.next ? lvl.next.min : total;
    const span = Math.max(1, nextMin - curMin);
    const within = Math.min(span, count - curMin);
    if (bar) bar.style.width = (within / span * 100) + '%';
    if (text) text.textContent = `${lvl.current.icon} ${lvl.current.name}`;
  } else {
    if (bar) bar.style.width = (count / total * 100) + '%';
    if (text) text.textContent = count + '/' + total;
  }
  if (explored) explored.textContent = count;
  const wrap = document.getElementById('explored-wrap');
  if (wrap) wrap.style.display = count === 0 ? 'none' : '';
}

function updateCategoryCounts() {
  const counts = {};
  techniques.forEach(function(t) {
    counts[t.category] = (counts[t.category] || 0) + 1;
  });
  Object.keys(counts).forEach(function(cat) {
    const el = document.getElementById('count-' + cat);
    if (el) el.textContent = counts[cat];
  });
  document.getElementById('techniques-count').textContent = techniques.length;
}

function updateStaticUI() {
  const u = _ui;
  const navMap = {
    home: u.nav.home, techniques: u.nav.techniques,
    quiz: u.nav.quiz, about: u.nav.about,
    analyzer: u.nav.analyzer, training: u.nav.training
  };
  Object.entries(navMap).forEach(function(entry) {
    var page = entry[0];
    var label = entry[1];
    const el = document.querySelector('[data-page="' + page + '"] [data-label]');
    if (el) el.textContent = label;
  });
  Object.entries(u.nav.categories).forEach(function(entry) {
    var cat = entry[0];
    var label = entry[1];
    const el = document.querySelector('[data-filter="' + cat + '"] [data-label]');
    if (el) el.textContent = label;
  });
  const sectionNav = document.getElementById('section-nav');
  if (sectionNav) sectionNav.textContent = u.nav.sectionNav;
  const langBtn = document.getElementById('lang-switch');
  if (langBtn) {
    langBtn.textContent = u.lang.switchLabel;
    langBtn.dataset.switchTo = u.lang.switchCode;
  }
  const exploredSuffix = document.getElementById('explored-suffix');
  if (exploredSuffix) exploredSuffix.textContent = u.nav.exploredSuffix;
  document.documentElement.lang = _lang;
};

/* ─── HOME ─────────────────────────────────────────── */
function renderHome() {
  const u = _ui.home;
  const content = document.getElementById('content');
  const explored = exploredTechniques.size;
  const mastered = masteredTechniques.size;
  const total = techniques.length;
  const catCount = new Set(techniques.map(t => t.category)).size;

  const homeTitle = (typeof u.title === 'string' && u.title.includes('{count}'))
    ? u.title.replace('{count}', total)
    : u.title;
  const homeDesc = (typeof u.description === 'string' && u.description.includes('{count}'))
    ? u.description.replace('{count}', total)
    : u.description;

  // Last visited section
  const recentTechs = lastVisited
    .map(id => techniques.find(t => t.id === id))
    .filter(Boolean);

  content.innerHTML = `
    <div class="max-w-5xl mx-auto">
      ${renderHeroStatic(u, homeTitle, homeDesc, total, catCount)}

      <div class="animate-fade-in stagger-2">
        ${renderHomeExample()}
      </div>
      <div class="animate-fade-in stagger-3">
        ${renderHomeMiniQuizSection(u, total, catCount)}
      </div>
      <div class="animate-fade-in stagger-3">
        ${renderHomeAnalyzerBlock(total)}
      </div>
      <div class="animate-fade-in stagger-4">
        ${renderHomeDaily()}
      </div>

      ${recentTechs.length > 0 ? `
      <div class="animate-fade-in stagger-4">
        <span class="home-section-label">${(_ui.home && _ui.home.lastVisited) || (_lang === 'it' ? 'Visitate di recente' : 'Recently Visited')}</span>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          ${recentTechs.map(t => `
            <div class="card card-interactive p-3" onclick="openTechnique(${t.id})">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="text-lg">${t.icon}</span>
                <span class="${categoryColors[t.category] || ''} text-[10px] px-1.5 py-0.5">${t.catLabel}</span>
                ${masteredTechniques.has(t.id) ? '<span class="ml-auto text-emerald-500 text-xs">⭐</span>' : '<span class="ml-auto text-amber-400 text-xs">★</span>'}
              </div>
              <h3 class="font-semibold text-xs text-slate-800 leading-tight">${t.name}</h3>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
    </div>
  `;
}

/* ─── HOME DAILY TECHNIQUE ────────────────────────── */
function renderHomeDaily() {
  if (typeof getDailyTechnique !== 'function') return '';
  const t = getDailyTechnique();
  if (!t) return '';
  const u = _ui.home || {};
  const badge = u.dailyBadge || (_lang === 'it' ? 'Tecnica del Giorno' : 'Technique of the Day');
  const cta = u.dailyCTA || (_lang === 'it' ? 'Leggi in 2 minuti' : 'Read in 2 minutes');
  const today = new Date().toLocaleDateString(_lang === 'it' ? 'it-IT' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  const isMastered = masteredTechniques.has(t.id);
  return `
    <div class="mb-8">
      <div class="daily-card cursor-pointer group" onclick="openTechnique(${t.id})">
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-4">
            <span class="home-section-label home-section-label--light" style="margin-bottom:0">${badge}</span>
            <span class="text-[10px] text-white/35 font-mono">${today}</span>
            ${isMastered ? '<span class="text-[10px] text-emerald-400 ml-auto">✓ padroneggiata</span>' : ''}
          </div>
          <div class="flex items-center gap-5">
            <div class="text-5xl shrink-0 leading-none">${t.icon}</div>
            <div class="flex-1 min-w-0">
              <h3 class="text-xl font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors leading-tight">${t.name}</h3>
              <p class="text-sm text-white/65 leading-relaxed line-clamp-2">${t.summary}</p>
            </div>
            <button type="button" class="btn-primary shrink-0 hidden sm:inline-flex group-hover:translate-x-0.5 transition-transform">${cta} →</button>
          </div>
          <div class="mt-4 sm:hidden">
            <button type="button" class="btn-primary w-full justify-center">${cta} →</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ─── HOME EXAMPLE (viral headline) ────────────────── */
function renderHomeExample() {
  const ex = (_ui.home && _ui.home.example) || {};
  const highlights = Array.isArray(ex.highlights) ? ex.highlights : [];
  if (!ex.headline || !highlights.length) return '';

  let highlighted = ex.headline;
  highlights.forEach((h, i) => {
    const colors = ['bg-red-100 text-red-800 border-red-200', 'bg-amber-100 text-amber-800 border-amber-200', 'bg-purple-100 text-purple-800 border-purple-200'];
    const cls = colors[i % colors.length];
    const safePhrase = h.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    highlighted = highlighted.replace(new RegExp(safePhrase), `<span class="inline-block ${cls} border font-semibold rounded px-1.5 py-0.5">${h.phrase}<sup class="ml-0.5 font-mono text-[10px]">${i + 1}</sup></span>`);
  });

  return `
    <div class="mb-8">
      <span class="home-section-label">${ex.sectionLabel || (typeof _lang !== 'undefined' && _lang === 'en' ? 'Propaganda in action' : 'Propaganda in azione')}</span>
      <div class="card p-6 md:p-7">
        <h2 class="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight leading-snug mb-1">${ex.title || ''}</h2>
        <p class="text-sm text-slate-500 mb-4">${ex.intro || ''}</p>
        <blockquote class="card-inset p-4 mb-5 text-base md:text-lg text-slate-800 leading-relaxed font-serif italic border-l-4 border-red-300">
          "${highlighted}"
        </blockquote>
        <div class="space-y-3 mb-3">
          ${highlights.map((h, i) => {
            const t = (typeof techniques !== 'undefined') ? techniques.find(x => x.id === h.techniqueId) : null;
            const name = t ? t.name : '';
            const icon = t ? t.icon : '🔍';
            const clickable = t ? `onclick="openTechnique(${t.id})"` : '';
            return `
              <div class="flex items-start gap-3 text-xs md:text-sm">
                <span class="font-mono font-bold text-slate-400 mt-0.5 shrink-0">${i + 1}</span>
                <div class="flex-1 min-w-0">
                  <button type="button" ${clickable} class="font-semibold text-amber-700 hover:text-amber-800 hover:underline inline-flex items-center gap-1 cursor-pointer">
                    <span>${icon}</span><span>${name}</span>
                  </button>
                  <span class="text-slate-500"> — ${h.note || ''}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <p class="text-[11px] text-slate-400 italic">${ex.footer || ''}</p>
      </div>
    </div>
  `;
}

/* ─── HOME MINI-QUIZ ───────────────────────────────── */
let homeMiniQuizState = { index: 0, selections: [], done: false };

function getHomeMiniQuizQuestions() {
  if (!Array.isArray(quizQuestions) || !quizQuestions.length) return [];
  const wanted = ['q1', 'q3', 'q8'];
  const picked = wanted.map(id => quizQuestions.find(q => q.id === id)).filter(Boolean);
  return picked.length === 3 ? picked : quizQuestions.slice(0, 3);
}

function getMiniQuizSuggestions(state, questions) {
  if (!state.done || !questions.length) return [];
  const categoryMap = { 'q1': 'disinfo', 'q3': 'framing', 'q8': 'emotional' };
  const vulnerable = new Set();
  questions.forEach((q, i) => {
    const score = state.selections[i];
    const cat = categoryMap[q.id];
    if (cat && score !== undefined && score >= 2) vulnerable.add(cat);
  });
  if (vulnerable.size === 0) return [];
  const suggestions = [];
  vulnerable.forEach(cat => {
    const t = techniques.find(x => x.category === cat);
    if (t) suggestions.push(t);
  });
  return suggestions;
}

/* ─── HERO STATICO ─────────────────────────────────── */
function renderHeroStatic(u, homeTitle, homeDesc, total, catCount) {
  const qs = getHomeMiniQuizQuestions();
  const scrollCta = _lang === 'en' ? 'Find out now ↓' : 'Scoprilo ora ↓';
  const exploreCta = _lang === 'en' ? 'Explore techniques' : 'Esplora le tecniche';
  return `
    <div class="hero-dark rounded-2xl p-8 md:p-12 mb-8 animate-fade-in">
      <div class="relative z-10 max-w-xl">
        <h1 class="hero-display text-white mb-4">${homeTitle}</h1>
        <p class="text-base md:text-lg text-white/75 leading-relaxed mb-8">${homeDesc}</p>
        <div class="flex flex-wrap gap-3">
          ${qs.length ? `
            <button onclick="document.getElementById('home-mini-quiz').scrollIntoView({behavior:'smooth'})" class="btn-primary">${scrollCta}</button>
            <button onclick="navigateTo('techniques')" class="btn-secondary">${exploreCta}</button>
          ` : `
            <button onclick="navigateTo('quiz')" class="btn-primary">${u.ctaButton || exploreCta}</button>
            <button onclick="navigateTo('techniques')" class="btn-secondary">${exploreCta}</button>
          `}
        </div>
        <p class="text-[11px] text-white/25 font-mono mt-8">${total} ${u.stats.techniques.toLowerCase()} · ${catCount} ${u.stats.categories.toLowerCase()}</p>
      </div>
    </div>
  `;
}

/* ─── MINI-QUIZ SECTION (dopo l'example block) ─────── */
function renderHomeMiniQuizSection(u, total, catCount) {
  const s = homeMiniQuizState;
  const qs = getHomeMiniQuizQuestions();
  const m = u.miniQuiz || {};
  if (!qs.length) return '';

  const sectionLabel = m.badge || (_lang === 'en' ? 'Quick test' : 'Mettiti alla prova');

  if (s.done) {
    const score = s.selections.reduce((a, b) => a + b, 0);
    const levels = Array.isArray(m.levels) ? m.levels : [];
    const level = levels.find(l => score <= l.max) || levels[levels.length - 1] || {};
    const suggestions = getMiniQuizSuggestions(s, qs);
    return `
      <div class="mb-8" id="home-mini-quiz">
        <span class="home-section-label">${sectionLabel}</span>
        <div class="hero-dark rounded-2xl p-6 md:p-8 animate-fade-in">
          <div class="relative z-10">
            <div class="result-card p-6 md:p-8 max-w-2xl mx-auto">
              <div class="flex items-start gap-4">
                <div class="text-5xl shrink-0">${level.icon || '🎯'}</div>
                <div class="flex-1 min-w-0">
                  <span class="inline-block text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">${m.resultTitle || ''}</span>
                  <h2 class="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight mb-2">${level.title || ''}</h2>
                  <p class="text-sm text-slate-600 leading-relaxed mb-5">${level.desc || ''}</p>
                  <div class="flex flex-wrap gap-3">
                    <button onclick="navigateTo('quiz')" class="btn-primary">${m.ctaFullTest || ''}</button>
                    <button onclick="resetHomeMiniQuiz()" class="btn-secondary">${m.retry || ''}</button>
                  </div>
                </div>
              </div>
              ${suggestions.length > 0 ? `
                <div class="mt-6 pt-5 border-t border-gray-100">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">${m.suggestionsTitle || ''}</h3>
                  <p class="text-xs text-slate-500 mb-3">${m.suggestionsDesc || ''}</p>
                  <div class="grid sm:grid-cols-3 gap-3">
                    ${suggestions.map(t => `
                      <div class="card card-interactive p-3" onclick="openTechnique(${t.id})">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-lg">${t.icon}</span>
                          <span class="${categoryColors[t.category] || ''} text-[10px] px-1.5 py-0.5">${t.catLabel}</span>
                        </div>
                        <h4 class="font-semibold text-xs text-slate-800 leading-tight">${t.name}</h4>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const q = qs[s.index];
  const qLabel = (m.questionLabel || 'Q {n}/{total}').replace('{n}', s.index + 1).replace('{total}', qs.length);
  const isLast = s.index === qs.length - 1;
  return `
    <div class="mb-8" id="home-mini-quiz">
      <span class="home-section-label">${sectionLabel}</span>
      <div class="hero-dark rounded-2xl p-6 md:p-8 animate-fade-in">
        <div class="relative z-10 max-w-2xl">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-[10px] text-white/40 font-mono">${qLabel}</span>
          </div>
          <h2 class="text-base md:text-lg font-extrabold text-white tracking-tight leading-snug mb-1">${m.title || ''}</h2>
          <div class="hero-quiz-situation mt-4 mb-4">
            <div class="text-xs font-semibold text-white/50 mb-1">${q.title}</div>
            <div class="text-sm md:text-base text-white/80 leading-relaxed">${q.situation}</div>
          </div>
          <h3 class="font-semibold text-sm text-white/90 mb-3">${q.question}</h3>
          <div class="space-y-3" id="home-mini-quiz-options">
            ${q.options.map((opt, i) => `
              <button type="button" onclick="selectHomeMiniOption(${i})" class="hero-quiz-option" data-opt="${i}">
                <span class="font-bold font-mono mr-2 text-amber-400">${String.fromCharCode(65 + i)}.</span>${opt.text}
              </button>
            `).join('')}
          </div>
          <div id="home-mini-quiz-next" class="hidden mt-4">
            <button type="button" onclick="advanceHomeMiniQuiz()" class="btn-primary">${isLast ? (m.seeResult || '') : (m.next || '')}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* Mantenuto per compatibilità — non più chiamato dalla home */
function renderHeroWithQuiz(u, homeTitle, homeDesc, total, catCount, explored, mastered) {
  return renderHeroStatic(u, homeTitle, homeDesc, total, catCount);
}

function renderHomeProgress(u, explored, total, quizTotal, maxQuiz) {
  const exploredText = u.progress.exploredOf.replace('{n}', explored).replace('{total}', total);
  const riskText = maxQuiz > 0 && Object.keys(quizScores).length > 0
    ? u.progress.riskScore.replace('{score}', quizTotal).replace('{max}', maxQuiz)
    : u.progress.completeTest;
  return `
    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-sm">📚</span>
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">${u.progress.techniquesLabel}</span>
        </div>
        <div class="progress-track mb-2">
          <div class="progress-fill bg-gradient-to-r from-amber-400 to-amber-500" style="width:${(explored/total)*100}%"></div>
        </div>
        <p class="text-xs text-slate-400 font-mono">${exploredText}</p>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-sm">🛡️</span>
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">${u.progress.resistanceLabel}</span>
        </div>
        <div class="progress-track mb-2">
          <div class="progress-fill bg-gradient-to-r from-emerald-400 to-emerald-500" style="width:${maxQuiz > 0 && Object.keys(quizScores).length > 0 ? 100 - (quizTotal/maxQuiz)*100 : 0}%"></div>
        </div>
        <p class="text-xs text-slate-400 font-mono">${riskText}</p>
      </div>
    </div>
  `;
}

function selectHomeMiniOption(i) {
  const qs = getHomeMiniQuizQuestions();
  const q = qs[homeMiniQuizState.index];
  if (!q) return;
  homeMiniQuizState.selections[homeMiniQuizState.index] = q.options[i].score;
  document.querySelectorAll('#home-mini-quiz-options .hero-quiz-option, #home-mini-quiz-options .quiz-option').forEach((el, idx) => {
    if (idx === i) {
      el.classList.add('selected');
      if (!el.classList.contains('hero-quiz-option')) {
        el.style.background = '#fffbeb';
        el.style.borderColor = '#fcd34d';
      }
    } else {
      el.classList.remove('selected');
      if (!el.classList.contains('hero-quiz-option')) {
        el.style.background = '';
        el.style.borderColor = '';
      }
    }
  });
  const next = document.getElementById('home-mini-quiz-next');
  if (next) next.classList.remove('hidden');
}

function advanceHomeMiniQuiz() {
  const qs = getHomeMiniQuizQuestions();
  if (homeMiniQuizState.selections[homeMiniQuizState.index] === undefined) return;
  if (homeMiniQuizState.index < qs.length - 1) {
    homeMiniQuizState.index++;
  } else {
    homeMiniQuizState.done = true;
  }
  renderHome();
}

function resetHomeMiniQuiz() {
  homeMiniQuizState = { index: 0, selections: [], done: false };
  renderHome();
}

/* ─── HOME ANALYZER BLOCK ──────────────────────────── */
function renderHomeAnalyzerBlock(total) {
  const a = (_ui.home && _ui.home.analyzer) || {};
  const examples = Array.isArray(a.examples) ? a.examples : [];
  const subtitle = (a.subtitle || '').replace('{count}', total);
  return `
    <div class="mb-8">
      <span class="home-section-label home-section-label--light" style="color:#94a3b8">${a.sectionLabel || (typeof _lang !== 'undefined' && _lang === 'en' ? 'Try it yourself' : 'Prova tu stesso')}</span>
      <div class="home-analyzer-card">
        <h2 class="text-lg md:text-xl font-extrabold text-white tracking-tight leading-tight mb-1">${a.title || ''}</h2>
        <p class="text-sm text-white/60 leading-relaxed mb-4">${subtitle}</p>
        <textarea id="home-analyzer-input" rows="3"
          class="home-analyzer-textarea"
          placeholder="${a.placeholder || ''}"></textarea>
        <div class="mt-3 flex flex-wrap items-center gap-2 justify-between">
          ${examples.length ? `
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-[11px] text-white/40 font-medium">${a.examplesLabel || ''}</span>
              ${examples.map((ex, i) => `
                <button type="button" onclick="fillHomeAnalyzer(${i})" class="home-analyzer-chip">
                  ${ex.label}
                </button>
              `).join('')}
            </div>
          ` : '<span></span>'}
          <button onclick="runHomeAnalysis()" class="btn-primary">${a.analyze || ''}</button>
        </div>
      </div>
    </div>
  `;
}

function fillHomeAnalyzer(index) {
  const a = (_ui.home && _ui.home.analyzer) || {};
  const ex = (a.examples || [])[index];
  const input = document.getElementById('home-analyzer-input');
  if (!ex || !input) return;
  input.value = ex.text;
  input.focus();
}

function runHomeAnalysis() {
  const input = document.getElementById('home-analyzer-input');
  const text = (input && input.value || '').trim();
  if (!text) {
    if (input) {
      input.focus();
      input.classList.add('ring-2', 'ring-red-300');
      setTimeout(() => input.classList.remove('ring-2', 'ring-red-300'), 1200);
    }
    return;
  }
  const url = Analyzer.buildPerplexityUrl(text);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ─── TECHNIQUES ───────────────────────────────────── */
function renderTechniques() {
  const u = _ui.techniques;
  const content = document.getElementById('content');
  const filtered = currentFilter === 'all' ? techniques : techniques.filter(t => t.category === currentFilter);

  content.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-wrap gap-2 mb-8 pb-4 border-b border-slate-200">
        ${Object.entries(u.filters).map(([f, label]) => {
          const countAttr = f !== 'all' ? ` <span class="text-caption font-mono text-slate-400" id="count-${f}"></span>` : '';
          return `
          <button type="button" onclick="setFilter('${f}')" class="btn-secondary technique-filter ${currentFilter === f ? 'active' : ''}">
            ${label}${countAttr}
          </button>`;
        }).join('')}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${filtered.map(t => {
          const statusDot = masteredTechniques.has(t.id)
            ? '<span class="tech-status-dot tech-status-dot--mastered" title=""></span>'
            : exploredTechniques.has(t.id)
              ? '<span class="tech-status-dot tech-status-dot--explored" title=""></span>'
              : '<span class="tech-status-dot tech-status-dot--new" title=""></span>';
          return `
          <div class="card card-interactive tech-card p-5" onclick="openTechnique(${t.id})">
            <div class="flex items-start gap-4">
              <span class="text-3xl shrink-0 leading-none" aria-hidden="true">${t.icon}</span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="${categoryColors[t.category] || ''} text-caption px-2 py-0.5">${t.catLabel}</span>
                  ${statusDot}
                </div>
                <h3 class="font-semibold text-heading-sm text-slate-800 leading-snug">${t.name}</h3>
                <p class="text-small text-slate-500 mt-0.5">${t.subtitle}</p>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
  updateCategoryCounts();
}

/* ─── DETAIL ───────────────────────────────────────── */
function openTechnique(id) {
  currentTechnique = techniques.find(t => t.id === id);
  exploredTechniques.add(id);
  KYP.saveExplored();
  KYP.addLastVisited(id);
  updateProgress();
  navigateTo('detail');
}

function openTechniqueBySlug(slug) {
  const t = window.findTechniqueBySlug(_lang, slug);
  if (t) {
    currentTechnique = t;
    exploredTechniques.add(t.id);
    KYP.saveExplored();
    KYP.addLastVisited(t.id);
    updateProgress();
    navigateTo('detail');
  }
}

window.openTechniqueBySlug = function(slug) {
  const t = window.findTechniqueBySlug(_lang, slug);
  if (t) {
    currentTechnique = t;
    exploredTechniques.add(t.id);
    KYP.saveExplored();
    KYP.addLastVisited(t.id);
    updateProgress();
    navigateTo('detail');
  }
}

function renderDetail() {
  const u = _ui.detail;
  const content = document.getElementById('content');
  const t = currentTechnique;
  if (!t) return;

  const quizSection = `
        <section id="technique-quiz" class="p-5 md:p-6">
          <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">${u.sections.quiz}</h2>
          <div id="quiz-container">
            <div class="card-inset p-6 text-center">
              <div class="text-3xl mb-2" aria-hidden="true">🎯</div>
              <h3 class="font-bold text-slate-800 mb-1">${t.scenario.title}</h3>
              <p class="text-xs text-slate-400 mb-4">${u.quizIntro}</p>
              <button type="button" onclick="startTechniqueQuiz()" class="btn-primary">${u.startQuiz}</button>
            </div>
          </div>
        </section>`;

  content.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <button onclick="navigateTo('techniques')" class="btn-secondary mb-5">${u.backButton}</button>

      <!-- Header -->
      <div class="card p-5 md:p-6 mb-0 rounded-b-none border-b-0 bg-gradient-to-r from-amber-50 to-white">
        <div class="flex items-start gap-4">
          <span class="text-3xl md:text-4xl">${t.icon}</span>
          <div>
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class="${categoryColors[t.category]} text-[10px] px-2 py-0.5">${t.catLabel}</span>
              ${exploredTechniques.has(t.id) ? '<span class="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">' + u.exploredBadge + '</span>' : ''}
            </div>
            <h1 class="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">${t.name}</h1>
            <p class="text-sm text-amber-700 font-medium mt-0.5">${t.subtitle}</p>
          </div>
        </div>
        ${t.slogan ? `
          <blockquote class="mt-5 pt-5 border-t border-amber-200/60">
            <p class="text-lg md:text-xl font-extrabold text-slate-800 leading-snug tracking-tight">&ldquo;${t.slogan}&rdquo;</p>
          </blockquote>
        ` : ''}
        ${t.hook ? `
          <div class="mt-4">
            <span class="text-[10px] font-bold uppercase tracking-widest text-amber-600">${u.sections.inAction}</span>
            <p class="mt-1.5 text-sm text-slate-700 italic border-l-2 border-amber-400 pl-3">${t.hook}</p>
          </div>
        ` : ''}
      </div>

      <!-- Body -->
      <div class="card rounded-t-none divide-y divide-gray-100">
        ${t.anatomy ? `
          <section class="p-5 md:p-6">
            <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">${u.sections.anatomy}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
              <div class="card-inset p-4 relative">
                <div class="flex items-center gap-2 mb-2">
                  <span class="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span class="text-xs font-bold uppercase tracking-wider text-amber-700">${u.sections.anatomyBait}</span>
                </div>
                <p class="text-sm text-slate-700 leading-snug">${t.anatomy.bait}</p>
              </div>
              <div class="card-inset p-4 relative">
                <div class="flex items-center gap-2 mb-2">
                  <span class="w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span class="text-xs font-bold uppercase tracking-wider text-orange-700">${u.sections.anatomyHook}</span>
                </div>
                <p class="text-sm text-slate-700 leading-snug">${t.anatomy.hook}</p>
              </div>
              <div class="card-inset p-4 relative" style="border-left: 3px solid #dc2626;">
                <div class="flex items-center gap-2 mb-2">
                  <span class="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span class="text-xs font-bold uppercase tracking-wider text-red-700">${u.sections.anatomyTrap}</span>
                </div>
                <p class="text-sm text-slate-700 leading-snug">${t.anatomy.trap}</p>
              </div>
            </div>
          </section>
        ` : ''}
        ${quizSection}
        <section class="p-5 md:p-6">
          <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">${u.sections.definition}</h2>
          <p class="text-sm text-slate-600 leading-relaxed">${t.definition}</p>
        </section>

        <section class="p-5 md:p-6">
          <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">${u.sections.historical}</h2>
          <p class="text-sm text-slate-600 leading-relaxed">${t.historicalContext}</p>
        </section>

        <section class="p-5 md:p-6">
          <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">${u.sections.psychological}</h2>
          <div class="card-inset p-4 border-l-3 border-l-blue-400" style="border-left: 3px solid #60a5fa;">
            <p class="text-sm text-blue-800 leading-relaxed">${t.psychologicalMechanism}</p>
          </div>
        </section>

        <section class="p-5 md:p-6">
          <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">${u.sections.variants}</h2>
          <div class="space-y-2">
            ${t.variants.map(v => `
              <div class="card-inset flex items-start gap-3 p-3">
                <span class="text-amber-500 font-bold mt-0.5 text-sm">→</span>
                <div><span class="font-semibold text-sm text-slate-700">${v.name}</span><p class="text-xs text-slate-400 mt-0.5">${v.desc}</p></div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="p-5 md:p-6">
          <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">${u.sections.redFlags}</h2>
          <div class="space-y-1.5">
            ${t.redFlags.map(f => `
              <div class="flex items-start gap-2 p-2.5 rounded-lg bg-orange-50 border border-orange-200">
                <span class="text-orange-500 text-xs mt-0.5">⚠</span>
                <span class="text-xs text-orange-800 leading-relaxed">${f}</span>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="p-5 md:p-6">
          <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">${u.sections.caseStudies}</h2>
          <div class="space-y-3">
            ${t.caseStudies.map(cs => `
              <div class="card overflow-hidden">
                <div class="bg-slate-800 px-4 py-2.5">
                  <h3 class="text-sm font-semibold text-white">${cs.title}</h3>
                </div>
                <div class="p-4">
                  <p class="text-sm text-slate-500 mb-2">${cs.description}</p>
                  <p class="text-xs text-amber-700 font-medium border-l-2 border-amber-300 pl-3">💡 ${cs.lesson}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="p-5 md:p-6">
          <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">${u.sections.defense}</h2>
          <div class="space-y-2">
            ${t.defense.map((d, i) => `
              <div class="card-inset flex items-start gap-3 p-3" style="border-left: 3px solid #34d399;">
                <span class="w-5 h-5 bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold rounded shrink-0">${i + 1}</span>
                <div><span class="font-semibold text-sm text-emerald-800">${d.step}</span><p class="text-xs text-slate-400 mt-0.5">${d.action}</p></div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    </div>
  `;
}

/* ─── ABOUT (linear long-form, no accordions) ─────── */
function renderAbout() {
  const u = _ui.about;
  const content = document.getElementById('content');
  const bold = (s) => String(s).replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-800 font-semibold">$1</strong>');
  const stepList = (items) => items.map((it, i) => `
    <li class="flex gap-3">
      <span class="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-caption font-bold font-mono flex items-center justify-center">${i + 1}</span>
      <div class="flex-1 min-w-0">
        <div class="text-small font-semibold text-slate-800">${it.step}</div>
        <div class="text-body text-slate-600 leading-relaxed mt-0.5">${bold(it.desc)}</div>
      </div>
    </li>`).join('');

  const intro = `<p class="text-body text-slate-600 leading-relaxed">${u.infoDesc}</p>`;
  const principles = `
    <ol class="space-y-4 list-none">
      ${u.principles.map((p, i) => `
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 text-amber-600 font-bold font-mono text-small mt-0.5 w-7 text-right">${String(i + 1).padStart(2, '0')}</span>
          <span class="text-body text-slate-600 leading-relaxed">${bold(p)}</span>
        </li>`).join('')}
    </ol>`;
  const workflow = u.workflow ? `
    ${u.workflowIntro ? `<p class="text-small text-slate-500 italic mb-4">${u.workflowIntro}</p>` : ''}
    <ul class="space-y-3 list-none">${stepList(u.workflow)}</ul>` : '';
  const selfCheck = u.selfCheck ? `
    ${u.selfCheckIntro ? `<p class="text-small text-slate-500 italic mb-4">${u.selfCheckIntro}</p>` : ''}
    <ul class="space-y-3 list-none">${stepList(u.selfCheck)}</ul>` : '';
  const redFlags = u.redFlags ? `
    <ul class="space-y-2.5 list-none">
      ${u.redFlags.map(r => `<li class="flex items-start gap-2 text-body text-slate-600 leading-relaxed"><span class="text-amber-600 font-bold mt-0.5" aria-hidden="true">⚑</span><span>${bold(r)}</span></li>`).join('')}
    </ul>` : '';
  const sources = `
    <ul class="space-y-2 list-none">
      ${u.sources.map(s => `<li class="text-body text-slate-500 flex items-start gap-2"><span class="text-slate-300" aria-hidden="true">—</span><span>${bold(s)}</span></li>`).join('')}
    </ul>`;

  content.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-8 pb-12">
      <section class="card p-6 md:p-8">
        <span class="home-section-label">${u.infoTitle}</span>
        ${intro}
      </section>
      <section class="card p-6 md:p-8">
        <span class="home-section-label">${u.principlesTitle}</span>
        ${principles}
      </section>
      ${u.workflow ? `
      <section class="card p-6 md:p-8">
        <span class="home-section-label">${u.workflowTitle}</span>
        ${workflow}
      </section>` : ''}
      ${u.selfCheck ? `
      <section class="card p-6 md:p-8">
        <span class="home-section-label">${u.selfCheckTitle}</span>
        ${selfCheck}
      </section>` : ''}
      ${u.redFlags ? `
      <section class="card p-6 md:p-8">
        <span class="home-section-label">${u.redFlagsTitle}</span>
        ${redFlags}
      </section>` : ''}
      <section class="card p-6 md:p-8">
        <span class="home-section-label">${u.sourcesTitle}</span>
        ${sources}
      </section>
      ${u.closing ? `
      <section class="card p-6 md:p-8 border-l-4 border-amber-400">
        ${u.closingTitle ? `<span class="home-section-label">${u.closingTitle}</span>` : ''}
        <p class="text-body text-slate-600 leading-relaxed italic mt-2">${u.closing}</p>
      </section>` : ''}
    </div>
  `;
}

/* ─── ANALYZER ─────────────────────────────────────── */
function renderAnalyzer() {
  const u = _ui.analyzer;
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <div class="card p-6">
        <h1 class="text-xl font-extrabold text-slate-800 mb-1">${u.title}</h1>
        <p class="text-sm text-slate-500 mb-5">${u.subtitle}</p>
        <textarea id="analyzer-input" rows="6"
          class="w-full text-sm text-slate-700 bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-y transition"
          placeholder="${u.placeholder}"></textarea>
        <div class="mt-3 flex justify-end">
          <button onclick="runAnalysis()" class="btn-primary">${u.analyze}</button>
        </div>
      </div>
    </div>
  `;
}

function runAnalysis() {
  const text = (document.getElementById('analyzer-input') || {}).value || '';
  if (!text.trim()) return;
  const url = Analyzer.buildPerplexityUrl(text);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ─── TRAINING ──────────────────────────────────────── */
function getDailyTechnique() {
  if (!techniques || !techniques.length) return null;
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return techniques[dayOfYear % techniques.length];
}

function renderTraining() {
  const isIT = _lang === 'it';
  const u = (_ui.training) || {};
  const content = document.getElementById('content');
  const t = getDailyTechnique();

  const title    = u.title    || (isIT ? '🎯 Tecnica del Giorno' : '🎯 Technique of the Day');
  const subtitle = u.subtitle || (isIT ? 'Ogni giorno una nuova tecnica da padroneggiare.' : 'A new technique to master every day.');
  const masteredLabel = u.mastered || (isIT ? '⭐ Già padroneggiata!' : '⭐ Already mastered!');
  const startLabel = u.startQuiz || (isIT ? 'Inizia il Quiz' : 'Start Quiz');
  const openLabel = u.openDetail || (isIT ? 'Leggi la guida completa' : 'Read full guide');

  if (!t) {
    content.innerHTML = `<div class="max-w-xl mx-auto card p-6 text-center text-slate-400">-</div>`;
    return;
  }

  const isMastered = masteredTechniques.has(t.id);
  const isExplored = exploredTechniques.has(t.id);
  const today = new Date().toLocaleDateString(_lang === 'it' ? 'it-IT' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' });

  content.innerHTML = `
    <div class="max-w-2xl mx-auto">
      <div class="card p-6 mb-5">
        <div class="flex items-center gap-2 mb-5">
          <span class="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">${title}</span>
          <span class="text-[10px] text-slate-400 font-mono">${today}</span>
        </div>

        <div class="flex items-start gap-4 mb-5">
          <span class="text-4xl">${t.icon}</span>
          <div>
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <span class="${categoryColors[t.category] || ''} text-[10px] px-2 py-0.5">${t.catLabel}</span>
              ${isMastered ? `<span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">${masteredLabel}</span>` : ''}
            </div>
            <h1 class="text-2xl font-extrabold text-slate-800 tracking-tight">${t.name}</h1>
            <p class="text-sm text-amber-700 font-medium mt-0.5">${t.subtitle}</p>
          </div>
        </div>

        <p class="text-sm text-slate-600 leading-relaxed mb-5">${t.summary}</p>

        <div class="flex flex-wrap gap-3">
          <button onclick="openTechnique(${t.id})" class="btn-primary">${openLabel}</button>
        </div>
      </div>

      <!-- Inline quiz for daily training -->
      <div class="card p-5">
        <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">❓ ${isIT ? 'Testa la tua comprensione' : 'Test your understanding'}</h2>
        <div id="training-quiz-container">
          <div class="card-inset p-5 text-center">
            <div class="text-2xl mb-2">🎯</div>
            <h3 class="font-bold text-slate-800 mb-1">${t.scenario.title}</h3>
            <p class="text-xs text-slate-400 mb-4">${isIT ? 'Metti alla prova la tua comprensione' : 'Put your understanding to the test'}</p>
            <button onclick="startTrainingQuiz()" class="btn-primary">${startLabel}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function startTrainingQuiz() {
  techniqueQuizState = { answered: false, selected: null };
  const t = getDailyTechnique();
  if (!t) return;
  const u = _ui.detail;
  document.getElementById('training-quiz-container').innerHTML = `
    <div class="card p-5 space-y-4">
      <div class="card-inset p-4">
        <p class="text-sm text-slate-600"><strong class="text-slate-800">${u.situation}</strong> ${t.scenario.situation}</p>
      </div>
      <h4 class="font-semibold text-sm text-slate-800">${t.scenario.question}</h4>
      <div class="space-y-2" id="training-quiz-options">
        ${t.scenario.options.map((opt, i) => `
          <button type="button" onclick="selectTrainingOption(${i}, ${t.id})"
            class="quiz-option">
            <span class="font-bold font-mono mr-2 text-amber-600">${String.fromCharCode(65 + i)}.</span>${opt.text}
          </button>
        `).join('')}
      </div>
      <div id="training-confirm-wrap" class="hidden">
        <button type="button" onclick="confirmTrainingQuiz(${t.id})" class="btn-primary">${u.confirmAnswer}</button>
      </div>
    </div>
  `;
}

function selectTrainingOption(index) {
  if (techniqueQuizState.answered) return;
  techniqueQuizState.selected = index;
  document.querySelectorAll('#training-quiz-options .quiz-option').forEach((opt, i) => {
    if (i === index) { opt.style.background = '#fffbeb'; opt.style.borderColor = '#fcd34d'; }
    else { opt.style.background = ''; opt.style.borderColor = ''; }
  });
  document.getElementById('training-confirm-wrap').classList.remove('hidden');
}

function confirmTrainingQuiz(techId) {
  if (techniqueQuizState.answered || techniqueQuizState.selected === null) return;
  techniqueQuizState.answered = true;
  const index = techniqueQuizState.selected;
  const t = techniques.find(x => x.id === techId);
  if (!t) return;

  document.querySelectorAll('#training-quiz-options .quiz-option').forEach((opt, i) => {
    opt.classList.add('answered');
    opt.style.background = '';
    opt.style.borderColor = '';
    if (t.scenario.options[i].correct) opt.classList.add('correct');
    else if (i === index) opt.classList.add('incorrect');
    else opt.classList.add('neutral-answered');
    if (i === index || t.scenario.options[i].correct) {
      const exp = document.createElement('p');
      exp.className = 'mt-2 text-xs pl-6 ' + (t.scenario.options[i].correct ? 'text-emerald-700' : 'text-red-600');
      exp.textContent = (t.scenario.options[i].correct ? '✓ ' : '✗ ') + t.scenario.options[i].explanation;
      opt.appendChild(exp);
    }
  });
  document.getElementById('training-confirm-wrap').classList.add('hidden');

  if (t.scenario.options[index].correct) {
    masteredTechniques.add(techId);
    KYP.saveMastered();
  }
}

/* ─── UTILS ────────────────────────────────────────── */
function setFilter(filter) { currentFilter = filter; navigateTo('techniques', filter); }
