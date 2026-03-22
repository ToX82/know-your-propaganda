const techniques = [
  // === ATTACCO ===
  {
    id: 1, icon: '⚔️', name: 'Ad Hominem', subtitle: 'Attacco alla Persona', category: 'attack', catLabel: 'Attacco',
    summary: 'Attaccare la persona invece delle sue argomentazioni. Una delle fallacie logiche più antiche.',
    definition: 'L\'ad hominem (dal latino "verso l\'uomo") è una fallacia logica in cui si attacca il carattere, i motivi o altri attributi personali di chi propone un\'argomentazione, invece di confutare la sostanza.',
    historicalContext: 'Classificato da Aristotele tra i sofismi. Usato sistematicamente dai regimi totalitari: l\'etichetta "nemico del popolo" delegittimava qualsiasi argomento.',
    psychologicalMechanism: 'Sfrutta l\'euristica della fonte: tendiamo a valutare le informazioni in base a chi le dice. Quando la fonte viene delegittimata, il cervello scarta automaticamente anche argomentazioni valide.',
    variants: [
      { name: 'Abusivo', desc: 'Insulti diretti: "Sei un idiota!"' },
      { name: 'Circostanziale', desc: 'Attacco agli interessi: "Sei pagato per dirlo!"' },
      { name: 'Tu Quoque', desc: 'Accusa di ipocrisia: "Tu fai lo stesso!"' },
      { name: 'Guilt by Association', desc: 'Colpevolezza per associazione: "Parla con X, quindi..."'}
    ],
    redFlags: ['L\'argomentazione si concentra sul proponente, non sulla proposta', 'Uso ripetuto di etichette negative', 'Assenza di engagement con i contenuti specifici'],
    caseStudies: [{ title: 'Galileo', description: 'Attecchiato come "eretico" invece di confutare le sue argomentazioni astronomiche.', lesson: 'I difetti personali non invalidano le argomentazioni.' }],
    defense: [
      { step: 'Riconosci', action: 'Identifica quando il discorso passa dai fatti alla persona' },
      { step: 'Separa', action: 'Isola l\'argomentazione dagli attributi personali' },
      { step: 'Richiedi', action: '"Cosa c\'entra questo con la proposta specifica?"' }
    ],
    scenario: {
      title: 'Dibattito energetico',
      situation: 'Un ingegnere propone centrali nucleari. Un oppositore: "Non possiamo ascoltarlo! Lavora per un\'azienda del settore!"',
      question: 'Quale variante viene usata?',
      options: [
        { text: 'Ad hominem circostanziale', correct: true, explanation: 'Attacca i presunti interessi per evitare di discutere i meriti tecnici.' },
        { text: 'Legittima preoccupazione sui conflitti d\'interesse', correct: false, explanation: 'I conflitti vanno dichiarati, ma non invalidano le argomentazioni.' },
        { text: 'Ad hominem abusivo', correct: false, explanation: 'Non ci sono insulti diretti.' }
      ]
    }
  },
  {
    id: 2, icon: '😂', name: 'Ridicolizzazione', subtitle: 'Arma del Derisore', category: 'attack', catLabel: 'Attacco',
    summary: 'Trasformare l\'avversario in oggetto di scherno per delegittimarlo senza argomenti.',
    definition: 'La ridicolizzazione sistematica usa l\'umorismo per rendere socialmente costoso prendere sul serio l\'avversario.',
    historicalContext: 'Usata dai regimi con caricature di gruppi etnici e oppositori. Nell\'era digitale, i meme sono diventati armi potenti.',
    psychologicalMechanism: 'L\'umorismo crea un\'associazione emotiva che bypassa il ragionamento. Chi ride di qualcuno lo categorizza come "non meritevole di serietà".',
    variants: [
      { name: 'Meme seriali', desc: 'Campagne coordinate contro la stessa figura' },
      { name: 'Montaggi selettivi', desc: 'Compilazioni di gaffe fuori contesto' },
      { name: 'Soprannomi dispregiativi', desc: 'Etichette umoristiche che sostituiscono il nome' }
    ],
    redFlags: ['Meme che colpiscono l\'aspetto fisico invece che le idee', 'Satira unilaterale sistematica', 'Derisione senza argomentazione'],
    caseStudies: [{ title: 'Potere dei meme', description: 'Studi mostrano che candidati sistematicamente ridicolizzati in meme vengono percepiti come meno competenti.', lesson: 'I meme sono comunicazione politica con effetti misurabili.' }],
    defense: [
      { step: 'Separa', action: '"Mi fa ridere" non significa "ha torto"' },
      { step: 'Verifica la fonte', action: 'Chi produce i contenuti che ti fanno ridere?' },
      { step: 'Test inverso', action: 'Come reagiresti se la stessa tecnica fosse usata sul "tuo" campo?' }
    ],
    scenario: {
      title: 'Campagna di meme',
      situation: 'Per mesi, i social sono inondati di meme che mostrano un politico con il viso distorto. Non ci sono argomenti, solo derisione.',
      question: 'Quale effetto ha?',
      options: [
        { text: 'Delegittimazione senza argomentazione', correct: true, explanation: 'Rende impopolare criticarlo.' },
        { text: 'È solo satira innocua', correct: false, explanation: 'La satira sistematica ha effetti misurabili sulla percezione.' },
        { text: 'Se fa ridere, c\'è un fondo di verità', correct: false, explanation: 'L\'umorismo può essere efficace anche completamente fuorviante.' }
      ]
    }
  },
  {
    id: 3, icon: '👹', name: 'Demonizzazione', subtitle: 'Il Nemico Assoluto', category: 'attack', catLabel: 'Attacco',
    summary: 'Rappresentare l\'avversario come incarnatione del male, privo di ogni tratto umano.',
    definition: 'La demonizzazione rappresenta l\'avversario non come qualcuno con opinioni diverse, ma come forza del male, minaccia esistenziale, essere privo di morale o umanità.',
    historicalContext: 'Tecnica centrale in tutti i genocidi: ebrei, tutsi, armeni sono stati prima demonizzati come "ratti", "scarafaggi", "parassiti". La demonizzazione prepara psicologicamente alla violenza.',
    psychologicalMechanism: 'Disumanizza il nemico, rimuovendo le inibizioni morali contro la violenza. Quando qualcuno è "male puro", qualsiasi azione contro di lui è giustificata.',
    variants: [
      { name: 'Subumano', desc: 'Paragoni ad animali, parassiti, malattie' },
      { name: 'Minaccia esistenziale', desc: '"Vogliono distruggere tutto ciò che amiamo"' },
      { name: 'Cospirazione', desc: '"Sono ovunque, controllano tutto"' },
      { name: 'Moralmente inferiore', desc: '"Non hanno valori, sono barbari"' }
    ],
    redFlags: ['Paragoni ad animali o malattie', 'Rappresentazione come minaccia esistenziale', 'Negoazione di umanità all\'avversario', 'Linguaggio che implica necessità di "purificazione" o "eliminazione"'],
    caseStudies: [
      { title: 'Radio Rwanda', description: 'Prima del genocidio, i tutsi erano chiamati "inyenzi" (scarafaggi). La demonizzazione preparò la popolazione al massacro.', lesson: 'La demonizzazione è il primo passo verso la violenza di massa.' },
      { title: 'Propaganda nazista', description: 'Gli ebrei rappresentati come ratti che "infestano" la società. La rimozione dell\'umanità permise la "soluzione finale".', lesson: 'Le parole precedono le azioni.' }
    ],
    defense: [
      { step: 'Riconosci la disumanizzazione', action: 'Nota quando l\'avversario perde attributi umani nel discorso' },
      { step: 'Ricorda la storia', action: 'La demonizzazione ha preceduto ogni genocidio' },
      { step: 'Cerca la complessità', action: 'Nessun gruppo è monolitico o assolutamente malvagio' },
      { step: 'Rifiuta il linguaggio', action: 'Non usare né accettare termini che disumanizzano' }
    ],
    scenario: {
      title: 'Discorso pubblico',
      situation: 'Un oratore: "Questi parassiti non si fermeranno finché non avranno distrutto tutto ciò che amiamo. Sono una piaga che va estirpata."',
      question: 'Quale tecnica riconosci?',
      options: [
        { text: 'Demonizzazione: disumanizza il gruppo come parassiti da estirpare', correct: true, explanation: 'Linguaggio che prepara alla violenza rimuovendo l\'umanità.' },
        { text: 'Retorica forte ma legittima', correct: false, explanation: 'Parassiti ed estirpare sono termini di disumanizzazione.' },
        { text: 'Esagerazione retorica innocua', correct: false, explanation: 'La storia mostra che questo linguaggio precede la violenza.' }
      ]
    }
  },

  // === DISINFORMAZIONE ===
  {
    id: 4, icon: '📰', name: 'Firehose of Falsehood', subtitle: 'Diluvio di Menzogne', category: 'disinfo', catLabel: 'Disinformazione',
    summary: 'Inondare lo spazio informativo con un volume tale di messaggi contraddittori da rendere impossibile il fact-checking.',
    definition: 'Modello di propaganda che bombarda il pubblico con molti messaggi falsi e contraddittori — scommettendo che le correzioni non riescano a tenere il passo.',
    historicalContext: 'Teorizzato da RAND Corporation nel 2016 per le operazioni russe durante l\'annessione della Crimea. A differenza della propaganda sovietica, accetta contraddizioni evidenti.',
    psychologicalMechanism: 'Sfrutta l\'"illusione di verità" (ripetere fa sembrare vero) e la "fatigue cognitiva" (troppe informazioni contraddittorie = smetto di verificare).',
    variants: [
      { name: 'Volume alto', desc: 'Più informazioni di quante se ne possano verificare' },
      { name: 'Velocità', desc: 'Pubblicazione rapida prima delle risposte' },
      { name: 'Incoerenza', desc: 'Accetta contraddizioni evidenti' },
      { name: 'Canali multipli', desc: 'Piattaforme diverse contemporaneamente' }
    ],
    redFlags: ['Flusso continuo di notizie che smentiscono narrazioni precedenti', 'Storie che cambiano versione rapidamente', 'Narrative contraddittorie nello stesso spazio'],
    caseStudies: [{ title: 'MH17', description: 'Dopo l\'abbattimento, furono proposte 15 spiegazioni diverse in giorni: missile ucraino, caccia, complotto CIA...', lesson: 'La pluralità di spiegazioni può essere più efficace di una singola bugia.' }],
    defense: [
      { step: 'Rallenta', action: 'Non reagire in tempo reale' },
      { step: 'Triangola', action: 'Cerca conferme da fonti indipendenti' },
      { step: 'Identifica i pattern', action: 'Riconosci narrative multiple e contraddittorie' }
    ],
    scenario: {
      title: 'Crisi internazionale',
      situation: 'In 48 ore: "Non ci sono truppe" (Lun), "Esercitazioni difensive" (Mar mattina), "Il nemico ha provocato" (Mar pomeriggio), "Siamo stati attaccati" (Mar sera).',
      question: 'Quale pattern riconosci?',
      options: [
        { text: 'Firehose: narrative contraddittorie rapidissime', correct: true, explanation: 'Contraddizioni evidenti in 48 ore.' },
        { text: 'Evoluzione normale in crisi', correct: false, explanation: 'Versioni coerenti non cambiano così radicalmente.' },
        { text: 'Tweets manipolati', correct: false, explanation: 'Il pattern è tipico del firehose.' }
      ]
    }
  },
  {
    id: 5, icon: '🔗', name: 'Catena di Sant\'Antonio', subtitle: 'Ingrandimento Virale', category: 'disinfo', catLabel: 'Disinformazione',
    summary: 'Sfruttare la viralità per amplificare informazioni non verificate o false.',
    definition: 'La catena di Sant\'Antonio moderna sfrutta gli algoritmi dei social per amplificare contenuti emotivamente carichi, indipendentemente dalla loro verità.',
    historicalContext: 'Nata come catene di lettere, si è evoluta con i social. Gli algoritmi premiano l\'engagement, non la verità.',
    psychologicalMechanism: 'Sfrutta la prova sociale e l\'emozione: contenuti che generano rabbia o paura vengono condivisi più velocemente.',
    variants: [
      { name: 'Catena emotiva', desc: '"Condividi se hai cuore!"' },
      { name: 'Allarme', desc: '"Avviso urgente per tutti!"' },
      { name: 'Catena della fortuna', desc: '"Condividi o ti capiterà qualcosa di brutto"' },
      { name: 'Petizione virale', desc: 'Petizioni false o manipolate' }
    ],
    redFlags: ['Invito esplicito a condividere', 'Contenuti molto emotivi senza fonti', 'Minacce o promesse legate alla condivisione'],
    caseStudies: [{ title: 'Catene WhatsApp', description: 'In epidemie e elezioni, catene di messaggi non verificati si diffondono esponenzialmente, bypassando i fact-checker.', lesson: 'La velocità di condivisione supera quella di verifica.' }],
    defense: [
      { step: 'Ferma', action: 'Non inoltrare automaticamente' },
      { step: 'Verifica', action: 'Cerca fonti indipendenti' },
      { step: 'Rompi la catena', action: 'Rispondi con fact-check se possibile' }
    ],
    scenario: {
      title: 'Messaggio virale',
      situation: 'Ricevi: "URGENTE! Nuova truffa bancaria! Condividi con tutti i tuoi contatti per proteggerli!" Senza fonti.',
      question: 'Cosa fai?',
      options: [
        { text: 'Verifico prima di condividere', correct: true, explanation: 'L\'urgenza è artificiale, la verifica è sempre possibile.' },
        { text: 'Condivido subito per proteggere', correct: false, explanation: 'Potrebbe essere esso stesso una truffa o disinformazione.' },
        { text: 'Condivido con avviso "non verificato"', correct: false, explanation: 'Anche con avviso, amplifichi contenuti non verificati.' }
      ]
    }
  },

  // === INQUADRATURA ===
  {
    id: 6, icon: '🖼️', name: 'Framing', subtitle: 'Inquadratura Narrativa', category: 'framing', catLabel: 'Inquadratura',
    summary: 'Non sono i fatti a cambiare, ma la cornice attraverso cui vengono presentati.',
    definition: 'Il framing seleziona alcuni aspetti di una realtà e li rende più salienti, promuovendo una particolare definizione del problema, interpretazione causale, valutazione morale.',
    historicalContext: 'Concetto derivato dalla sociologia dei media (Goffman, Entman). Gli stessi fatti possono essere presentati con cornici completamente diverse.',
    psychologicalMechanism: 'Agisce attraverso accessibilità (ciò che viene presentato per primo influenza l\'interpretazione) e applicabilità (la cornice attiva determinati schemi mentali).',
    variants: [
      { name: 'Frame di conflitto', desc: 'Presentare come scontro tra parti' },
      { name: 'Frame economico', desc: 'Valutare in termini di costi/benefici' },
      { name: 'Frame morale', desc: 'Questioni di valori, bene/male' },
      { name: 'Frame di sicurezza', desc: 'Presentare come minaccia' }
    ],
    redFlags: ['Stesso evento con parole molto diverse da fonti diverse', 'Termini sistematicamente carichi emotivamente', 'Focus selettivo su certi aspetti'],
    caseStudies: [{ title: 'Immigrazione', description: 'Testata A: "crisi di sicurezza" (invasione, clandestini). Testata B: "emergenza umanitaria" (rifugiati, speranza).', lesson: 'Non serve mentire: la selezione costruisce realtà diverse.' }],
    defense: [
      { step: 'Identifica la cornice', action: 'Come viene presentato l\'evento?' },
      { step: 'Analizza il linguaggio', action: 'I termini sono neutri o carichi?' },
      { step: 'Cerca cornici alternative', action: 'Come viene presentato altrove?' }
    ],
    scenario: {
      title: 'Protesta di piazza',
      situation: '10.000 persone manifestano, 50 creano scontri. Testata A: "VIOLENZA IN CITTÀ". Testata B: "DIECIMILA IN PIAZZA".',
      question: 'Cosa differenzia i due approcci?',
      options: [
        { text: 'Framing diverso: stessi fatti, cornici opposte', correct: true, explanation: 'Entrambe vere, ma selezionano aspetti diversi.' },
        { text: 'Una mente sui numeri', correct: false, explanation: 'Entrambe potrebbero essere fattualmente corrette.' },
        { text: 'Testata A è obiettiva', correct: false, explanation: 'A nasconde 9.950 persone pacifiche.' }
      ]
    }
  },
  {
    id: 7, icon: '🔄', name: 'Whataboutism', subtitle: 'La Deflessione', category: 'framing', catLabel: 'Inquadratura',
    summary: 'Deflettere ogni critica puntando alle colpe altrui invece di rispondere.',
    definition: 'Variante della fallacia "tu quoque": invece di rispondere a una critica, si accusa il critico dello stesso comportamento.',
    historicalContext: 'Perfezionato dalla propaganda sovietica. Quando l\'Occidente criticava i diritti umani in URSS, la risposta era: "E voi? Avete il razzismo!"',
    psychologicalMechanism: 'Sfrutta il desiderio di coerenza morale: ci sentiamo a disagio a criticare qualcuno se noi stessi non siamo perfetti.',
    variants: [
      { name: 'Whatabout diretto', desc: '"E tu? Fai la stessa cosa!"' },
      { name: 'Whatabout storico', desc: '"E voi nel 1950?"' },
      { name: 'Whatabout sistemico', desc: '"E il capitalismo?"' },
      { name: 'Whatabout selettivo', desc: 'Solo casi che favoriscono la propria narrazione' }
    ],
    redFlags: ['Risposta che non affronta la domanda', '"Sì, ma..." seguito da colpe altrui', 'Confronti per giustificare qualsiasi cosa'],
    caseStudies: [{ title: 'Risposte sovietiche', description: 'Critiche sui dissidenti risposte con: "E i neri in America?" Critiche legittime usate per chiudere il dibattito.', lesson: 'Critiche valide possono essere scudi per evitare altre critiche.' }],
    defense: [
      { step: 'Riconosci', action: '"Hai risposto alla domanda o ne hai fatta un\'altra?"' },
      { step: 'Separa', action: '"Possiamo parlare delle due cose separatamente?"' },
      { step: 'Torna al punto', action: '"Ora: questa decisione è giusta o sbagliata?"' }
    ],
    scenario: {
      title: 'Intervista difficile',
      situation: 'Giornalista: "Il suo partito è stato condannato per finanziamenti illeciti." Politico: "E il partito X? Loro hanno fatto peggio!"',
      question: 'Come rispondere?',
      options: [
        { text: '"Possiamo parlare di tutto, ma ora: della condanna cosa dice?"', correct: true, explanation: 'Non permette che sostituiscano la domanda.' },
        { text: 'Discutere degli altri partiti', correct: false, explanation: 'È ciò che il whataboutism vuole.' },
        { text: '"Tutti sono corrotti"', correct: false, explanation: 'Equivalenza morale è il risultato voluto.' }
      ]
    }
  },
  {
    id: 8, icon: '📺', name: 'Agenda Setting', subtitle: 'Controllo dell\'Invisible', category: 'framing', catLabel: 'Inquadratura',
    summary: 'Non è importante come ne parliamo, ma DI COSA non parliamo.',
    definition: 'Capacità dei media di influenzare non ciò che il pubblico pensa, ma ciò su cui il pubblico pensa.',
    historicalContext: 'Teoria formulata da McCombs e Shaw nel 1972: i media non dicono cosa pensare, ma di cosa pensare.',
    psychologicalMechanism: 'Il cervello valuta la rilevanza in base alla salienza mediatica. Se qualcosa è molto discusso, deve essere importante.',
    variants: [
      { name: 'Amplificazione selettiva', desc: 'Alcuni argomenti ricevono copertura costante, altri nessuna' },
      { name: 'Timing selettivo', desc: 'Notizie scomode in momenti di bassa attenzione' },
      { name: 'Gatekeeping', desc: 'Semplicemente non far passare certi argomenti' },
      { name: 'Agenda competitiva', desc: 'Saturare con argomenti irrilevanti' }
    ],
    redFlags: ['Scandali con copertura sproporzionata', 'Argomenti importanti con zero attenzione', 'Notizie "sepolte" in momenti minori'],
    caseStudies: [{ title: 'Saturazione', description: 'Durante settimane di coverage su scandali, legislazioni importanti passano inosservate.', lesson: 'Ciò che non viene detto è più importante di ciò che viene detto.' }],
    defense: [
      { step: 'Chiedi', action: '"Di cosa NON si parla?"' },
      { step: 'Varia le fonti', action: 'Fonti diverse hanno agende diverse' },
      { step: 'Cerca notizie sepolte', action: 'Leggi anche sezioni minori' }
    ],
    scenario: {
      title: 'Settimana mediatica',
      situation: 'Per una settimana, 15 minuti su 20 dedicati a un VIP accusato di frode. Una riforma elettorale approvata con 30 secondi di notte.',
      question: 'Quale fenomeno osservi?',
      options: [
        { text: 'Agenda setting selettivo: focus su intrattenimento, silenzio su politica', correct: true, explanation: 'La riforma ha impatto su milioni, il VIP su nessuno.' },
        { text: 'È normale, il VIP interessa di più', correct: false, explanation: 'Interessa perché presentato come importante.' },
        { text: 'La riforma era meno importante', correct: false, explanation: 'Le riforme elettorali hanno impatti decennali.' }
      ]
    }
  },
  {
    id: 9, icon: '🪣', name: 'Poisoning the Well', subtitle: 'Avvelenare il Pozzo', category: 'framing', catLabel: 'Inquadratura',
    summary: 'Pre-giudicare una fonte prima che possa parlare, rendendo impossibile accogliere le sue argomentazioni.',
    definition: 'Presentare informazioni negative su una fonte PRIMA che questa possa esprimersi, in modo che qualsiasi cosa dica venga vista attraverso quel filtro negativo.',
    historicalContext: 'Il termine viene dall\'antica pratica di avvelenare letteralmente i pozzi. In retorica, è una forma preventiva di attacco.',
    psychologicalMechanism: 'Il primato dell\'informazione: la prima informazione ricevuta su qualcuno influenza l\'interpretazione di tutto ciò che segue.',
    variants: [
      { name: 'Pre-diffamazione', desc: 'Rivelare "informazioni negative" prima di un discorso' },
      { name: 'Associazione preventiva', desc: '"Sta per parlare, ma ricorda che..."'},
      { name: 'Squalifica anticipata', desc: '"Tutto ciò che dirà è falso perché..."' }
    ],
    redFlags: ['Informazioni negative presentate prima che la fonte parli', 'Avvertimenti su "non fidarti di X" prima di eventi', 'Qualificatori negativi sistematici'],
    caseStudies: [{ title: 'Dibattiti politici', description: 'Prima di un dibattito, vengono diffuse notizie negative su un candidato, in modo che ogni sua parola sia vista con sospetto.', lesson: 'Il danno preventivo è difficile da riparare.' }],
    defense: [
      { step: 'Riconosci il timing', action: 'Le informazioni negative arrivano PRIMA?' },
      { step: 'Ascolta comunque', action: 'Valuta le argomentazioni, non solo la fonte' },
      { step: 'Verifica le accuse', action: 'Le informazioni preventivamente diffuse sono vere?' }
    ],
    scenario: {
      title: 'Pre-evento',
      situation: 'Prima di una conferenza di un esperto, circola: "Attenzione: ha legami con industrie interessate!" Non specifica quali, né se influenzano la sua ricerca.',
      question: 'Cosa riconosci?',
      options: [
        { text: 'Poisoning the well: pre-giudizio per influenzare la ricezione', correct: true, explanation: 'L\'informazione vaga arriva PRIMA per colorire tutto.' },
        { text: 'Informazione utile per i partecipanti', correct: false, explanation: 'Senza specifiche, è pre-giudizio.' },
        { text: 'Trasparenza necessaria', correct: false, explanation: 'Trasparenza specifica legami, non accuse vaghe.' }
      ]
    }
  },
  {
    id: 10, icon: '🎯', name: 'Card Stacking', subtitle: 'Impilare le Carte', category: 'framing', catLabel: 'Inquadratura',
    summary: 'Presentare solo i fatti favorevoli alla propria tesi, nascondendo quelli contrari.',
    definition: 'Costruire un intero messaggio da fatti veri ma scelti selettivamente e presentati in modo unilaterale.',
    historicalContext: 'Termine dell\'Institute for Propaganda Analysis (1937). Differisce dalla menzogna: i fatti sono veri, ma incompleti.',
    psychologicalMechanism: 'Sfrutta il confirmation bias e l\'illusione di completezza: se vediamo molti dati, assumiamo che il quadro sia completo.',
    variants: [
      { name: 'Omissione', desc: 'Semplicemente non menzionare i fatti contrari' },
      { name: 'Enfasi selettiva', desc: 'Dare molto spazio ai fatti favorevoli, poco o nessuno ai contrari' },
      { name: 'Contesto mancante', desc: 'Fatti veri ma senza il contesto che ne cambia il significato' }
    ],
    redFlags: ['Presentazione molto sbilanciata', 'Assenza di dati che potrebbero contraddire', 'Fonti tutte dello stesso orientamento'],
    caseStudies: [{ title: 'Report aziendali', description: 'Report annuali che celebrano successi ma non menzionano fallimenti o rischi.', lesson: 'La completezza richiede anche ciò che non ci piace.' }],
    defense: [
      { step: 'Chiedi', action: '"Quali dati contraddicono questa tesi?"' },
      { step: 'Cerca fonti alternative', action: 'Chi ha interessi diversi cosa dice?' },
      { step: 'Nota cosa manca', action: 'Cosa NON viene detto?' }
    ],
    scenario: {
      title: 'Report vendita',
      situation: 'Un\'azienda: "Abbiamo venduto 1 milione di unità!" Non menziona che erano previste 3 milioni.',
      question: 'Quale tecnica?',
      options: [
        { text: 'Card stacking: dato vero ma contesto nascosto', correct: true, explanation: 'Il milione è vero, ma incompleto senza il confronto con le previsioni.' },
        { text: 'Fake news, il dato è falso', correct: false, explanation: 'Il dato potrebbe essere vero.' },
        { text: 'Comunicazione legittima', correct: false, explanation: 'Omettere il contesto crea impressione fuorviante.' }
      ]
    }
  },
  {
    id: 11, icon: '🏷️', name: 'Etichettamento', subtitle: 'Labeling', category: 'framing', catLabel: 'Inquadratura',
    summary: 'Usare etichette per definire persone, gruppi o idee, semplificando e spesso delegittimando.',
    definition: 'Applicare etichette (positive o negative) che sostituiscono l\'argomentazione e bloccano il pensiero critico.',
    historicalContext: 'Usato sistematicamente in ogni conflitto: "terrorista" vs "combattente per la libertà", "patriota" vs "nazionalista".',
    psychologicalMechanism: 'Le etichette attivano stereotipi e bypassano l\'analisi. Una volta applicata un\'etichetta, non analizziamo i contenuti.',
    variants: [
      { name: 'Etichette demonizzanti', desc: '"Traditore", "nemico", "traditore"' },
      { name: 'Etichette nobilitanti', desc: '"Eroe", "pioniere", "difensore"' },
      { name: 'Etichette riduzioniste', desc: '"Di destra", "di sinistra" per chiudere il dibattito' }
    ],
    redFlags: ['Etichette usate invece di argomenti', 'Etichette che sostituiscono l\'analisi', 'Etichette sistematiche per certi gruppi'],
    caseStudies: [{ title: 'Guerra Fredda', description: '"Comunista" era usato per delegittimare qualsiasi posizione progressista senza discuterne i meriti.', lesson: 'Le etichette chiudono il dibattito.' }],
    defense: [
      { step: 'Riconosci l\'etichetta', action: '"È un\'etichetta o un\'argomentazione?"' },
      { step: 'Chiedi contenuti', action: '"Cosa significa esattamente questa etichetta in questo caso?"' },
      { step: 'Rifiuta la semplificazione', action: 'La realtà è più complessa delle etichette' }
    ],
    scenario: {
      title: 'Dibattito',
      situation: 'Qualcuno propone una riforma fiscale. L\'avversario: "È tipico dei socialisti!" Non discute la proposta.',
      question: 'Cosa succede?',
      options: [
        { text: 'Etichettamento: sostituisce l\'argomentazione con un\'etichetta', correct: true, explanation: 'L\'etichetta chiude il dibattito sulla proposta.' },
        { text: 'Analisi ideologica legittima', correct: false, explanation: 'Non c\'è analisi, solo etichetta.' },
        { text: 'Informazione utile sull\'orientamento', correct: false, explanation: 'Senza argomentazione, è solo chiusura.' }
      ]
    }
  },

  // === MANIPOLAZIONE ===
  {
    id: 12, icon: '🐑', name: 'Bandwagon', subtitle: 'Effetto Gregge', category: 'manipulation', catLabel: 'Manipolazione',
    summary: '"Tutti lo fanno!" — Sfruttare il desiderio di conformismo sociale.',
    definition: 'Tecnica che sfrutta la prova sociale: se "tutti" fanno o pensano qualcosa, dovrebbe essere giusto/vero/desiderabile.',
    historicalContext: 'Uno dei sette trucchi principali identificati dall\'Institute for Propaganda Analysis nel 1937. Usato in pubblicità e politica.',
    psychologicalMechanism: 'Sfrutta il bisogno di appartenenza e la paura di essere esclusi. Tendiamo a conformarci a ciò che percepiamo come norma sociale.',
    variants: [
      { name: 'Bandwagon esplicito', desc: '"Tutti lo fanno!", "Migliaia di persone..."'},
      { name: 'Bandwagon implicito', desc: 'Mostrare folle che acclamano, code ai negozi' },
      { name: 'Falso consenso', desc: 'Gonfiare i numeri del supporto' }
    ],
    redFlags: ['Inviti a unirsi alla maggioranza', 'Numeri di supporto non verificabili', 'Pressione sociale implicita'],
    caseStudies: [{ title: 'Elezione del 1936', description: 'Il "Literary Digest" previde la vittoria di Landon basandosi su milioni di questionari — ma il campione era sbilanciato. Il bandwagon si rivelò sbagliato.', lesson: 'La maggioranza può avere torto.' }],
    defense: [
      { step: 'Verifica i numeri', action: 'Il "tutti" è reale o immaginario?' },
      { step: 'Valuta su merito', action: 'Anche se tutti lo facessero, è giusto?' },
      { step: 'Ricorda la storia', action: 'La maggioranza ha spesso sostenuto cose sbagliate' }
    ],
    scenario: {
      title: 'Campagna pubblicitaria',
      situation: '"Usato da milioni di italiani!" Non specifica quanti milioni, né se funziona.',
      question: 'Quale tecnica?',
      options: [
        { text: 'Bandwagon: prova sociale vaga per indurre conformismo', correct: true, explanation: 'Numeri vaghi per suggerire consenso.' },
        { text: 'Testimonianza legittima', correct: false, explanation: 'Senza dati specifici, è suggestione.' },
        { text: 'Informazione utile', correct: false, explanation: 'Non dice nulla sulla qualità del prodotto.' }
      ]
    }
  },
  {
    id: 13, icon: '✨', name: 'Glittering Generalities', subtitle: 'Parole Scintillanti', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Usare parole con connotazione positiva ma senza significato specifico.',
    definition: 'Parole come "libertà", "democrazia", "progresso", "giustizia" usate senza definirne il contenuto, per associare sentimenti positivi a una causa.',
    historicalContext: 'Identificato dall\'Institute for Propaganda Analysis. Complementare al Name-Calling: parole vuote positive invece di negative.',
    psychologicalMechanism: 'Le parole positive attivano emozioni positive senza attivare il pensiero critico. Chi non è "per la libertà"?',
    variants: [
      { name: 'Valori astratti', desc: '"Libertà", "giustizia", "progresso"' },
      { name: 'Qualificatori vuoti', desc: '"La soluzione giusta", "il vero cambiamento"' },
      { name: 'Aggettivi positivi', desc: '"Coraggioso", "visionario", "autentico"' }
    ],
    redFlags: ['Parole con forte carica emotiva ma senza definizione', 'Tutti possono essere d\'accordo ma significati diversi', 'Affermazioni che suonano bene ma non dicono nulla'],
    caseStudies: [{ title: 'Campagne elettorali', description: '"Per la libertà!", "Per il vero progresso!" Senza definire cosa significano queste parole nel programma.', lesson: 'Tutti amano la libertà, ma la definiscono diversamente.' }],
    defense: [
      { step: 'Chiedi definizioni', action: '"Cosa significa esattamente libertà in questo programma?"' },
      { step: 'Cerca specifiche', action: 'Dietro la parola scintillante, cosa viene proposto concretamente?' },
      { step: 'Nota l\'assenza', action: 'Cosa NON viene detto?' }
    ],
    scenario: {
      title: 'Slogan politico',
      situation: '"Vota per la vera libertà e il vero progresso!" Nessuna spiegazione di cosa significhi "vero" o quali politiche concrete.',
      question: 'Cosa riconosci?',
      options: [
        { text: 'Glittering generalities: parole positive vuote senza contenuto', correct: true, explanation: 'Tutti amano libertà e progresso, ma senza definizioni sono vuote.' },
        { text: 'Slogan efficace e legittimo', correct: false, explanation: 'Senza contenuto, è solo suggestione emotiva.' },
        { text: 'Informazione sui valori', correct: false, explanation: 'Non informa sui contenuti.' }
      ]
    }
  },
  {
    id: 14, icon: '🧬', name: 'Transfer', subtitle: 'Trasferimento di Autorità', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Trasferire l\'autorità o il prestigio di una figura/simbolo a una causa.',
    definition: 'Associare una causa a simboli, persone o istituzioni rispettate (o odiate) per trasferire automaticamente quei sentimenti.',
    historicalContext: 'Usato sistematicamente in pubblicità (celebrity endorsement) e politica (fotografie con bandiere, religiosi, militari).',
    psychologicalMechanism: 'Il cervello trasferisce automaticamente i sentimenti dalla fonte all\'oggetto associato. Se una persona rispettata sostiene X, X acquista rispettabilità.',
    variants: [
      { name: 'Autorità religiosa', desc: 'Associare cause a figure religiose o simboli sacri' },
      { name: 'Autorità scientifica', desc: 'Citare esperti fuori dal loro campo' },
      { name: 'Simboli nazionali', desc: 'Bandiere, inni, monumenti per legittimare cause' },
      { name: 'Autorità morale', desc: 'Citare figure storiche rispettate' }
    ],
    redFlags: ['Associazione con figure autorevoli fuori contesto', 'Uso di simboli sacri o nazionali per cause ordinarie', 'Citazioni di esperti fuori dal loro campo'],
    caseStudies: [{ title: 'Pubblicità scientifica', description: 'Un attore che interpreta un medico in TV raccomanda un farmaco. Il transfer di autorità è fittizio ma efficace.', lesson: 'L\'autorità deve essere rilevante e reale.' }],
    defense: [
      { step: 'Verifica la pertinenza', action: 'L\'autorità ha competenza SU QUESTO argomento?' },
      { step: 'Separa', action: 'La causa ha meriti propri, indipendentemente da chi la sostiene?' },
      { step: 'Riconosci l\'associazione', action: 'Stanno usando un simbolo per legittimare qualcosa di non correlato?' }
    ],
    scenario: {
      title: 'Endorsement',
      situation: 'Un famoso attore supporta una posizione su economia globale. Non ha formazione economica.',
      question: 'Quale tecnica?',
      options: [
        { text: 'Transfer: prestigio dell\'attore trasferito alla posizione economica', correct: true, explanation: 'La fama non è competenza economica.' },
        { text: 'Testimonianza legittima', correct: false, explanation: 'Senza competenza, è solo transfer di prestigio.' },
        { text: 'Ognuno può avere opinioni', correct: false, explanation: 'Vero, ma l\'uso della fama per legittimare è transfer.' }
      ]
    }
  },
  {
    id: 15, icon: '🎤', name: 'Testimonial', subtitle: 'Testimonianza', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Usare testimonianze personali invece di dati o argomentazioni.',
    definition: 'Presentare esperienze individuali come prova generale, o usare testimoni pagati/preparati per rafforzare un messaggio.',
    historicalContext: 'Base della pubblicità moderna. In propaganda, usato per umanizzare cause o delegittimare avversari.',
    psychologicalMechanism: 'Le storie personali sono più persuasive dei dati astratti. Il cervello ricorda meglio le narrazioni che le statistiche.',
    variants: [
      { name: 'Testimonianza emotiva', desc: 'Storie strappalacrime che bypassano i dati' },
      { name: 'Testimonianza di autorità', desc: 'Celebrità o esperti fuori campo' },
      { name: 'Testimonianza orchestrata', desc: 'Testimoni preparati o pagati' }
    ],
    redFlags: ['Storie emozionanti senza dati', 'Un\'esperienza presentata come norma', 'Testimoni con interessi nascosti'],
    caseStudies: [{ title: '"Maria la casalinga"', description: 'Pubblicità con "consumatrici reali" che risultano essere attrici. La testimonianza appare spontanea ma è orchestrata.', lesson: 'Verifica sempre l\'autenticità e gli interessi del testimone.' }],
    defense: [
      { step: 'Cerca i dati', action: 'Cosa dicono le statistiche, non solo le storie?' },
      { step: 'Verifica il testimone', action: 'Ha interessi? È rappresentativo?' },
      { step: 'Ricorda', action: 'L\'aneddoto non è dato, la storia non è statistica' }
    ],
    scenario: {
      title: 'Campagna sanitaria',
      situation: '"Mio cugino ha preso questo farmaco ed è guarito!" Presentato come prova dell\'efficacia, senza studi clinici.',
      question: 'Cosa riconosci?',
      options: [
        { text: 'Testimonial: un\'anecdota presentata come prova generale', correct: true, explanation: 'Un caso non è statistica.' },
        { text: 'Informazione utile', correct: false, explanation: 'Senza contesto statistico, è fuorviante.' },
        { text: 'Testimonianza legittima', correct: false, explanation: 'Legittima come esperienza, non come prova.' }
      ]
    }
  },
  {
    id: 16, icon: '🔁', name: 'Repetition', subtitle: 'Ripetizione', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Ripetere un messaggio finché non viene accettato come vero.',
    definition: 'La ripetizione costante di un\'affermazione la fa sembrare vera, indipendentemente dalla sua veridicità.',
    historicalContext: '"Una menzogna ripetuta mille volte diventa verità" (attribuito a Goebbels). Effetto studiato da psicologia come "illusione di verità".',
    psychologicalMechanism: 'Il cervello usa la facilità di elaborazione come indicatore di verità. Se qualcosa è familiare, sembra vero.',
    variants: [
      { name: 'Ripetizione esplicita', desc: 'Lo stesso slogan ripetuto ossessivamente' },
      { name: 'Ripetizione multi-canale', desc: 'Lo stesso messaggio su più piattaforme' },
      { name: 'Ripetizione con variazioni', desc: 'Lo stesso concetto formulato in modi diversi' }
    ],
    redFlags: ['Lo stesso messaggio ovunque', 'Slogan ripetuti senza argomentazione', 'Affermazioni che diventano "fatti noti" senza prove'],
    caseStudies: [{ title: 'Illusione di verità', description: 'Studi mostrano che affermazioni presentate più volte vengono giudicate più vere, anche se chi le valuta le ha già classificate come false.', lesson: 'La familiarità non è verità.' }],
    defense: [
      { step: 'Riconosci la ripetizione', action: 'Ho sentito questo molte volte?' },
      { step: 'Verifica', action: 'La familiarità non è prova' },
      { step: 'Ricorda', action: 'Una bugia ripetuta resta una bugia' }
    ],
    scenario: {
      title: 'Slogan onnipresente',
      situation: 'Per mesi, ogni canale ripete: "Il problema è X!" Non vengono presentati dati, ma tutti "sanno" che è vero.',
      question: 'Quale effetto?',
      options: [
        { text: 'Illusione di verità per ripetizione', correct: true, explanation: 'La familiarità crea illusione di verità.' },
        { text: 'È diventato vero', correct: false, explanation: 'La ripetizione non crea verità.' },
        { text: 'Informazione diffusa', correct: false, explanation: 'Senza dati, è solo ripetizione.' }
      ]
    }
  },
  {
    id: 17, icon: '📢', name: 'Slogan', subtitle: 'Frasi Brevi', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Frasi brevi e memorabili che sostituiscono il pensiero complesso.',
    definition: 'Formule brevi, facili da ricordare e ripetere, che riassumono (e spesso semplificano eccessivamente) una posizione.',
    historicalContext: '"Make America Great Again", "Hope and Change", "Yes We Can". Gli slogan sono centrali in ogni campagna politica.',
    psychologicalMechanism: 'Il cervello preferisce informazioni facili da elaborare. Gli slogan sono memorizzati automaticamente e recuperati facilmente.',
    variants: [
      { name: 'Slogan identitario', desc: '"[Paese] First!", "Cittadini, non sudditi"' },
      { name: 'Slogan d\'azione', desc: '"Basta [X]!", "Si può fare!"' },
      { name: 'Slogan contrastivo', desc: '"Loro distruggono, noi costruiamo"' }
    ],
    redFlags: ['Frasi molto brevi che riassumono questioni complesse', 'Facili da gridare, impossibili da discutere', 'Sostituiscono argomentazioni'],
    caseStudies: [{ title: 'Slogan in dittatura', description: '"Un popolo, un impero, un leader" — riassume e semplifica una complessa ideologia totalitaria in tre parole.', lesson: 'Gli slogan bypassano il pensiero critico.' }],
    defense: [
      { step: 'Espandi', action: '"Cosa significa concretamente questo slogan?"' },
      { step: 'Cerca il dettaglio', action: 'Dietro la frase semplice, qual è il programma?' },
      { step: 'Nota l\'assenza', action: 'Cosa NON dice lo slogan?' }
    ],
    scenario: {
      title: 'Comizio',
      situation: 'Il candidato grida: "Legge e ordine!" La folla acclama. Non c\'è discussione su quali leggi o quale ordine.',
      question: 'Quale tecnica?',
      options: [
        { text: 'Slogan: formula che sostituisce il dettaglio', correct: true, explanation: 'Tre parole per questioni complesse.' },
        { text: 'Programma politico chiaro', correct: false, explanation: 'Non specifica nulla.' },
        { text: 'Legittima sintesi', correct: false, explanation: 'Sintesi senza contenuti è solo slogan.' }
      ]
    }
  },
  {
    id: 18, icon: '🎭', name: 'Plain Folks', subtitle: 'Gente Comune', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Presentarsi come "uno di voi" per guadagnare fiducia.',
    definition: 'Tecnica in cui chi detiene potere si presenta come persona comune per costruire identificazione e fiducia.',
    historicalContext: 'Identificato dall\'Institute for Propaganda Analysis nel 1937. Usato da leader politici di ogni epoca.',
    psychologicalMechanism: 'Tendiamo a fidarci più di chi percepiamo come simile a noi. Se il leader è "come noi", deve avere i nostri interessi a cuore.',
    variants: [
      { name: 'Messa in scena', desc: 'Politici che "fanno la spesa" solo in campagna elettorale' },
      { name: 'Linguaggio artefatto', desc: 'Uso intenzionale di termini colloquiali da persone istruite' },
      { name: 'Origine umile', desc: 'Enfasi su origini "modeste" anche se ormai lontane' }
    ],
    redFlags: ['Politici che appaiono in contesti "quotidiani" solo durante le campagne', 'Linguaggio studiato per sembrare colloquiale', 'Enfasi su origini umili che non riflettono la realtà attuale'],
    caseStudies: [{ title: 'Joe the Plumber', description: 'Diventò simbolo del cittadino comune. Indagini mostrarono che non era idraulico e la sua domanda era preparata.', lesson: 'Anche persone reali possono essere strumenti orchestrati.' }],
    defense: [
      { step: 'Verifica la coerenza', action: 'La "ordinarietà" è reale o recitata?' },
      { step: 'Guarda i fatti', action: 'Cosa ha fatto, non solo cosa sembra?' },
      { step: 'Cerca la messinscena', action: 'Il contesto "quotidiano" è spontaneo o preparato?' }
    ],
    scenario: {
      title: 'Video virale',
      situation: 'Un video mostra "Maria, 42 anni, casalinga" che si lamenta del governo. Girato professionalmente, senza cognome né città.',
      question: 'Cosa verificare?',
      options: [
        { text: 'Identità, interessi nascosti, natura della produzione', correct: true, explanation: 'Qualità professionale e anonimato suggeriscono orchestrazione.' },
        { text: 'È una cittadina che esprime la sua opinione', correct: false, explanation: 'Potrebbe essere, ma va verificato.' },
        { text: 'Non serve verificare, è una persona normale', correct: false, explanation: 'Il video professionale anonimo richiede cautela.' }
      ]
    }
  },
  {
    id: 19, icon: '🧠', name: 'Appeal to Authority', subtitle: 'Appello all\'Autorità', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Citare autorità come prova, anche quando non rilevanti o competenti sul tema.',
    definition: 'Fallacia che cita un\'autorità come prova definitiva, anche se l\'autorità non ha competenza specifica sul tema.',
    historicalContext: 'Aristotele classificò l\'appello all\'autorità come fallacia quando l\'autorità non è rilevante.',
    psychologicalMechanism: 'Il rispetto per l\'autorità è interiorizzato culturalmente. Quando un\'autorità parla, tendiamo ad accettare senza verificare.',
    variants: [
      { name: 'Autorità fuori campo', desc: 'Un medico che parla di economia' },
      { name: 'Autorità dubbia', desc: 'Citare fonti con interessi' },
      { name: 'Autorità unica', desc: 'Un\'unica voce contro il consenso scientifico' }
    ],
    redFlags: ['Esperti citati fuori dal loro campo', 'Un\'autorità contro il consenso', 'Autorità con conflitti d\'interesse nascosti'],
    caseStudies: [{ title: 'Tabacco e medici', description: 'Per decenni, l\'industria citava medici che minimizzavano i rischi del fumo. Erano pagati.', lesson: 'Verifica competenza, rilevanza e interessi dell\'autorità.' }],
    defense: [
      { step: 'Verifica la competenza', action: 'Ha competenza SU QUESTO tema?' },
      { step: 'Cerca il consenso', action: 'È una voce isolata o il consenso?' },
      { step: 'Verifica gli interessi', action: 'Ha conflitti d\'interesse?' }
    ],
    scenario: {
      title: 'Campagna',
      situation: '"9 scienziati su 10 dicono che X è sicuro!" Non specifica quali scienziati, né se hanno competenza o interessi.',
      question: 'Cosa chiedere?',
      options: [
        { text: 'Competenza, conflitti d\'interesse, rappresentatività del campione', correct: true, explanation: 'Autorità senza contesto non è prova.' },
        { text: 'Se 9 su 10, deve essere vero', correct: false, explanation: 'Dipende da chi sono i 10.' },
        { text: 'Gli scienziati hanno sempre ragione', correct: false, explanation: 'Specialmente fuori dal loro campo.' }
      ]
    }
  },
  {
    id: 20, icon: '⚡', name: 'Polarizzazione', subtitle: 'Noi vs. Loro', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Costruire identità antagoniste che rendono il dialogo impossibile.',
    definition: 'Strategia di dividere la società in due campi mutuamente esclusivi, dove l\'appartenenza al gruppo conta più della verità.',
    historicalContext: 'Usata dai regimi per consolidare il potere. Nell\'era digitale, contenuti polarizzanti ricevono più engagement.',
    psychologicalMechanism: 'Sfrutta il tribalismo: il cervello elabora diversamente le informazioni a seconda che provengano dal "nostro gruppo" o dall\'"avversario".',
    variants: [
      { name: 'Terminologia bellica', desc: '"Battaglia", "fronte" applicati alla politica' },
      { name: 'Delegittimazione totale', desc: '"Non hanno diritto di parola"' },
      { name: 'Apocalittismo', desc: '"Se vincono loro, è la fine"' }
    ],
    redFlags: ['Dibattito spostato dai fatti all\'identità', '"Noi" vs "loro" sistematico', 'Critiche interne = tradimento'],
    caseStudies: [{ title: 'Algoritmo della divisione', description: 'Contenuti che generano indignazione verso l\'out-group ricevono più condivisioni. È un modello di business.', lesson: 'La polarizzazione è anche un modello economico.' }],
    defense: [
      { step: 'Riconosci il tribalismo', action: 'Quando ti senti parte di una "squadra", fermati' },
      { step: 'Cerca la zona grigia', action: 'Quali posizioni intermedie vengono escluse?' },
      { step: 'Critica la tua parte', action: 'È il primo passo fuori dalla polarizzazione' }
    ],
    scenario: {
      title: 'Discorso',
      situation: '"Chi non è con noi è contro di noi! Non c\'è terra di mezzo!"',
      question: 'Quale meccanismo?',
      options: [
        { text: 'Eliminazione del centro: solo alleati o nemici', correct: true, explanation: 'Costruisce identità rigida senza sfumature.' },
        { text: 'Motivazione legittima', correct: false, explanation: 'Non richiede eliminazione delle posizioni intermedie.' },
        { text: 'Retorica normale', correct: false, explanation: 'Normalizzare l\'apocalittismo è parte del problema.' }
      ]
    }
  },
  {
    id: 21, icon: '🔫', name: 'Gish Gallop', subtitle: 'Diluvio di Affermazioni', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Troppe affermazioni velocemente perché si possano verificare tutte.',
    definition: 'Bombardare l\'avversario con tante affermazioni non verificate che confutarle tutte è impossibile.',
    historicalContext: 'Prende il nome dal creazionista Duane Gish, che lanciava decine di argomenti in pochi minuti.',
    psychologicalMechanism: 'Sfrutta l\'asimmetria: fare un\'affermazione richiede secondi, confutarla minuti o ore.',
    variants: [
      { name: 'Video-maratona', desc: 'Ore di contenuti con centinaia di affermazioni' },
      { name: 'Thread infinito', desc: 'Decine di punti non verificati' },
      { name: 'Documento-ladro', desc: 'Link a PDF enormi: "È tutto lì!"' }
    ],
    redFlags: ['Ogni punto trattato in 10-30 secondi', 'Assenza di fonti per ogni affermazione', 'Struttura a mitragliatrice'],
    caseStudies: [{ title: 'Dibattiti creazionisti', description: 'Gish lanciava dozzine di argomenti in 5 minuti. Per confutarne uno servono 10 minuti. Il pubblico vedeva "non confutato".', lesson: 'La quantità di argomenti impressiona i non esperti.' }],
    defense: [
      { step: 'Non seguire il ritmo', action: 'Scegli i punti più importanti' },
      { step: 'Evidenzia la tecnica', action: '"Stai facendo 50 affermazioni in 5 minuti"' },
      { step: 'Verifica un campione', action: 'Se alcuni sono falsi, probabilmente tutti' }
    ],
    scenario: {
      title: 'Video',
      situation: 'Un video di 45 minuti elenca 80 presunti scandali, uno dopo l\'altro, senza fonti.',
      question: 'Come approcci?',
      options: [
        { text: 'Verificare 2-3 punti a caso', correct: true, explanation: 'Se falsi, probabilmente tutto il contenuto è inaffidabile.' },
        { text: 'Guardare tutto', correct: false, explanation: '45 minuti di affermazioni non verificate non valgono di più di 1 minuto.' },
        { text: 'Con così tanti, qualcosa di vero c\'è', correct: false, explanation: 'È l\'errore che la tecnica vuole indurre.' }
      ]
    }
  },
  {
    id: 22, icon: '💣', name: 'Straw Man', subtitle: 'Spaventapasseri', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Distorcere l\'argomento dell\'avversario per poterlo attaccare più facilmente.',
    definition: 'Costruire una versione debole o distorta dell\'argomento altrui, attaccare quella, e fingere di aver confutato l\'originale.',
    historicalContext: 'Il nome viene dalla facilità di abbattere uno spaventapasseri. È una delle fallacie più comuni.',
    psychologicalMechanism: 'Il pubblico percepisce che l\'argomento è stato "confutato", senza notare che l\'argomento attaccato non era quello originale.',
    variants: [
      { name: 'Eccessiva semplificazione', desc: 'Ridurre una posizione complessa a una frase banale' },
      { name: 'Estremizzazione', desc: 'Presentare la posizione moderata come estrema' },
      { name: 'Invenzione', desc: 'Attribuire all\'avversario posizioni che non ha mai sostenuto' }
    ],
    redFlags: ['La posizione dell\'avversario viene presentata in modo ridicolo o estremo', 'L\'attacco è facile ma non rispecchia ciò che è stato detto', 'L\'avversario dice "Ma non ho mai detto questo!"'],
    caseStudies: [{ title: 'Dibattiti politici', description: 'Il candidato A propone piccole riforme fiscali. Il candidato B: "Vuole distruggere l\'economia!" Attacca una posizione che A non ha mai sostenuto.', lesson: 'Verifica sempre: l\'argomento attaccato è quello che è stato sostenuto?' }],
    defense: [
      { step: 'Riconosci la distorsione', action: '"È questo ciò che ho sostenuto?"' },
      { step: 'Correggi', action: '"Non ho mai detto questo. La mia posizione è..."' },
      { step: 'Rifiuta il falso dibattito', action: 'Non difendere una posizione che non è la tua' }
    ],
    scenario: {
      title: 'Dibattito',
      situation: 'Tu: "Dovremmo ridurre un po\' le tasse." Avversario: "Vuoi eliminare tutti i servizi pubblici!"',
      question: 'Quale tecnica?',
      options: [
        { text: 'Straw man: distorce la proposta moderata in estrema', correct: true, explanation: 'Attacca una posizione che non è stata sostenuta.' },
        { text: 'Critica legittima', correct: false, explanation: 'Non critica la proposta reale.' },
        { text: 'Conseguenza logica', correct: false, explanation: 'Non è conseguenza, è distorsione.' }
      ]
    }
  },
  {
    id: 23, icon: '🐟', name: 'Red Herring', subtitle: 'Aringa Affumicata', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Distrarre con un argomento irrilevante.',
    definition: 'Introdurre un\'informazione irrilevante per distrarre dal tema principale.',
    historicalContext: 'Il nome viene dall\'uso di aringhe affumicate per confondere i cani durante la caccia, distogliendoli dalla traccia.',
    psychologicalMechanism: 'Il cervello segue l\'informazione saliente. Introducendo un argomento emozionante, si distrae dal tema principale.',
    variants: [
      { name: 'Distrazione emotiva', desc: 'Spostare su un tema che genera forte reazione' },
      { name: 'What about', desc: '"E quest\'altro problema?"' },
      { name: 'Nuovo tema', desc: 'Cambiare completamente argomento' }
    ],
    redFlags: ['L\'argomento cambia improvvisamente', 'Viene introdotto un tema non correlato', 'La risposta non c\'entra con la domanda'],
    caseStudies: [{ title: 'Interviste', description: 'Giornalista: "Di questi scandali cosa dice?" Politico: "Ma guardi quanto è bella la nostra riforma dell\'istruzione!"', lesson: 'Il cambio di argomento non risponde alla domanda.' }],
    defense: [
      { step: 'Riconosci la deviazione', action: '"Questo non risponde alla domanda"' },
      { step: 'Torna al punto', action: 'Ripeti la domanda originale' },
      { step: 'Non seguire', action: 'Non farti trascinare sul nuovo argomento' }
    ],
    scenario: {
      title: 'Intervista',
      situation: 'Giornalista: "Le indagini sulla corruzione?" Politico: "Dovremmo parlare della nostra economia che va benissimo!"',
      question: 'Quale tecnica?',
      options: [
        { text: 'Red herring: distrazione con tema irrilevante', correct: true, explanation: 'L\'economia non risponde sulla corruzione.' },
        { text: 'Focus su positività', correct: false, explanation: 'Non risponde alla domanda.' },
        { text: 'Informazione utile', correct: false, explanation: 'Non è correlato alla domanda.' }
      ]
    }
  },
  {
    id: 24, icon: '🪞', name: 'Projection', subtitle: 'Proiezione', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Accusare gli altri di ciò che tu stai facendo.',
    definition: 'Tecnica in cui si attribuisce ai propri avversari esattamente ciò che si sta facendo, neutralizzando le accuse.',
    historicalContext: 'Usata sistematicamente da dittature e regimi: accusano l\'opposizione di essere "golpisti" mentre preparano un golpe.',
    psychologicalMechanism: 'Confonde il pubblico ("chi ha ragione?") e precostruisce la difesa ("loro dicono lo stesso"). Rende le accuse reciproche.',
    variants: [
      { name: 'Accusa speculare', desc: '"Sei tu quello che fa X!" mentre lo fai' },
      { name: 'Pre-accusa', desc: 'Accusare prima di essere accusati' },
      { name: 'Inversione', desc: 'Presentare la vittima come aggressore' }
    ],
    redFlags: ['Accuse che sembrano perfettamente speculari', 'Chi accusa ha gli stessi comportamenti', 'Timing sospetto delle accuse'],
    caseStudies: [{ title: 'Regimi autoritari', description: 'Regimi che preparano brogli elettorali accusano l\'opposizione di "preparare brogli", delegittimando in anticipo le accuse che verranno.', lesson: 'Le accuse speculari vanno verificate su entrambi i lati.' }],
    defense: [
      { step: 'Verifica entrambe le parti', action: 'Non assumere che "la verità sta nel mezzo"' },
      { step: 'Cerca le prove', action: 'Chi ha prove, chi ha solo accuse?' },
      { step: 'Nota il timing', action: 'Le accuse arrivano prima o dopo?' }
    ],
    scenario: {
      title: 'Dibattito',
      situation: 'Un partito accusa l\'altro di "censurare il dibattito". Contemporaneamente, espelle i dissidenti interni.',
      question: 'Quale tecnica?',
      options: [
        { text: 'Projection: accusa altri di ciò che fai', correct: true, explanation: 'Accusa di censura mentre censura.' },
        { text: 'Legittima critica', correct: false, explanation: 'Non quando chi accusa fa lo stesso.' },
        { text: 'Entrambi hanno torto', correct: false, explanation: 'La proiezione è una tecnica deliberata.' }
      ]
    }
  },
  {
    id: 25, icon: '🐕', name: 'Dog Whistle', subtitle: 'Fischio per Cani', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Messaggi codificati che solo certi gruppi capiscono.',
    definition: 'Comunicazioni che hanno un significato innocuo per il pubblico generale ma un messaggio specifico per un gruppo target.',
    historicalContext: 'Il termine viene dai fischi per cani, udibili solo dai cani. Usato sistematicamente in politica per segnali a basi estremiste.',
    psychologicalMechanism: 'Permette di comunicare messaggi controversi mantenendo la plausibile negabilità ("non intendevo quello").',
    variants: [
      { name: 'Codici storici', desc: 'Riferimenti che solo certi gruppi riconoscono' },
      { name: 'Termini carichi', desc: 'Parole con doppio significato' },
      { name: 'Simbolismo', desc: 'Gesti, numeri, immagini con significato specifico' }
    ],
    redFlags: ['Messaggi che sembrano innocui ma generano reazioni forti in alcuni', 'Termini con "significati segreti"', 'Plausibile negabilità sistematica'],
    caseStudies: [{ title: 'Campagne elettorali', description: 'Un candidato usa termini che sembrano innocui ma sono riconosciuti da gruppi estremisti come segnali di supporto. Se criticato: "Non intendevo quello!"', lesson: 'Il contesto e la reazione del pubblico target rivelano il significato.' }],
    defense: [
      { step: 'Ascolta le reazioni', action: 'Come reagiscono i gruppi estremi?' },
      { step: 'Cerca il contesto', action: 'Il termine ha un doppio significato?' },
      { step: 'Verifica la negabilità', action: 'La negazione è plausibile?' }
    ],
    scenario: {
      title: 'Discorso',
      situation: 'Un candidato usa termini che sembrano normali ma sono riconosciuti da gruppi estremisti come segnali. Quando criticato: "Ma se ho detto una frase normale!"',
      question: 'Quale tecnica?',
      options: [
        { text: 'Dog whistle: messaggio codificato con negabilità', correct: true, explanation: 'Doppio livello di significato.' },
        { text: 'Frase innocente fraintesa', correct: false, explanation: 'La reazione del gruppo target rivela il vero significato.' },
        { text: 'Accusa ingiustificata', correct: false, explanation: 'La reazione coordinata di certi gruppi indica comprensione del codice.' }
      ]
    }
  },
  {
    id: 26, icon: '🕯️', name: 'Gaslighting', subtitle: 'Negare la Realtà', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Far dubitare le vittime della propria percezione della realtà.',
    definition: 'Tecnica di manipolazione che nega fatti evidenti, minimizza reazioni, e fa dubitare le vittime del proprio giudizio.',
    historicalContext: 'Il termine viene dal film "Gaslight" (1944), dove un marito manipola la moglie facendole credere di essere pazza.',
    psychologicalMechanism: 'Sfrutta la dipendenza dalla conferma esterna. Se costantemente negato, si inizia a dubitare di sé.',
    variants: [
      { name: 'Negazione', desc: '"Non è mai successo!"' },
      { name: 'Minimizzazione', desc: '"Stai esagerando!"' },
      { name: 'Inversione', desc: '"Sei tu quello che ha problemi!"' },
      { name: 'Memoria selettiva', desc: '"Non ricordo di aver detto questo"' }
    ],
    redFlags: ['Negazione costante di fatti evidenti', 'Frasi come "sei troppo sensibile", "ti sei immaginato tutto"', 'La vittima inizia a dubitare della propria memoria'],
    caseStudies: [{ title: 'Relazioni abusive', description: 'Il partner abusivo nega episodi di violenza, minimizza le reazioni della vittima, la fa sentire "pazza".', lesson: 'La negazione sistematica della realtà è una forma di violenza.' }],
    defense: [
      { step: 'Documenta', action: 'Registra fatti e conversazioni' },
      { step: 'Verifica con altri', action: 'Chiedi conferme a terze parti' },
      { step: 'Riconosci il pattern', action: 'La negazione sistematica è una tecnica, non un malinteso' }
    ],
    scenario: {
      title: 'Conversazione',
      situation: 'Tu: "Ieri hai detto X." Loro: "Non l\'ho mai detto! Ti sei immaginato tutto. Sei paranoico." Era successo davvero.',
      question: 'Quale tecnica?',
      options: [
        { text: 'Gaslighting: nega fatti per far dubitare', correct: true, explanation: 'Negazione sistematica della realtà.' },
        { text: 'Malinteso', correct: false, explanation: 'Se sistematico, è tecnica.' },
        { text: 'Differenza di percezione', correct: false, explanation: 'La negazione totale è gaslighting.' }
      ]
    }
  },
  {
    id: 27, icon: '🍒', name: 'Cherry-Picking', subtitle: 'Selezione di Dati', category: 'manipulation', catLabel: 'Manipolazione',
    summary: 'Selezionare solo i dati favorevoli ignorando tutto il resto.',
    definition: 'Selezionare evidenze che confermano una posizione ignorando quelle che la smentiscono.',
    historicalContext: 'Il termine viene dall\'idea di raccogliere solo le ciliegie migliori. Usato per ritardare riconoscimenti di rischi (tabacco, clima).',
    psychologicalMechanism: 'Sfrutta il confirmation bias: valutiamo come più credibili le informazioni che confermano le nostre convinzioni.',
    variants: [
      { name: 'Serie temporali troncate', desc: 'Mostrare solo un periodo favorevole' },
      { name: 'Outliers come norma', desc: 'Caso eccezionale come rappresentativo' },
      { name: 'Citazioni fuori contesto', desc: 'Frase che cambia significato nel contesto' }
    ],
    redFlags: ['Grafici senza asse temporale completo', 'Una statistica citata senza contesto', 'Assenza di dati che dissentono'],
    caseStudies: [{ title: 'Tabacco', description: 'L\'industria citava studi che mostravano incertezza, ignorando il consenso crescente.', lesson: 'Il cherry-picking può creare illusione di dibattito.' }],
    defense: [
      { step: 'Chiedi il dataset completo', action: 'Qual è la serie storica completa?' },
      { step: 'Cerca la fonte primaria', action: 'Trova lo studio originale' },
      { step: 'Identifica cosa manca', action: 'Quali dati NON vengono mostrati?' }
    ],
    scenario: {
      title: 'Comunicato',
      situation: '"Record storico! +150.000 posti di lavoro!" Non menziona che 200.000 persone hanno perso il lavoro nello stesso periodo.',
      question: 'Quale tecnica?',
      options: [
        { text: 'Cherry-picking: indicatore favorevole senza contesto', correct: true, explanation: 'Il dato è vero ma incompleto.' },
        { text: 'Fake news', correct: false, explanation: 'Il dato potrebbe essere vero.' },
        { text: 'Comunicazione corretta', correct: false, explanation: 'Omettere il negativo crea impressione fuorviante.' }
      ]
    }
  },

  // === OPERAZIONI DIGITALI ===
  {
    id: 28, icon: '🌊', name: 'Astroturfing', subtitle: 'Falso Movimento', category: 'digital', catLabel: 'Digitale',
    summary: 'Simulare un movimento dal basso coordinato dall\'alto.',
    definition: 'Creare movimenti, campagne o opinioni che appaiono spontanei ma sono orchestrati.',
    historicalContext: 'Termine degli anni \'80 quando aziende crearono gruppi di "cittadini preoccupati" contro normative ambientali.',
    psychologicalMechanism: 'Sfrutta la prova sociale: tendiamo a conformarci a ciò che percepiamo come opinione della maggioranza.',
    variants: [
      { name: 'Bot networks', desc: 'Account automatizzati coordinati' },
      { name: 'Troll farms', desc: 'Centri con persone che gestiscono dozzine di account' },
      { name: 'Review bombing', desc: 'Ondata di recensioni false' }
    ],
    redFlags: ['Account appena creati con alta attività improvvisa', 'Linguaggio quasi identico tra profili diversi', 'Timing coordinato'],
    caseStudies: [{ title: 'IRA', description: 'L\'Internet Research Agency gestiva centinaia di account che si spacciavano per attivisti americani, amplificando le divisioni.', lesson: 'L\'astroturfing può puntare solo a minare la fiducia.' }],
    defense: [
      { step: 'Ispeziona i profili', action: 'Data creazione, numero post, coerenza' },
      { step: 'Cerca pattern', action: 'Linguaggio simile, timing coordinato' },
      { step: 'Valuta qualità non quantità', action: 'Non farti impressionare dai numeri' }
    ],
    scenario: {
      title: 'Commenti coordinati',
      situation: 'Sotto un post critico, 100 profili con frasi identiche. Molti hanno 3-10 post totali, creati nello stesso mese.',
      question: 'Cosa indica?',
      options: [
        { text: 'Probabile astroturfing: profili nuovi, messaggi identici', correct: true, explanation: 'Tutti i segnali classici sono presenti.' },
        { text: 'Cittadini preoccupati', correct: false, explanation: 'Cittadini reali non sono così coordinati.' },
        { text: 'Il contenuto è condivisibile', correct: false, explanation: 'Non possiamo giudicare dal comportamento coordinato.' }
      ]
    }
  },
  {
    id: 29, icon: '🚩', name: 'False Flag', subtitle: 'Operazioni Sotto Copertura', category: 'digital', catLabel: 'Digitale',
    summary: 'Azioni presentate come provenienti da un\'altra parte.',
    definition: 'Operazioni condotte in modo da apparire eseguite da un altro attore.',
    historicalContext: 'Termine navale: navigare sotto falsa bandiera. Esempi storici: Reichstag, Gleiwitz.',
    psychologicalMechanism: 'Sfrutta la necessità di rispondere alle minacce: se percepiamo un attacco da X, sosteniamo azioni contro X.',
    variants: [
      { name: 'Siti clone', desc: 'Repliche di siti con contenuti falsi' },
      { name: 'Account infiltrati', desc: 'Profili che fingono appartenenza' },
      { name: 'Provocazioni', desc: 'Proteste orchestrate per delegittimare' }
    ],
    redFlags: ['Evento che giustifica azioni già pianificate', 'Attribuzione immediata senza indagini', 'Documento "troppo perfetto"'],
    caseStudies: [{ title: 'Northwoods', description: 'Nel 1962, i capi militari USA proposero operazioni false flag contro civili americani da attribuire a Cuba. Rifiutato da Kennedy.', lesson: 'Le false flag sono piani storici documentati.' }],
    defense: [
      { step: 'Verifica il dominio', action: 'Il sito è quello ufficiale?' },
      { step: 'Aspetta le indagini', action: 'Non accettare attribuzioni immediate' },
      { step: 'Analizza i beneficiari', action: 'Chi ci guadagna? È "troppo conveniente"?' }
    ],
    scenario: {
      title: 'Documento leaked',
      situation: 'Un PDF circola: memorandum interno con strategie ciniche. Account anonimo, senza intestazioni verificabili, una settimana prima delle elezioni.',
      question: 'Come valuti?',
      options: [
        { text: 'Sospetto: anonimato, timing, nessuna verifica possibile', correct: true, explanation: 'La combinazione suggerisce possibile fabbricazione.' },
        { text: 'Se online, è stato verificato', correct: false, explanation: 'La pubblicazione non richiede verifica.' },
        { text: 'Coerente con ciò che penso, quindi credibile', correct: false, explanation: 'Il confirmation bias è sfruttato dai falsari.' }
      ]
    }
  },
  {
    id: 30, icon: '🎬', name: 'Deepfake', subtitle: 'Manipolazione Video', category: 'digital', catLabel: 'Digitale',
    summary: 'Creare contenuti artificiali indistinguibili dalla realtà.',
    definition: 'Contenuti prodotti con AI che sostituiscono volto, voce o movimenti.',
    historicalContext: 'Tecnologia accessibile dal 2017. Inizialmente per contenuti pornografici, poi politica.',
    psychologicalMechanism: '"Vedere è credere": le immagini hanno autorità percettiva superiore al testo.',
    variants: [
      { name: 'Face swap', desc: 'Sostituzione del volto' },
      { name: 'Lip sync', desc: 'Sincronizzazione labiale' },
      { name: 'Voice cloning', desc: 'Replica della voce' }
    ],
    redFlags: ['Movimenti facciali innaturali', 'Sincronizzazione imperfetta', 'Artifici grafici'],
    caseStudies: [{ title: 'Zelensky', description: 'Un video deepfake mostrava Zelensky che ordinava la resa. Qualità imperfetta ma ha richiesto smentita ufficiale.', lesson: 'I deepfake politici sono realtà, non futuribili.' }],
    defense: [
      { step: 'Cerca la fonte', action: 'Da dove proviene?' },
      { step: 'Analizza i dettagli', action: 'Occhi, mani, bordi sono difettosi?' },
      { step: 'Aspetta verifiche', action: 'Per video sensazionali, aspetta conferme' }
    ],
    scenario: {
      title: 'Video sensazionale',
      situation: 'Un video mostra un leader che insulta gli elettori. Fonte: account anonimo. Qualità buona ma non perfetta.',
      question: 'Come approcci?',
      options: [
        { text: 'Sospetto: fonte anonima, nessuna verifica', correct: true, explanation: 'La combinazione richiede cautela.' },
        { text: 'Se sembra realistico, è vero', correct: false, explanation: 'I deepfake sono progettati per sembrare reali.' },
        { text: 'Condivido con disclaimer', correct: false, explanation: 'Anche con disclaimer, amplifichi.' }
      ]
    }
  },
  {
    id: 31, icon: '🌐', name: 'Operazioni Influenza', subtitle: 'Guerra dell\'Informazione', category: 'digital', catLabel: 'Digitale',
    summary: 'Campagne coordinate per influenzare opinioni ed elezioni.',
    definition: 'Campagne coordinate da stati o attori per modellare opinione pubblica ed esiti elettorali.',
    historicalContext: 'Interferenze esistono dalla Guerra Fredda. La novità digitale è la scala e l\'azione diretta sui cittadini.',
    psychologicalMechanism: 'Amplificano divisioni preesistenti invece di crearne di nuove.',
    variants: [
      { name: 'Amplificazione divisioni', desc: 'Promuovere contenuti polarizzanti' },
      { name: 'Soppressione del voto', desc: 'Demotivare segmenti dall\'andare a votare' },
      { name: 'Hack and leak', desc: 'Rubare e pubblicare selettivamente' }
    ],
    redFlags: ['Siti che imitano media esistenti', 'Narrative identiche in più lingue simultaneamente', 'Fonti con grandi risorse e zero trasparenza'],
    caseStudies: [{ title: 'Reti clone', description: 'Operazioni hanno creato decine di siti che imitavano media europei con articoli falsi.', lesson: 'Controlla sempre il dominio esatto.' }],
    defense: [
      { step: 'Verifica il dominio', action: 'È il sito ufficiale?' },
      { step: 'Analizza la cronologia', action: 'Il sito esiste da molto?' },
      { step: 'Sospetta delle perfezioni', action: 'Contenuti perfettamente allineati alle tue opinioni meritano scetticismo extra' }
    ],
    scenario: {
      title: 'Sito sospetto',
      situation: '"IlGiornale-News.com" pubblica un\'inchiesta esplosiva. Dominio registrato due mesi fa, pagina "chi siamo" senza nomi reali.',
      question: 'Cosa verificare?',
      options: [
        { text: 'Dominio, proprietà, storico, conferme indipendenti', correct: true, explanation: 'Dominio recente, anonimato e contenuto sensazionale sono allarmi.' },
        { text: 'Il contenuto sembra ben documentato', correct: false, explanation: 'Anche contenuti ben scritti possono essere falsi.' },
        { text: 'Le condivisioni provano interesse', correct: false, explanation: 'Condivisioni non provano verità.' }
      ]
    }
  },
  {
    id: 32, icon: '📱', name: 'Flooding', subtitle: 'Inondazione Digitale', category: 'digital', catLabel: 'Digitale',
    summary: 'Soffocare il dibattito con rumore e tossicità.',
    definition: 'Inondare commenti, post e discussioni con contenuti che soffocano il dibattito.',
    historicalContext: 'Tecnica centrale delle "troll farms" moderne.',
    psychologicalMechanism: 'Il rumore affatica chi cerca informazioni serie, che alla fine si disimpegna.',
    variants: [
      { name: 'Spam', desc: 'Migliaia di messaggi identici' },
      { name: 'Trolling coordinato', desc: 'Insulti e derisione sistematica' },
      { name: 'Hashtag hijacking', desc: 'Dirottare conversazioni con hashtag' }
    ],
    redFlags: ['Volume sproporzionato di commenti negativi', 'Account che compaiono solo su certi argomenti', 'Timing coordinato'],
    caseStudies: [{ title: 'Commenti organizzati', description: 'In certi paesi, eserciti di commentatori attaccano sistematicamente le voci critiche.', lesson: 'Il volume non riflette il consenso.' }],
    defense: [
      { step: 'Non reagire', action: 'Non alimentare il flooding' },
      { step: 'Usa strumenti', action: 'Filtri, blocchi, segnalazioni' },
      { step: 'Cerca fonti pulite', action: 'Piattaforme o thread moderati' }
    ],
    scenario: {
      title: 'Discussione invasa',
      situation: 'Una discussione seria viene inondata da 500 commenti insultanti in poche ore. Account nuovi, messaggi simili.',
      question: 'Quale tecnica?',
      options: [
        { text: 'Flooding coordinato: soffoca il dibattito', correct: true, explanation: 'Volume e coordinazione indicano operazione.' },
        { text: 'Reazione spontanea', correct: false, explanation: 'Spontaneità non è così coordinata.' },
        { text: 'La maggioranza è contro', correct: false, explanation: 'Il volume non è consenso.' }
      ]
    }
  },

  // === APPELLI EMOTIVI ===
  {
    id: 33, icon: '😨', name: 'Fear Appeal', subtitle: 'Appello alla Paura', category: 'emotional', catLabel: 'Emotivo',
    summary: 'Mobilitare attraverso la paura invece che l\'argomentazione.',
    definition: 'Tecnica che usa la paura per indurre azioni senza pensiero critico.',
    historicalContext: 'Base della pubblicità ("compra questo o ti succede qualcosa") e della politica ("se non X, disastro").',
    psychologicalMechanism: 'La paura attiva il sistema nervoso simpatico, bypassando il pensiero riflessivo.',
    variants: [
      { name: 'Paura esistenziale', desc: '"Se non X, è la fine"' },
      { name: 'Paura personale', desc: '"Tu o i tuoi cari..."'},
      { name: 'Apocalittismo', desc: 'Ogni alternativa è catastrofe' }
    ],
    redFlags: ['Messaggi che generano forte ansia', 'Urgenza estrema', 'Nessuna analisi di alternative'],
    caseStudies: [{ title: 'Pubblicità della paura', description: 'Campagne che mostrano conseguenze terribili se non compri/il prodotto/servizio.', lesson: 'La paura vende, ma non informa.' }],
    defense: [
      { step: 'Riconosci l\'emozione', action: 'Mi sento ansioso? È intenzionale.' },
      { step: 'Rallenta', action: 'Le decisioni basate sulla paura sono spesso sbagliate' },
      { step: 'Cerca alternative', action: 'La realtà è più sfumata dell\'apocalisse' }
    ],
    scenario: {
      title: 'Messaggio',
      situation: '"CONDIVIDI ORA o tua figlia potrebbe essere in pericolo! Hai solo poche ore!"',
      question: 'Quale tecnica?',
      options: [
        { text: 'Fear appeal + urgenza: paura per bypassare pensiero critico', correct: true, explanation: 'Paura e urgenza artificiali.' },
        { text: 'Avviso legittimo', correct: false, explanation: 'Senza fonti, è solo manipolazione.' },
        { text: 'Meglio condividere, non si sa mai', correct: false, explanation: 'È esattamente ciò che la tecnica vuole.' }
      ]
    }
  },
  {
    id: 34, icon: '🏳️', name: 'Flag-Waving', subtitle: 'Appello al Nazionalismo', category: 'emotional', catLabel: 'Emotivo',
    summary: 'Sfruttare il patriottismo per legittimare cause.',
    definition: 'Associare una causa alla bandiera, alla nazione, ai simboli patri per renderla indiscutibile.',
    historicalContext: 'Tecnica classica: chi si oppone "non ama il proprio paese".',
    psychologicalMechanism: 'L\'identità nazionale è profonda. Attaccarla o opporsi a qualcosa avvolto nella bandiera sembra quasi un tradimento.',
    variants: [
      { name: 'Simboli nazionali', desc: 'Bandiere, inno, colori nazionali' },
      { name: 'Patriottismo vs tradimento', desc: 'Chi non è d\'accordo è "antipatriota"' },
      { name: 'Storia e gloria', desc: 'Invocare la grandezza nazionale' }
    ],
    redFlags: ['Argomentazioni avvolte nella bandiera', 'Critiche = antipatriottismo', 'Uso eccessivo di simboli nazionali'],
    caseStudies: [{ title: 'Guerra in Iraq', description: 'Critiche alla guerra presentate come "non sostenere le truppe" o "non amare l\'America".', lesson: 'Si può amare il paese e criticarne le azioni.' }],
    defense: [
      { step: 'Separa', action: 'La causa e il paese sono cose diverse' },
      { step: 'Riconosci la tecnica', action: 'È un\'argomentazione o un appello emotivo?' },
      { step: 'Ricorda', action: 'Critica ≠ tradimento' }
    ],
    scenario: {
      title: 'Dibattito',
      situation: 'Qualcuno critica una politica governativa. L\'avversario: "Se non ti piace questo paese, vattene!"',
      question: 'Quale tecnica?',
      options: [
        { text: 'Flag-waving: patriottismo per chiudere il dibattito', correct: true, explanation: 'Critica non è antipatriottismo.' },
        { text: 'Legittima difesa nazionale', correct: false, explanation: 'La critica è parte della democrazia.' },
        { text: 'Argomento valido', correct: false, explanation: 'È solo un\'appello emotivo.' }
      ]
    }
  },
  {
    id: 35, icon: '👥', name: 'Beautiful People', subtitle: 'Persone di Successo', category: 'emotional', catLabel: 'Emotivo',
    summary: 'Associare bellezza e successo a una causa.',
    definition: 'Mostrare persone attraenti, felici, di successo associate a un prodotto, candidato o idea.',
    historicalContext: 'Base della pubblicità moderna. Esteso alla politica.',
    psychologicalMechanism: 'Il trasferimento emotivo: se quelle persone sono felici e sostengono X, sostenere X renderà felice anche me.',
    variants: [
      { name: 'Bellezza', desc: 'Persone attraenti associate alla causa' },
      { name: 'Successo', desc: 'Persone ricche/famose che sostengono' },
      { name: 'Felicità', desc: 'Persone felici che usano/votano' }
    ],
    redFlags: ['Immagini di persone attraenti senza collegamento con la qualità', 'Associare felicità a prodotti/politiche', 'Celebrity che sostengono senza competenza'],
    caseStudies: [{ title: 'Pubblicità politica', description: 'Candidati circondati da persone giovani, belle e felici nei loro spot.', lesson: 'L\'immagine non dice nulla sulle proposte.' }],
    defense: [
      { step: 'Separa immagine e contenuto', action: 'Cosa viene proposto, non chi lo propone' },
      { step: 'Chiediti', action: 'La bellezza della persona è rilevante?' },
      { step: 'Cerca i contenuti', action: 'Dietro l\'immagine, quali sono le proposte?' }
    ],
    scenario: {
      title: 'Campagna',
      situation: 'Uno spot mostra persone bellissime e felici che ballano con il logo del partito. Nessuna politica discussa.',
      question: 'Quale tecnica?',
      options: [
        { text: 'Beautiful people: associa emozioni positive senza contenuti', correct: true, explanation: 'Bellezza e felicità non dicono nulla sulle proposte.' },
        { text: 'Campagna positiva', correct: false, explanation: 'Senza contenuti, è solo suggestione.' },
        { text: 'Marketing legittimo', correct: false, explanation: 'Marketing senza contenuto è manipolazione.' }
      ]
    }
  },
  {
    id: 36, icon: '⏳', name: 'Principio di Scarsità', subtitle: "L'Urgenza Artificiale", category: 'manipulation', catLabel: 'Manipolazione',
    summary: "Creare urgenza artificiale per impedire la riflessione critica e forzare decisioni impulsive.",
    definition: "Il principio di scarsità sfrutta l'avversione alla perdita: il cervello attribuisce più valore alle cose difficili da ottenere o in via di esaurimento. I manipolatori creano artificialmente questa condizione per cortocircuitare il pensiero razionale.",
    historicalContext: "Teorizzato da Robert Cialdini nel 1984 come uno dei sei principi della persuasione. Usato da venditori, truffatori e in contesti di interrogatorio per accelerare decisioni a sfavore della vittima.",
    psychologicalMechanism: "Attiva il bias di perdita avversiva (loss aversion): perdere qualcosa pesa psicologicamente circa il doppio rispetto al guadagno equivalente. L'urgenza bypassa la corteccia prefrontale e attiva risposte emotive rapide.",
    variants: [
      { name: 'Scarsità temporale', desc: '"Offerta scade tra un\'ora", countdown timer artificiali' },
      { name: 'Scarsità quantitativa', desc: '"Solo 2 posti rimasti", "Ultimi pezzi disponibili"' },
      { name: 'Esclusività', desc: '"Solo per i nostri clienti premium", accesso limitato fittizio' },
      { name: 'Scarsità informativa', desc: '"Condividi prima che lo cancellino", documenti "segreti"' }
    ],
    redFlags: ['Presenza di countdown o scadenze improvvise', 'Pressione a decidere "ora" senza tempo per riflettere', 'Offerta che non sarà più disponibile se non agisci subito', 'Cuore che accelera: stai usando il cervello veloce'],
    caseStudies: [{ title: 'Interrogatori e negoziazioni', description: '"Questa è la tua unica possibilità di collaborare" crea falsa scarsità dell\'opportunità, inducendo decisioni affrettate sotto stress.', lesson: 'Le offerte genuine sopravvivono al tempo. Se non puoi aspettare, è una trappola.' }],
    defense: [
      { step: 'Fermati', action: 'Il cuore accelera? È un segnale: qualcuno sta attivando il tuo Sistema 1' },
      { step: 'Richiedi tempo', action: '"Ho bisogno di tempo per pensarci" — un\'offerta reale sarà ancora valida domani' },
      { step: 'Verifica l\'urgenza', action: "L'urgenza è verificabile o è semplicemente affermata?" }
    ],
    scenario: {
      title: 'Trattativa commerciale',
      situation: '"Questo prezzo è valido solo oggi. Il mio responsabile mi ha dato l\'autorizzazione solo per questa mattina. Poi torna al prezzo pieno."',
      question: 'Quale meccanismo sta usando il venditore?',
      options: [
        { text: 'Scarsità temporale per impedire la riflessione', correct: true, explanation: "L'urgenza artificiale serve a bypassare l'analisi razionale dell'offerta." },
        { text: "Informazione trasparente sui limiti dell'offerta", correct: false, explanation: 'Una vera scadenza può esistere, ma va verificata — non accettata per fede.' },
        { text: 'Tecnica di vendita legittima', correct: false, explanation: 'Anche se comune, la scarsità artificiale è manipolazione quando è falsa.' }
      ]
    }
  },
  {
    id: 37, icon: '🤝', name: 'Principio di Reciprocità', subtitle: 'Il Debito Emotivo', category: 'manipulation', catLabel: 'Manipolazione',
    summary: "Sfruttare il senso del dovere sociale: un favore non richiesto crea l'obbligo psicologico di ricambiare.",
    definition: "Il principio di reciprocità è una norma sociale universale: se qualcuno ci fa un favore, ci sentiamo in debito e vogliamo ricambiare. I manipolatori usano piccoli doni o favori strategici per creare questo senso di obbligo e poi chiedere qualcosa di molto più grande in cambio.",
    historicalContext: "Documentato da Robert Cialdini e dall'antropologia culturale come norma universale. Sfruttato sistematicamente nei processi di reclutamento di informatori, nelle sette e nelle tecniche di vendita aggressive.",
    psychologicalMechanism: "L'obbligo di reciprocità è profondamente radicato evolutivamente: le comunità che cooperavano sopravvivevano meglio. Il senso di colpa per non ricambiare è un meccanismo di coercizione sociale che il manipolatore trasforma in leva.",
    variants: [
      { name: 'Regalo inaspettato', desc: 'Dono non richiesto prima di una richiesta importante' },
      { name: 'Favore strategico', desc: 'Aiuto pratico che crea dipendenza emotiva' },
      { name: 'Concessione apparente', desc: 'Riduzione della richiesta iniziale per sembrare ragionevoli' },
      { name: 'Complimento-richiesta', desc: 'Elogio improvviso immediatamente prima di chiedere un favore scomodo' }
    ],
    redFlags: ['Regalo o favore non richiesto subito seguito da una richiesta', 'Senso di colpa se non "ricambi" qualcosa che non hai chiesto', 'Timing sospetto: favore e richiesta ravvicinati', 'La richiesta è molto più grande del favore ricevuto'],
    caseStudies: [{ title: 'Reclutamento di informatori', description: 'I servizi di intelligence usano la reciprocità sistematicamente: prima piccoli favori (un visto, un\'informazione utile), poi richieste crescenti di informazioni riservate.', lesson: 'Hai il diritto di accettare un favore senza sentirti obbligato a ricambiare. La reciprocità è una norma sociale, non un contratto.' }],
    defense: [
      { step: 'Analizza il timing', action: 'Il favore è arrivato subito prima di una richiesta? Potrebbe non essere casuale.' },
      { step: 'Separa i due eventi', action: '"Ho ricevuto X, ma non ho nessun obbligo di dare Y" — il debito è psicologico, non reale.' },
      { step: 'Riconosci il diritto', action: 'Puoi accettare cortesia senza comprare nulla in cambio.' }
    ],
    scenario: {
      title: 'Collega al lavoro',
      situation: 'Un collega che non ti ha mai aiutato prima ti porta il caffè, ti fa un complimento sul tuo lavoro e poi ti chiede di coprirlo per un\'assenza non autorizzata.',
      question: 'Quale principio viene sfruttato?',
      options: [
        { text: 'Reciprocità: piccolo favore per creare obbligo prima di una richiesta scomoda', correct: true, explanation: 'Il caffè e il complimento sono investimenti strategici, non gesti spontanei.' },
        { text: 'Richiesta diretta tra colleghi', correct: false, explanation: 'Il timing e il contesto indicano manipolazione, non una semplice richiesta.' },
        { text: 'Amicizia genuina', correct: false, explanation: 'La genuinità non dipende dalla prossimità temporale con una richiesta.' }
      ]
    }
  },
  {
    id: 38, icon: '⚓', name: 'Effetto Ancora', subtitle: 'Il Punto di Partenza Truccato', category: 'manipulation', catLabel: 'Manipolazione',
    summary: "La prima informazione ricevuta condiziona in modo sproporzionato tutte le valutazioni successive.",
    definition: "L'effetto ancora (anchoring) descrive la tendenza del cervello a fare eccessivo affidamento sulla prima informazione disponibile. Una volta fissata l'ancora, tutte le valutazioni successive vengono misurate relativamente ad essa, anche se l'ancora è arbitraria o falsa.",
    historicalContext: "Dimostrato da Kahneman e Tversky nel 1974 come uno dei principali bias cognitivi. Usato sistematicamente in negoziazioni, interrogatori, pubblicità e processi legali.",
    psychologicalMechanism: "Il cervello usa la prima informazione come punto di riferimento per risparmiare energia cognitiva. L'aggiustamento successivo rispetto all'ancora è quasi sempre insufficiente: anche sapendo dell'effetto ancora, non riusciamo a correggere completamente.",
    variants: [
      { name: 'Ancora di prezzo', desc: 'Prezzo gonfiato iniziale per rendere quello reale "conveniente"' },
      { name: 'Ancora estrema', desc: 'Richiesta assurda per fare sembrare ragionevole quella vera' },
      { name: 'Ancora numerica', desc: 'Qualsiasi numero nella conversazione influenza le stime successive' },
      { name: 'Ancora in interrogatorio', desc: 'Accuse gravissime iniziali per ottenere ammissioni "minori"' }
    ],
    redFlags: ['La conversazione inizia con un numero o una richiesta estrema', 'Ti senti sollevato quando arriva una proposta "ridotta"', 'Stai valutando quanto hai risparmiato, non se il prezzo è equo', 'La prima offerta era talmente irragionevole che qualsiasi altra sembra ragionevole'],
    caseStudies: [{ title: 'Negoziazione degli ostaggi', description: "I negoziatori sanno che la prima cifra comunicata diventa l'ancora. Chi fa la prima offerta controlla il campo gravitazionale della trattativa.", lesson: "Ignora la prima offerta e valuta l'attuale per quello che è, non per il risparmio rispetto all'ancora." }],
    defense: [
      { step: "Ignora l'ancora", action: 'Se la prima cifra o richiesta era assurda, cancellala mentalmente prima di valutare la nuova.' },
      { step: 'Fai un reset', action: '"Se non avessi sentito la prima proposta, questa mi sembrerebbe equa?"' },
      { step: 'Stabilisci la tua ancora', action: 'In una negoziazione, fai tu la prima offerta per controllare il punto di riferimento.' }
    ],
    scenario: {
      title: 'Acquisto auto',
      situation: "Il concessionario mostra prima un'auto da 45.000€, poi ti propone quella che ti interessa a 28.000€. Ti sembra un ottimo affare.",
      question: 'Quale meccanismo cognitivo sta sfruttando?',
      options: [
        { text: 'Effetto ancora: il prezzo alto iniziale fa sembrare conveniente quello reale', correct: true, explanation: "La valutazione di 28.000€ avviene in relazione ai 45.000€, non al valore reale dell'auto." },
        { text: 'Sconto genuino', correct: false, explanation: "Un prezzo non diventa equo perché è inferiore a un'ancora arbitraria." },
        { text: 'Confronto di mercato', correct: false, explanation: 'Il confronto viene fatto con un riferimento interno costruito dal venditore, non con il mercato reale.' }
      ]
    }
  },
  {
    id: 39, icon: '🔍', name: 'Bias di Conferma', subtitle: 'La Bolla Cognitiva', category: 'manipulation', catLabel: 'Manipolazione',
    summary: "Cercare e sopravvalutare le informazioni che confermano ciò che già crediamo, ignorando quelle che ci contraddicono.",
    definition: "Il bias di conferma è la tendenza a cercare, interpretare e memorizzare le informazioni in modo da confermare le proprie credenze preesistenti. I manipolatori non devono mentire: basta filtrare la realtà per alimentare solo ciò che rafforza le convinzioni già presenti.",
    historicalContext: "Documentato da Peter Wason nel 1960 e approfondito da Kahneman. È la base cognitiva su cui si costruisce la propaganda contemporanea: gli algoritmi dei social media lo amplificano automaticamente creando camere d'eco.",
    psychologicalMechanism: "Il cervello usa le credenze preesistenti come filtro percettivo. Le informazioni coerenti vengono elaborate più facilmente (fluency cognitiva), quelle contraddittorie generano disagio (dissonanza cognitiva) e vengono scartate. Ci sentiamo \"intelligenti\" mentre in realtà seguiamo un percorso tracciato.",
    variants: [
      { name: "Camera d'eco", desc: 'Ambiente informativo dove circolano solo visioni simili' },
      { name: 'Filtraggio algoritmico', desc: 'Algoritmi che amplificano contenuti già apprezzati' },
      { name: 'Conferma selettiva', desc: 'Cercare attivamente solo fonti che confermano la propria posizione' },
      { name: 'Lettura distorta', desc: 'Interpretare informazioni ambigue come conferma della propria tesi' }
    ],
    redFlags: ['Tutte le tue fonti la pensano esattamente come te', 'Ti senti "finalmente informato" rispetto a chi non capisce', 'Il contro-argomento ti sembra assurdo senza averlo analizzato', 'Le notizie che ricevi ti danno sempre ragione'],
    caseStudies: [{ title: 'Propaganda e controllo informativo', description: 'I regimi autoritari non censurano solo: alimentano selettivamente i bias di conferma degli oppositori interni per renderli prevedibili e controllabili. Chi crede di essere "svegliato" segue esattamente il percorso tracciato.', lesson: 'Se tutto quello che leggi ti dà ragione, probabilmente stai vivendo in una bolla manipolata.' }],
    defense: [
      { step: 'Cerca il contraddittorio', action: 'Trova attivamente l\'argomento migliore contro la tua posizione' },
      { step: 'Diversifica le fonti', action: 'Se tutte le tue fonti concordano, aggiungi voci dissonanti' },
      { step: 'Chiediti chi ha tracciato il percorso', action: '"Chi beneficia del fatto che io creda a queste informazioni?"' }
    ],
    scenario: {
      title: 'Social media',
      situation: 'Ogni giorno il tuo feed mostra articoli che confermano le tue opinioni politiche. Ti senti sempre più sicuro di avere ragione e sempre più convinto che chi la pensa diversamente sia disinformato.',
      question: 'Quale meccanismo sta avvenendo?',
      options: [
        { text: "Bias di conferma amplificato dall'algoritmo: camera d'eco che rafforza le convinzioni", correct: true, explanation: "L'algoritmo ottimizza per il coinvolgimento, non per l'accuratezza. La tua certezza crescente è un segnale di allarme." },
        { text: 'Stai diventando più informato', correct: false, explanation: "L'informazione autentica espone anche a prospettive scomode." },
        { text: 'Le tue fonti sono semplicemente accurate', correct: false, explanation: "La coerenza assoluta tra fonti diverse è rarità statistica — o selezione." }
      ]
    }
  }
];
