# Propaganda Defense Guide

A guide to recognizing manipulation techniques used in politics, media, and advertising. The project teaches several named techniques with definitions, psychological mechanisms, historical context, and concrete defense strategies. It also includes a self-assessment quiz (Resistance Test) to gauge how susceptible you are to common persuasion patterns.

No framework dependencies: plain HTML, CSS, and JavaScript. Content is driven by JSON locale files (English and Italian). Suitable for self-study, media literacy courses, or as a reference when analyzing public discourse.

---

## Why This Exists

Propaganda does not require lies. It often works through selection (what is shown, what is omitted), framing (how it is presented), and repetition. The goal here is to name these patterns so they can be identified in real content-news, ads, speeches, social feeds-and to offer clear, actionable ways to resist them.

The structure follows established work: the Institute for Propaganda Analysis (1937–1942), RAND’s “firehose of falsehood” model, agenda-setting and framing research, and classical treatments of logical fallacies. The techniques are organized so that recognition comes first; defense follows from understanding the mechanism.

---

## What’s Inside

- **Several techniques** divided in categories:
  - **Attack** - Ad hominem, ridicule, demonization
  - **Disinformation** - Firehose of falsehood, chain letters, viral amplification
  - **Framing** - Framing, whataboutism, agenda setting, poisoning the well, card stacking, labeling
  - **Manipulation** - Bandwagon, glittering generalities, transfer, testimonial, repetition, slogan, plain folks, appeal to authority, polarization, Gish gallop, straw man, red herring, projection, dog whistle, gaslighting, cherry-picking
  - **Digital operations** - Astroturfing, false flag, deepfake, influence operations, flooding
  - **Emotional appeals** - Fear appeal, flag-waving, beautiful people

For each technique the guide provides:

- A short definition and summary
- Historical context and, where useful, case studies
- Psychological mechanism (why it works)
- Variants and red flags (how to spot it)
- Defense strategies (what to do when you see it)
- A short scenario quiz to check understanding

The **Resistance Test** is a separate questionnaire: situation-based questions about how you typically react to viral posts, debates, conflicting headlines, emotional content, and similar scenarios. Lower scores indicate better resistance; the result is descriptive, not normative.

---

## Running the Project

Static site. Serve the project root with any HTTP server.

```bash
# Python 3
python -m http.server 8000

# Node (npx)
npx serve .

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` (or the port you used). No build step. Language can be switched between English and Italian in the UI.

---

## Project Structure

```
.
├── index.html          # Single page shell and nav
├── css/
│   └── styles.css      # Custom styles (Tailwind extended in HTML)
├── js/
│   ├── app.js          # Routing and global behavior
│   ├── state.js        # Progress and explored techniques
│   ├── render.js       # Page and technique rendering
│   ├── quiz.js         # Resistance Test logic
│   ├── i18n.js         # Locale loading and switching
│   └── data/
│       ├── techniques.js   # Technique definitions (structure; labels in locales)
│       └── quiz-questions.js
├── locales/
│   ├── en/
│   │   ├── ui.json         # UI strings
│   │   ├── techniques.json # Technique copy (EN)
│   │   └── quiz.json       # Quiz copy (EN)
│   └── it/
│       ├── ui.json
│       ├── techniques.json
│       └── quiz.json
└── README.md
```

Content lives in the `locales` JSON files; technique IDs and structure are in `js/data/techniques.js`. Adding a language means adding a `locales/<code>/` folder with the same JSON keys.

---

## Sources and Further Reading

The selection and naming of techniques draw on:

- **Institute for Propaganda Analysis** (1937–1942) - Seven classic devices (bandwagon, card stacking, glittering generalities, etc.)
- **RAND Corporation** - “Firehose of Falsehood” and modern disinformation
- **McCombs & Shaw** - Agenda-setting
- **Herman & Chomsky** - Manufacturing consent and framing
- **Aristotle and informal logic** - Fallacies (e.g. ad hominem, appeal to authority)

The guide is intended for education and critical literacy, not as a legal or clinical tool.

---

## Contributing

Contributions are more than welcome. Please open an issue or a pull request to suggest changes or additions. If you want to add a new language, please open an pull request to add the new language files in the `locales` folder.

If you want to contribute to the content, please open an issue to discuss the changes you want to make. I am more than happy to improve the content and the translations.