/**
 * Banca d'Italia — Profilo A: 10 Esperti ICT
 * Domande a risposta multipla — Batch iniziale (maggio 2026)
 *
 * Ambiti coperti:
 *   CSS = Computazione, Software, Sistemi (Ambito 1)
 *   CDL = Crittografia, DLT, Privacy (Ambito 2)
 *   IML = Intelligenza Artificiale, ML, Data Science (Ambito 3)
 */

export const QUESTIONS_BI_A_V1 = [

  // ─── AMBITO 1: COMPUTAZIONE, SOFTWARE, SISTEMI ───────────────────────────

  {
    id: "BI_A_CSS_001",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "algoritmi_strutture_dati",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la complessità temporale nel caso medio dell'operazione di ricerca in una tabella hash con risoluzione delle collisioni tramite chaining?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    correct: 0,
    explanation: "Con un buon hash function e un fattore di carico α = n/m costante (basso), il numero medio di elementi per bucket è O(1), quindi la ricerca è O(1) nel caso medio. Nel caso peggiore (tutte le chiavi nella stessa bucket) è O(n).",
    tags: ["hash-table", "complessità", "strutture-dati"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_002",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "algoritmi_strutture_dati",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Quale delle seguenti affermazioni descrive correttamente la differenza tra un B-tree e un B+-tree?",
    options: [
      "Nel B+-tree tutti i dati sono memorizzati solo nelle foglie, che sono collegate tra loro; nel B-tree i dati possono essere in qualsiasi nodo.",
      "Il B+-tree è sempre bilanciato mentre il B-tree non lo è.",
      "Il B-tree è usato solo per database relazionali; il B+-tree solo per filesystem.",
      "Nel B+-tree le chiavi delle foglie non si ripetono nei nodi interni, mentre nel B-tree sì."
    ],
    correct: 0,
    explanation: "Nel B+-tree i nodi interni contengono solo chiavi di routing (copie), mentre tutti i dati effettivi sono nelle foglie. Le foglie sono collegate in una lista doppiamente concatenata, rendendo le scansioni di range molto efficienti. Nel B-tree i dati possono stare in qualsiasi nodo.",
    tags: ["b-tree", "database", "strutture-dati", "indici"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_003",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "sistemi_operativi",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Quali sono le quattro condizioni necessarie e sufficienti perché si verifichi un deadlock in un sistema operativo (condizioni di Coffman)?",
    options: [
      "Mutua esclusione, hold and wait, no preemption, attesa circolare.",
      "Mutua esclusione, starvation, no preemption, attesa circolare.",
      "Hold and wait, no preemption, livelock, attesa circolare.",
      "Mutua esclusione, hold and wait, preemption, attesa circolare."
    ],
    correct: 0,
    explanation: "Le condizioni di Coffman (1971) sono: (1) Mutua esclusione — la risorsa non è condivisibile; (2) Hold and wait — un processo tiene almeno una risorsa mentre aspetta altre; (3) No preemption — le risorse non possono essere revocate; (4) Attesa circolare — esiste un ciclo nella catena di attesa. Tutte e quattro devono essere presenti simultaneamente.",
    tags: ["deadlock", "sistemi-operativi", "coffman"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_004",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "sistemi_operativi",
    type: "multiple_choice",
    difficulty: "hard",
    question: "In un sistema con memoria virtuale e paginazione, cosa si intende per 'thrashing'?",
    options: [
      "Una condizione in cui il sistema trascorre più tempo a gestire page fault che a eseguire lavoro utile, perché la working set dei processi supera la RAM disponibile.",
      "Un attacco di tipo side-channel che sfrutta le collisioni nella TLB per inferire dati di altri processi.",
      "La frammentazione esterna della memoria fisica causata dall'allocazione dinamica di pagine di dimensione variabile.",
      "Il processo di compressione delle pagine inattive nella swap prima di rimuoverle dalla RAM."
    ],
    correct: 0,
    explanation: "Il thrashing si verifica quando i processi attivi richiedono più frame di quanti ne siano disponibili. Il SO continua a swappare pagine dentro e fuori, generando un numero elevatissimo di page fault. L'utilizzo della CPU crolla nonostante il sistema sia 'occupato'. La soluzione classica è ridurre il grado di multiprogrammazione o applicare il working set model.",
    tags: ["thrashing", "memoria-virtuale", "paginazione", "sistemi-operativi"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_005",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "database",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Il teorema CAP (Brewer, 2000) afferma che un sistema distribuito non può garantire simultaneamente tutte e tre le seguenti proprietà. Quali?",
    options: [
      "Consistency, Availability, Partition tolerance.",
      "Consistency, Atomicity, Performance.",
      "Concurrency, Availability, Partition tolerance.",
      "Consistency, Atomicity, Partition tolerance."
    ],
    correct: 0,
    explanation: "Il teorema CAP di Brewer stabilisce che in presenza di una partizione di rete (P), un sistema distribuito deve scegliere tra Consistency (ogni lettura riceve il dato più recente) e Availability (ogni richiesta riceve una risposta, anche se non aggiornata). I database NoSQL spesso scelgono AP (es. Cassandra, DynamoDB) o CP (es. HBase, Zookeeper). I RDBMS tradizionali privilegiano CA, ma non scalano su partizioni di rete.",
    tags: ["cap-theorem", "sistemi-distribuiti", "nosql"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_006",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "database",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la differenza principale tra proprietà ACID (database relazionali) e BASE (database NoSQL)?",
    options: [
      "ACID garantisce transazioni forti (atomicità, consistenza, isolamento, durabilità); BASE accetta consistenza eventuale (Basically Available, Soft state, Eventually consistent) per ottenere maggiore scalabilità.",
      "ACID è pensato per sistemi distribuiti su molti nodi; BASE è pensato per database su singolo nodo.",
      "BASE offre maggiori garanzie di durabilità rispetto ad ACID grazie alla replica su più nodi.",
      "ACID e BASE sono equivalenti: BASE è semplicemente un'implementazione moderna di ACID."
    ],
    correct: 0,
    explanation: "ACID (Atomicity, Consistency, Isolation, Durability) garantisce transazioni rigide tipiche di RDBMS. BASE (Basically Available, Soft state, Eventually consistent) è il compromesso dei sistemi NoSQL: accettano che i dati possano non essere immediatamente consistenti su tutti i nodi (consistenza eventuale) in cambio di alta disponibilità e scalabilità orizzontale.",
    tags: ["acid", "base", "nosql", "database", "consistenza"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_007",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "architetture_cloud",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In un'architettura a microservizi, quale pattern viene utilizzato per garantire che ogni servizio abbia la propria istanza di database, evitando accoppiamento diretto tra servizi?",
    options: [
      "Database per Service pattern.",
      "Shared Database pattern.",
      "Saga pattern.",
      "CQRS (Command Query Responsibility Segregation)."
    ],
    correct: 0,
    explanation: "Il pattern 'Database per Service' assegna a ogni microservizio il proprio storage privato (relazionale, NoSQL, ecc.). Nessun altro servizio può accedere direttamente a quel database: la comunicazione avviene solo tramite API. Questo garantisce loose coupling ma introduce la necessità di gestire la consistenza distribuita (tramite Saga pattern, event sourcing, ecc.).",
    tags: ["microservizi", "database-per-service", "architetture-distribuite"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_008",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "architetture_cloud",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Cosa si intende per Software Defined Networking (SDN)?",
    options: [
      "Un'architettura di rete in cui il piano di controllo (control plane) è separato dal piano dati (data plane) e centralizzato in un controller programmabile.",
      "Un tipo di rete interamente virtuale che funziona solo in ambienti cloud pubblici.",
      "Un protocollo di rete che sostituisce TCP/IP per ottenere maggiore flessibilità nella gestione dei pacchetti.",
      "Un approccio in cui ogni switch di rete incorpora la propria logica di controllo autonoma, eliminando la necessità di un controller centrale."
    ],
    correct: 0,
    explanation: "In SDN il control plane (che decide come instradare i pacchetti) è separato dal data plane (che esegue l'instradamento) e centralizzato in un controller SDN (es. OpenDaylight, ONOS). I dispositivi di rete diventano semplici forwarding devices programmabili tramite protocolli come OpenFlow. Questo permette gestione centralizzata, automazione e programmabilità della rete.",
    tags: ["sdn", "networking", "cloud", "infrastruttura"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_009",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "ingegneria_software",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Quale dei seguenti principi SOLID afferma che una classe dovrebbe dipendere da astrazioni, non da implementazioni concrete?",
    options: [
      "Dependency Inversion Principle (DIP).",
      "Open/Closed Principle (OCP).",
      "Interface Segregation Principle (ISP).",
      "Liskov Substitution Principle (LSP)."
    ],
    correct: 0,
    explanation: "Il Dependency Inversion Principle (DIP) stabilisce che: (1) i moduli di alto livello non devono dipendere da moduli di basso livello — entrambi devono dipendere da astrazioni; (2) le astrazioni non devono dipendere dai dettagli, ma i dettagli dalle astrazioni. Si implementa tramite dependency injection e interfacce/classi astratte.",
    tags: ["solid", "dip", "ingegneria-software", "design"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_010",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "reti",
    type: "multiple_choice",
    difficulty: "easy",
    question: "In una comunicazione HTTPS, quale protocollo fornisce autenticazione e cifratura del canale?",
    options: [
      "TLS (Transport Layer Security).",
      "IPSec al livello di rete.",
      "SSH (Secure Shell) tunnel.",
      "DNSSEC per l'autenticazione dei record DNS."
    ],
    correct: 0,
    explanation: "HTTPS = HTTP + TLS. TLS opera al livello di trasporto (o tra livello 4 e 7 nel modello OSI) e fornisce: autenticazione del server tramite certificati X.509, negoziazione di cifratura simmetrica per i dati (AES-GCM tipicamente) e integrità tramite HMAC. La versione corrente è TLS 1.3 (RFC 8446, 2018).",
    tags: ["tls", "https", "reti", "crittografia"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_011",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "ingegneria_software",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la differenza tra un'API REST e GraphQL?",
    options: [
      "REST espone risorse tramite endpoint multipli con operazioni HTTP standard; GraphQL espone un singolo endpoint dove il client specifica esattamente i dati che vuole tramite query, evitando over-fetching e under-fetching.",
      "GraphQL è un protocollo di trasporto alternativo a HTTP; REST usa sempre JSON mentre GraphQL usa XML.",
      "REST è pensato solo per applicazioni mobile; GraphQL è pensato solo per web browser.",
      "In GraphQL non è possibile eseguire operazioni di scrittura (mutation); REST supporta CRUD completo."
    ],
    correct: 0,
    explanation: "REST usa endpoint multipli (es. /users, /orders/123) con HTTP verbs. GraphQL usa un singolo endpoint /graphql dove il client descrive esattamente la struttura dei dati desiderati. GraphQL risolve over-fetching (ricevere dati non necessari) e under-fetching (dover fare N+1 richieste). Supporta query (lettura), mutation (scrittura) e subscription (real-time). Principale svantaggio: caching più complesso rispetto a REST.",
    tags: ["rest", "graphql", "api", "architetture-applicative"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_012",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "sistemi_distribuiti",
    type: "multiple_choice",
    difficulty: "hard",
    question: "In un sistema di container orchestration (es. Kubernetes), cosa si intende per 'liveness probe' e come differisce dalla 'readiness probe'?",
    options: [
      "La liveness probe verifica se il container è ancora in esecuzione e, in caso negativo, lo riavvia; la readiness probe verifica se il container è pronto a ricevere traffico e, in caso negativo, lo rimuove dal load balancer senza riavviarlo.",
      "La liveness probe verifica la disponibilità di memoria del nodo; la readiness probe verifica la disponibilità della CPU.",
      "Sono equivalenti: entrambe riavviano il container se il check fallisce.",
      "La readiness probe viene eseguita solo all'avvio del container; la liveness probe viene eseguita continuamente durante il ciclo di vita."
    ],
    correct: 0,
    explanation: "In Kubernetes: Liveness probe — se fallisce il kubelet uccide e riavvia il container (utile per rilevare deadlock o stati irrecuperabili). Readiness probe — se fallisce il container viene rimosso dagli endpoint del Service (niente traffico) senza riavvio (utile durante warmup o quando dipende da un servizio esterno temporaneamente non disponibile). Esiste anche la startup probe per gestire applicazioni con startup lento.",
    tags: ["kubernetes", "container", "cloud", "orchestrazione"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_013",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "paradigmi_programmazione",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In programmazione funzionale, cosa si intende per 'funzione pura'?",
    options: [
      "Una funzione che per gli stessi argomenti ritorna sempre lo stesso risultato e non produce side effects (non modifica stato esterno, non fa I/O).",
      "Una funzione che accetta come argomenti solo tipi primitivi (int, float, bool).",
      "Una funzione che può essere eseguita in parallelo senza sincronizzazione perché non usa variabili condivise.",
      "Una funzione matematicamente dimostrabile come corretta tramite verifica formale."
    ],
    correct: 0,
    explanation: "Una funzione pura ha due proprietà: (1) determinismo — output dipende solo dagli input, nessuna variabile globale; (2) no side effects — non modifica stato esterno (no I/O, no mutazione di variabili, no eccezioni). Le funzioni pure sono facilmente testabili, componibili e parallelizzabili. Sono il fondamento di linguaggi come Haskell e Erlang, e ampiamente usate in React (reducer), Spark (trasformazioni RDD) e pipeline ML.",
    tags: ["functional-programming", "pure-function", "paradigmi"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_014",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "sicurezza_software",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Quale delle seguenti è la principale contromisura contro le vulnerabilità di tipo SQL Injection?",
    options: [
      "Uso di prepared statements (query parametrizzate), che separano il codice SQL dai dati in input.",
      "Cifratura del database con AES-256.",
      "Validazione della lunghezza massima degli input dell'utente.",
      "Utilizzo di HTTPS invece di HTTP per la trasmissione dei dati."
    ],
    correct: 0,
    explanation: "I prepared statements (o parameterized queries) separano struttura SQL da dati: il driver del database tratta i parametri come dati puri, mai come codice SQL. Anche con input malevolo come \"'; DROP TABLE users; --\", il database lo interpreta come stringa, non come SQL. Le altre misure (cifratura, HTTPS, validazione lunghezza) sono utili ma non prevengono SQL injection.",
    tags: ["sql-injection", "sicurezza", "owasp", "prepared-statements"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_015",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "algoritmi_strutture_dati",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Un problema è detto NP-completo se soddisfa due condizioni. Quali?",
    options: [
      "È nella classe NP (verificabile in tempo polinomiale) e ogni problema in NP è riducibile ad esso in tempo polinomiale.",
      "È risolvibile in tempo esponenziale e non esiste algoritmo deterministico polinomiale noto.",
      "È nella classe NP e la sua soluzione ottima è approssimabile entro un fattore costante.",
      "È risolvibile in tempo O(n!) e appartiene alla classe PSPACE."
    ],
    correct: 0,
    explanation: "Un problema X è NP-completo se: (1) X ∈ NP — una soluzione candidata può essere verificata in tempo polinomiale; (2) X è NP-hard — ogni problema Y in NP si riduce a X in tempo polinomiale (X è almeno difficile quanto ogni altro problema in NP). Esempi classici: SAT (Cook-Levin theorem), Clique, Vertex Cover, Travelling Salesman (versione decisionale). Se si trovasse un algoritmo polinomiale per un NP-completo, P = NP.",
    tags: ["complessità", "np-completo", "p-vs-np", "teoria-della-computazione"],
    added_date: "2026-05-17"
  },

  // ─── AMBITO 2: CRITTOGRAFIA, DLT, PRIVACY ────────────────────────────────

  {
    id: "BI_A_CDL_001",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "blockchain_fondamenti",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In una blockchain come Bitcoin, cosa garantisce l'immutabilità dei blocchi già confermati?",
    options: [
      "Ogni blocco contiene l'hash del blocco precedente; modificare un blocco invalida gli hash di tutti i blocchi successivi, rendendo la modifica computazionalmente impraticabile.",
      "I blocchi sono cifrati con AES-256 e solo i miner possono decifrarli per leggerli.",
      "La rete utilizza firme digitali RSA-4096 su ogni transazione, impedendo qualsiasi alterazione.",
      "I blocchi sono replicati su tutti i nodi e la maggioranza semplice dei nodi vota per bloccare le modifiche."
    ],
    correct: 0,
    explanation: "Ogni blocco contiene: dati delle transazioni, timestamp, nonce e l'hash del blocco precedente (formando la 'catena'). Se si modifica anche un solo bit in un blocco storico, il suo hash cambia, rendendo invalido l'hash nel blocco successivo, che a sua volta invalida il successivo, ecc. Per riscrivere la storia occorre rifare il proof-of-work di tutti i blocchi successivi più velocemente dell'intera rete — impraticabile con >50% dell'hashrate onesto.",
    tags: ["blockchain", "immutabilità", "hash", "merkle-tree", "bitcoin"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_002",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "consenso_dlt",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Quale delle seguenti affermazioni descrive correttamente la differenza tra Proof-of-Work (PoW) e Proof-of-Stake (PoS)?",
    options: [
      "In PoW i validatori competono risolvendo un problema computazionale costoso (trovare un nonce che produca un hash con N zeri iniziali); in PoS i validatori vengono selezionati in base alla quantità di criptovaluta 'in stake', riducendo drasticamente il consumo energetico.",
      "In PoW chiunque può validare transazioni gratuitamente; in PoS occorre acquistare hardware specializzato (ASIC).",
      "PoS è usato da Bitcoin; PoW è usato da Ethereum dopo 'The Merge' del 2022.",
      "PoW garantisce finalità immediata (una transazione confermata non può mai essere annullata); PoS richiede più conferme per la sicurezza."
    ],
    correct: 0,
    explanation: "PoW (Bitcoin): i miner trovano un nonce tale che SHA256(SHA256(header)) < target. Consumo energetico enorme, sicurezza proporzionale all'hashrate. PoS (Ethereum post-Merge, Cardano): i validatori bloccano token come 'garanzia'; se validano disonestamente, perdono lo stake (slashing). Consumo energetico ~99.95% inferiore a PoW. Ethereum ha migrato a PoS con 'The Merge' nel settembre 2022.",
    tags: ["proof-of-work", "proof-of-stake", "consenso", "blockchain", "ethereum"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_003",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "smart_contracts",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Qual è la vulnerabilità di 'reentrancy' negli smart contracts Ethereum e come si mitigazione?",
    options: [
      "Un contratto malevolo richiama ricorsivamente una funzione del contratto vittima (es. withdraw) prima che lo stato venga aggiornato, prosciugando i fondi. Mitigazione: aggiornare lo stato prima di trasferire fondi (checks-effects-interactions pattern) o usare un reentrancy guard.",
      "Un attaccante intercetta le transazioni nella mempool e le riordina per guadagnare (front-running). Mitigazione: usare commit-reveal scheme.",
      "Un overflow di interi in Solidity cause by arithmetic operations resulting in incorrect balance calculations. Mitigazione: usare SafeMath library.",
      "Un contratto perde accesso ai propri fondi perché le chiavi private del deployer vengono perse. Mitigazione: usare contratti multi-sig."
    ],
    correct: 0,
    explanation: "Il famoso hack DAO (2016, ~60M USD persi) sfruttava reentrancy. Il pattern corretto è 'checks-effects-interactions': (1) verifica le condizioni (checks), (2) aggiorna lo stato del contratto (effects), (3) poi trasferisci ETH o chiama contratti esterni (interactions). In alternativa, si usa un reentrancy guard (mutex booleano). Da Solidity 0.8+ molti problemi sono mitigati ma reentrancy rimane rilevante.",
    tags: ["smart-contracts", "reentrancy", "solidity", "sicurezza", "ethereum"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_004",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "scaling_dlt",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Cosa sono i 'rollup' in ambito blockchain e come risolvono il problema della scalabilità?",
    options: [
      "I rollup eseguono le transazioni fuori dalla blockchain principale (off-chain) e pubblicano on-chain solo un dato compresso (proof o batch di dati), aumentando il throughput mantenendo la sicurezza del layer 1.",
      "I rollup sono nodi specializzati che memorizzano l'intera storia della blockchain in forma compressa per ridurre i requisiti di storage.",
      "I rollup sono soluzioni di sharding che dividono la blockchain in partizioni parallele, ognuna con il proprio set di validatori.",
      "I rollup sono canali di pagamento peer-to-peer (come Lightning Network) che evitano la blockchain per le micropagamenti."
    ],
    correct: 0,
    explanation: "Esistono due tipi: Optimistic Rollup (Arbitrum, Optimism) — assume che le transazioni siano valide, pubblica dati compressi su L1 e ha un periodo di challenge di ~7 giorni; ZK-Rollup (zkSync, StarkNet, Polygon zkEVM) — produce una prova crittografica (zkSNARK/zkSTARK) che certifica la correttezza delle transazioni, finalità immediata. Entrambi aumentano il throughput da ~15 TPS di Ethereum base a centinaia/migliaia di TPS.",
    tags: ["rollup", "layer2", "scaling", "zk-rollup", "optimistic-rollup", "blockchain"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_005",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "privacy_enhancing",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Cosa si intende per Zero-Knowledge Proof (ZKP) e quale proprietà fondamentale lo distingue da altri sistemi di prova crittografici?",
    options: [
      "Un ZKP permette a un prover di dimostrare a un verifier di conoscere un segreto senza rivelare alcuna informazione sul segreto stesso. La proprietà fondamentale è la zero-knowledge: il verifier non impara nulla oltre al fatto che l'affermazione è vera.",
      "Un ZKP è una firma digitale che prova l'autenticità di un documento senza rivelare l'identità del firmatario.",
      "Un ZKP è un protocollo di cifratura omomorfica che permette calcoli su dati cifrati senza decifrarli.",
      "Un ZKP è una prova formale che un algoritmo termina in tempo zero qualunque sia l'input."
    ],
    correct: 0,
    explanation: "Un ZKP soddisfa tre proprietà: (1) Completezza — se l'affermazione è vera, il prover onesto convincerà sempre il verifier; (2) Soundness — se l'affermazione è falsa, nessun prover disonesto può convincere il verifier (con probabilità negligibile); (3) Zero-knowledge — il verifier non apprende nulla di più che la veridicità dell'affermazione. Applicazioni: zkSNARK nelle blockchain (Zcash, zkRollup), login senza password, età senza rivelare data di nascita.",
    tags: ["zero-knowledge-proof", "zkp", "zksnark", "crittografia", "privacy"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_006",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "privacy_enhancing",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Cosa si intende per 'differential privacy' e come viene quantificata matematicamente?",
    options: [
      "Un meccanismo M soddisfa ε-differential privacy se per qualsiasi dataset D1 e D2 che differiscono per un solo elemento e per qualsiasi output S: P[M(D1)∈S] ≤ exp(ε) · P[M(D2)∈S]. Un ε piccolo garantisce maggiore privacy ma introduce più rumore.",
      "La differential privacy misura la differenza percentuale tra il dato originale e il dato cifrato dopo l'applicazione del meccanismo di protezione.",
      "È una tecnica che calcola la media differenziale tra query successive per rilevare attacchi di re-identificazione.",
      "È una proprietà che garantisce che due query identiche sullo stesso database restituiscano sempre risultati identici, proteggendo da attacchi di timing."
    ],
    correct: 0,
    explanation: "La differential privacy (Dwork, 2006) garantisce che la presenza o assenza di un singolo individuo nel dataset non cambi significativamente l'output. Il parametro ε (privacy budget) controlla il trade-off: ε→0 è privacy perfetta (output uguale indipendentemente dai dati), ε grande riduce il rumore ma aumenta il rischio. Si implementa aggiungendo rumore calibrato (meccanismo Laplaciano per dati numerici, meccanismo esponenziale per categorici). Apple e Google la usano per raccolta dati telemetrici.",
    tags: ["differential-privacy", "privacy", "privacy-enhancing-technologies", "epsilon"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_007",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "crittografia_post_quantum",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Perché la crittografia RSA è vulnerabile ai computer quantistici e quale algoritmo quantistico costituisce la minaccia principale?",
    options: [
      "L'algoritmo di Shor permette a un computer quantistico di fattorizzare numeri interi grandi in tempo polinomiale, rompendo RSA e ECC che si basano sulla difficoltà di fattorizzazione e del logaritmo discreto.",
      "L'algoritmo di Grover riduce il tempo di ricerca di chiavi da O(2^n) a O(2^(n/2)), dimezzando la sicurezza di RSA e richiedendo chiavi doppie.",
      "I computer quantistici possono eseguire forza bruta su RSA-2048 in pochi secondi grazie alla parallelizzazione quantistica tramite gate Hadamard.",
      "L'interferenza quantistica permette di calcolare la chiave privata RSA direttamente dalla chiave pubblica tramite trasformata di Fourier quantistica."
    ],
    correct: 0,
    explanation: "L'algoritmo di Shor (1994) fattorizza interi in O((log N)^3) operazioni quantistiche — polinomiale. RSA si basa su IFP (Integer Factorization Problem) e ECC su ECDLP (Elliptic Curve Discrete Logarithm Problem), entrambi risolvibili da Shor. Il NIST ha standardizzato nel 2024 i primi algoritmi post-quantum: CRYSTALS-Kyber (ML-KEM) per key encapsulation e CRYSTALS-Dilithium (ML-DSA) per firme digitali, basati su problemi di reticoli (lattice problems) resistenti agli attacchi quantistici.",
    tags: ["post-quantum", "rsa", "shor", "nist-pqc", "crittografia"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_008",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "blockchain_fondamenti",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la differenza tra una blockchain permissionless (pubblica) e una permissioned (privata/consortium)?",
    options: [
      "In una blockchain permissionless chiunque può partecipare come nodo e validatore senza autorizzazione (es. Bitcoin, Ethereum); in una permissioned l'accesso è controllato da un'autorità centrale o consorzio e solo nodi approvati possono partecipare (es. Hyperledger Fabric, R3 Corda).",
      "Le blockchain permissioned non usano crittografia perché operano in ambienti trusted; quelle permissionless cifrano tutti i dati.",
      "Le blockchain permissioned sono sempre più lente di quelle permissionless perché richiedono approvazione per ogni transazione.",
      "Solo le blockchain permissionless supportano smart contracts; quelle permissioned supportano solo semplici trasferimenti di token."
    ],
    correct: 0,
    explanation: "Permissionless: accesso aperto, pseudonimità, consenso trustless (PoW/PoS), throughput limitato, immutabilità forte. Usate per criptovalute e DeFi. Permissioned: partecipanti noti e identificati, consenso efficiente (PBFT, Raft), throughput elevato, governance centralizzata o consortile, adatte ad ambiti enterprise (supply chain, finanza, sanità). Hyperledger Fabric (IBM) e Corda (R3) sono esempi di blockchain permissioned usate in ambito bancario.",
    tags: ["blockchain", "permissioned", "permissionless", "hyperledger", "dlt"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_009",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "crittografia_fondamenti",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In una PKI (Public Key Infrastructure), qual è il ruolo di una Certificate Authority (CA) e cosa contiene un certificato X.509?",
    options: [
      "La CA è un'entità fidata che emette certificati digitali firmando con la propria chiave privata l'associazione tra una chiave pubblica e l'identità del titolare. Un certificato X.509 contiene: chiave pubblica del titolare, identità del titolare (Subject DN), identità della CA (Issuer DN), periodo di validità, numero seriale e firma digitale della CA.",
      "La CA è un server che gestisce la distribuzione simmetrica delle chiavi tramite protocollo Kerberos. Un certificato X.509 contiene la chiave simmetrica cifrata con la chiave pubblica del destinatario.",
      "La CA verifica i certificati a runtime controllando la blockchain pubblica dove sono registrati. Un certificato X.509 contiene solo la firma HMAC delle transazioni autorizzate.",
      "La CA genera dinamicamente coppie di chiavi pubbliche/private per ogni sessione TLS. Un certificato X.509 contiene la chiave di sessione AES temporanea."
    ],
    correct: 0,
    explanation: "La PKI è la gerarchia di fiducia che permette la comunicazione sicura su Internet. La CA radice (Root CA) firma i certificati delle CA intermedie, che firmano i certificati degli utenti finali. Il certificato X.509 v3 contiene anche estensioni come Subject Alternative Names (SAN), Key Usage, Extended Key Usage. La revoca dei certificati avviene tramite CRL (Certificate Revocation List) o OCSP (Online Certificate Status Protocol).",
    tags: ["pki", "ca", "x509", "certificati", "tls", "crittografia"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_010",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "privacy_enhancing",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Cosa si intende per 'homomorphic encryption' (cifratura omomorfica) e qual è la sua principale applicazione pratica?",
    options: [
      "La cifratura omomorfica permette di eseguire calcoli sui dati cifrati ottenendo un risultato cifrato che, una volta decifrato, coincide con il risultato degli stessi calcoli sui dati in chiaro. Applicazione principale: esternalizzare calcoli a cloud non trusted senza rivelare i dati.",
      "La cifratura omomorfica è una tecnica che cifra i dati in modo che due testi cifrati identici producano sempre lo stesso output, rendendo possibile la verifica di uguaglianza senza decifrare.",
      "È una forma di cifratura che permette la decifratura parziale da parte di più entità (threshold decryption) senza che nessuna singola entità conosca la chiave completa.",
      "È una tecnica che cifra i dati strutturati (come database) preservando l'ordine dei valori originali, permettendo query di range su dati cifrati."
    ],
    correct: 0,
    explanation: "La FHE (Fully Homomorphic Encryption, Gentry 2009) supporta operazioni arbitrarie su dati cifrati. Esistono anche PHE (Partially HE, solo addizione o moltiplicazione) come Paillier (additivo, usato in federated learning) e SHE (Somewhat HE). La FHE è ancora computazionalmente costosa (~10^6x overhead), ma si usa in contesti con dati sensibili: diagnostica medica su cloud, calcolo di modelli ML senza accedere ai dati del paziente.",
    tags: ["homomorphic-encryption", "fhe", "privacy", "cloud-computing"],
    added_date: "2026-05-17"
  },

  // ─── AMBITO 3: INTELLIGENZA ARTIFICIALE, ML, DATA SCIENCE ───────────────

  {
    id: "BI_A_IML_001",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "big_data",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Nell'architettura Lambda per il processing di big data, quali sono i tre layer principali e qual è il ruolo di ciascuno?",
    options: [
      "Batch layer: processa dati storici completi producendo batch views accurate; Speed layer: processa dati in real-time con bassa latenza producendo real-time views; Serving layer: unisce batch e real-time views per rispondere alle query.",
      "Ingestion layer: raccoglie i dati da sorgenti diverse; Processing layer: li trasforma con MapReduce; Storage layer: li archivia in HDFS per l'accesso futuro.",
      "Raw layer: mantiene i dati grezzi immutabili; Refined layer: applica trasformazioni e deduplicazione; Analytics layer: esegue query OLAP sulle tabelle aggregate.",
      "Stream layer: processa eventi in tempo reale con Apache Kafka; Batch layer: esegue job MapReduce periodici; ML layer: addestra modelli sui dati aggregati."
    ],
    correct: 0,
    explanation: "Lambda architecture (Nathan Marz): Batch layer — rielabora tutti i dati storici periodicamente (alta accuratezza, alta latenza, tipicamente Hadoop/Spark). Speed layer — processa solo i dati recenti in streaming (bassa latenza, approssimativo, tipicamente Spark Streaming/Flink). Serving layer — risponde alle query combinando batch views + real-time views. Svantaggio: mantiene due codebase parallele. L'architettura Kappa (solo streaming) risolve questo problema ma è più complessa da implementare correttamente.",
    tags: ["lambda-architecture", "big-data", "batch", "streaming", "hadoop", "spark"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_002",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "big_data",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In Apache Spark, qual è la differenza tra un RDD (Resilient Distributed Dataset) e un DataFrame?",
    options: [
      "Un RDD è la struttura dati di basso livello di Spark — una collezione distribuita e immutabile di oggetti Python/Java/Scala non tipizzata. Un DataFrame è una struttura di alto livello con schema definito (colonne tipizzate), ottimizzata dal Catalyst optimizer, molto più efficiente per query SQL-like.",
      "Un RDD è in memoria; un DataFrame è su disco. RDD è più veloce per operazioni di streaming; DataFrame è ottimizzato per batch.",
      "Un RDD supporta operazioni distribuite; un DataFrame no, esegue tutto su un singolo nodo driver.",
      "RDD e DataFrame sono equivalenti dal punto di vista delle performance: DataFrame è solo un'interfaccia più user-friendly con metodi SQL."
    ],
    correct: 0,
    explanation: "RDD (Spark 1.x): distribuzione di oggetti arbitrari, type-safe in Scala ma senza schema, il Catalyst non può ottimizzare. DataFrame (Spark 2.x+): dati strutturati con schema, ottimizzati dal Catalyst optimizer e Tungsten execution engine — tipicamente 10-100x più veloce di RDD equivalente. Dataset (Scala/Java) combina il meglio dei due: schema strutturato + type safety. Per nuovi progetti si usa quasi sempre DataFrame/Dataset API.",
    tags: ["apache-spark", "rdd", "dataframe", "big-data", "catalyst"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_003",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "knowledge_representation",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la differenza principale tra un knowledge graph e un vector database in ambito AI?",
    options: [
      "Un knowledge graph è una rappresentazione strutturata di entità e relazioni esplicite (triple soggetto-predicato-oggetto, es. RDF/OWL); un vector database indicizza embedding vettoriali per ricerca semantica per similarità (cosine, dot product). Sono complementari: il KG fornisce relazioni strutturate, il vector DB similarità semantica.",
      "Un knowledge graph è una versione ottimizzata del vector database per query SPARQL; un vector database è un knowledge graph che usa vettori invece di grafi per la rappresentazione.",
      "Un knowledge graph è usato solo per NLP; un vector database è usato solo per computer vision.",
      "Un knowledge graph scala a miliardi di triple ma non supporta query semantiche; un vector database scala solo a milioni di vettori ma supporta ricerca per similarità."
    ],
    correct: 0,
    explanation: "Knowledge graph (Neo4j, Amazon Neptune, Wikidata): entità e relazioni esplicite, query SPARQL/Cypher, ragionamento logico (inferenza, deduplication), interpretabilità. Vector DB (Pinecone, Weaviate, Chroma, pgvector): embedding da modelli ML, ANN search (HNSW, IVF), scalabilità a miliardi di vettori. In architetture RAG avanzate si usano entrambi: il vector DB per il retrieval semantico, il KG per arricchire il contesto con relazioni esplicite (GraphRAG).",
    tags: ["knowledge-graph", "vector-database", "rag", "embedding", "rdf", "owl"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_004",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "llm_foundation_models",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Cosa si intende per 'Foundation Model' e come differisce dai modelli ML tradizionali?",
    options: [
      "Un Foundation Model è un modello pre-addestrato su dati vasti e diversificati tramite self-supervision, che può essere adattato (fine-tuned o prompting) a molteplici task senza riaddestramento da zero. I modelli tradizionali sono addestrati su dataset specifici per un singolo task.",
      "Un Foundation Model è qualsiasi modello con più di 1 miliardo di parametri; i modelli tradizionali hanno meno parametri.",
      "Un Foundation Model usa sempre reinforcement learning from human feedback (RLHF); i modelli tradizionali usano supervised learning su dati etichettati.",
      "Un Foundation Model è un modello open-source che fornisce le basi per costruire modelli proprietari; i modelli tradizionali sono sempre proprietari."
    ],
    correct: 0,
    explanation: "Il termine 'Foundation Model' (Bommasani et al., Stanford 2021) descrive modelli come GPT-4, BERT, DALL-E, CLIP: addestrati su dati vastissimi (web, libri, codice, immagini) con self-supervised learning (next-token prediction, masked LM, contrastive learning). L'emergenza è la proprietà chiave: capacità non presenti nei dati di training compaiono a scale di parametri sufficienti. Si adattano tramite: zero-shot/few-shot prompting, fine-tuning, RLHF, RAG.",
    tags: ["foundation-models", "llm", "transfer-learning", "emergent-capabilities"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_005",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "data_mining",
    type: "multiple_choice",
    difficulty: "medium",
    question: "L'algoritmo Apriori per il mining di regole associative utilizza un principio fondamentale. Quale?",
    options: [
      "Il principio di anti-monotonicità (downward closure): se un itemset è infrequente, tutti i suoi superset sono infrequenti. Questo permette di potare lo spazio di ricerca senza esaminare tutti i 2^n itemset possibili.",
      "Il principio di massima verosimiglianza: tra tutti gli itemset frequenti, Apriori seleziona quelli con il più alto valore di lift.",
      "Il principio di separabilità: Apriori divide il dataset in partizioni parallele, calcola itemset frequenti localmente e poi li combina.",
      "Il principio di convergenza: Apriori itera sui dati finché il supporto degli itemset non converge a un valore stabile tra iterazioni successive."
    ],
    correct: 0,
    explanation: "Apriori (Agrawal & Srikant, 1994): genera iterativamente candidati k-itemset dagli (k-1)-itemset frequenti. La chiave è il principio di anti-monotonicità: se {latte} è infrequente, anche {latte, pane} è infrequente — non serve testarlo. Metriche chiave: Support = P(A∪B), Confidence = P(B|A) = Support(A∪B)/Support(A), Lift = Confidence/P(B). Svantaggio: molti scan del database. FP-Growth è alternativo e molto più efficiente (usa FP-tree, nessuna generazione di candidati).",
    tags: ["apriori", "data-mining", "regole-associative", "frequent-itemset"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_006",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "agenti_autonomi",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In un sistema multi-agente BDI (Belief-Desire-Intention), cosa rappresentano i tre componenti?",
    options: [
      "Belief: la conoscenza dell'agente sullo stato del mondo; Desire: gli obiettivi che l'agente vuole raggiungere; Intention: i piani che l'agente si è impegnato a eseguire per raggiungere i desideri.",
      "Belief: la certezza probabilistica di ogni azione; Desire: le azioni disponibili all'agente; Intention: la sequenza di azioni selezionate dal planner.",
      "Belief: i dati di addestramento dell'agente; Desire: la funzione di reward; Intention: la policy appresa tramite reinforcement learning.",
      "Belief: i messaggi ricevuti da altri agenti; Desire: le risorse disponibili nell'ambiente; Intention: il protocollo di comunicazione scelto."
    ],
    correct: 0,
    explanation: "L'architettura BDI (Rao & Georgeff, 1991) modella agenti razionali: Beliefs — rappresentazione parziale e potenzialmente imperfetta dello stato del mondo (si aggiornano con la percezione); Desires — stati del mondo che l'agente vuole raggiungere (goal multipli, potenzialmente in conflitto); Intentions — subset dei desires per cui l'agente si è impegnato con un piano concreto. Il ciclo BDI: percezione → aggiornamento beliefs → deliberazione (selezione desires) → means-end reasoning (generazione intentions/piani) → esecuzione. Implementazioni: JASON, Jadex, AgentSpeak.",
    tags: ["bdi", "agenti-autonomi", "sistemi-multiagente", "ai-simbolica"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_007",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "generazione_dati_sintetici",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Perché la generazione di dati sintetici è particolarmente utile in contesti finanziari/bancari?",
    options: [
      "Permette di creare dataset di addestramento per modelli ML rispettando la privacy (GDPR), risolvendo problemi di class imbalance (es. frodi rare) e testando sistemi su scenari rari senza attendere eventi reali.",
      "I dati sintetici sono sempre più accurati dei dati reali perché non contengono errori di acquisizione o rumore di misura.",
      "La generazione sintetica permette di aggirare le normative GDPR eliminando la necessità di anonimizzazione dei dati reali.",
      "I dati sintetici vengono usati esclusivamente per il test dei sistemi di produzione, mai per l'addestramento di modelli ML."
    ],
    correct: 0,
    explanation: "In ambito bancario/finanziario i dati sintetici risolvono: (1) Privacy — i dati finanziari sono sensibili, i dati sintetici non contengono PII reali; (2) Scarsità — le frodi sono ~0.1% delle transazioni, i dati sintetici bilanciano le classi; (3) Scenari rari — simulare crisi di mercato, stress test; (4) Collaborazione — condividere dataset sintetici tra banche senza rivelare dati clienti. Tecniche: CTGAN, TVAE (dati tabulari), CopulaGAN. Rischio principale: i dati sintetici possono non catturare correlazioni reali complesse.",
    tags: ["dati-sintetici", "gan", "privacy", "class-imbalance", "fintech"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_008",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "llm_foundation_models",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Cosa si intende per 'emergent capabilities' nei Large Language Models e quale ipotesi è stata avanzata sulla loro origine?",
    options: [
      "Capacità che non sono presenti nei modelli più piccoli e non sono predette dal semplice scaling, ma emergono improvvisamente al superamento di una certa soglia di parametri/dati. L'ipotesi dominante è che emergano da combinazioni di capacità più semplici già presenti.",
      "Capacità dei LLM di generare codice emergono automaticamente durante il fine-tuning su dati di programmazione senza essere state esplicitamente addestrate su task di coding.",
      "Capacità che emergono spontaneamente durante l'inferenza per effetto dell'in-context learning, senza che siano presenti nei pesi del modello.",
      "Capacità di ragionamento che emergono esclusivamente con RLHF e non sono presenti nei modelli pre-addestrati solo con next-token prediction."
    ],
    correct: 0,
    explanation: "Wei et al. (2022) documentano capacità emergenti in LLM: arithmetic reasoning, chain-of-thought, few-shot learning, language grounding. Compaiono bruscamente dopo una soglia di scale (parametri + dati + compute). Il dibattito è aperto: Schaeffer et al. (2023) sostengono che l'emergenza sia in parte un artefatto delle metriche non lineari usate. Le leggi di scaling (Kaplan et al., OpenAI) predicono performance continue ma non catturano queste discontinuità qualitative.",
    tags: ["emergent-capabilities", "llm", "scaling-laws", "foundation-models"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_009",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "ml_fondamenti",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la differenza tra bagging e boosting come tecniche di ensemble learning?",
    options: [
      "Bagging addestra modelli base in parallelo su sottocampioni bootstrap indipendenti e combina le predizioni con averaging/voting (riduce varianza); boosting addestra modelli base sequenzialmente, con ogni modello che si concentra sugli errori del precedente (riduce bias).",
      "Bagging usa sempre decision tree come modello base; boosting può usare qualsiasi modello incluse reti neurali.",
      "Bagging combina predizioni con un meta-learner addestrato sulle predizioni out-of-fold; boosting usa una media pesata fissa.",
      "Boosting è una versione parallela e ottimizzata di bagging; la differenza è solo implementativa, non concettuale."
    ],
    correct: 0,
    explanation: "Bagging (Bootstrap AGGregating, Breiman 1996): N modelli in parallelo su sottocampioni con rimpiazzo → riduce varianza (utile per modelli ad alta varianza come deep trees). Esempio: Random Forest aggiunge anche feature subsampling. Boosting (Freund & Schapire, AdaBoost 1995; Friedman, Gradient Boosting 2001): ogni modello peso gli esempi misclassificati dal precedente → riduce bias. Esempi: AdaBoost, Gradient Boosting, XGBoost, LightGBM, CatBoost. Stacking: usa un meta-modello per combinare le predizioni degli ensemble.",
    tags: ["ensemble", "bagging", "boosting", "random-forest", "gradient-boosting", "xgboost"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_010",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "ml_fondamenti",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la differenza tra K-means e DBSCAN come algoritmi di clustering?",
    options: [
      "K-means richiede di specificare K (numero di cluster), assume cluster sferici e con varianza simile, è sensibile agli outlier; DBSCAN scopre automaticamente il numero di cluster, identifica cluster di forma arbitraria e tratta i punti isolati come rumore (outlier).",
      "K-means è un algoritmo gerarchico agglomerativo; DBSCAN è un algoritmo partizionale che richiede K in input.",
      "DBSCAN funziona solo su dati in 2D; K-means funziona su dati ad alta dimensionalità.",
      "K-means è deterministico e converge sempre allo stesso risultato; DBSCAN è stocastico e produce risultati diversi a ogni esecuzione."
    ],
    correct: 0,
    explanation: "K-means: minimizza la somma delle distanze intra-cluster (WCSS), inizializzazione random (K-means++ per migliorare), O(n·k·i·d) per n punti, k cluster, i iterazioni, d dimensioni. Assume cluster convessi e simili. DBSCAN (Ester et al., 1996): un punto è 'core' se ha almeno minPts vicini entro distanza ε; espande i cluster dai core points. Vantaggi: scopre forma arbitraria, rumore gestito. Svantaggio: difficile scegliere ε e minPts, non scala bene ad alta dimensionalità (curse of dimensionality). HDBSCAN risolve il problema della scelta di ε.",
    tags: ["clustering", "k-means", "dbscan", "unsupervised-learning"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_011",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "llm_foundation_models",
    type: "multiple_choice",
    difficulty: "hard",
    question: "In un sistema di Retrieval-Augmented Generation (RAG), qual è il problema del 'lost in the middle' e come si affronta?",
    options: [
      "I LLM tendono ad ignorare le informazioni posizionate nel mezzo di un contesto lungo, prestando più attenzione all'inizio e alla fine. Si affronta con: re-ranking dei documenti (mettere i più rilevanti agli estremi), context compression o uso di modelli con migliore long-context attention.",
      "Il problema del 'lost in the middle' indica che i documenti recuperati dal retriever non vengono trovati nel vector database se sono stati inseriti in un batch intermedio.",
      "I documenti troppo lunghi vengono troncati a metà dal tokenizer prima di essere passati al LLM, perdendo informazioni cruciali nella seconda metà.",
      "Il modello RAG fatica a combinare informazioni da più documenti quando queste appaiono in paragrafi centrali non adiacenti all'inizio di ciascun documento."
    ],
    correct: 0,
    explanation: "Liu et al. (2023) 'Lost in the Middle': i LLM degradano le performance quando le informazioni rilevanti sono nel mezzo di contesti lunghi (U-shaped performance). Soluzioni: (1) Re-ranking con modelli cross-encoder (ms-marco-MiniLM) per mettere i documenti più rilevanti agli estremi; (2) Context compression con LLMLingua o Recomp; (3) Modelli con better long-context attention come Gemini 1.5 (1M token) o Claude con extended context.",
    tags: ["rag", "llm", "long-context", "retrieval", "lost-in-the-middle"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_012",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "big_data",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In Apache Kafka, cosa si intende per 'consumer group' e quale problema risolve?",
    options: [
      "Un consumer group è un insieme di consumer che cooperano per leggere i messaggi da un topic: ogni partizione viene assegnata a un solo consumer del gruppo, permettendo il processing parallelo e scalabile dei messaggi. Se un consumer fallisce, le sue partizioni vengono riassegnate (rebalancing).",
      "Un consumer group è un cluster di broker Kafka che cooperano per replicare le partizioni di un topic su più nodi.",
      "Un consumer group è un'astrazione che permette a più applicazioni diverse di leggere lo stesso messaggio da Kafka in broadcast, senza che si consumino a vicenda.",
      "Un consumer group è la configurazione che specifica il numero minimo di consumer necessari prima che Kafka inizi a produrre messaggi su un topic."
    ],
    correct: 0,
    explanation: "Kafka: ogni topic ha N partizioni. Un consumer group ha M consumer. Kafka assegna le partizioni ai consumer del gruppo (load balancing). Se M < N, alcuni consumer gestiscono più partizioni. Se M > N, alcuni consumer sono idle. Kafka mantiene l'offset per ogni (group, partition) — quindi group diversi leggono indipendentemente lo stesso topic (fan-out). Questo è il pattern fondamentale per stream processing scalabile: ogni microservizio ha il proprio consumer group e legge il topic che gli serve.",
    tags: ["kafka", "consumer-group", "streaming", "big-data", "message-queue"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_013",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "ml_fondamenti",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Cosa si intende per 'transfer learning' e quale tecnica specifica viene usata per adattare un LLM pre-addestrato a un task specifico con dati limitati?",
    options: [
      "Transfer learning riutilizza la conoscenza acquisita da un modello pre-addestrato su task/dati diversi. Per LLM con dati limitati si usa LoRA (Low-Rank Adaptation): si aggiungono matrici adattatori di basso rango ai layer del Transformer, riducendo i parametri addestrabili da miliardi a milioni, rendendo il fine-tuning accessibile.",
      "Il transfer learning trasferisce letteralmente i pesi da un modello a un altro tramite distillation; per LLM si usa sempre il fine-tuning completo di tutti i parametri.",
      "Il transfer learning per LLM si basa esclusivamente sul prompting: non si modificano mai i pesi del modello pre-addestrato.",
      "LoRA è una tecnica di quantizzazione che riduce i pesi del modello a 4 bit per adattarlo a GPU consumer; non è correlata al transfer learning."
    ],
    correct: 0,
    explanation: "LoRA (Hu et al., 2021): invece di aggiornare la matrice W∈ℝ^(d×k), si aggiunge ΔW = BA dove B∈ℝ^(d×r) e A∈ℝ^(r×k) con r<<min(d,k). Solo A e B vengono addestrati. Con r=8 e un LLM da 7B parametri, il numero di parametri addestrabili scende a ~4M vs 7B. QLoRA (Dettmers et al., 2023) combina quantizzazione 4-bit (NF4) con LoRA: permette fine-tuning di LLaMA 65B su una singola GPU da 48GB. Varianti: AdaLoRA (rango adattivo), LoRA+, DoRA.",
    tags: ["transfer-learning", "lora", "fine-tuning", "llm", "qlora"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_014",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "ia_deduttiva",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Qual è la differenza tra AI deduttiva (simbolica) e AI induttiva (connessionista/ML)?",
    options: [
      "L'AI deduttiva parte da regole esplicite (knowledge base) e inferisce conclusioni tramite logica formale (es. sistemi esperti, theorem provers); l'AI induttiva apprende regole/pattern impliciti dai dati tramite ottimizzazione statistica (es. reti neurali, ML).",
      "L'AI deduttiva usa reti neurali profonde con molti layer; l'AI induttiva usa shallow networks con un solo hidden layer.",
      "L'AI deduttiva funziona solo in domini chiusi con conoscenza completa; l'AI induttiva funziona in ambienti completamente sconosciuti senza nessuna prior knowledge.",
      "L'AI deduttiva è sempre più accurata dell'AI induttiva perché si basa su conoscenza esatta; l'AI induttiva commette sempre errori perché apprende da dati rumorosi."
    ],
    correct: 0,
    explanation: "AI simbolica (deduttiva, GOFAI): rappresentazione esplicita della conoscenza, inferenza logica, interpretabilità alta, difficoltà con incertezza e dati non strutturati. Esempi: MYCIN, Prolog, OWL reasoners, pianificatori STRIPS. AI connessionista (induttiva, ML/DL): apprende rappresentazioni dai dati, robusto al rumore, scalabile, black-box. L'AI generativa (GPT, DALL-E) è un terzo paradigma. Le tendenze recenti (neurosymbolic AI, AlphaCode, chain-of-thought) cercano di integrare i due approcci.",
    tags: ["ai-simbolica", "ai-connessionista", "sistemi-esperti", "knowledge-base"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_IML_015",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "ml_fondamenti",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Cos'è il 'distribution shift' e perché è critico per i sistemi AI in produzione?",
    options: [
      "Il distribution shift si verifica quando la distribuzione dei dati di input durante l'inferenza differisce dalla distribuzione dei dati di addestramento. Porta a degradazione delle performance spesso silenziosa — il modello produce output senza errori evidenti ma sbagliati. Richiede monitoring continuo e riaddestramenti periodici.",
      "Il distribution shift è un fenomeno che si verifica durante il fine-tuning: i pesi del modello si spostano dalla distribuzione iniziale pre-addestrata, causando catastrophic forgetting.",
      "Il distribution shift indica il momento in cui un modello in produzione viene sostituito da una nuova versione con distribuzione di pesi diversa, causando inconsistenza nelle predizioni.",
      "Il distribution shift è una tecnica di data augmentation che sposta artificialmente la distribuzione dei dati di addestramento per migliorare la generalizzazione."
    ],
    correct: 0,
    explanation: "Tipi di distribution shift: (1) Covariate shift — P(X) cambia ma P(Y|X) rimane stabile (es. stagionalità, cambio demografico degli utenti); (2) Label shift — P(Y) cambia (es. nuova categoria di frode); (3) Concept drift — la relazione P(Y|X) cambia nel tempo (es. il comportamento degli utenti evolve). In ambito finanziario è critico per modelli di credit scoring e fraud detection. Soluzioni: data drift monitoring (Evidently, WhyLabs), continuous learning, feature importance tracking.",
    tags: ["distribution-shift", "concept-drift", "mlops", "monitoring", "produzione"],
    added_date: "2026-05-17"
  }

];
