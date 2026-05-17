/**
 * Banca d'Italia — Profilo A: 10 Esperti ICT
 * Domande a risposta multipla — Batch v2 (maggio 2026)
 * Argomenti: Kubernetes, SQL avanzato, OAuth, AI Act, TLS 1.3, DORA, MiCA,
 *            Transformer attention, LoRA, RLHF, SHAP, concept drift
 */

/** @type {import('./schema.js').MultipleChoiceQuestion[]} */
export const QUESTIONS_BI_A_V2 = [

  // ─── AMBITO 1: COMPUTAZIONE, SOFTWARE, SISTEMI ───────────────────────────

  {
    id: "BI_A_CSS_016",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "container_orchestrazione",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In Kubernetes, qual è la differenza principale tra un Deployment e uno StatefulSet?",
    options: [
      "Il Deployment gestisce pod con identità stabile e storage persistente, lo StatefulSet no",
      "Lo StatefulSet garantisce identità di rete stabili e ordine di avvio/terminazione; il Deployment tratta i pod come intercambiabili",
      "Il Deployment supporta solo un singolo pod, lo StatefulSet supporta repliche multiple",
      "Lo StatefulSet è usato per applicazioni stateless, il Deployment per applicazioni stateful"
    ],
    correct: 1,
    explanation: "Gli StatefulSet assegnano a ogni pod un nome stabile (pod-0, pod-1...), un hostname DNS fisso e volumi persistenti univoci. L'avvio e la terminazione avvengono in ordine. I Deployment trattano i pod come intercambiabili: un pod morto viene rimpiazzato da uno equivalente senza identità fissa. Cassandra, Kafka e PostgreSQL richiedono StatefulSet; web server stateless usano Deployment.",
    tags: ["kubernetes", "statefulset", "deployment", "container"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_017",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "sql_avanzato",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Una Window Function SQL con la clausola `OVER (PARTITION BY cliente_id ORDER BY data)` applicata alla funzione `SUM(importo)` produce:",
    options: [
      "La somma totale di tutti gli importi nella tabella, raggruppata per cliente_id",
      "La somma cumulativa degli importi per ogni cliente, ordinata per data, senza collassare le righe",
      "La somma degli importi di ogni singola riga, ignorando le altre righe dello stesso cliente",
      "Un errore: SUM non può essere usata come Window Function"
    ],
    correct: 1,
    explanation: "Le Window Function calcolano aggregati sulle righe 'vicine' senza collassare il result set (diversamente da GROUP BY). `PARTITION BY cliente_id` definisce la finestra per cliente; `ORDER BY data` abilita il frame cumulativo di default (RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW). Il risultato è una somma cumulativa per data per ogni cliente, con tutte le righe originali presenti.",
    tags: ["sql", "window-function", "over", "partition-by"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_018",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "database_indici",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In PostgreSQL, quando è preferibile un indice Hash rispetto a un B-tree?",
    options: [
      "Quando si eseguono molte query con range condition (es. WHERE data BETWEEN ... AND ...)",
      "Quando si eseguono esclusivamente query di uguaglianza (=) su colonne ad alta cardinalità",
      "Quando si vuole supportare ricerche full-text su campi VARCHAR",
      "Quando la tabella è molto piccola e le query sono rare"
    ],
    correct: 1,
    explanation: "Gli indici Hash hanno lookup O(1) ma supportano solo operatori di uguaglianza (=). Non gestiscono range query, ORDER BY, o LIKE con prefisso. I B-tree (default in PostgreSQL) hanno lookup O(log n) ma supportano uguaglianza, range, ordinamento e LIKE con prefisso. Gli Hash sono utili per lookup puntuali su chiavi ad alta cardinalità dove la velocità O(1) supera il vantaggio del B-tree.",
    tags: ["postgresql", "indici", "b-tree", "hash-index", "database"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_019",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "sistemi_operativi",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Il Completely Fair Scheduler (CFS) di Linux distribuisce il tempo CPU basandosi su:",
    options: [
      "Un time slice fisso uguale per tutti i processi, con priorità statica che modifica la coda",
      "Il vruntime (virtual runtime): ogni processo accumula tempo CPU pesato per la sua nice value; viene schedulato chi ha il vruntime minimo",
      "Un algoritmo Earliest Deadline First (EDF) che prioritizza processi con scadenza più vicina",
      "Un Round Robin con quanto fisso di 10ms, senza considerare la priorità dei processi"
    ],
    correct: 1,
    explanation: "CFS usa un Red-Black Tree ordinato per vruntime. Il vruntime cresce più lentamente per processi con nice bassa (alta priorità) e più velocemente per nice alta. Il processo con vruntime minimo viene selezionato — quindi chi ha usato meno CPU ottiene il turno successivo. Il time slice non è fisso: dipende dal numero di processi (target_latency / nr_running). Questo garantisce fairness: ogni processo riceve una quota proporzionale della CPU.",
    tags: ["linux", "cfs", "scheduling", "sistemi-operativi", "vruntime"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_020",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "autenticazione_api",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Nel flusso OAuth 2.0 Authorization Code, cosa contiene l'Authorization Code restituito al client dopo il consenso dell'utente?",
    options: [
      "L'access token direttamente, già pronto per chiamare le API protette",
      "Un codice monouso a breve scadenza che il client scambia con il token endpoint per ottenere access token e refresh token",
      "Il refresh token, che il client usa per ottenere un access token senza ulteriori interazioni utente",
      "Le credenziali dell'utente cifrate con la chiave pubblica del client"
    ],
    correct: 1,
    explanation: "L'Authorization Code è un codice temporaneo (tipicamente 10 minuti, monouso) passato via redirect URL al client. Il client lo scambia direttamente con il Authorization Server (backend-to-backend, con client_secret) per ottenere access_token + refresh_token. Questo design evita che l'access token venga esposto nel browser/URL. Il PKCE (Proof Key for Code Exchange) estende questo flusso per client pubblici (SPA, mobile).",
    tags: ["oauth2", "authorization-code", "security", "api", "pkce"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_021",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "rest_grpc",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è il principale vantaggio di gRPC rispetto a REST/JSON per la comunicazione inter-servizi in un'architettura a microservizi?",
    options: [
      "gRPC usa HTTP/1.1 che è più compatibile con i proxy e i firewall aziendali",
      "gRPC usa Protocol Buffers con serializzazione binaria su HTTP/2, ottenendo minore latenza e bandwidth rispetto a JSON su HTTP/1.1",
      "gRPC supporta autenticazione OAuth 2.0 nativamente, REST no",
      "gRPC è browser-native e non richiede librerie aggiuntive lato client"
    ],
    correct: 1,
    explanation: "gRPC usa Protocol Buffers (schema-first, binario, ~3-10x più compatto di JSON) su HTTP/2 (multiplexing, header compression, streaming bidirezionale). Questo riduce latenza e consumo di banda, cruciale per chiamate ad alta frequenza tra microservizi. Gli svantaggi: non leggibile da browser nativamente (richiede gRPC-Web), debugging più complesso. REST rimane preferito per API pubbliche e quando la leggibilità conta.",
    tags: ["grpc", "rest", "protobuf", "http2", "microservizi"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_022",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "docker_container",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Perché il layer caching di Docker è importante per le build CI/CD? Quale pratica lo ottimizza?",
    options: [
      "Il layer caching non ha impatto sulle build CI/CD perché ogni build parte da zero",
      "Mettere le istruzioni COPY del codice sorgente prima dell'installazione delle dipendenze (RUN npm install) massimizza il riuso della cache",
      "Copiare prima il codice sorgente e poi installare le dipendenze massimizza il riuso della cache",
      "Inserire le dipendenze raramente modificate in layer iniziali (COPY package.json → RUN npm install → COPY src/) massimizza il riuso della cache"
    ],
    correct: 3,
    explanation: "Docker riusa i layer dalla cache se il layer e tutti quelli precedenti non sono cambiati. Copiando prima solo i file di dipendenze (package.json, requirements.txt) e installandole in un layer separato, il layer 'RUN npm install' viene ricalcolato solo quando cambiano le dipendenze — non a ogni modifica del codice sorgente. Questo può ridurre i tempi di build da minuti a secondi nelle pipeline CI/CD.",
    tags: ["docker", "ci-cd", "layer-cache", "container", "devops"],
    added_date: "2026-05-17"
  },

  // ─── AMBITO 2: CRITTOGRAFIA, DLT, PRIVACY ────────────────────────────────

  {
    id: "BI_A_CDL_011",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "gdpr_normativa",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Secondo il GDPR (Art. 35), quando è obbligatoria una Data Protection Impact Assessment (DPIA)?",
    options: [
      "Per qualsiasi trattamento di dati personali, indipendentemente dalla scala o dal rischio",
      "Solo quando si trasferiscono dati fuori dallo Spazio Economico Europeo",
      "Quando il trattamento può presentare un rischio elevato per i diritti degli interessati, in particolare per trattamenti su larga scala, profilazione sistematica o dati sensibili",
      "Solo per i trattamenti effettuati da soggetti pubblici con più di 250 dipendenti"
    ],
    correct: 2,
    explanation: "L'Art. 35 GDPR richiede la DPIA nei casi di: (1) profilazione sistematica su larga scala, (2) trattamento su larga scala di dati sensibili (ex art. 9-10), (3) sorveglianza sistematica di aree pubbliche. Le linee guida WP29 indicano ulteriori criteri: nuove tecnologie, matching/combinazione di dataset, dati vulnerabili, trasferimenti oltre l'UE. Non è richiesta per tutti i trattamenti, ma è buona prassi documentarla anche quando non obbligatoria.",
    tags: ["gdpr", "dpia", "art35", "privacy", "risk-assessment"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_012",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "ai_act",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Secondo l'AI Act UE (Regolamento 2024/1689), in quale categoria di rischio rientrano i sistemi AI usati per valutare l'affidabilità creditizia dei privati?",
    options: [
      "Rischio minimo — non soggetti a requisiti specifici",
      "Rischio limitato — richiedono solo obblighi di trasparenza verso l'utente",
      "Rischio alto — soggetti a requisiti stringenti (registrazione, audit, spiegabilità, supervisione umana)",
      "Rischio inaccettabile — vietati dall'AI Act"
    ],
    correct: 2,
    explanation: "L'Allegato III dell'AI Act elenca esplicitamente i sistemi AI ad alto rischio: tra questi, i sistemi per la valutazione del merito creditizio e del rischio di insolvenza. Per i sistemi ad alto rischio sono richiesti: gestione del rischio, governance dei dati di training, documentazione tecnica, trasparenza, supervisione umana, accuratezza e robustezza. I fornitori devono registrare i sistemi nella banca dati UE e sottoporli a conformità prima dell'immissione sul mercato.",
    tags: ["ai-act", "rischio-alto", "credito", "compliance", "normativa-ue"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_013",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "tls_protocolli",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è il miglioramento principale introdotto da TLS 1.3 rispetto a TLS 1.2?",
    options: [
      "TLS 1.3 introduce la crittografia simmetrica AES-256-GCM, assente in TLS 1.2",
      "TLS 1.3 riduce l'handshake a 1-RTT (con 0-RTT per sessioni riprese), elimina i cipher suite deboli e usa solo Perfect Forward Secrecy",
      "TLS 1.3 usa RSA-4096 per lo scambio di chiavi, più sicuro dell'RSA-2048 di TLS 1.2",
      "TLS 1.3 introduce il certificato Let's Encrypt come autorità di certificazione default"
    ],
    correct: 1,
    explanation: "TLS 1.3 porta tre miglioramenti fondamentali: (1) handshake 1-RTT invece di 2-RTT (0-RTT per session resumption, ma con rischi replay); (2) eliminazione di cipher suite deboli (RC4, 3DES, MD5, SHA-1, RSA key exchange statico); (3) Perfect Forward Secrecy obbligatorio — usa solo ECDHE/DHE per il key exchange, quindi le chiavi di sessione non possono essere recuperate anche compromettendo la chiave privata del server.",
    tags: ["tls", "tls13", "pfs", "handshake", "crittografia"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_014",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "normativa_dora",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Il regolamento DORA (Digital Operational Resilience Act, Reg. UE 2022/2554) si applica principalmente a:",
    options: [
      "Tutte le aziende europee con più di 250 dipendenti che utilizzano sistemi informatici",
      "Le entità finanziarie (banche, assicurazioni, investimento) e i loro fornitori critici ICT, con obblighi di resilienza operativa digitale",
      "Solo alle banche centrali dei paesi UE, per garantire la stabilità del sistema monetario",
      "Ai fornitori di servizi cloud pubblico (AWS, Azure, GCP) operanti in Europa"
    ],
    correct: 1,
    explanation: "DORA (applicabile dal gennaio 2025) impone a banche, assicurazioni, SGR, piattaforme di trading e ~20 tipi di entità finanziarie requisiti su: gestione del rischio ICT, segnalazione degli incidenti, test di resilienza (TLPT — Threat Led Penetration Testing), rischio di terze parti ICT (vendor risk management) e condivisione delle informazioni sulle minacce. I fornitori ICT critici (come i cloud provider) sono soggetti a supervisione diretta dalle autorità europee.",
    tags: ["dora", "resilienza-digitale", "banche", "normativa-ue", "ict-risk"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_015",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "blockchain_strutture",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In una blockchain, a cosa serve il Merkle Tree e qual è la sua proprietà principale?",
    options: [
      "È la struttura dati usata per memorizzare gli smart contract; garantisce che il codice non possa essere modificato dopo il deployment",
      "È un albero binario di hash dove ogni nodo interno è l'hash dei suoi figli; permette di verificare l'appartenenza di una transazione a un blocco in O(log n) senza scaricare tutte le transazioni",
      "È l'algoritmo di consenso usato da Ethereum 2.0 che sostituisce il Proof of Work",
      "È il meccanismo che collega i blocchi tra loro: ogni blocco contiene il Merkle root del blocco precedente"
    ],
    correct: 1,
    explanation: "Il Merkle Tree organizza le transazioni in un albero binario: le foglie sono gli hash delle singole transazioni, ogni nodo padre è hash(figlio_sx + figlio_dx). La Merkle root nel block header è un'impronta digitale di tutte le transazioni. Proprietà chiave: Merkle Proof — per verificare che una transazione sia nel blocco, bastano O(log n) hash (il percorso dalla foglia alla root), non tutte le transazioni. Questo abilita i light client (SPV) su Bitcoin.",
    tags: ["merkle-tree", "blockchain", "bitcoin", "strutture-dati", "verifica"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_016",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "crittografia_asimmetrica",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Qual è la differenza tra ECDSA e EdDSA (es. Ed25519) come algoritmi di firma digitale su curve ellittiche?",
    options: [
      "ECDSA usa curve ellittiche, EdDSA usa lattici — sono quindi paradigmi crittografici diversi",
      "EdDSA è deterministico (la firma non dipende da un nonce casuale), evitando la vulnerabilità di ECDSA al nonce riuso; Ed25519 è anche più veloce e resistente a side-channel",
      "ECDSA supporta chiavi più corte (128 bit vs 256 bit di Ed25519), quindi è più efficiente",
      "EdDSA è uno standard più vecchio di ECDSA; ECDSA è il successore moderno adottato da TLS 1.3"
    ],
    correct: 1,
    explanation: "ECDSA richiede un nonce casuale k per ogni firma: se k viene riutilizzato o è prevedibile, la chiave privata è recuperabile (vulnerabilità sfruttata contro PlayStation 3). EdDSA (RFC 8032) è deterministico: il nonce è derivato dall'hash del messaggio e della chiave privata, eliminando questa vulnerabilità. Ed25519 (EdDSA su Curve25519) offre anche: firma ~2x più veloce, verifica ~3x più veloce di ECDSA-P256, resistenza a side-channel per design della curva.",
    tags: ["ecdsa", "eddsa", "ed25519", "firma-digitale", "crittografia"],
    added_date: "2026-05-17"
  },

  // ─── AMBITO 3: INTELLIGENZA ARTIFICIALE, ML, DATA SCIENCE ───────────────

  {
    id: "BI_A_IML_016",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "ia_ml_data_science",
    subcategory: "transformer_architettura",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la complessità computazionale del meccanismo di self-attention in un Transformer, in funzione della lunghezza della sequenza n e della dimensione del modello d?",
    options: [
      "O(n · d) — lineare nella lunghezza della sequenza",
      "O(n² · d) — quadratica nella lunghezza della sequenza, perché ogni token attende a tutti gli altri",
      "O(n · d²) — lineare nella sequenza ma quadratica nella dimensione del modello",
      "O(log n · d) — grazie alla struttura ad albero del multi-head attention"
    ],
    correct: 1,
    explanation: "L'attenzione calcola Q·Kᵀ (matrice n×n) con costo O(n²·d), poi moltiplica per V con costo O(n²·d). La complessità totale è O(n²·d), che scala male per sequenze lunghe (n>2048). Questo ha motivato varianti come Sparse Attention, Longformer (O(n·√n)), Flash Attention (IO-aware per GPU), e architetture Mamba (SSM, O(n)). Per sequenze corte (testi <2K token), O(n²) è gestibile su GPU moderne.",
    tags: ["transformer", "self-attention", "complessità", "architettura", "scalabilità"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_017",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "ia_ml_data_science",
    subcategory: "fine_tuning_lora",
    type: "multiple_choice",
    difficulty: "medium",
    question: "LoRA (Low-Rank Adaptation) per il fine-tuning di LLM si basa su quale principio?",
    options: [
      "Congela tutti i layer del modello e aggiunge nuovi layer densi in cima",
      "Decompone gli aggiornamenti dei pesi in due matrici di rango basso (A e B), riducendo i parametri addestrabili di 1000x mantenendo qualità simile al full fine-tuning",
      "Usa il pruning per rimuovere i parametri meno importanti prima del fine-tuning",
      "Divide il modello in chunk e addestra ogni chunk separatamente su GPU diverse"
    ],
    correct: 1,
    explanation: "LoRA (Hu et al. 2021) osserva che le update dei pesi durante il fine-tuning hanno rango intrinseco basso. Invece di aggiornare W∈ℝᵐˣⁿ, addestra ΔW = B·A dove B∈ℝᵐˣʳ e A∈ℝʳˣⁿ con r<<min(m,n). Per GPT-3 175B con r=4, i parametri addestrabili scendono da 175B a ~4.7M (~0.003%). QLoRA estende LoRA con quantizzazione 4-bit del modello base, permettendo fine-tuning di 65B su una singola GPU A100.",
    tags: ["lora", "fine-tuning", "llm", "adattamento", "parametri"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_018",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "ia_ml_data_science",
    subcategory: "rlhf",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la sequenza corretta delle fasi nel processo RLHF (Reinforcement Learning from Human Feedback) usato per allineare i LLM?",
    options: [
      "Pre-training → RLHF diretto → Supervised Fine-Tuning (SFT)",
      "Supervised Fine-Tuning (SFT) → Addestramento Reward Model → Ottimizzazione con RL (PPO)",
      "Addestramento Reward Model → Pre-training → Supervised Fine-Tuning",
      "Pre-training → Constitutional AI → Reward Model → RLHF"
    ],
    correct: 1,
    explanation: "RLHF (usato in InstructGPT, ChatGPT, Claude) segue tre fasi: (1) SFT — fine-tuning supervisionato su esempi di risposte desiderate scritte da umani; (2) Reward Model — i valutatori confrontano coppie di risposte per addestrare un modello che stima la preferenza umana; (3) RL con PPO — il LLM viene ottimizzato per massimizzare il reward del RM, con un termine KL per non allontanarsi troppo dal modello SFT. Direct Preference Optimization (DPO) è un'alternativa senza RL esplicito.",
    tags: ["rlhf", "sft", "reward-model", "ppo", "allineamento-ai"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_019",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "ia_ml_data_science",
    subcategory: "explainability",
    type: "multiple_choice",
    difficulty: "medium",
    question: "SHAP (SHapley Additive exPlanations) calcola l'importanza delle feature basandosi su:",
    options: [
      "Il coefficiente di correlazione di Pearson tra ciascuna feature e il target",
      "I valori di Shapley dalla teoria dei giochi cooperativi: la contribuzione marginale media di ogni feature calcolata su tutte le possibili coalizioni di feature",
      "Il gradiente del modello rispetto a ogni feature, integrato lungo il percorso dal baseline all'input",
      "La varianza spiegata da ogni feature in un modello lineare approssimato localmente intorno alla predizione"
    ],
    correct: 1,
    explanation: "I valori SHAP (Lundberg & Lee, 2017) sono radicati nei valori di Shapley della teoria dei giochi: per ogni feature, la sua importanza è la media ponderata della sua contribuzione marginale su tutte le possibili coalizioni di feature. Proprietà fondamentali: efficienza (somma dei valori SHAP = predizione - valore atteso), simmetria, dummy (feature non rilevanti → SHAP=0), additività. TreeSHAP calcola i valori esatti in O(TLD²) per modelli ad albero. LIME, in contrasto (risposta D), usa approssimazione locale ma non ha queste garanzie.",
    tags: ["shap", "explainability", "shapley", "xai", "feature-importance"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_020",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "ia_ml_data_science",
    subcategory: "metriche_valutazione",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In un sistema di fraud detection bancario con dataset fortemente sbilanciato (0.1% frodi), perché l'accuracy non è una metrica utile?",
    options: [
      "L'accuracy non funziona per modelli non lineari come le reti neurali",
      "Un modello che predice sempre 'non frode' raggiunge 99.9% di accuracy, ma ha recall=0 sulle frodi — la metrica non cattura la capacità di rilevare i casi rari e costosi",
      "L'accuracy non è calcolabile con dataset con più di 1 milione di campioni",
      "L'accuracy misura solo il tempo di inferenza, non la qualità delle predizioni"
    ],
    correct: 1,
    explanation: "Con dataset 99.9% negativi, un classifier banale che predice sempre 'legittima' ottiene 99.9% accuracy ma recall=0, catturando zero frodi. Per fraud detection si usano: Precision (di quante transazioni segnalate sono davvero frodi?), Recall/Sensitivity (quante frodi reali vengono catturate?), F1-score (media armonica), AUC-ROC, AUC-PR (più informativa con sbilanciamento). Il costo asimmetrico — falsi negativi (frodi mancate) molto più costosi dei falsi positivi — richiede di ottimizzare recall o un F-beta con beta>1.",
    tags: ["fraud-detection", "accuracy", "recall", "sbilanciamento", "metriche"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_021",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "ia_ml_data_science",
    subcategory: "mlops_drift",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la differenza tra concept drift e data drift nel monitoraggio di modelli ML in produzione?",
    options: [
      "Sono sinonimi: entrambi indicano che le performance del modello peggiorano nel tempo",
      "Il data drift riguarda cambiamenti nella distribuzione degli input P(X); il concept drift riguarda cambiamenti nella relazione P(Y|X), cioè le caratteristiche associate al target cambiano nel tempo",
      "Il concept drift si verifica solo nei modelli NLP, il data drift nei modelli tabellari",
      "Il data drift è rilevabile solo con dati etichettati; il concept drift non richiede label"
    ],
    correct: 1,
    explanation: "Data drift (covariate shift): la distribuzione degli input cambia — es. nuovi tipi di transazioni che il modello non ha visto in training. Concept drift: la relazione tra feature e target cambia — es. in fraud detection, i pattern di frode cambiano dopo l'introduzione di nuovi controlli. Il concept drift è il più insidioso: il modello riceve input simili al passato ma le sue predizioni diventano sistematicamente sbagliate. Strumenti di monitoraggio: PSI (Population Stability Index), KS test per data drift; drift dei residui, accuracy degradation per concept drift.",
    tags: ["mlops", "concept-drift", "data-drift", "monitoraggio", "produzione"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_022",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "ia_ml_data_science",
    subcategory: "llm_rag_avanzato",
    type: "multiple_choice",
    difficulty: "hard",
    question: "In un sistema RAG (Retrieval-Augmented Generation), cosa si intende per 'lost in the middle' e come si mitiga?",
    options: [
      "Il modello perde il contesto quando il documento è troppo lungo; si mitiga con chunking più piccolo",
      "I LLM tendono ad ignorare le informazioni nel mezzo del contesto quando il context window è molto lungo; si mitiga con re-ranking che posiziona i chunk più rilevanti all'inizio o alla fine",
      "Il sistema RAG non riesce a trovare documenti pertinenti quando la query è ambigua; si mitiga con query expansion",
      "I vettori di embedding perdono informazione semantica per documenti di lunghezza media; si mitiga con embedding di dimensione maggiore"
    ],
    correct: 1,
    explanation: "Liu et al. (2023) 'Lost in the Middle': i LLM ricordano meglio le informazioni all'inizio e alla fine del prompt (primacy e recency effect), ignorando quelle nel mezzo. Con RAG che recupera 10+ chunk, i chunk intermedi sono meno utilizzati. Mitigazioni: (1) posizionare i chunk più rilevanti all'inizio o alla fine; (2) ridurre il numero di chunk recuperati; (3) usare modelli con migliore long-context utilization; (4) query decomposition per domande complesse. Longformer e modelli con attention patterns diversi sono meno soggetti a questo problema.",
    tags: ["rag", "lost-in-the-middle", "llm", "re-ranking", "context"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_023",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "ia_ml_data_science",
    subcategory: "federated_learning",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Nel Federated Learning con l'algoritmo FedAvg, come vengono aggregati gli aggiornamenti dei modelli locali?",
    options: [
      "Il server raccoglie i dataset locali di tutti i client, li unisce e ri-addestra centralmente il modello",
      "Il server calcola la media pesata (per numero di campioni) dei pesi dei modelli locali addestrati sui dati privati di ogni client, senza mai accedere ai dati",
      "I client si scambiano direttamente i gradienti peer-to-peer senza un server centrale",
      "Il server invia solo i gradienti al posto dei pesi, riducendo il bandwidth ma mantenendo la stessa accuracy"
    ],
    correct: 1,
    explanation: "FedAvg (McMahan et al. 2017): (1) il server invia il modello globale W a tutti i client; (2) ogni client k addestra localmente per E epoche su D_k, ottenendo W_k; (3) il server aggrega: W_new = Σ(|D_k|/|D|) · W_k (media pesata per dataset size). I dati non escono mai dai client. Limitazioni: communication overhead, heterogeneità dei dati (non-IID degradano l'accuracy), vulnerabilità a poisoning attack (client malevoli inviano aggiornamenti falsi). FedProx e SCAFFOLD sono varianti che gestiscono meglio la non-IID data.",
    tags: ["federated-learning", "fedavg", "privacy", "distributed-ml", "aggregazione"],
    added_date: "2026-05-17"
  }

];
