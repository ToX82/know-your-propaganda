(function () {
  const SUPPORTED = ['it', 'en'];
  const DEFAULT_LANG = 'it';

  function getLang() {
    const stored = localStorage.getItem('lang');
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  function setLang(lang) {
    if (SUPPORTED.includes(lang)) {
      localStorage.setItem('lang', lang);
    }
  }

  async function loadLocale(lang) {
    const base = 'locales/' + lang + '/';
    const [techRes, quizRes, uiRes] = await Promise.all([
      fetch(base + 'techniques.json'),
      fetch(base + 'quiz.json'),
      fetch(base + 'ui.json')
    ]);
    window.techniques = await techRes.json();
    const quizData = await quizRes.json();
    window.quizQuestions = Array.isArray(quizData) ? quizData : (quizData.questions || []);
    window.quizInfo = quizData.quiz_info || null;
    window.quizFinalFeedback = quizData.final_feedback || null;
    window.quizResources = quizData.resources || [];
    window._ui = await uiRes.json();
    window._lang = lang;
  }

  window.i18n = { getLang, setLang, loadLocale, supported: SUPPORTED };
})();
