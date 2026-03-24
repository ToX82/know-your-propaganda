/* ─── STORAGE - localStorage persistence ────────────── */
const KYP = (function () {
  const PREFIX = 'kyp_';

  function get(key, def) {
    try {
      const v = localStorage.getItem(PREFIX + key);
      return v !== null ? JSON.parse(v) : def;
    } catch { return def; }
  }

  function set(key, val) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); } catch {}
  }

  return {
    loadAll() {
      exploredTechniques  = new Set(get('explored', []));
      masteredTechniques  = new Set(get('mastered', []));
      lastVisited         = get('last_visited', []);
    },

    saveExplored()  { set('explored',      Array.from(exploredTechniques)); },
    saveMastered()  { set('mastered',      Array.from(masteredTechniques)); },

    addLastVisited(id) {
      lastVisited = [id, ...lastVisited.filter(x => x !== id)].slice(0, 4);
      set('last_visited', lastVisited);
    },

    saveQuizScore(total, max) {
      set('quiz_score', { total, max, date: new Date().toISOString().slice(0, 10) });
    },
    loadQuizScore() { return get('quiz_score', null); },

    clearAll() {
      ['explored', 'mastered', 'last_visited', 'quiz_score'].forEach(k => {
        try { localStorage.removeItem(PREFIX + k); } catch {}
      });
    }
  };
})();
