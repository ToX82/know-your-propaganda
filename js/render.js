function updateProgress() {
  const count = exploredTechniques.size;
  document.getElementById('progress-bar').style.width = (count / techniques.length * 100) + '%';
  document.getElementById('progress-text').textContent = `${count}/${techniques.length}`;
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

function renderHome() {
  const content = document.getElementById('content');
  const explored = exploredTechniques.size;
  const total = techniques.length;
  const quizTotal = Object.values(quizScores).reduce((a, b) => a + b, 0);
  const maxQuiz = quizQuestions.length * 3;

  content.innerHTML = `
    <div class="bg-gradient-to-br from-amber-50 via-white to-orange-50 border border-amber-200 rounded-xl p-6 mb-6 shadow-sm">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1">
          <span class="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full border border-amber-300 mb-3">Guida Completa</span>
          <h1 class="text-3xl font-bold mb-3 text-slate-800">33 Tecniche di Propaganda — Come Riconoscerle</h1>
          <p class="text-slate-600 mb-4">Questa guida ti insegna a riconoscere le tecniche di manipolazione usate in politica, media e pubblicità. Ogni tecnica include casi studio storici, meccanismi psicologici e strategie di difesa.</p>
          <button onclick="navigateTo('quiz')" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition inline-flex items-center gap-2">⚡ Testa la Tua Resistenza</button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white/80 rounded-lg border p-4 text-center"><div class="text-2xl font-bold text-slate-800">${total}</div><div class="text-xs text-slate-500">Tecniche</div></div>
          <div class="bg-white/80 rounded-lg border p-4 text-center"><div class="text-2xl font-bold text-slate-800">6</div><div class="text-xs text-slate-500">Categorie</div></div>
          <div class="bg-white/80 rounded-lg border p-4 text-center"><div class="text-2xl font-bold text-slate-800">${quizQuestions.length}</div><div class="text-xs text-slate-500">Domande</div></div>
          <div class="bg-white/80 rounded-lg border p-4 text-center"><div class="text-2xl font-bold text-slate-800">${explored}</div><div class="text-xs text-slate-500">Esplorate</div></div>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <div class="bg-white rounded-lg border p-4">
        <div class="flex items-center gap-2 mb-2"><span class="text-lg">📚</span><span class="font-medium text-slate-700">Progresso Tecniche</span></div>
        <div class="w-full bg-slate-200 rounded-full h-2 mb-2"><div class="bg-amber-400 h-2 rounded-full transition-all" style="width: ${(explored/total)*100}%"></div></div>
        <p class="text-sm text-slate-500">${explored} di ${total} tecniche esplorate</p>
      </div>
      <div class="bg-white rounded-lg border p-4">
        <div class="flex items-center gap-2 mb-2"><span class="text-lg">🛡️</span><span class="font-medium text-slate-700">Livello Resistenza</span></div>
        <div class="w-full bg-slate-200 rounded-full h-2 mb-2"><div class="bg-green-500 h-2 rounded-full transition-all" style="width: ${maxQuiz > 0 ? 100 - (quizTotal/maxQuiz)*100 : 100}%"></div></div>
        <p class="text-sm text-slate-500">${maxQuiz > 0 ? `Punteggio rischio: ${quizTotal}/${maxQuiz}` : 'Completa il test'}</p>
      </div>
    </div>
    <h2 class="text-lg font-semibold mb-4 text-slate-800">Accesso Rapido</h2>
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
  const content = document.getElementById('content');
  const filtered = currentFilter === 'all' ? techniques : techniques.filter(t => t.category === currentFilter);

  content.innerHTML = `
    <div class="flex flex-wrap gap-2 mb-6">
      ${['all', 'attack', 'disinfo', 'framing', 'manipulation', 'digital', 'emotional'].map(f => `
        <button onclick="setFilter('${f}')" class="px-3 py-1.5 rounded-lg text-sm font-medium transition ${currentFilter === f ? 'bg-amber-500 text-white' : 'bg-white border hover:bg-slate-50'}">
          ${f === 'all' ? 'Tutte' : f === 'attack' ? '⚔️ Attacco' : f === 'disinfo' ? '📰 Disinformazione' : f === 'framing' ? '🖼️ Inquadratura' : f === 'manipulation' ? '🧠 Manipolazione' : f === 'digital' ? '💻 Digitale' : '💔 Emotivo'}
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
  const content = document.getElementById('content');
  const t = currentTechnique;
  if (!t) return;

  content.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <button onclick="navigateTo('techniques')" class="mb-4 text-slate-600 hover:text-slate-800 inline-flex items-center gap-1">← Torna alle tecniche</button>
      <div class="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-xl border border-b-0 p-6">
        <div class="flex items-start gap-4">
          <span class="text-5xl">${t.icon}</span>
          <div>
            <div class="flex items-center gap-2 mb-1"><span class="${categoryColors[t.category]} text-xs px-2 py-0.5 rounded-full">${t.catLabel}</span>${exploredTechniques.has(t.id) ? '<span class="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">⭐ Esplorata</span>' : ''}</div>
            <h1 class="text-2xl font-bold">${t.name}</h1>
            <p class="text-slate-500">${t.subtitle}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-b-xl border p-6 space-y-6">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3"><span>📖</span> Definizione</h2><p class="text-slate-600 leading-relaxed">${t.definition}</p></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3"><span>📜</span> Contesto Storico</h2><p class="text-slate-600 leading-relaxed">${t.historicalContext}</p></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3"><span>🧠</span> Meccanismo Psicologico</h2><div class="bg-blue-50 border border-blue-200 rounded-lg p-4"><p class="text-blue-900">${t.psychologicalMechanism}</p></div></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3"><span>🎯</span> Varianti</h2><div class="space-y-2">${t.variants.map(v => `<div class="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border"><span class="text-amber-500">→</span><div><span class="font-medium">${v.name}</span><p class="text-sm text-slate-500">${v.desc}</p></div></div>`).join('')}</div></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3"><span>⚠️</span> Segnali di Allarme</h2><div class="space-y-2">${t.redFlags.map(f => `<div class="flex items-start gap-2 p-2 bg-orange-50 border border-orange-200 rounded-lg"><span class="text-orange-500">⚠</span><span class="text-sm text-orange-900">${f}</span></div>`).join('')}</div></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3"><span>📚</span> Casi Studio</h2><div class="space-y-4">${t.caseStudies.map(cs => `<div class="border rounded-lg overflow-hidden"><div class="bg-slate-50 px-4 py-2 border-b"><h3 class="font-medium">${cs.title}</h3></div><div class="p-4"><p class="text-sm text-slate-600 mb-2">${cs.description}</p><p class="text-sm text-amber-700 font-medium">💡 ${cs.lesson}</p></div></div>`).join('')}</div></section>
        <hr class="border-slate-200">
        <section><h2 class="flex items-center gap-2 text-lg font-semibold mb-3"><span>🛡️</span> Strategie di Difesa</h2><div class="space-y-2">${t.defense.map((d, i) => `<div class="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"><span class="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">${i + 1}</span><div><span class="font-medium text-green-900">${d.step}</span><p class="text-sm text-green-700">${d.action}</p></div></div>`).join('')}</div></section>
        <hr class="border-slate-200">
        <section id="technique-quiz"><h2 class="flex items-center gap-2 text-lg font-semibold mb-3"><span>❓</span> Testa la Comprensione</h2><div id="quiz-container"><div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 text-center"><span class="text-4xl mb-3 block">🎯</span><h3 class="font-semibold mb-2">${t.scenario.title}</h3><p class="text-sm text-slate-500 mb-4">Metti alla prova la tua comprensione</p><button onclick="startTechniqueQuiz()" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition">Inizia il Quiz</button></div></div></section>
      </div>
    </div>
  `;
}

function renderAbout() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="max-w-2xl mx-auto space-y-4">
    <div class="bg-white rounded-lg border p-6"><h2 class="text-lg font-semibold mb-3">Informazioni</h2><p class="text-slate-600 mb-3">Questa guida si basa su ricerca accademica, giornalismo ed educazione alla media literacy. Include 33 tecniche identificate dall'Institute for Propaganda Analysis, dalla letteratura psicologica e dall'analisi storica.</p></div>
    <div class="bg-white rounded-lg border p-6"><h2 class="text-lg font-semibold mb-3">Fonti</h2><ul class="space-y-1 text-sm text-slate-600"><li>• Institute for Propaganda Analysis (1937-1942)</li><li>• RAND Corporation - "Firehose of Falsehood"</li><li>• McCombs & Shaw - Agenda-Setting Theory</li><li>• Herman & Chomsky - Manufacturing Consent</li><li>• Aristotele - Le fallacie logiche</li></ul></div>
    <div class="bg-white rounded-lg border p-6"><h2 class="text-lg font-semibold mb-3">Principi Chiave</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-amber-500">✦</span><span>Chiediti: "Questo vuole informarmi o manipolarmi?"</span></li><li class="flex items-start gap-2"><span class="text-amber-500">✦</span><span>Identifica chi parla, a nome di chi, con quali incentivi.</span></li><li class="flex items-start gap-2"><span class="text-amber-500">✦</span><span>Quantità di affermazioni ≠ qualità delle prove.</span></li><li class="flex items-start gap-2"><span class="text-amber-500">✦</span><span>La velocità di condivisione non è prova di verità.</span></li></ul></div>
  </div>`;
}

function setFilter(filter) { currentFilter = filter; navigateTo('techniques', filter); }
