# Piano di Implementazione: URL SEO-friendly con Slug e Lingua

## Obiettivo
Trasformare gli URL delle tecniche da `#detail/{id}` a `#{lang}/technique/{slug}`, dove:
- `lang` = lingua corrente ('it' o 'en')
- `slug` = slug SEO-friendly del nome della tecnica nella lingua corrente

Esempi:
- Italiano: `#it/technique/ad-hominem`
- Inglese: `#en/technique/ad-hominem`

## Analisi Attuale
- **Routing**: Hash-based (`#detail/1`, `#techniques/attack`)
- **Identificazione tecniche**: ID numerico (1-55)
- **Lingua**: Gestita in localStorage, non nell'URL
- **File dati**: `locales/{lang}/techniques.json` con struttura attuale
- **Tecniche totali**: 55

## Struttura Nuova del Routing

### Pattern URL supportati
- `#home` → Home (lingua corrente)
- `#techniques` → Lista tutte tecniche (lingua corrente)
- `#techniques/{category}` → Tecniche per categoria (lingua corrente)
- `#{lang}/technique/{slug}` → Dettaglio tecnica
- `#quiz` → Quiz (lingua corrente)
- `#about` → About (lingua corrente)
- `#analyzer` → Analyzer (lingua corrente)
- `#training` → Training (lingua corrente)

### Esempi concreti
- `#it/technique/ad-hominem` → Tecnica "Ad Hominem" in italiano
- `#en/technique/ad-hominem` → Tecnica "Ad Hominem" in inglese
- `#it/technique/ridicolizzazione` → Tecnica "Ridicolizzazione" in italiano

## Modifiche Richieste

### 1. Nuova Funzione: Slugification (`js/utils.js` - nuovo file)

```javascript
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .replace(/-+/g, '-');
}

function createSlugMap(techniques, lang) {
  const slugMap = new Map();
  const usedSlugs = new Set();

  techniques.forEach(t => {
    let slug = slugify(t.name);
    let counter = 1;
    let uniqueSlug = slug;
    while (usedSlugs.has(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    slugMap.set(uniqueSlug, t.id);
    usedSlugs.add(uniqueSlug);
  });

  return slugMap;
}

function findTechniqueBySlug(lang, slug) {
  const slugMap = window.slugMaps?.[lang];
  if (!slugMap) return null;
  const id = slugMap.get(slug);
  if (!id) return null;
  return window.techniques?.find(t => t.id === id);
}
```

### 2. Modifica: `js/app.js`

#### 2.1 Nuovi globali (in cima al file)
```javascript
let slugMaps = { it: null, en: null };
```

#### 2.2 Modifica `getHashRoute()` (righe 27-34)
```javascript
function getHashRoute() {
  const hash = location.hash.slice(1);
  if (!hash) return { page: 'home' };
  const parts = hash.split('/');

  if (parts.length >= 3 && i18n.supported.includes(parts[0]) && parts[1] === 'technique' && parts[2]) {
    const lang = parts[0];
    const slug = parts[2];
    return { page: 'detail', lang, slug };
  }

  if (parts[0] === 'detail' && parts[1]) return { page: 'detail', id: parseInt(parts[1], 10) };
  if (parts[0] === 'techniques' && parts[1]) return { page: 'techniques', filter: parts[1] };

  return { page: parts[0] || 'home' };
}
```

#### 2.3 Modifica `handleHashRoute()` (righe 104-123)
```javascript
function handleHashRoute() {
  const route = getHashRoute();

  if (route.page === 'detail' && route.slug) {
    if (route.lang && route.lang !== _lang) {
      switchLanguage(route.lang);
      return;
    }

    const t = findTechniqueBySlug(_lang, route.slug);
    if (t) {
      currentTechnique = t;
      exploredTechniques.add(t.id);
      KYP.saveExplored();
      KYP.addLastVisited(t.id);
      updateProgress();
      navigateTo('detail');
      return;
    }
  }

  if (route.page === 'techniques' && route.filter) {
    currentFilter = route.filter;
  }

  const validPages = ['home', 'techniques', 'quiz', 'about', 'analyzer', 'training'];
  navigateTo(validPages.includes(route.page) ? route.page : 'home', route.filter);
}
```

#### 2.4 Modifica `updateHash()` (righe 43-50)
```javascript
function updateHash(page, extra) {
  let hash = '';

  if (page === 'technique') {
    const lang = _lang || 'it';
    hash = `#${lang}/technique/${extra}`;
  } else {
    hash = '#' + page;
    if (page === 'detail' && extra) hash += '/' + extra;
    if (page === 'techniques' && extra && extra !== 'all') hash += '/' + extra;
  }

  if (location.hash !== hash) {
    history.pushState(null, '', hash);
  }
}
```

#### 2.5 Modifica `navigateTo()` (righe 53-102)
Sostituisci il blocco `if (page === 'detail' && currentTechnique)` con:
```javascript
if (page === 'detail' && currentTechnique) {
  const slug = slugify(currentTechnique.name);
  updateHash('technique', slug);
}
```

#### 2.6 Modifica `switchLanguage()` (righe 126-149)
Aggiungi dopo `await i18n.loadLocale(lang);`:
```javascript
slugMaps[lang] = createSlugMap(techniques, lang);
```

#### 2.7 Modifica init (righe 152-192)
Aggiungi dopo `await i18n.loadLocale(lang);`:
```javascript
slugMaps[lang] = createSlugMap(techniques, lang);
```

### 3. Modifica: `js/render.js`

#### 3.1 Modifica `renderTechniques()` (righe 193 e 206)
Sostituisci `openTechnique(${t.id})` con:
```javascript
onclick="openTechniqueBySlug('${slugify(t.name)}')"
```

#### 3.2 Modifica `renderHome()` - sezione recentTechs (riga 135)
Sostituisci `openTechnique(${t.id})` con:
```javascript
onclick="openTechniqueBySlug('${slugify(t.name)}')"
```

#### 3.3 Modifica `renderHome()` - quick access (riga 155)
Sostituisci `openTechnique(${t.id})` con:
```javascript
onclick="openTechniqueBySlug('${slugify(t.name)}')"
```

#### 3.4 Nuova funzione: `openTechniqueBySlug(slug)`
Aggiungi dopo `openTechnique()` (dopo riga 221):
```javascript
function openTechniqueBySlug(slug) {
  const t = findTechniqueBySlug(_lang, slug);
  if (t) {
    currentTechnique = t;
    exploredTechniques.add(t.id);
    KYP.saveExplored();
    KYP.addLastVisited(t.id);
    updateProgress();
    navigateTo('detail');
  }
}
```

#### 3.5 Modifica `renderTraining()` (riga 444)
Sostituisci `openTechnique(${t.id})` con:
```javascript
onclick="openTechniqueBySlug('${slugify(t.name)}')"
```

### 4. Modifica: `index.html`

Aggiungi prima degli altri script:
```html
<script src="js/utils.js"></script>
```

## Test Plan

### 1. Test Routing Base
- [ ] `#home` → Carica home page
- [ ] `#techniques` → Carica lista tecniche
- [ ] `#techniques/attack` → Carica filtro categoria
- [ ] `#quiz`, `#about`, `#analyzer`, `#training` → Caricano pagine corrette

### 2. Test Nuovo Formato URL
- [ ] `#it/technique/ad-hominem` → Carica tecnica Ad Hominem in italiano
- [ ] `#en/technique/ad-hominem` → Carica tecnica Ad Hominem in inglese
- [ ] `#it/technique/ridicolizzazione` → Carica tecnica Ridicolizzazione in italiano

### 3. Test Cambio Lingua
- [ ] Da `#it/technique/ad-hominem`, cliccando su "EN" → Carica versione inglese
- [ ] Verifica che l'URL diventi `#en/technique/ad-hominem`
- [ ] Verifica che i contenuti siano in inglese

### 4. Test Click Navigation
- [ ] Cliccando su una tecnica nella lista → URL diventa `#{lang}/technique/{slug}`
- [ ] Cliccando su "Back" → Torna alla lista tecniche
- [ ] Cliccando su tecniche recenti → URL corretto

### 5. Test Bookmarking/Condivisione
- [ ] Copiando `#it/technique/ad-hominem` e incollandolo in nuova tab → Funziona
- [ ] Copiando `#en/technique/ad-hominem` e incollandolo in nuova tab → Funziona

### 6. Test Cross-Lingua
- [ ] Utente con lingua italiana che visita `#en/technique/ad-hominem` → Cambia lingua automaticamente a inglese
- [ ] Utente con lingua inglese che visita `#it/technique/ad-hominem` → Cambia lingua automaticamente a italiano

## Note Importanti

### Compatibilità
- I vecchi URL con ID (`#detail/1`) smetteranno di funzionare (come richiesto dall'utente)
- I vecchi URL per altre pagine rimangono compatibili

### Performance
- Le slug maps sono generate una volta per lingua al caricamento
- Lookup per slug è O(1) usando Map

### Manutenzione
- Gli slug sono generati automaticamente dai nomi, quindi non richiedono manutenzione manuale
- Se un nome cambia, lo slug cambierà automaticamente

## Riepilogo File da Modificare

1. **Nuovo file**: `js/utils.js`
   - Funzione `slugify()`
   - Funzione `createSlugMap()`
   - Funzione `findTechniqueBySlug()`

2. **js/app.js**
   - Nuovi globali: `slugMaps`
   - Modifica `getHashRoute()`
   - Modifica `handleHashRoute()`
   - Modifica `updateHash()`
   - Modifica `navigateTo()`
   - Modifica `switchLanguage()`
   - Modifica init

3. **js/render.js**
   - Modifica `renderTechniques()` (2 occorrenze)
   - Modifica `renderHome()` (2 occorrenze)
   - Nuova `openTechniqueBySlug()`
   - Modifica `renderTraining()` (1 occorrenza)

4. **index.html**
   - Aggiungi `<script src="js/utils.js"></script>`

## Ordine di Implementazione

1. Creare file `js/utils.js`
2. Aggiornare `index.html`
3. Modificare `js/app.js`
4. Modificare `js/render.js`
5. Testare tutti gli scenari
