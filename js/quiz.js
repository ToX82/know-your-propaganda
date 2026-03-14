function startTechniqueQuiz() {
  const u = _ui.detail;
  techniqueQuizState = { answered: false, selected: null };
  const t = currentTechnique;
  document.getElementById('quiz-container').innerHTML = `
    <div class="neo-panel p-4 space-y-4" role="region" aria-label="${t.scenario.title}">
      <div class="neo-box p-4">
        <p class="text-sm text-slate-800"><strong>${u.situation}</strong> ${t.scenario.situation}</p>
      </div>
      <h4 class="font-semibold text-sm text-slate-900">${t.scenario.question}</h4>
      <div class="space-y-2" id="quiz-options" role="group" aria-label="${t.scenario.question}">
        ${t.scenario.options.map((opt, i) => `
          <button type="button" onclick="selectTechniqueQuizOption(${i})"
            class="quiz-option w-full text-left p-3 text-sm" aria-pressed="false">
            <span class="font-bold font-mono mr-2">${String.fromCharCode(65 + i)}.</span>${opt.text}
          </button>
        `).join('')}
      </div>
      <div id="quiz-confirm-wrap" class="hidden">
        <button type="button" onclick="confirmTechniqueQuiz()" class="btn-primary">${u.confirmAnswer}</button>
      </div>
    </div>
  `;
}

function selectTechniqueQuizOption(index) {
  if (techniqueQuizState.answered) return;
  techniqueQuizState.selected = index;
  document.querySelectorAll('#quiz-options .quiz-option').forEach((opt, i) => {
    opt.classList.toggle('selected', i === index);
    opt.setAttribute('aria-pressed', i === index ? 'true' : 'false');
  });
  document.getElementById('quiz-confirm-wrap').classList.remove('hidden');
}

function confirmTechniqueQuiz() {
  if (techniqueQuizState.answered || techniqueQuizState.selected === null) return;
  techniqueQuizState.answered = true;
  const index = techniqueQuizState.selected;
  const t = currentTechnique;

  document.querySelectorAll('#quiz-options .quiz-option').forEach((opt, i) => {
    opt.classList.remove('selected');
    opt.classList.add('disabled');
    if (t.scenario.options[i].correct) opt.classList.add('correct');
    else if (i === index) opt.classList.add('incorrect');
    if (i === index || t.scenario.options[i].correct) {
      const exp = document.createElement('p');
      exp.className = 'mt-2 text-xs pl-5 ' + (t.scenario.options[i].correct ? 'text-green-700 font-medium' : 'text-red-700');
      exp.textContent = (t.scenario.options[i].correct ? '✓ ' : '✗ ') + t.scenario.options[i].explanation;
      opt.appendChild(exp);
    }
  });
  document.getElementById('quiz-confirm-wrap').classList.add('hidden');
}

/* ─── MAIN QUIZ ─────────────────────────────────────────── */
function getQuizMaxScore() {
  if (typeof quizFinalFeedback !== 'undefined' && quizFinalFeedback && quizFinalFeedback.ranges) return 40;
  return quizQuestions.length * 3;
}

function getQuizInfo() {
  return (typeof quizInfo !== 'undefined' && quizInfo) ? quizInfo : null;
}

function getFeedbackForScore(score) {
  if (typeof quizFinalFeedback === 'undefined' || !quizFinalFeedback || !quizFinalFeedback.ranges) return null;
  const ranges = quizFinalFeedback.ranges;
  const parsed = [];
  for (const key of Object.keys(ranges)) {
    const m = key.match(/^(\d+)-(\d+)/);
    if (m) parsed.push({ low: parseInt(m[1], 10), high: parseInt(m[2], 10), key, data: ranges[key] });
  }
  parsed.sort((a, b) => a.low - b.low);
  for (const r of parsed) {
    if (score >= r.low && score <= r.high) return r.data;
  }
  return parsed.length ? parsed[parsed.length - 1].data : null;
}

function renderQuiz() {
  const u = _ui.quiz;
  const info = getQuizInfo();
  const title = info ? info.titolo : u.title;
  const subtitle = info ? info.sottotitolo : u.subtitle;
  const instructions = info ? info.istruzioni : '';
  const content = document.getElementById('content');
  const total = Object.values(quizScores).reduce((a, b) => a + b, 0);
  const max = getQuizMaxScore();
  const answeredCount = Object.keys(quizSelections).length;

  content.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-5 border-b-2 border-neo pb-4">
        <h2 class="text-xl font-bold tracking-tight text-slate-900">${title}</h2>
        <p class="text-xs text-slate-500 uppercase tracking-wider mt-1">${subtitle}</p>
        ${instructions ? `<p class="text-sm text-slate-600 mt-3 max-w-xl mx-auto">${instructions}</p>` : ''}
      </div>
      <div id="quiz-card" class="neo-panel" role="region" aria-label="${title}"></div>
    </div>
  `;
  if (quizResultsVisible) {
    document.getElementById('quiz-card').innerHTML = renderResultsPanel(total, max, answeredCount);
  } else {
    renderQuizQuestion();
  }
}

function renderQuizQuestion() {
  const u = _ui.quiz;
  const q = quizQuestions[currentQuizQuestion];
  const questionLabel = u.questionOf
    .replace('{n}', currentQuizQuestion + 1)
    .replace('{total}', quizQuestions.length);
  const selectedIndex = quizSelections[q.id];
  const hasAnswer = selectedIndex !== undefined;

  const selectedOpt = hasAnswer ? q.options[selectedIndex] : null;
  const explanation = selectedOpt && selectedOpt.explanation ? selectedOpt.explanation : '';
  const bonusInsight = (hasAnswer && q.bonus_insight) ? q.bonus_insight : '';

  document.getElementById('quiz-card').innerHTML = `
    <div class="p-4 md:p-5">
      <div class="flex items-center justify-between mb-4">
        <span class="bg-neo text-white text-xs font-bold font-mono px-3 py-1 border-2 border-neo" style="box-shadow: 2px 2px 0 #1a1a1a">${questionLabel}</span>
        ${hasAnswer ? '<span class="text-green-600 text-xs font-bold uppercase tracking-wider">' + u.completed + '</span>' : ''}
      </div>
      <h3 class="font-bold text-slate-900 mb-3">${q.title}</h3>
      <div class="neo-box p-4 mb-4">
        <p class="text-sm text-slate-700">${q.situation}</p>
      </div>
      <h4 class="font-semibold text-sm text-slate-900 mb-3">${q.question}</h4>
      <div class="space-y-2" id="quiz-main-options" role="group" aria-label="${q.question}">
        ${q.options.map((opt, i) => {
          const isCorrect = opt.score === 0;
          const isSelected = hasAnswer && i === selectedIndex;
          const cls = hasAnswer ? (isCorrect ? 'correct' : (isSelected ? 'incorrect' : '')) : '';
          return `<button type="button" onclick="answerQuiz(${i})"
            class="quiz-option w-full text-left p-3 text-sm ${cls}"
            aria-pressed="${hasAnswer && i === selectedIndex ? 'true' : 'false'}">
            <span class="font-bold font-mono mr-2">${String.fromCharCode(65 + i)}.</span>${opt.text}
          </button>`;
        }).join('')}
      </div>
      ${explanation ? `<div class="mt-3 p-3 rounded-md border-l-4 border-amber-500 bg-amber-50 text-sm text-slate-700" id="quiz-feedback" role="status"><p>${explanation}</p>${bonusInsight ? `<p class="mt-2 pt-2 border-t border-amber-200 text-xs text-slate-600">${bonusInsight}</p>` : ''}</div>` : ''}
      ${bonusInsight && !explanation ? `<div class="mt-3 p-3 rounded-md border-l-4 border-slate-400 bg-slate-50 text-sm text-slate-600" id="quiz-feedback" role="status">${bonusInsight}</div>` : ''}
      <div class="border-t-2 border-neo mt-4 pt-4 flex flex-wrap justify-between items-center gap-2">
        <button onclick="prevQuiz()"
          class="neo-btn-sm ${currentQuizQuestion === 0 ? 'opacity-40 cursor-not-allowed' : ''}"
          ${currentQuizQuestion === 0 ? 'disabled' : ''}>${u.prev}</button>
        <div class="flex gap-1">
          ${quizQuestions.map((_, i) => `
            <div class="${i === currentQuizQuestion
              ? 'w-5 h-2 bg-amber-400 border-2 border-neo'
              : quizSelections[quizQuestions[i].id] !== undefined
                ? 'w-2 h-2 bg-green-500 border-2 border-neo'
                : 'w-2 h-2 bg-slate-300 border-2 border-neo'}"></div>
          `).join('')}
        </div>
        ${currentQuizQuestion === quizQuestions.length - 1
          ? `<button type="button" onclick="completeQuiz()" class="neo-btn-sm btn-primary">${u.completeBtn || 'Completa'}</button>`
          : `<button type="button" onclick="nextQuiz()" class="neo-btn-sm">${u.next}</button>`}
      </div>
    </div>
  `;
}

function answerQuiz(index) {
  const q = quizQuestions[currentQuizQuestion];
  quizSelections[q.id] = index;
  quizScores[q.id] = q.options[index].score;

  const options = document.querySelectorAll('#quiz-main-options .quiz-option');
  options.forEach((opt, i) => {
    opt.classList.remove('correct', 'incorrect');
    opt.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    if (q.options[i].score === 0) opt.classList.add('correct');
    else if (i === index) opt.classList.add('incorrect');
  });

  const explanation = q.options[index].explanation;
  const bonusInsight = q.bonus_insight || '';
  let feedbackEl = document.getElementById('quiz-feedback');
  if (explanation || bonusInsight) {
    if (!feedbackEl) {
      feedbackEl = document.createElement('div');
      feedbackEl.id = 'quiz-feedback';
      feedbackEl.setAttribute('role', 'status');
      feedbackEl.className = 'mt-3 p-3 rounded-md border-l-4 border-amber-500 bg-amber-50 text-sm text-slate-700';
      document.getElementById('quiz-main-options').after(feedbackEl);
    }
    feedbackEl.innerHTML = explanation
      ? '<p>' + explanation + '</p>' + (bonusInsight ? '<p class="mt-2 pt-2 border-t border-amber-200 text-xs text-slate-600">' + bonusInsight + '</p>' : '')
      : '<p>' + bonusInsight + '</p>';
    feedbackEl.classList.remove('hidden');
  } else if (feedbackEl) {
    feedbackEl.classList.add('hidden');
  }

}

function prevQuiz() { if (currentQuizQuestion > 0) { currentQuizQuestion--; renderQuizQuestion(); } }
function nextQuiz() { if (currentQuizQuestion < quizQuestions.length - 1) { currentQuizQuestion++; renderQuizQuestion(); } }

function completeQuiz() {
  quizResultsVisible = true;
  const card = document.getElementById('quiz-card');
  if (card) {
    const total = Object.values(quizScores).reduce((a, b) => a + b, 0);
    const max = getQuizMaxScore();
    const answeredCount = Object.keys(quizSelections).length;
    card.innerHTML = renderResultsPanel(total, max, answeredCount);
  }
}

function renderResultsPanel(score, maxScore, answeredCount) {
  const u = _ui.quiz;
  const totalQuestions = quizQuestions.length;
  const isComplete = answeredCount === totalQuestions && totalQuestions > 0;
  const isEmpty = answeredCount === 0;
  const feedback = getFeedbackForScore(score);
  const useNewFeedback = feedback && answeredCount > 0;

  const percent = maxScore > 0 ? (score / maxScore) * 100 : 0;
  let level = u.levels.start;
  if (answeredCount > 0 && !useNewFeedback) {
    if (percent <= 25) level = u.levels.master;
    else if (percent <= 50) level = u.levels.defender;
    else if (percent <= 75) level = u.levels.aware;
    else level = u.levels.trainee;
  }
  if (useNewFeedback) {
    level = { title: feedback.level, desc: feedback.description, icon: feedback.level.match(/^[^\s]+/)?.[0] || '📊' };
  }

  const riskLabel = u.riskPoints.replace('{max}', maxScore);
  const panelTitle = (typeof quizFinalFeedback !== 'undefined' && quizFinalFeedback && quizFinalFeedback.title) ? quizFinalFeedback.title : u.title;
  const resources = (typeof quizResources !== 'undefined' && quizResources && quizResources.length) ? quizResources : [];

  return `
    <div class="neo-panel p-6 text-center" role="region" aria-label="${panelTitle}">
      ${isEmpty ? `
        <p class="text-sm text-slate-600 mb-4">${u.firstLine || u.levels.start.desc}</p>
        <div class="text-4xl mb-3">${level.icon || '🎯'}</div>
        <h3 class="font-bold text-lg text-slate-900 mb-2">${level.title || u.levels.start.title}</h3>
      ` : `
        ${isComplete && u.completeMessage ? `<p class="text-sm font-medium text-green-700 mb-3">${u.completeMessage}</p>` : ''}
        ${useNewFeedback && panelTitle ? `<h3 class="font-bold text-slate-900 mb-3">${panelTitle}</h3>` : ''}
        <div class="text-4xl mb-3">${level.icon || '📊'}</div>
        <h4 class="font-bold text-lg text-slate-900 mb-2">${level.title}</h4>
        <div class="flex items-center justify-center gap-2 mb-4">
          <span class="text-3xl font-bold font-mono ${level.color || 'text-slate-700'}">${score}</span>
          <span class="text-sm text-slate-500">${riskLabel}</span>
        </div>
        <div class="neo-progress-track w-full h-3 mb-4">
          <div class="bg-green-500 neo-progress-fill transition-all" style="width: ${100 - percent}%"></div>
        </div>
        <p class="text-sm text-slate-600 mb-4 text-left">${level.desc}</p>
        ${useNewFeedback && feedback.suggestions && feedback.suggestions.length ? `
          <div class="text-left mb-4">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">${quizFinalFeedback.suggestionsLabel || 'Suggerimenti'}</p>
            <ul class="list-disc list-inside text-sm text-slate-700 space-y-1">${feedback.suggestions.map(s => '<li>' + s + '</li>').join('')}</ul>
          </div>
        ` : ''}
        ${resources.length ? `
          <div class="text-left pt-4 border-t-2 border-neo">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">${quizFinalFeedback.resourcesLabel || 'Risorse utili'}</p>
            <ul class="text-sm text-slate-700 space-y-1">${resources.map(r => '<li><a href="' + r.url + '" target="_blank" rel="noopener" class="text-amber-700 hover:underline">' + r.name + '</a> – ' + r.description + '</li>').join('')}</ul>
          </div>
        ` : ''}
      `}
      <button type="button" onclick="resetQuiz()" class="btn-primary mt-4">
        ${u.restart}
      </button>
    </div>
  `;
}

function resetQuiz() { quizSelections = {}; quizScores = {}; currentQuizQuestion = 0; quizResultsVisible = false; renderQuiz(); }
