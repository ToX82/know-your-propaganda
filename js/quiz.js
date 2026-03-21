/* ─── TECHNIQUE QUIZ (inline, in detail view) ──────── */
function startTechniqueQuiz() {
  const u = _ui.detail;
  techniqueQuizState = { answered: false, selected: null };
  const t = currentTechnique;
  document.getElementById('quiz-container').innerHTML = `
    <div class="card p-5 space-y-4" role="region" aria-label="${t.scenario.title}">
      <div class="card-inset p-4">
        <p class="text-sm text-slate-600"><strong class="text-slate-800">${u.situation}</strong> ${t.scenario.situation}</p>
      </div>
      <h4 class="font-semibold text-sm text-slate-800">${t.scenario.question}</h4>
      <div class="space-y-2" id="quiz-options" role="group" aria-label="${t.scenario.question}">
        ${t.scenario.options.map((opt, i) => `
          <button type="button" onclick="selectTechniqueQuizOption(${i})"
            class="quiz-option" aria-pressed="false">
            <span class="font-bold font-mono mr-2 text-amber-600">${String.fromCharCode(65 + i)}.</span>${opt.text}
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
    if (i === index) {
      opt.style.background = '#fffbeb';
      opt.style.borderColor = '#fcd34d';
    } else {
      opt.style.background = '';
      opt.style.borderColor = '';
    }
  });
  document.getElementById('quiz-confirm-wrap').classList.remove('hidden');
}

function confirmTechniqueQuiz() {
  if (techniqueQuizState.answered || techniqueQuizState.selected === null) return;
  techniqueQuizState.answered = true;
  const index = techniqueQuizState.selected;
  const t = currentTechnique;

  document.querySelectorAll('#quiz-options .quiz-option').forEach((opt, i) => {
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
  document.getElementById('quiz-confirm-wrap').classList.add('hidden');
}

/* ─── MAIN QUIZ ────────────────────────────────────── */
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

function getEarnedBadges() {
  const gamification = quizInfo && quizInfo.gamification;
  if (!gamification || !gamification.badges) return [];
  const earned = [];
  const totalScore = Object.values(quizScores).reduce((a, b) => a + b, 0);
  const allAnswered = Object.keys(quizSelections).length === quizQuestions.length;

  gamification.badges.forEach(badge => {
    let unlocked = false;
    switch (badge.id) {
      case 'first_blood': unlocked = quizScores['q1'] === 0; break;
      case 'streak_3': unlocked = quizMaxStreak >= 3; break;
      case 'streak_5': unlocked = quizMaxStreak >= 5; break;
      case 'perfect': unlocked = allAnswered && totalScore === 0; break;
      case 'speed_demon': unlocked = allAnswered && quizStartTime && (Date.now() - quizStartTime) < 180000; break;
      case 'curious_mind': unlocked = allAnswered; break;
      case 'emotional_armor': unlocked = quizScores['q4'] === 0 && quizScores['q8'] === 0; break;
      case 'pattern_breaker': unlocked = quizScores['q7'] === 0 && quizScores['q10'] === 0; break;
    }
    if (unlocked) earned.push(badge);
  });
  return earned;
}

/* ─── RENDER QUIZ ──────────────────────────────────── */
function renderQuiz() {
  const u = _ui.quiz;
  const info = getQuizInfo();
  const content = document.getElementById('content');

  content.innerHTML = `<div class="max-w-3xl mx-auto"><div id="quiz-card"></div></div>`;

  if (quizResultsVisible) {
    const total = Object.values(quizScores).reduce((a, b) => a + b, 0);
    document.getElementById('quiz-card').innerHTML = renderResultsPanel(total, getQuizMaxScore(), Object.keys(quizSelections).length);
  } else if (!quizStarted) {
    renderQuizIntro();
  } else {
    renderQuizQuestion();
  }
}

function renderQuizIntro() {
  const info = getQuizInfo();
  const narrative = info && info.narrative;
  const title = info ? info.titolo : _ui.quiz.title;
  const subtitle = info ? info.sottotitolo : _ui.quiz.subtitle;
  const instructions = info ? info.istruzioni : '';
  const introMessage = narrative ? narrative.intro_message : '';

  document.getElementById('quiz-card').innerHTML = `
    <div class="text-center mb-6">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 mb-4">
        <span class="text-3xl">🕵️</span>
      </div>
      <h2 class="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight mb-2">${title}</h2>
      <p class="text-sm text-slate-500">${subtitle}</p>
    </div>

    ${introMessage ? `
      <div class="card p-5 mb-5">
        <pre class="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-sans">${introMessage}</pre>
      </div>
    ` : ''}

    ${instructions ? `
      <div class="card-inset p-4 mb-5">
        <p class="text-sm text-slate-500 leading-relaxed">${instructions}</p>
      </div>
    ` : ''}

    ${narrative && narrative.difficulty_curve ? `
      <div class="flex items-start gap-2 mb-5 text-xs text-slate-400">
        <span class="text-amber-500 mt-0.5">ℹ️</span>
        <span>${narrative.difficulty_curve}</span>
      </div>
    ` : ''}

    <div class="text-center">
      <button onclick="startMainQuiz()" class="btn-primary text-base px-8 py-3">
        ⚡ ${_lang === 'it' ? 'INIZIA LA MISSIONE' : 'START MISSION'}
      </button>
    </div>
  `;
}

function startMainQuiz() {
  quizStarted = true;
  quizStartTime = Date.now();
  quizStreak = 0;
  quizMaxStreak = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const u = _ui.quiz;
  const q = quizQuestions[currentQuizQuestion];
  const questionLabel = u.questionOf.replace('{n}', currentQuizQuestion + 1).replace('{total}', quizQuestions.length);
  const selectedIndex = quizSelections[q.id];
  const hasAnswer = selectedIndex !== undefined;
  const selectedOpt = hasAnswer ? q.options[selectedIndex] : null;
  const explanation = selectedOpt && selectedOpt.explanation ? selectedOpt.explanation : '';
  const bonusInsight = (hasAnswer && q.bonus_insight) ? q.bonus_insight : '';
  const difficulty = q.difficulty || '';

  const diffColors = {
    'facile': 'bg-emerald-50 text-emerald-700 border border-emerald-200', 'easy': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'media': 'bg-amber-50 text-amber-700 border border-amber-200', 'medium': 'bg-amber-50 text-amber-700 border border-amber-200',
    'difficile': 'bg-red-50 text-red-700 border border-red-200', 'hard': 'bg-red-50 text-red-700 border border-red-200',
    'boss finale': 'bg-purple-50 text-purple-700 border border-purple-200', 'final boss': 'bg-purple-50 text-purple-700 border border-purple-200'
  };

  document.getElementById('quiz-card').innerHTML = `
    <div class="animate-fade-in">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="bg-amber-500 text-white text-xs font-bold font-mono px-3 py-1 rounded-md shadow-sm">${questionLabel}</span>
          ${difficulty ? `<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${diffColors[difficulty.toLowerCase()] || 'bg-gray-100 text-slate-500'}">${difficulty.toUpperCase()}</span>` : ''}
        </div>
        ${hasAnswer ? '<span class="text-emerald-600 text-xs font-semibold">✓ ' + u.completed + '</span>' : ''}
      </div>

      <!-- Title -->
      <h3 class="font-bold text-lg text-slate-800 mb-4">${q.title}</h3>

      <!-- Visual cue -->
      ${q.visual_cue ? `
        <div class="card-inset p-3 mb-4" style="border-left: 3px solid #d1d5db;">
          <p class="text-xs text-slate-400 italic leading-relaxed">${q.visual_cue}</p>
        </div>
      ` : ''}

      <!-- Situation -->
      <div class="card p-4 mb-4">
        <p class="text-sm text-slate-600 leading-relaxed">${q.situation}</p>
      </div>

      <!-- Question -->
      <h4 class="font-semibold text-sm text-amber-700 mb-4">${q.question}</h4>

      <!-- Options -->
      <div class="space-y-2.5" id="quiz-main-options" role="group" aria-label="${q.question}">
        ${q.options.map((opt, i) => {
          const isCorrect = opt.score === 0;
          const isSelected = hasAnswer && i === selectedIndex;
          let cls = '';
          if (hasAnswer) {
            if (isCorrect) cls = 'correct answered';
            else if (isSelected) cls = 'incorrect answered';
            else cls = 'neutral-answered answered';
          }
          return `<button type="button" onclick="answerQuiz(${i})"
            class="quiz-option ${cls}"
            aria-pressed="${isSelected ? 'true' : 'false'}">
            <span class="font-bold font-mono mr-2 text-amber-500">${String.fromCharCode(65 + i)}.</span>${opt.text}
          </button>`;
        }).join('')}
      </div>

      <!-- Feedback -->
      ${explanation ? `
        <div class="mt-4 p-4 rounded-xl border border-amber-200 bg-amber-50 text-sm text-slate-700" id="quiz-feedback" role="status">
          <p class="leading-relaxed">${explanation}</p>
          ${bonusInsight ? `<p class="mt-3 pt-3 border-t border-amber-200 text-xs text-slate-500 leading-relaxed">${bonusInsight}</p>` : ''}
        </div>
      ` : ''}

      <!-- Streak indicator -->
      <div id="streak-indicator" class="mt-3 text-center text-sm font-semibold text-amber-600 hidden"></div>

      <!-- Navigation -->
      <div class="mt-5 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-3">
        <button onclick="prevQuiz()"
          class="btn-secondary ${currentQuizQuestion === 0 ? 'opacity-30 pointer-events-none' : ''}"
          ${currentQuizQuestion === 0 ? 'disabled' : ''}>${u.prev}</button>

        <!-- Progress dots -->
        <div class="flex gap-1.5 items-center">
          ${quizQuestions.map((_, i) => {
            if (i === currentQuizQuestion) return '<div class="w-6 h-1.5 rounded-full bg-amber-400"></div>';
            if (quizSelections[quizQuestions[i].id] !== undefined) return '<div class="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>';
            return '<div class="w-1.5 h-1.5 rounded-full bg-gray-300"></div>';
          }).join('')}
        </div>

        ${currentQuizQuestion === quizQuestions.length - 1
          ? `<button type="button" onclick="completeQuiz()" class="btn-primary">${u.completeBtn || 'Completa'}</button>`
          : `<button type="button" onclick="nextQuiz()" class="btn-secondary">${u.next}</button>`}
      </div>
    </div>
  `;
}

function answerQuiz(index) {
  const q = quizQuestions[currentQuizQuestion];
  if (quizSelections[q.id] !== undefined) return;

  quizSelections[q.id] = index;
  quizScores[q.id] = q.options[index].score;

  // Track streak
  if (q.options[index].score === 0) {
    quizStreak++;
    quizMaxStreak = Math.max(quizMaxStreak, quizStreak);
  } else {
    quizStreak = 0;
  }

  // Show streak message
  const gamification = quizInfo && quizInfo.gamification;
  if (gamification && gamification.streak_messages && gamification.streak_messages[quizStreak]) {
    const streakEl = document.getElementById('streak-indicator');
    if (streakEl) {
      streakEl.textContent = gamification.streak_messages[quizStreak];
      streakEl.classList.remove('hidden');
      streakEl.classList.add('animate-streak');
    }
  }

  // Update option styles
  const options = document.querySelectorAll('#quiz-main-options .quiz-option');
  options.forEach((opt, i) => {
    opt.classList.add('answered');
    if (q.options[i].score === 0) opt.classList.add('correct');
    else if (i === index) opt.classList.add('incorrect');
    else opt.classList.add('neutral-answered');
  });

  // Show feedback
  const explanation = q.options[index].explanation;
  const bonusInsight = q.bonus_insight || '';
  let feedbackEl = document.getElementById('quiz-feedback');
  if (explanation || bonusInsight) {
    if (!feedbackEl) {
      feedbackEl = document.createElement('div');
      feedbackEl.id = 'quiz-feedback';
      feedbackEl.setAttribute('role', 'status');
      feedbackEl.className = 'mt-4 p-4 rounded-xl border border-amber-200 bg-amber-50 text-sm text-slate-700 animate-fade-in';
      document.getElementById('quiz-main-options').after(feedbackEl);
    }
    feedbackEl.innerHTML = explanation
      ? '<p class="leading-relaxed">' + explanation + '</p>' + (bonusInsight ? '<p class="mt-3 pt-3 border-t border-amber-200 text-xs text-slate-500 leading-relaxed">' + bonusInsight + '</p>' : '')
      : '<p>' + bonusInsight + '</p>';
    feedbackEl.classList.remove('hidden');
  }
}

function prevQuiz() { if (currentQuizQuestion > 0) { currentQuizQuestion--; renderQuizQuestion(); } }
function nextQuiz() { if (currentQuizQuestion < quizQuestions.length - 1) { currentQuizQuestion++; renderQuizQuestion(); } }

function completeQuiz() {
  quizResultsVisible = true;
  const card = document.getElementById('quiz-card');
  if (card) {
    const total = Object.values(quizScores).reduce((a, b) => a + b, 0);
    card.innerHTML = renderResultsPanel(total, getQuizMaxScore(), Object.keys(quizSelections).length);
  }
}

/* ─── RESULTS ──────────────────────────────────────── */
function renderResultsPanel(score, maxScore, answeredCount) {
  const u = _ui.quiz;
  const totalQuestions = quizQuestions.length;
  const isComplete = answeredCount === totalQuestions && totalQuestions > 0;
  const feedback = getFeedbackForScore(score);
  const useNewFeedback = feedback && answeredCount > 0;
  const percent = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const resistPercent = 100 - percent;
  const earnedBadges = getEarnedBadges();

  let level = u.levels.start;
  if (useNewFeedback) {
    const iconMatch = feedback.level.match(/^([^\s]+)/);
    level = { title: feedback.level, desc: feedback.description, icon: iconMatch ? iconMatch[0] : '📊' };
  } else if (answeredCount > 0) {
    if (percent <= 25) level = u.levels.master;
    else if (percent <= 50) level = u.levels.defender;
    else if (percent <= 75) level = u.levels.aware;
    else level = u.levels.trainee;
  }

  const riskLabel = u.riskPoints.replace('{max}', maxScore);
  const panelTitle = (typeof quizFinalFeedback !== 'undefined' && quizFinalFeedback && quizFinalFeedback.title) ? quizFinalFeedback.title : u.title;
  const resources = (typeof quizResources !== 'undefined' && quizResources && quizResources.length) ? quizResources : [];
  const sharePrompt = (typeof quizFinalFeedback !== 'undefined' && quizFinalFeedback) ? quizFinalFeedback.share_prompt : '';
  const shareReport = useNewFeedback && feedback.shareable_report
    ? feedback.shareable_report.replace('{{score}}', score)
    : '';

  let barColor = 'from-red-400 to-red-500';
  if (resistPercent >= 80) barColor = 'from-emerald-400 to-emerald-500';
  else if (resistPercent >= 60) barColor = 'from-green-400 to-green-500';
  else if (resistPercent >= 40) barColor = 'from-amber-400 to-amber-500';
  else if (resistPercent >= 20) barColor = 'from-orange-400 to-orange-500';

  return `
    <div class="animate-fade-in">
      ${answeredCount === 0 ? `
        <div class="text-center py-8">
          <div class="text-5xl mb-4">${level.icon || '🎯'}</div>
          <h3 class="font-bold text-xl text-slate-800 mb-2">${level.title || u.levels.start.title}</h3>
          <p class="text-sm text-slate-500 mb-6">${u.firstLine || u.levels.start.desc}</p>
          <button type="button" onclick="resetQuiz()" class="btn-primary">${u.restart}</button>
        </div>
      ` : `
        <!-- Title card -->
        ${useNewFeedback && feedback.title_card ? `
          <div class="card-inset p-4 mb-5 font-mono text-xs text-slate-500 leading-relaxed">
            <pre class="whitespace-pre-wrap">${feedback.title_card}</pre>
          </div>
        ` : ''}

        <!-- Panel title -->
        ${panelTitle ? `<h3 class="font-bold text-slate-800 text-lg text-center mb-4">${panelTitle}</h3>` : ''}

        <!-- Score -->
        <div class="text-center mb-5">
          <div class="text-5xl mb-3">${level.icon || '📊'}</div>
          <h4 class="font-bold text-xl text-slate-800 mb-1">${level.title}</h4>
          <div class="flex items-center justify-center gap-2 mt-3">
            <span class="text-3xl font-extrabold font-mono text-slate-800">${score}</span>
            <span class="text-sm text-slate-400">${riskLabel}</span>
          </div>
        </div>

        <!-- Resistance bar -->
        <div class="mb-2">
          <div class="flex justify-between text-xs text-slate-400 mb-1">
            <span>${_lang === 'it' ? 'Resistenza' : 'Resistance'}</span>
            <span class="font-mono font-bold text-slate-600">${Math.round(resistPercent)}%</span>
          </div>
          <div class="progress-track h-2.5">
            <div class="progress-fill bg-gradient-to-r ${barColor}" style="width:${resistPercent}%"></div>
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm text-slate-500 leading-relaxed mt-4 mb-5">${level.desc}</p>

        <!-- Badges -->
        ${earnedBadges.length > 0 ? `
          <div class="card p-4 mb-5">
            <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">${_lang === 'it' ? 'Badge Sbloccati' : 'Badges Unlocked'}</h4>
            <div class="grid grid-cols-2 gap-2">
              ${earnedBadges.map(b => `
                <div class="card-inset p-3 flex items-center gap-3 animate-pulse-glow">
                  <span class="text-2xl">${b.icon}</span>
                  <div>
                    <div class="text-sm font-semibold text-slate-800">${b.name}</div>
                    <div class="text-[10px] text-slate-400">${b.description}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Suggestions -->
        ${useNewFeedback && feedback.suggestions && feedback.suggestions.length ? `
          <div class="card p-4 mb-5">
            <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">${quizFinalFeedback.suggestionsLabel || 'Suggerimenti'}</h4>
            <ul class="space-y-2">
              ${feedback.suggestions.map(s => `<li class="text-sm text-slate-600 flex items-start gap-2"><span class="text-amber-500 mt-0.5 text-xs">→</span><span>${s}</span></li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Shareable report -->
        ${shareReport ? `
          <div class="card p-4 mb-5 border-amber-200">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400">${sharePrompt || (_lang === 'it' ? 'Condividi il tuo risultato' : 'Share your result')}</h4>
              <button onclick="copyShareReport()" id="copy-btn" class="btn-secondary text-xs px-2 py-1">${_lang === 'it' ? '📋 Copia' : '📋 Copy'}</button>
            </div>
            <pre id="share-report" class="font-mono text-xs text-slate-500 bg-gray-50 border border-gray-200 p-3 rounded-lg whitespace-pre-wrap leading-relaxed">${shareReport}</pre>
          </div>
        ` : ''}

        <!-- Resources -->
        ${resources.length ? `
          <div class="card p-4 mb-5">
            <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">${quizFinalFeedback.resourcesLabel || 'Risorse utili'}</h4>
            <ul class="space-y-2">
              ${resources.map(r => `<li class="text-sm"><a href="${r.url}" target="_blank" rel="noopener" class="text-amber-700 hover:text-amber-800 transition-colors font-medium underline decoration-amber-300 underline-offset-2">${r.name}</a> <span class="text-slate-400">— ${r.description}</span></li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Actions -->
        <div class="flex flex-wrap gap-3 justify-center mt-6">
          <button type="button" onclick="resetQuiz()" class="btn-primary">${u.restart}</button>
          <button type="button" onclick="copyQuizLink()" class="btn-secondary">🔗 ${_lang === 'it' ? 'Copia link al test' : 'Copy test link'}</button>
        </div>
      `}
    </div>
  `;
}

function copyShareReport() {
  const report = document.getElementById('share-report');
  if (report) {
    navigator.clipboard.writeText(report.textContent).then(() => {
      const btn = document.getElementById('copy-btn');
      if (btn) { btn.textContent = '✓'; setTimeout(() => btn.textContent = _lang === 'it' ? '📋 Copia' : '📋 Copy', 2000); }
    });
  }
}

function copyQuizLink() {
  const url = location.origin + location.pathname + '#quiz';
  navigator.clipboard.writeText(url).then(() => {
    const btns = document.querySelectorAll('.btn-secondary');
    btns.forEach(b => { if (b.textContent.includes('🔗')) { b.textContent = '✓ Copiato!'; setTimeout(() => b.textContent = '🔗 ' + (_lang === 'it' ? 'Copia link al test' : 'Copy test link'), 2000); }});
  });
}

function resetQuiz() {
  quizSelections = {};
  quizScores = {};
  currentQuizQuestion = 0;
  quizResultsVisible = false;
  quizStarted = false;
  quizStreak = 0;
  quizMaxStreak = 0;
  quizStartTime = null;
  renderQuiz();
}
