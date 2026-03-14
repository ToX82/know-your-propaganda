function startTechniqueQuiz() {
  const u = _ui.detail;
  techniqueQuizState = { answered: false, selected: null };
  const t = currentTechnique;
  document.getElementById('quiz-container').innerHTML = `
    <div class="neo-panel p-4 space-y-4">
      <div class="neo-box p-4">
        <p class="text-sm text-slate-800"><strong>${u.situation}</strong> ${t.scenario.situation}</p>
      </div>
      <h4 class="font-semibold text-sm text-slate-900">${t.scenario.question}</h4>
      <div class="space-y-2" id="quiz-options">
        ${t.scenario.options.map((opt, i) => `
          <button onclick="answerTechniqueQuiz(${i})"
            class="quiz-option w-full text-left p-3 text-sm">
            <span class="font-bold font-mono mr-2">${String.fromCharCode(65 + i)}.</span>${opt.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function answerTechniqueQuiz(index) {
  if (techniqueQuizState.answered) return;
  techniqueQuizState.answered = true;
  techniqueQuizState.selected = index;
  const t = currentTechnique;

  document.querySelectorAll('#quiz-options .quiz-option').forEach((opt, i) => {
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
}

/* ─── MAIN QUIZ ─────────────────────────────────────────── */
function renderQuiz() {
  const u = _ui.quiz;
  const content = document.getElementById('content');
  const total = Object.values(quizScores).reduce((a, b) => a + b, 0);
  const max = quizQuestions.length * 3;

  content.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-5 border-b-2 border-neo pb-4">
        <h2 class="text-xl font-bold tracking-tight text-slate-900">${u.title}</h2>
        <p class="text-xs text-slate-500 uppercase tracking-wider mt-1">${u.subtitle}</p>
      </div>
      <div id="quiz-card" class="neo-panel"></div>
      <div class="mt-4" id="results-panel">${renderResultsPanel(total, max)}</div>
    </div>
  `;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const u = _ui.quiz;
  const q = quizQuestions[currentQuizQuestion];
  const questionLabel = u.questionOf
    .replace('{n}', currentQuizQuestion + 1)
    .replace('{total}', quizQuestions.length);

  document.getElementById('quiz-card').innerHTML = `
    <div class="p-5">
      <div class="flex items-center justify-between mb-4">
        <span class="bg-neo text-white text-xs font-bold font-mono px-3 py-1 border-2 border-neo" style="box-shadow: 2px 2px 0 #1a1a1a">${questionLabel}</span>
        ${completedQuestions.has(q.id) ? '<span class="text-green-600 text-xs font-bold uppercase tracking-wider">' + u.completed + '</span>' : ''}
      </div>
      <h3 class="font-bold text-slate-900 mb-3">${q.title}</h3>
      <div class="neo-box p-4 mb-4">
        <p class="text-sm text-slate-700">${q.situation}</p>
      </div>
      <h4 class="font-semibold text-sm text-slate-900 mb-3">${q.question}</h4>
      <div class="space-y-2" id="quiz-main-options">
        ${q.options.map((opt, i) => `
          <button onclick="answerQuiz(${i})"
            class="quiz-option w-full text-left p-3 text-sm">
            <span class="font-bold font-mono mr-2">${String.fromCharCode(65 + i)}.</span>${opt.text}
          </button>
        `).join('')}
      </div>
      <div class="border-t-2 border-neo mt-4 pt-4 flex justify-between items-center">
        <button onclick="prevQuiz()"
          class="neo-btn-sm ${currentQuizQuestion === 0 ? 'opacity-40 cursor-not-allowed' : ''}"
          ${currentQuizQuestion === 0 ? 'disabled' : ''}>${u.prev}</button>
        <div class="flex gap-1">
          ${quizQuestions.map((_, i) => `
            <div class="${i === currentQuizQuestion
              ? 'w-5 h-2 bg-amber-400 border-2 border-neo'
              : completedQuestions.has(quizQuestions[i].id)
                ? 'w-2 h-2 bg-green-500 border-2 border-neo'
                : 'w-2 h-2 bg-slate-300 border-2 border-neo'}"></div>
          `).join('')}
        </div>
        <button onclick="nextQuiz()"
          class="neo-btn-sm ${currentQuizQuestion === quizQuestions.length - 1 ? 'opacity-40 cursor-not-allowed' : ''}"
          ${currentQuizQuestion === quizQuestions.length - 1 ? 'disabled' : ''}>${u.next}</button>
      </div>
    </div>
  `;
}

function answerQuiz(index) {
  const q = quizQuestions[currentQuizQuestion];
  if (completedQuestions.has(q.id)) return;
  completedQuestions.add(q.id);
  quizScores[q.id] = q.options[index].score;

  const options = document.querySelectorAll('#quiz-main-options .quiz-option');
  options.forEach((opt, i) => {
    opt.classList.add('disabled');
    if (q.options[i].score === 0) opt.classList.add('correct');
    else if (i === index) opt.classList.add('incorrect');
  });

  const total = Object.values(quizScores).reduce((a, b) => a + b, 0);
  const max = quizQuestions.length * 3;
  document.getElementById('results-panel').innerHTML = renderResultsPanel(total, max);
}

function prevQuiz() { if (currentQuizQuestion > 0) { currentQuizQuestion--; renderQuizQuestion(); } }
function nextQuiz() { if (currentQuizQuestion < quizQuestions.length - 1) { currentQuizQuestion++; renderQuizQuestion(); } }

function renderResultsPanel(score, maxScore) {
  const u = _ui.quiz;
  const percent = maxScore > 0 ? (score / maxScore) * 100 : 0;
  let level = u.levels.start;
  if (percent > 0 && percent <= 25) level = u.levels.master;
  else if (percent > 25 && percent <= 50) level = u.levels.defender;
  else if (percent > 50 && percent <= 75) level = u.levels.aware;
  else if (percent > 75) level = u.levels.trainee;

  const riskLabel = u.riskPoints.replace('{max}', maxScore);

  return `
    <div class="neo-panel p-6 text-center">
      <div class="text-4xl mb-3">${level.icon}</div>
      <h3 class="font-bold text-lg text-slate-900 mb-2">${level.title}</h3>
      <div class="flex items-center justify-center gap-2 mb-4">
        <span class="text-3xl font-bold font-mono ${level.color}">${score}</span>
        <span class="text-sm text-slate-500">${riskLabel}</span>
      </div>
      <div class="neo-progress-track w-full h-3 mb-4">
        <div class="bg-green-500 neo-progress-fill transition-all" style="width: ${100 - percent}%"></div>
      </div>
      <p class="text-xs text-slate-500 uppercase tracking-wider mb-4">${level.desc}</p>
      <button onclick="resetQuiz()" class="btn-primary">
        ${u.restart}
      </button>
    </div>
  `;
}

function resetQuiz() { completedQuestions = new Set(); quizScores = {}; currentQuizQuestion = 0; renderQuiz(); }
