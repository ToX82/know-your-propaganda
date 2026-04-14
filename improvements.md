# Know Your Propaganda — Piano di Miglioramenti UX

Documento di lavoro basato su feedback di un utente-tipo: curioso ma con bassa consapevolezza sul tema, interesse vago, soglia d'attenzione di ~30 secondi.

## Problema centrale

La home attuale si presenta come un'enciclopedia (67 tecniche, 7 sezioni, 7 categorie) prima ancora di aver dimostrato il proprio valore. L'utente rimbalza perché:

- Nessun gancio emotivo o esempio concreto nei primi 10 secondi
- Troppe porte aperte contemporaneamente (paradosso della scelta)
- Lessico accademico ("Bias Cognitivi", "Operazioni Digitali")
- Il muro di contenuti in *Informazioni* scoraggia la lettura
- Gli strumenti più "cliccabili" (Test, Analizzatore) sono nascosti dietro un click

**Obiettivo:** trasformare la home in una *porta bassa* che dimostri il valore in meno di 60 secondi e inviti a tornare.

---

## Priorità 1 — Analizzatore in Home Page ⭐

**Ipotesi:** lo strumento più virale è anche il più nascosto. Portarlo in home trasforma la prima visita da "leggo una guida" a "uso un tool". È un gesto concreto, a bassa frizione, che coinvolge l'utente *con il suo contenuto* (un post, un articolo che ha appena letto). Perplexity fa il lavoro pesante lato analisi.

### Cosa fare

1. **Blocco "Analizza un testo" subito sotto l'hero**, prima delle statistiche e della lista tecniche.
   - Titolo ad alto impatto: *"Hai letto qualcosa che ti suona strano? Incollalo qui."*
   - Una singola textarea + bottone **Analizza con Perplexity**
   - Placeholder rotante con esempi reali ("Incolla un titolo di giornale…", "Un post visto su Facebook…", "Un discorso politico…")
   - Micro-copy sotto: *"Apriamo Perplexity con un prompt specializzato che cerca 67 tecniche di propaganda nel tuo testo."*

2. **Accetta link oltre al testo.** Rilevazione automatica URL → nel prompt chiedi a Perplexity di leggere il link. Un utente pigro incolla un URL, non copia il testo.

3. **Esempi cliccabili pre-caricati** (3 pulsanti sotto la textarea):
   - "Prova con un titolo politico"
   - "Prova con una pubblicità"
   - "Prova con un post social"
   Al click popolano la textarea con un esempio reale → abbatte la frizione "non so cosa incollare".

4. **Dopo l'analisi, gancio di ritorno.** Il prompt già invita a visitare il sito. Aggiungere nel blocco home un messaggio post-submit: *"Torna qui dopo aver letto l'analisi: ti mostriamo le tecniche che Perplexity ha nominato."* (fase 2, vedi sotto).

5. **Spostare la sezione Analizzatore dedicata** in "Strumenti avanzati" o fonderla con l'home. Se è in home, non serve duplicarla.

### Estensione futura (fase 2)

- Quando l'utente torna dall'analisi Perplexity, mostrare un pannello *"Quali tecniche sono state menzionate?"* che permette di spuntarle e aprirle direttamente (deep-link alle schede tecniche).
- Salvare in localStorage le ultime 3 analisi fatte → sezione *"Le tue analisi recenti"*.
- Eventualmente, sondare l'esistenza di un'API Perplexity per restituire risultati inline senza uscire dal sito (valutare costi/complessità).

### File da toccare

- `index.html` — aggiungere sezione hero+analyzer
- `js/render.js` — rendering home con il nuovo blocco analyzer
- `js/analyzer.js` — estendere `buildPerplexityUrl` per gestire URL + esempi pre-caricati
- `locales/{it,en}/ui.json` — copy dell'analyzer in home, placeholder rotanti, esempi

---

## Priorità 2 — Home con un singolo CTA emotivo

Sostituire il titolo enciclopedico *"67 Tecniche di Propaganda"* con un gancio diretto:

- **Hero H1:** *"Quanto sei manipolabile? Scoprilo in 60 secondi."*
- **Sub:** una riga che promette un beneficio concreto, non una feature.
- **CTA primario:** mini-quiz di 3 domande *inline nella home*, senza cambio pagina. Al termine: risultato breve + invito a fare il test completo.
- Le 67 tecniche, stats e categorie restano ma **più in basso**, come approfondimento.

### File da toccare

- `index.html`, `js/render.js`, `locales/*/ui.json`
- `js/quiz.js` — variante short-quiz (3 domande campionate) renderizzabile in home

---

## Priorità 3 — Esempio virale in home

Un **"Smontiamo un titolo reale"** statico, sempre presente in home:

- Un titolo di giornale (o pubblicità) vero, già pronto
- 2-3 frecce visuali che indicano le tecniche usate
- Click sulla tecnica → scheda dettaglio

Dimostra il valore del sito *senza* chiedere nulla all'utente. È il "tour guidato" passivo.

### File da toccare

- `index.html`, `js/render.js`
- `locales/*/ui.json` — copy del titolo esempio
- Opzionale: rotazione di 3-5 esempi al reload

---

## Priorità 4 — Ridurre l'offerta visibile

La sidebar attuale mostra 7 voci di navigazione + 7 categorie = 14 link al primo sguardo.

- **Navigazione principale:** Home, Tecniche, Test Resistenza, Informazioni (4 voci)
- **"Strumenti"** come accordion espandibile: Analizzatore, Allenamento
- **Categorie** collassate di default sotto "Tecniche" (espandibili al click)

### File da toccare

- `index.html` (struttura sidebar), `js/app.js` (logica accordion), `css/styles.css`

---

## Priorità 5 — Rinominare le categorie in linguaggio umano

Le etichette attuali sono corrette ma respingono. Proposta:

| Attuale | Proposta |
|---|---|
| Attacco | Attacchi personali |
| Disinformazione | Fatti distorti |
| Inquadratura | Come ti raccontano la storia |
| Manipolazione | Trucchi retorici |
| Operazioni Digitali | Manipolazione sui social |
| Appelli Emotivi | Leve emotive |
| Bias Cognitivi | Come la tua mente ti frega |

Mantenere le etichette "tecniche" come sottotitolo piccolo per chi studia il tema.

### File da toccare

- `locales/{it,en}/ui.json` → `nav.categories`, `techniques.filters`

---

## Priorità 6 — Gamification più visibile e gentile

"0/67" all'avvio scoraggia. Sostituire con:

- **Livelli ad alto contrasto:** Recluta → Osservatore → Agente → Detective → Maestro
- Milestone piccole e frequenti: 3, 5, 10, 20, 35, 67 tecniche
- Badge visuale in sidebar invece del raw counter
- Dopo ogni tecnica letta: micro-celebrazione ("+1 tecnica, sei a 3/5 per diventare Osservatore")

### File da toccare

- `js/state.js`, `js/render.js`, `locales/*/ui.json`

---

## Priorità 7 — Tecnica del giorno in home

Oggi l'Allenamento è una sezione separata. Portarlo in home (blocco piccolo) dà un motivo per tornare ogni giorno, anche 30 secondi. Micro-dose = abitudine.

### File da toccare

- `js/render.js` — rendering home
- `index.html`, `locales/*/ui.json`

---

## Priorità 8 — Sfoltire "Informazioni"

La pagina è utilissima ma è un muro di testo. Dividere in tab o accordion:
- **Metodo SIFT** (4 step, espandibili)
- **10 Principi** (lista compatta, click per dettaglio)
- **Auto-diagnosi** (quiz interattivo invece di lista statica)
- **Fonti** (in fondo, collassato)

### File da toccare

- `js/render.js`, `locales/*/ui.json`

---

## Roadmap suggerita

1. **Sprint 1 — Analizzatore in home** (Priorità 1): impatto massimo, complessità media
2. **Sprint 2 — Hero + mini-quiz inline** (Priorità 2): richiede refactor quiz
3. **Sprint 3 — Esempio virale + rename categorie** (Priorità 3, 5): solo contenuti
4. **Sprint 4 — Sidebar ridotta + gamification** (Priorità 4, 6)
5. **Sprint 5 — Tecnica del giorno in home + refactor Informazioni** (Priorità 7, 8)

## Metriche da osservare (se si ha analytics)

- Bounce rate sulla home
- % utenti che cliccano sull'analizzatore in home
- % utenti che completano il mini-quiz inline
- Numero medio di tecniche esplorate per sessione
- Ritorni dopo 24h (per validare "Tecnica del giorno")
