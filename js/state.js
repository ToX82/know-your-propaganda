// State
let currentPage = 'home';
let currentTechnique = null;
let currentFilter = 'all';
let exploredTechniques = new Set();
let quizScores = {};
let quizSelections = {};
let currentQuizQuestion = 0;
let quizResultsVisible = false;
let quizStarted = false;

let techniqueQuizState = { answered: false, selected: null };

// Quiz gamification state
let quizStreak = 0;
let quizMaxStreak = 0;
let quizStartTime = null;

// Category colors
const categoryColors = {
  attack: 'cat-attack', disinfo: 'cat-disinfo', framing: 'cat-framing',
  manipulation: 'cat-manipulation', digital: 'cat-digital', emotional: 'cat-emotional'
};
