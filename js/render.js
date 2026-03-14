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
  // Sidebar nav labels
  const navMap = { home: u.nav.home, techniques: u.nav.techniques, quiz: u.nav.quiz, about: u.nav.about };
  Object.entries(navMap).forEach(([page, label]) => {
    const el = document.querySelector('[data-page="' + page + '"] [data-label]');
    if (el) el.textContent = label;
  });
  // Category labels in sidebar
  Object.entries(u.nav.categories).forEach(([cat, label]) => {
    const el = document.querySelector('[data-filter="' + cat + '"] [data-label]');
    if (el) el.textContent = label;
  });
  // Section headers
  const sectionNav = document.getElementById('section-nav');
  if (sectionNav) sectionNav.textContent = u.nav.sectionNav;
  const sectionCat = document.getElementById('section-cat');
  if (sectionCat) sectionCat.textContent = u.nav.sectionCat;
  const progressLabel = document.getElementById('progress-label');
  if (progressLabel) progressLabel.textContent = u.nav.progress;
  // Lang switcher button
  const langBtn = document.getElementById('lang-switch');
  if (langBtn) {
    langBtn.textContent = u.lang.switchLabel;
    langBtn.dataset.switchTo = u.lang.switchCode;
  }
  const exploredSuffix = document.getElementById('explored-suffix');
  if (exploredSuffix) exploredSuffix.textContent = u.nav.exploredSuffix;
  document.documentElement.lang = _lang;
}

function renderHome() {
  const u = _ui.home;
  const content = document.getElementById('content');
  const explored = exploredTechniques.size;
  const total = techniques.length;
  const quizTotal = Object.values(quizScores).reduce((a, b) => a + b, 0);
  const maxQuiz = quizQuestions.length * 3;

  const riskText = maxQuiz > 0
    ? u.progress.riskScore.replace('{score}', quizTotal).replace('{max}', maxQuiz)
    : u.progress.completeTest;
  const exploredText = u.progress.exploredOf.replace('{n}', explored).replace('{total}', total);

  content.innerHTML = `
    <div class="bg-gradient-to-br from-amber-50 via-white to-orange-50 border border-amber-200 rounded-xl p-6 mb-6 shadow-sm">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1">
          <span class="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full border border-amber-300 mb-3">${u.badge}</span>
          <h1 class="text-3xl font-bold mb-3 text-slate-800">${u.title}</h1>
          <p class="text-slate-600 mb-4">${u.description}</p>
          <button onclick="navigateTo('quiz')" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition inline-flex items-center gap-2">${u.ctaButton}</button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white/80 rounded-lg border p-4 text-center"><div class="text-2xl font-bold text-slate-800">${total}</div><div class="text-xs text-slate-500">${u.stats.techniques}</div></div>
          <div class="bg-white/80 rounded-lg border p-4 text-center"><div class="text-2xl font-bold text-slate-800">6</div><div class="text-xs text-slate-500">${u.stats.categories}</div></div>
          <div class="bg-white/80 rounded-lg border p-4 text-center"><div class="text-2xl font-bold text-slate-800">${quizQuestions.length}</div><div class="text-xs text-slate-500">${u.stats.questions}</div></div>
          <div class="bg-white/80 rounded-lg border p-4 text-center"><div class="text-2xl font-bold text-slate-800">${explored}</div><div class="text-xs text-slate-500">${u.stats.explored}</div></div>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <div class="bg-white rounded-lg border p-4">
        <div class="flex items-center gap-2 mb-2"><span class="text-lg">📚</span><span class="font-medium text-slate-700">${u.progress.techniquesLabel}</span></div>
        <div class="w-full bg-slate-200 rounded-full h-2 mb-2"><div class="bg-amber-400 h-2 rounded-full transition-all" style="width: ${(explored/total)*100}%"></div></div>
        <p class="text-sm text-slate-500">${exploredText}</p>
      </div>
      <div class="bg-white rounded-lg border p-4">
        <div class="flex items-center gap-2 mb-2"><span class="text-lg">🛡️</span><span class="font-medium text-slate-700">${u.progress.resistanceLabel}</span></div>
        <div class="w-full bg-slate-200 rounded-full h-2 mb-2"><div class="bg-green-500 h-2 rounded-full transition-all" style="width: ${maxQuiz > 0 ? 100 - (quizTotal/maxQuiz)*100 : 100}%"></div></div>
        <p class="text-sm text-slate-500">${riskText}</p>
      </div>
    </div>
    <h2 class="text-lg font-semibold mb-4 text-slate-800">${u.quickAccess}</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${techniques.slice(0, 6).map(t => `
        <div class="tech-card bg-white rounded-lg border p-4 cursor-pointer" onclick="openTechnique(${t.id})">
          <div class="flex items-start gap-3 mb-2"><span class="text-2xl">${t.icon}</span><div><span class="${categoryColors[t.category]} text-xs px-2 py-0.5 rounded-full">${t.catLabel}</span><h3 class="font-semibold mt-1">${t.name}</h3></div></div>
          <p class="text-sm text-slate-500 line-clamp-2">${t.summary}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderTechniques() {
  const u = _ui.techniques;
  const content = document.getElementById('content');
  const filtered = currentFilter === 'all' ? techniques : techniques.filter(t => t.category === currentFilter);

  content.innerHTML = `
    <div class="flex flex-wrap gap-2 mb-6">
      ${Object.entries(u.filters).map(([f, label]) => `
        <button onclick="setFilter('${f}')" class="px-3 py-1.5 rounded-lg text-sm font-medium transition ${currentFilter === f ? 'bg-amber-500 text-white' : 'bg-white border hover:bg-slate-50'}">
          ${label}
        </button>
      `).join('')}
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${filtered.map(t => `
        <div class="tech-card bg-white rounded-lg border p-4 cursor-pointer ${exploredTechniques.has(t.id) ? 'ring-2 ring-amber-400' : ''}" onclick="openTechnique(${t.id})">
          <div class="flex items-start gap-3 mb-2">
            <span class="text-2xl">${t.icon}</span>
            <div class="flex-1">
              <div class="flex items-center gap-2"><span class="${categoryColors[t.category]} text-xs px-2 py-0.5 rounded-full">${t.catLabel}</span>${exploredTechniques.has(t.id) ? '<span class="text-amber-500">⭐</span>' : ''}</div>
              <h3 class="font-semibold mt-1">${t.name}</h3>
              <p class="text-xs text-slate-400">${t.subtitle}</p>
            </div>
          </div>
          <p class="text-sm text-slate-500 line-clamp-2">${t.summary}</p>
        </div>
      `).join('')}
    </div>
  `;
}

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
      <button onclick="navigateTo('techniques')" class="mb-4 text-slate-600 hover:text-slate-800 inline-flex items-center gap-1">${u.backButton}</button>
      <div class="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-xl border border-b-0 p-6">
        <div class="flex items-start gap-4">
          <span class="text-5xl">${t.icon}</span>
          <div>
            <div class="flex items-center gap-2 mb-1"><span class="${categoryColors[t.category]} text-xs px-2 py-0.5 rounded-full">${t.catLabel}</span>${exploredTechniques.has(t.id) ? '<span class="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">' + u.exploredBadge + '</span>' : ''}</div>
            <h1 class="text-2xl font-bold">${t.name}</h1>
            <p class="text-slate-500">${t.subtitle}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-b-xl border p-6 space-y-6">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3">${u.sections.definition}</h2><p class="text-slate-600 leading-relaxed">${t.definition}</p></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3">${u.sections.historical}</h2><p class="text-slate-600 leading-relaxed">${t.historicalContext}</p></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3">${u.sections.psychological}</h2><div class="bg-blue-50 border border-blue-200 rounded-lg p-4"><p class="text-blue-900">${t.psychologicalMechanism}</p></div></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3">${u.sections.variants}</h2><div class="space-y-2">${t.variants.map(v => `<div class="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border"><span class="text-amber-500">→</span><div><span class="font-medium">${v.name}</span><p class="text-sm text-slate-500">${v.desc}</p></div></div>`).join('')}</div></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3">${u.sections.redFlags}</h2><div class="space-y-2">${t.redFlags.map(f => `<div class="flex items-start gap-2 p-2 bg-orange-50 border border-orange-200 rounded-lg"><span class="text-orange-500">⚠</span><span class="text-sm text-orange-900">${f}</span></div>`).join('')}</div></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3">${u.sections.caseStudies}</h2><div class="space-y-4">${t.caseStudies.map(cs => `<div class="border rounded-lg overflow-hidden"><div class="bg-slate-50 px-4 py-2 border-b"><h3 class="font-medium">${cs.title}</h3></div><div class="p-4"><p class="text-sm text-slate-600 mb-2">${cs.description}</p><p class="text-sm text-amber-700 font-medium">💡 ${cs.lesson}</p></div></div>`).join('')}</div></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3">${u.sections.defense}</h2><div class="space-y-2">${t.defense.map((d, i) => `<div class="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"><span class="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">${i + 1}</span><div><span class="font-medium text-green-900">${d.step}</span><p class="text-sm text-green-700">${d.action}</p></div></div>`).join('')}</div></section>
        <hr class="border-slate-200">
        <section id="technique-quiz"><h2 class="flex items-center gap-2 text-lg font-semibold mb-3">${u.sections.quiz}</h2><div id="quiz-container"><div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 text-center"><span class="text-4xl mb-3 block">🎯</span><h3 class="font-semibold mb-2">${t.scenario.title}</h3><p class="text-sm text-slate-500 mb-4">${u.quizIntro}</p><button onclick="startTechniqueQuiz()" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition">${u.startQuiz}</button></div></div></section>
      </div>
    </div>
  `;
}

function renderAbout() {
  const u = _ui.about;
  const content = document.getElementById('content');
  content.innerHTML = `<div class="max-w-2xl mx-auto space-y-4">
    <div class="bg-white rounded-lg border p-6"><h2 class="text-lg font-semibold mb-3">${u.infoTitle}</h2><p class="text-slate-600 mb-3">${u.infoDesc}</p></div>
    <div class="bg-white rounded-lg border p-6"><h2 class="text-lg font-semibold mb-3">${u.sourcesTitle}</h2><ul class="space-y-1 text-sm text-slate-600">${u.sources.map(s => `<li>• ${s}</li>`).join('')}</ul></div>
    <div class="bg-white rounded-lg border p-6"><h2 class="text-lg font-semibold mb-3">${u.principlesTitle}</h2><ul class="space-y-2 text-slate-600">${u.principles.map(p => `<li class="flex items-start gap-2"><span class="text-amber-500">✦</span><span>${p}</span></li>`).join('')}</ul></div>
  </div>`;
}

function setFilter(filter) { currentFilter = filter; navigateTo('techniques', filter); }
