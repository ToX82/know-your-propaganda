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
  const navMap = { home: u.nav.home, techniques: u.nav.techniques, quiz: u.nav.quiz, about: u.nav.about };
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

/* ─── HOME ─────────────────────────────────────────────── */
function renderHome() {
  const u = _ui.home;
  const content = document.getElementById('content');
  const explored = exploredTechniques.size;
  const total = techniques.length;
  const quizTotal = Object.values(quizScores).reduce((a, b) => a + b, 0);
  const maxQuiz = (typeof getQuizMaxScore === 'function' ? getQuizMaxScore() : quizQuestions.length * 3);

  const riskText = maxQuiz > 0
    ? u.progress.riskScore.replace('{score}', quizTotal).replace('{max}', maxQuiz)
    : u.progress.completeTest;
  const exploredText = u.progress.exploredOf.replace('{n}', explored).replace('{total}', total);

  content.innerHTML = `
    <!-- Hero panel -->
    <div class="neo-panel p-6 mb-5">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1">
          <span class="cat-badge cat-manipulation mb-3">${u.badge}</span>
          <h1 class="text-2xl font-bold mb-3 text-slate-900 tracking-tight">${u.title}</h1>
          <p class="text-slate-600 mb-4 text-sm leading-relaxed">${u.description}</p>
          <button onclick="navigateTo('quiz')" class="btn-primary inline-flex items-center gap-2">${u.ctaButton}</button>
        </div>
        <div class="grid grid-cols-2 gap-2 shrink-0">
          <div class="neo-panel p-4 text-center min-w-[80px]">
            <div class="text-2xl font-bold font-mono text-slate-900">${total}</div>
            <div class="text-xs text-slate-500 uppercase tracking-wider mt-0.5">${u.stats.techniques}</div>
          </div>
          <div class="neo-panel p-4 text-center">
            <div class="text-2xl font-bold font-mono text-slate-900">6</div>
            <div class="text-xs text-slate-500 uppercase tracking-wider mt-0.5">${u.stats.categories}</div>
          </div>
          <div class="neo-panel p-4 text-center">
            <div class="text-2xl font-bold font-mono text-slate-900">${quizQuestions.length}</div>
            <div class="text-xs text-slate-500 uppercase tracking-wider mt-0.5">${u.stats.questions}</div>
          </div>
          <div class="neo-panel p-4 text-center">
            <div class="text-2xl font-bold font-mono text-amber-600">${explored}</div>
            <div class="text-xs text-slate-500 uppercase tracking-wider mt-0.5">${u.stats.explored}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress panels -->
    <div class="grid md:grid-cols-2 gap-3 mb-5">
      <div class="neo-panel p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm">📚</span>
          <span class="text-xs font-bold uppercase tracking-wider text-slate-700">${u.progress.techniquesLabel}</span>
        </div>
        <div class="neo-progress-track w-full h-3 mb-2">
          <div class="bg-amber-400 neo-progress-fill transition-all" style="width: ${(explored/total)*100}%"></div>
        </div>
        <p class="text-xs text-slate-500 font-mono">${exploredText}</p>
      </div>
      <div class="neo-panel p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm">🛡️</span>
          <span class="text-xs font-bold uppercase tracking-wider text-slate-700">${u.progress.resistanceLabel}</span>
        </div>
        <div class="neo-progress-track w-full h-3 mb-2">
          <div class="bg-green-500 neo-progress-fill transition-all" style="width: ${maxQuiz > 0 ? 100 - (quizTotal/maxQuiz)*100 : 100}%"></div>
        </div>
        <p class="text-xs text-slate-500 font-mono">${riskText}</p>
      </div>
    </div>

    <!-- Quick access -->
    <div class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 border-b-2 border-neo pb-2">${u.quickAccess}</div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      ${techniques.slice(0, 6).map(t => `
        <div class="tech-card p-4" onclick="openTechnique(${t.id})">
          <div class="flex items-start gap-3 mb-2">
            <span class="text-xl">${t.icon}</span>
            <div>
              <span class="${categoryColors[t.category]} text-xs px-1.5 py-0.5">${t.catLabel}</span>
              <h3 class="font-semibold text-sm mt-1 text-slate-900">${t.name}</h3>
            </div>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">${t.summary}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/* ─── TECHNIQUES ────────────────────────────────────────── */
function renderTechniques() {
  const u = _ui.techniques;
  const content = document.getElementById('content');
  const filtered = currentFilter === 'all' ? techniques : techniques.filter(t => t.category === currentFilter);

  content.innerHTML = `
    <!-- Filters -->
    <div class="flex flex-wrap gap-1.5 mb-5 pb-4 border-b-2 border-neo">
      ${Object.entries(u.filters).map(([f, label]) => `
        <button onclick="setFilter('${f}')"
          class="neo-btn-sm ${currentFilter === f ? 'active' : ''}">
          ${label}
        </button>
      `).join('')}
    </div>

    <!-- Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      ${filtered.map(t => `
        <div class="tech-card p-4 ${exploredTechniques.has(t.id) ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-[#e8e3db]' : ''}"
             onclick="openTechnique(${t.id})">
          <div class="flex items-start gap-3 mb-2">
            <span class="text-xl">${t.icon}</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="${categoryColors[t.category]} text-xs px-1.5 py-0.5">${t.catLabel}</span>
                ${exploredTechniques.has(t.id) ? '<span class="text-amber-500 text-xs font-bold">★</span>' : ''}
              </div>
              <h3 class="font-semibold text-sm mt-1 text-slate-900">${t.name}</h3>
              <p class="text-xs text-slate-400">${t.subtitle}</p>
            </div>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">${t.summary}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/* ─── OPEN / DETAIL ─────────────────────────────────────── */
function openTechnique(id) {
  currentTechnique = techniques.find(t => t.id === id);
  exploredTechniques.add(id);
  updateProgress();
  navigateTo('detail');
}

function renderDetail() {
  const u = _ui.detail;
  const content = document.getElementById('content');
  const t = currentTechnique;
  if (!t) return;

  content.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <button onclick="navigateTo('techniques')" class="neo-btn-sm mb-4">
        ${u.backButton}
      </button>

      <!-- Header -->
      <div class="neo-brand p-5 border-b-0 rounded-b-none shadow-[0_4px_0_0_#1a1a1a]">
        <div class="flex items-start gap-4">
          <span class="text-4xl">${t.icon}</span>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="${categoryColors[t.category]} text-xs px-1.5 py-0.5">${t.catLabel}</span>
              ${exploredTechniques.has(t.id) ? '<span class="bg-amber-700 text-white text-xs px-2 py-0.5 font-bold border border-neo">' + u.exploredBadge + '</span>' : ''}
            </div>
            <h1 class="text-xl font-bold text-slate-900 tracking-tight">${t.name}</h1>
            <p class="text-sm text-amber-900 font-medium">${t.subtitle}</p>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="neo-panel rounded-t-none divide-y divide-slate-200">

        <section class="p-5">
          <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">${u.sections.definition}</h2>
          <p class="text-sm text-slate-700 leading-relaxed">${t.definition}</p>
        </section>

        <section class="p-5">
          <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">${u.sections.historical}</h2>
          <p class="text-sm text-slate-700 leading-relaxed">${t.historicalContext}</p>
        </section>

        <section class="p-5">
          <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">${u.sections.psychological}</h2>
          <div class="neo-box pl-4 py-3 pr-3 border-l-4 border-blue-500">
            <p class="text-sm text-blue-900 leading-relaxed">${t.psychologicalMechanism}</p>
          </div>
        </section>

        <section class="p-5">
          <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">${u.sections.variants}</h2>
          <div class="space-y-2">
            ${t.variants.map(v => `
              <div class="neo-box flex items-start gap-3 p-3">
                <span class="text-amber-500 font-bold mt-0.5">→</span>
                <div><span class="font-semibold text-sm">${v.name}</span><p class="text-xs text-slate-500 mt-0.5">${v.desc}</p></div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="p-5">
          <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">${u.sections.redFlags}</h2>
          <div class="space-y-1.5">
            ${t.redFlags.map(f => `
              <div class="neo-box flex items-start gap-2 p-2 border-l-4 border-orange-400 bg-orange-50">
                <span class="text-orange-500 font-bold text-xs mt-0.5">⚠</span>
                <span class="text-xs text-orange-900 leading-relaxed">${f}</span>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="p-5">
          <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">${u.sections.caseStudies}</h2>
          <div class="space-y-3">
            ${t.caseStudies.map(cs => `
              <div class="border-2 border-neo rounded-md overflow-hidden" style="box-shadow: 2px 2px 0 #1a1a1a">
                <div class="bg-neo text-white px-4 py-2">
                  <h3 class="text-sm font-semibold">${cs.title}</h3>
                </div>
                <div class="p-4 bg-white">
                  <p class="text-sm text-slate-600 mb-2">${cs.description}</p>
                  <p class="text-xs text-amber-700 font-semibold border-l-2 border-amber-400 pl-2">💡 ${cs.lesson}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="p-5">
          <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">${u.sections.defense}</h2>
          <div class="space-y-2">
            ${t.defense.map((d, i) => `
              <div class="neo-box flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50">
                <span class="w-5 h-5 bg-green-600 text-white flex items-center justify-center text-xs font-bold shrink-0 border border-neo">${i + 1}</span>
                <div><span class="font-semibold text-sm text-green-900">${d.step}</span><p class="text-xs text-green-700 mt-0.5">${d.action}</p></div>
              </div>
            `).join('')}
          </div>
        </section>

        <section id="technique-quiz" class="p-5">
          <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">${u.sections.quiz}</h2>
          <div id="quiz-container">
            <div class="neo-panel p-6 text-center bg-amber-50">
              <div class="text-3xl mb-2">🎯</div>
              <h3 class="font-bold text-slate-900 mb-1">${t.scenario.title}</h3>
              <p class="text-xs text-slate-500 mb-4">${u.quizIntro}</p>
              <button onclick="startTechniqueQuiz()" class="btn-primary">${u.startQuiz}</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  `;
}

/* ─── ABOUT ─────────────────────────────────────────────── */
function renderAbout() {
  const u = _ui.about;
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-3">
      <div class="neo-panel overflow-hidden">
        <div class="bg-neo text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">${u.infoTitle}</div>
        <div class="p-5"><p class="text-sm text-slate-600 leading-relaxed">${u.infoDesc}</p></div>
      </div>
      <div class="neo-panel overflow-hidden">
        <div class="bg-neo text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">${u.sourcesTitle}</div>
        <ul class="p-5 space-y-1.5">
          ${u.sources.map(s => `<li class="text-sm text-slate-600 flex items-start gap-2"><span class="text-slate-400 font-mono">—</span><span>${s}</span></li>`).join('')}
        </ul>
      </div>
      <div class="neo-panel overflow-hidden">
        <div class="bg-neo text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">${u.principlesTitle}</div>
        <ul class="p-5 space-y-2">
          ${u.principles.map(p => `<li class="flex items-start gap-2 text-sm text-slate-700"><span class="text-amber-500 font-bold mt-0.5">✦</span><span>${p}</span></li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

/* ─── UTILS ─────────────────────────────────────────────── */
function setFilter(filter) { currentFilter = filter; navigateTo('techniques', filter); }
