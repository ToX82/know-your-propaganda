function updateProgress() {
  const count = exploredTechniques.size;
  document.getElementById('progress-bar').style.width = (count / techniques.length * 100) + '%';
  document.getElementById('progress-text').textContent = count + '/' + techniques.length;
  document.getElementById('explored-count').textContent = count;
}

function updateCategoryCounts() {
  const counts = {};
  techniques.forEach(t => counts[t.category] = (counts[t.category] || 0) + 1);
  Object.keys(counts).forEach(cat => {
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
  Object.entries(navMap).forEach(([page, label]) => {
    const el = document.querySelector('[data-page="' + page + '"] [data-label]');
    if (el) el.textContent = label;
  });
  Object.entries(u.nav.categories).forEach(([cat, label]) => {
    const el = document.querySelector('[data-filter="' + cat + '"] [data-label]');
    if (el) el.textContent = label;
  });
  const sectionNav = document.getElementById('section-nav');
  if (sectionNav) sectionNav.textContent = u.nav.sectionNav;
  const sectionCat = document.getElementById('section-cat');
  if (sectionCat) sectionCat.textContent = u.nav.sectionCat;
  const progressLabel = document.getElementById('progress-label');
  if (progressLabel) progressLabel.textContent = u.nav.progress;
  const langBtn = document.getElementById('lang-switch');
  if (langBtn) {
    langBtn.textContent = u.lang.switchLabel;
    langBtn.dataset.switchTo = u.lang.switchCode;
  }
  const exploredSuffix = document.getElementById('explored-suffix');
  if (exploredSuffix) exploredSuffix.textContent = u.nav.exploredSuffix;
  document.documentElement.lang = _lang;
}

/* ─── HOME ─────────────────────────────────────────── */
function renderHome() {
  const u = _ui.home;
  const content = document.getElementById('content');
  const explored = exploredTechniques.size;
  const mastered = masteredTechniques.size;
  const total = techniques.length;
  const catCount = new Set(techniques.map(t => t.category)).size;
  const quizTotal = Object.values(quizScores).reduce((a, b) => a + b, 0);
  const maxQuiz = (typeof getQuizMaxScore === 'function' ? getQuizMaxScore() : quizQuestions.length * 3);

  const riskText = maxQuiz > 0 && Object.keys(quizScores).length > 0
    ? u.progress.riskScore.replace('{score}', quizTotal).replace('{max}', maxQuiz)
    : u.progress.completeTest;
  const exploredText = u.progress.exploredOf.replace('{n}', explored).replace('{total}', total);
  const homeTitle = (typeof u.title === 'string' && u.title.includes('{count}'))
    ? u.title.replace('{count}', total)
    : u.title;

  // Last visited section
  const recentTechs = lastVisited
    .map(id => techniques.find(t => t.id === id))
    .filter(Boolean);

  content.innerHTML = `
    <div class="max-w-5xl mx-auto">
      <!-- Hero -->
      <div class="card p-6 md:p-8 mb-6">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="flex-1">
            <span class="inline-block text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">${u.badge}</span>
            <h1 class="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3 tracking-tight leading-tight">${homeTitle}</h1>
            <p class="text-slate-500 text-sm leading-relaxed mb-5 max-w-lg">${u.description}</p>
            <div class="flex flex-wrap gap-3">
              <button onclick="navigateTo('quiz')" class="btn-primary">⚡ ${u.ctaButton}</button>
              <button onclick="navigateTo('training')" class="btn-secondary">🎯 ${(_ui.nav && _ui.nav.training) || 'Training'}</button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 lg:w-64 shrink-0">
            ${[
              { val: total,    label: u.stats.techniques },
              { val: catCount, label: u.stats.categories },
              { val: explored, label: u.stats.explored, accent: true },
              { val: mastered, label: u.stats.mastered || (_lang === 'it' ? 'Padroneggiate' : 'Mastered'), accent2: true }
            ].map(s => `
              <div class="card-inset p-4 text-center">
                <div class="text-2xl font-extrabold font-mono ${s.accent ? 'text-amber-600' : s.accent2 ? 'text-emerald-600' : 'text-slate-800'}">${s.val}</div>
                <div class="text-[10px] text-slate-400 uppercase tracking-wider mt-1 font-semibold">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Progress -->
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

      ${recentTechs.length > 0 ? `
      <!-- Recently visited -->
      <div class="flex items-center gap-3 mb-4">
        <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400">${(_ui.home && _ui.home.lastVisited) || (_lang === 'it' ? 'Visitate di recente' : 'Recently Visited')}</h2>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
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
      ` : ''}

      <!-- Quick access -->
      <div class="flex items-center gap-3 mb-4">
        <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400">${u.quickAccess}</h2>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${techniques.slice(0, 6).map(t => `
          <div class="card card-interactive p-4 ${masteredTechniques.has(t.id) ? 'ring-1 ring-emerald-300 ring-offset-1 ring-offset-gray-50' : exploredTechniques.has(t.id) ? 'ring-1 ring-amber-300 ring-offset-1 ring-offset-gray-50' : ''}"
               onclick="openTechnique(${t.id})">
            <div class="flex items-start gap-3 mb-2">
              <span class="text-xl">${t.icon}</span>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="${categoryColors[t.category] || ''} text-[10px] px-2 py-0.5">${t.catLabel}</span>
                  ${masteredTechniques.has(t.id) ? '<span class="text-[10px] font-bold text-emerald-600">⭐</span>' : exploredTechniques.has(t.id) ? '<span class="text-[10px] font-bold text-amber-500">★</span>' : ''}
                </div>
                <h3 class="font-semibold text-sm mt-1 text-slate-800">${t.name}</h3>
              </div>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">${t.summary}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ─── TECHNIQUES ───────────────────────────────────── */
function renderTechniques() {
  const u = _ui.techniques;
  const content = document.getElementById('content');
  const filtered = currentFilter === 'all' ? techniques : techniques.filter(t => t.category === currentFilter);

  content.innerHTML = `
    <div class="max-w-5xl mx-auto">
      <!-- Filters -->
      <div class="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
        ${Object.entries(u.filters).map(([f, label]) => `
          <button onclick="setFilter('${f}')" class="btn-secondary ${currentFilter === f ? 'active' : ''}">${label}</button>
        `).join('')}
      </div>

      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${filtered.map(t => `
          <div class="card card-interactive p-4 ${masteredTechniques.has(t.id) ? 'ring-1 ring-emerald-300 ring-offset-1 ring-offset-gray-50' : exploredTechniques.has(t.id) ? 'ring-1 ring-amber-300 ring-offset-1 ring-offset-gray-50' : ''}"
               onclick="openTechnique(${t.id})">
            <div class="flex items-start gap-3 mb-2">
              <span class="text-xl">${t.icon}</span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="${categoryColors[t.category] || ''} text-[10px] px-2 py-0.5">${t.catLabel}</span>
                  ${masteredTechniques.has(t.id) ? '<span class="text-[10px] font-bold text-emerald-600">⭐</span>' : exploredTechniques.has(t.id) ? '<span class="text-[10px] font-bold text-amber-500">★</span>' : ''}
                </div>
                <h3 class="font-semibold text-sm mt-1 text-slate-800">${t.name}</h3>
                <p class="text-[11px] text-slate-400">${t.subtitle}</p>
              </div>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">${t.summary}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
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

function renderDetail() {
  const u = _ui.detail;
  const content = document.getElementById('content');
  const t = currentTechnique;
  if (!t) return;

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
      </div>

      <!-- Body -->
      <div class="card rounded-t-none divide-y divide-gray-100">
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

        <section id="technique-quiz" class="p-5 md:p-6">
          <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">${u.sections.quiz}</h2>
          <div id="quiz-container">
            <div class="card-inset p-6 text-center">
              <div class="text-3xl mb-2">🎯</div>
              <h3 class="font-bold text-slate-800 mb-1">${t.scenario.title}</h3>
              <p class="text-xs text-slate-400 mb-4">${u.quizIntro}</p>
              <button onclick="startTechniqueQuiz()" class="btn-primary">${u.startQuiz}</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

/* ─── ABOUT ────────────────────────────────────────── */
function renderAbout() {
  const u = _ui.about;
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-4">
      <div class="card overflow-hidden">
        <div class="bg-slate-800 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-300">${u.infoTitle}</div>
        <div class="p-5"><p class="text-sm text-slate-500 leading-relaxed">${u.infoDesc}</p></div>
      </div>
      <div class="card overflow-hidden">
        <div class="bg-slate-800 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-300">${u.sourcesTitle}</div>
        <ul class="p-5 space-y-2">
          ${u.sources.map(s => `<li class="text-sm text-slate-500 flex items-start gap-2"><span class="text-slate-300">—</span><span>${s}</span></li>`).join('')}
        </ul>
      </div>
      <div class="card overflow-hidden">
        <div class="bg-slate-800 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-300">${u.principlesTitle}</div>
        <ul class="p-5 space-y-2.5">
          ${u.principles.map(p => `<li class="flex items-start gap-2 text-sm text-slate-600"><span class="text-amber-500 font-bold mt-0.5">✦</span><span>${p}</span></li>`).join('')}
        </ul>
      </div>
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
    content.innerHTML = `<div class="max-w-xl mx-auto card p-6 text-center text-slate-400">—</div>`;
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
