// State
let currentPage = 'home';
let currentTechnique = null;
let currentFilter = 'all';
let exploredTechniques = new Set();
let quizScores = {};
let quizSelections = {}; // question id -> selected option index (allows changing answer)
let currentQuizQuestion = 0;
let quizResultsVisible = false; // responso nascosto fino al click su "Completa"

let techniqueQuizState = { answered: false, selected: null };

// Category colors
const categoryColors = {
  attack: 'cat-attack', disinfo: 'cat-disinfo', framing: 'cat-framing',
  manipulation: 'cat-manipulation', digital: 'cat-digital', emotional: 'cat-emotional'
};
