// State
let currentPage = 'home';
let currentTechnique = null;
let currentFilter = 'all';
let exploredTechniques = new Set();
let completedQuestions = new Set();
let quizScores = {};
let currentQuizQuestion = 0;

let techniqueQuizState = { answered: false, selected: null };

// Category colors
const categoryColors = {
  attack: 'cat-attack', disinfo: 'cat-disinfo', framing: 'cat-framing',
  manipulation: 'cat-manipulation', digital: 'cat-digital', emotional: 'cat-emotional'
};
