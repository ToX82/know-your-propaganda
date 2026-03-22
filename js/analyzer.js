/* ─── ANALYZER — keyword-matching text analysis ─────── */
const Analyzer = (function () {

  function tokenize(text) {
    return (text || '')
      .toLowerCase()
      .replace(/['"«»""'']/g, ' ')
      .split(/[\s,;:.!?()[\]{}\/\\—\-]+/)
      .filter(w => w.length > 3);
  }

  function scoreAgainst(tokens, technique) {
    const matches = [];
    let total = 0;
    const seen = new Set();

    function tryAdd(word, source, weight) {
      const key = word + '|' + source;
      if (seen.has(key)) return;
      seen.add(key);
      matches.push({ word, source, weight });
      total += weight;
    }

    // Technique name tokens — weight 3
    const nameTokens = tokenize(technique.name);
    nameTokens.forEach(nw => {
      tokens.forEach(tw => {
        if ((tw === nw || tw.startsWith(nw) || nw.startsWith(tw)) && nw.length > 3) {
          tryAdd(nw, 'name', 3);
        }
      });
    });

    // Red flags — weight 2
    (technique.redFlags || []).forEach(flag => {
      tokenize(flag).forEach(fw => {
        if (fw.length < 5) return;
        tokens.forEach(tw => {
          if (tw === fw) tryAdd(fw, 'redFlags', 2);
        });
      });
    });

    // Summary + definition — weight 1
    const bodyTokens = [...tokenize(technique.summary), ...tokenize(technique.definition)];
    bodyTokens.forEach(sw => {
      if (sw.length < 6) return;
      tokens.forEach(tw => {
        if (tw === sw) tryAdd(sw, 'summary', 1);
      });
    });

    return { score: total, matches };
  }

  return {
    analyze(text) {
      if (!text || !text.trim() || typeof techniques === 'undefined') return [];
      const tokens = tokenize(text);
      if (!tokens.length) return [];
      return techniques
        .map(t => ({ technique: t, ...scoreAgainst(tokens, t) }))
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    },

    buildPerplexityUrl(text, results) {
      const names = results.map(r => r.technique.name).join(', ');
      const lang = (typeof _lang !== 'undefined' && _lang === 'it') ? 'it' : 'en';
      const prompt = lang === 'it'
        ? `Analizza questo testo per tecniche di propaganda (${names}): "${text.slice(0, 300)}"`
        : `Analyze this text for propaganda techniques (${names}): "${text.slice(0, 300)}"`;
      return 'https://www.perplexity.ai/search?q=' + encodeURIComponent(prompt);
    }
  };
})();
