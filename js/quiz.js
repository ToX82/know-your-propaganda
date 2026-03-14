function startTechniqueQuiz() {
  const u = _ui.detail;
  techniqueQuizState = { answered: false, selected: null };
  const t = currentTechnique;
  document.getElementById('quiz-container').innerHTML = `
    <div class="border rounded-lg p-4 space-y-4">
      <div class="bg-slate-50 rounded-lg p-4"><p class="text-slate-800"><strong>${u.situation}</strong> ${t.scenario.situation}</p></div>
      <h4 class="font-medium">${t.scenario.question}</h4>
      <div class="space-y-2" id="quiz-options">${t.scenario.options.map((opt, i) => `<button onclick="answerTechniqueQuiz(${i})" class="quiz-option w-full text-left p-4 rounded-lg border-2 border-slate-200 transition"><span class="font-bold mr-2">${String.fromCharCode(65 + i)}.</span>${opt.text}</button>`).join('')}</div>
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
      exp.className = 'mt-2 text-sm ' + (t.scenario.options[i].correct ? 'text-green-700' : 'text-red-700');
      exp.textContent = (t.scenario.options[i].correct ? '✓ ' : '✗ ') + t.scenario.options[i].explanation;
      opt.appendChild(exp);
    }
  });
}

function renderQuiz() {
  const u = _ui.quiz;
  const content = document.getElementById('content');
  const total = Object.values(quizScores).reduce((a, b) => a + b, 0);
  const max = quizQuestions.length * 3;

  content.innerHTML = `<div class="max-w-3xl mx-auto"><div class="text-center mb-6"><h2 class="text-2xl font-bold mb-2">${u.title}</h2><p class="text-slate-500">${u.subtitle}</p></div><div id="quiz-card" class="bg-white rounded-lg border shadow-sm"></div><div class="mt-6" id="results-panel">${renderResultsPanel(total, max)}</div></div>`;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const u = _ui.quiz;
  const q = quizQuestions[currentQuizQuestion];

  const questionLabel = u.questionOf
    .replace('{n}', currentQuizQuestion + 1)
    .replace('{total}', quizQuestions.length);

  document.getElementById('quiz-card').innerHTML = `
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <span class="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full">${questionLabel}</span>
        ${completedQuestions.has(q.id) ? '<span class="text-green-600 text-sm">' + u.completed + '</span>' : ''}
      </div>
      <h3 class="text-lg font-semibold mb-4">${q.title}</h3>
      <div class="bg-slate-50 rounded-lg p-4 mb-4"><p class="text-slate-700">${q.situation}</p></div>
      <h4 class="font-medium mb-3">${q.question}</h4>
      <div class="space-y-2" id="quiz-main-options">${q.options.map((opt, i) => `<button onclick="answerQuiz(${i})" class="quiz-option w-full text-left p-4 rounded-lg border-2 border-slate-200 transition"><span class="font-bold mr-2">${String.fromCharCode(65 + i)}.</span>${opt.text}</button>`).join('')}</div>
      <hr class="my-4">
      <div class="flex justify-between items-center">
        <button onclick="prevQuiz()" class="px-4 py-2 border rounded-lg hover:bg-slate-50 ${currentQuizQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${currentQuizQuestion === 0 ? 'disabled' : ''}>${u.prev}</button>
        <div class="flex gap-1">${quizQuestions.map((_, i) => `<div class="w-2 h-2 rounded-full ${i === currentQuizQuestion ? 'bg-amber-500 w-4' : completedQuestions.has(quizQuestions[i].id) ? 'bg-green-500' : 'bg-slate-300'}"></div>`).join('')}</div>
        <button onclick="nextQuiz()" class="px-4 py-2 border rounded-lg hover:bg-slate-50 ${currentQuizQuestion === quizQuestions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}" ${currentQuizQuestion === quizQuestions.length - 1 ? 'disabled' : ''}>${u.next}</button>
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

  return `<div class="bg-white rounded-lg border p-6 text-center"><div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-4xl ${level.color}">${level.icon}</div><h3 class="font-bold text-xl mb-2">${level.title}</h3><div class="flex items-center justify-center gap-2 mb-4"><span class="text-3xl font-bold">${score}</span><span class="text-slate-500">${riskLabel}</span></div><div class="w-full bg-slate-200 rounded-full h-2 mb-4"><div class="bg-green-500 h-2 rounded-full transition-all" style="width: ${100 - percent}%"></div></div><p class="text-sm text-slate-500 mb-4">${level.desc}</p><button onclick="resetQuiz()" class="border rounded-full px-4 py-2 text-sm font-medium hover:bg-slate-50">${u.restart}</button></div>`;
}

function resetQuiz() { completedQuestions = new Set(); quizScores = {}; currentQuizQuestion = 0; renderQuiz(); }
