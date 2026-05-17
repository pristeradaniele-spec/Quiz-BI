/**
 * Banca d'Italia — Test Preselettivo
 * Quesiti logico-matematici, logico-deduttivi e comprensione del testo
 * Batch iniziale (maggio 2026)
 *
 * Attivato solo se >2500 domande di partecipazione.
 * 60 quesiti totali, max 75 minuti (non conta per graduatoria).
 */

export const QUESTIONS_PRESELETTIVO_V1 = [

  // ─── LOGICA MATEMATICA ────────────────────────────────────────────────────

  {
    id: "BI_PRE_MAT_001",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "logica_matematica",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Quale numero completa la serie: 3, 6, 12, 24, 48, ___?",
    options: ["72", "96", "84", "100"],
    correct: 1,
    explanation: "Ogni termine è il doppio del precedente: 3×2=6, 6×2=12, 12×2=24, 24×2=48, 48×2=96.",
    tags: ["serie-numerica", "progressione-geometrica"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_PRE_MAT_002",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "logica_matematica",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Quale numero completa la serie: 1, 1, 2, 3, 5, 8, 13, ___?",
    options: ["18", "21", "20", "19"],
    correct: 1,
    explanation: "Serie di Fibonacci: ogni termine è la somma dei due precedenti. 8+13=21.",
    tags: ["fibonacci", "serie-numerica"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_PRE_MAT_003",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "logica_matematica",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Un treno percorre 240 km in 3 ore. Quanti km percorrerà in 5 ore alla stessa velocità?",
    options: ["350 km", "400 km", "420 km", "480 km"],
    correct: 1,
    explanation: "Velocità = 240/3 = 80 km/h. In 5 ore: 80 × 5 = 400 km.",
    tags: ["velocità", "proporzioni", "calcolo"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_PRE_MAT_004",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "logica_matematica",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In un ufficio lavorano 60 persone, di cui il 40% sono donne. Quante donne lavorano nell'ufficio?",
    options: ["20", "24", "28", "30"],
    correct: 1,
    explanation: "40% di 60 = 0.40 × 60 = 24.",
    tags: ["percentuali", "calcolo"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_PRE_MAT_005",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "logica_matematica",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Un prodotto viene venduto con uno sconto del 20% rispetto al prezzo originale di €150. Successivamente il prezzo scontato viene aumentato del 10%. Qual è il prezzo finale?",
    options: ["€138", "€132", "€145", "€150"],
    correct: 1,
    explanation: "Prezzo dopo sconto 20%: 150 × 0.80 = 120€. Prezzo dopo aumento 10%: 120 × 1.10 = 132€.",
    tags: ["percentuali", "sconti", "calcolo-sequenziale"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_PRE_MAT_006",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "logica_matematica",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Se 5 operai completano un lavoro in 12 giorni, quanti giorni impiegheranno 8 operai per lo stesso lavoro (lavoro costante per operaio)?",
    options: ["6 giorni", "7 giorni", "7,5 giorni", "8 giorni"],
    correct: 2,
    explanation: "Lavoro totale = 5 × 12 = 60 operaio-giorni. Con 8 operai: 60 / 8 = 7.5 giorni.",
    tags: ["problemi-inversi", "produttività", "calcolo"],
    added_date: "2026-05-17"
  },

  // ─── LOGICA DEDUTTIVA ─────────────────────────────────────────────────────

  {
    id: "BI_PRE_DED_001",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "logica_deduttiva",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Tutti i programmatori conoscono Python. Mario è un programmatore. Quale conclusione è necessariamente vera?",
    options: [
      "Mario conosce solo Python.",
      "Mario conosce Python.",
      "Chi conosce Python è un programmatore.",
      "Mario è l'unico che conosce Python."
    ],
    correct: 1,
    explanation: "Sillogismo categorico: Premessa maggiore (tutti P→Q), premessa minore (Mario è P), conclusione (Mario è Q). Mario conosce Python è l'unica conclusione necessariamente vera. Le altre introducono informazioni non presenti nelle premesse.",
    tags: ["sillogismo", "logica-deduttiva", "ragionamento"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_PRE_DED_002",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "logica_deduttiva",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In una gara, Andrea arriva prima di Beatrice. Carlo arriva dopo Beatrice ma prima di Diana. Elena arriva ultima. Chi arriva terzo?",
    options: ["Beatrice", "Carlo", "Andrea", "Diana"],
    correct: 1,
    explanation: "Ordine: Andrea (1°) → Beatrice (2°) → Carlo (3°) → Diana (4°) → Elena (5°). Carlo arriva terzo.",
    tags: ["ordinamento", "logica-deduttiva", "sequenze"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_PRE_DED_003",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "logica_deduttiva",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Se è vero che 'Se piove, allora prendo l'ombrello', quale delle seguenti affermazioni è logicamente equivalente?",
    options: [
      "Se non piove, allora non prendo l'ombrello.",
      "Se non prendo l'ombrello, allora non piove.",
      "Se prendo l'ombrello, allora piove.",
      "Piove se e solo se prendo l'ombrello."
    ],
    correct: 1,
    explanation: "L'implicazione P→Q è logicamente equivalente alla sua contropositiva ¬Q→¬P. 'Se piove → ombrello' è equivalente a 'Se non prendo l'ombrello → non piove'. Le altre (inversa e reciproca) non sono equivalenti logicamente.",
    tags: ["implicazione", "contropositiva", "logica-proposizionale"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_PRE_DED_004",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "logica_deduttiva",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Cinque colleghi (A, B, C, D, E) occupano cinque uffici consecutivi numerati 1-5. A non è adiacente a B. C è nell'ufficio 3. D è nell'ufficio 1. E non è adiacente a C. Quale posizione occupa B?",
    options: ["Ufficio 2", "Ufficio 4", "Ufficio 5", "Ufficio 2 o 5"],
    correct: 2,
    explanation: "D=1, C=3. Posizioni libere: 2, 4, 5 per A, B, E. E non adiacente a C(3): E non può essere in 2 o 4. Quindi E=5. Rimangono 2 e 4 per A e B. A non adiacente a B: se A=2, B deve non essere in 1 o 3 — B può essere in 4 (non adiacente a 2? No, 2 e 4 non sono adiacenti). Quindi A=2, B=4. Verifica: A(2) e B(4) non sono adiacenti. B=ufficio 5? No, E=5. B=4.",
    tags: ["logica-combinatoria", "vincoli", "problem-solving"],
    added_date: "2026-05-17"
  },

  // ─── COMPRENSIONE DEL TESTO ───────────────────────────────────────────────

  {
    id: "BI_PRE_COM_001",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "comprensione_testo",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Leggere il seguente brano e rispondere alla domanda:\n\n«La Banca d'Italia è la banca centrale della Repubblica italiana e fa parte del Sistema europeo di banche centrali (SEBC). È un istituto di diritto pubblico, dotato di personalità giuridica. Svolge funzioni di interesse generale nell'ambito del SEBC e in conformità con l'ordinamento dell'Unione europea.»\n\nSecondo il brano, la Banca d'Italia:",
    options: [
      "È una banca privata che gestisce i conti dei cittadini italiani.",
      "È un istituto di diritto pubblico che fa parte del Sistema europeo di banche centrali.",
      "È indipendente dal Sistema europeo di banche centrali e agisce solo per interesse nazionale.",
      "È un'agenzia governativa che dipende direttamente dal Ministero dell'Economia."
    ],
    correct: 1,
    explanation: "Il brano afferma esplicitamente che la Banca d'Italia 'è un istituto di diritto pubblico' e 'fa parte del Sistema europeo di banche centrali (SEBC)'. Le altre opzioni contraddicono o aggiungono informazioni non presenti nel testo.",
    tags: ["comprensione-testo", "lettura-critica"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_PRE_COM_002",
    source: "banca_italia_preselettivo",
    batch: "initial_2026-05",
    category: "preselettivo",
    subcategory: "comprensione_testo",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Leggere il seguente brano e rispondere alla domanda:\n\n«Le tecnologie di intelligenza artificiale stanno trasformando profondamente il settore finanziario. Tuttavia, questa trasformazione porta con sé rischi significativi: i modelli algoritmici possono amplificare le correlazioni di mercato in momenti di stress, generando effetti prociclici. Inoltre, la concentrazione di servizi AI presso pochi grandi fornitori tecnologici introduce nuove forme di rischio sistemico che le autorità di vigilanza devono monitorare attentamente.»\n\nQuali sono i DUE rischi principali identificati nel brano?",
    options: [
      "La lentezza dei modelli AI e l'alto costo computazionale.",
      "L'amplificazione delle correlazioni di mercato e la concentrazione dei servizi AI presso pochi fornitori.",
      "La mancanza di regolamentazione europea e l'assenza di standard tecnici.",
      "Il rischio di bias algoritmoico e la difficoltà di interpretabilità dei modelli."
    ],
    correct: 1,
    explanation: "Il brano identifica esplicitamente due rischi: (1) 'i modelli algoritmici possono amplificare le correlazioni di mercato' (effetti prociclici) e (2) 'la concentrazione di servizi AI presso pochi grandi fornitori tecnologici introduce nuove forme di rischio sistemico'. Le altre opzioni menzionano rischi non citati nel testo.",
    tags: ["comprensione-testo", "analisi", "fintech"],
    added_date: "2026-05-17"
  }

];
