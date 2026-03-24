/* ─── ANALYZER - Perplexity-based text analysis ─────── */
const Analyzer = (function () {

  return {
    buildPerplexityUrl(text) {
      const lang = (typeof _lang !== 'undefined' && _lang === 'it') ? 'it' : 'en';
      const base = window.location.origin;
      const rulesUrl = base + '/vari_prop/know-your-propaganda/locales/' + lang + '/techniques.json';
      const template = (_ui && _ui.analyzer && _ui.analyzer.prompt) || '';
      const prompt = template.replace('{text}', text).replace('{rulesUrl}', rulesUrl);
      return 'https://www.perplexity.ai/search?q=' + encodeURIComponent(prompt);
    }
  };
})();
