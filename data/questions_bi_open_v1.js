/**
 * Banca d'Italia — Profilo A: 10 Esperti ICT
 * Quesiti a risposta aperta — Batch iniziale (maggio 2026)
 *
 * Formato esame: scegliere 2 quesiti su 2 ambiti diversi (non nello stesso ambito).
 * La commissione propone 2 quesiti per ambito → 6 totali → si sceglie 1 per ambito.
 */

export const QUESTIONS_BI_OPEN_V1 = [

  // ─── AMBITO 1: COMPUTAZIONE, SOFTWARE, SISTEMI ───────────────────────────

  {
    id: "BI_A_CSS_OPEN_001",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "sistemi_distribuiti_cloud",
    type: "open",
    difficulty: "hard",
    question: "Si consideri un sistema bancario che deve migrare da un'architettura monolitica a un'architettura a microservizi su cloud. Il candidato:",
    sub_questions: [
      "a) Descriva i principali pattern architetturali da adottare nella migrazione (es. Strangler Fig, Database per Service, API Gateway, Saga) e le motivazioni per ciascuno.",
      "b) Illustri le principali sfide di sicurezza introdotte dall'architettura a microservizi rispetto al monolite e le contromisure adeguate.",
      "c) Descriva come garantire la consistenza dei dati in un sistema distribuito con microservizi che non condividono il database, facendo riferimento a pattern specifici.",
      "d) Proponga una strategia di monitoring e observability per il sistema cloud-native, indicando le metriche chiave (Golden Signals) e gli strumenti."
    ],
    hints: [
      "Strangler Fig: migrazione incrementale, non big-bang",
      "API Gateway: punto di ingresso unico, autenticazione centralizzata, rate limiting",
      "Saga pattern: gestire transazioni distribuite senza lock distribuiti (choreography vs orchestration)",
      "Service Mesh (Istio/Linkerd) per mutual TLS tra microservizi",
      "Golden Signals: latency, traffic, errors, saturation (Google SRE Book)",
      "Distributed tracing con OpenTelemetry, Jaeger, Zipkin"
    ],
    structure_guide: "Struttura risposta: (a) 3-4 pattern con motivazione; (b) OWASP Top 10 API + secrets management + mTLS; (c) Saga orchestration con compensating transactions; (d) Metriche + logging + tracing (3 pilastri observability). ~300 parole per punto.",
    key_points: [
      "Strangler Fig per migrazione incrementale senza downtime",
      "Database per Service per evitare coupling + eventual consistency accettata",
      "API Gateway per autenticazione, rate limiting, routing",
      "Saga pattern (orchestration preferred in banking) per transazioni distribuite",
      "mTLS per comunicazione sicura inter-servizi",
      "Secrets management (Vault, Azure Key Vault) per credenziali",
      "Golden Signals: latency P99, error rate, saturation",
      "Distributed tracing: trace_id propagation attraverso tutti i servizi"
    ],
    tags: ["microservizi", "cloud", "architettura", "sicurezza", "monitoring", "saga"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CSS_OPEN_002",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "computazione_software_sistemi",
    subcategory: "database_nosql",
    type: "open",
    difficulty: "hard",
    question: "In ambito bancario si considera di adottare soluzioni NoSQL per specifici casi d'uso. Il candidato:",
    sub_questions: [
      "a) Descriva le principali categorie di database NoSQL (document, key-value, column-family, graph) con un esempio di prodotto per ciascuna e il caso d'uso ottimale in contesto bancario.",
      "b) Illustri il teorema CAP e le sue implicazioni nella scelta tra database ACID e BASE per un sistema di pagamenti in tempo reale.",
      "c) Proponga un'architettura ibrida (polyglot persistence) per un sistema bancario che deve gestire: conti correnti, sessioni utente, transazioni in real-time, e relazioni tra clienti per fraud detection."
    ],
    hints: [
      "Document DB (MongoDB): profili cliente con attributi variabili",
      "Key-value (Redis): session management, caching, rate limiting",
      "Column-family (Cassandra): time-series delle transazioni, scrittura massiva",
      "Graph DB (Neo4j): relazioni tra conti per rilevare reti di frode",
      "CAP: Cassandra → AP; HBase → CP; RDBMS → CA",
      "CQRS: separare read model (NoSQL) da write model (RDBMS)"
    ],
    structure_guide: "Struttura: (a) tabella con 4 tipi, prodotto, use case bancario; (b) CAP con esempio concreto pagamenti (availability vs consistency); (c) schema architetturale con quale DB per quale layer.",
    key_points: [
      "Cassandra per time-series transazioni: alta write throughput, eventual consistency accettabile per storico",
      "Redis per sessioni: TTL automatico, sub-millisecond latency",
      "Neo4j per fraud detection: Cypher query per trovare cicli/pattern sospetti in grafi",
      "MongoDB per profili cliente: schema flessibile per attributi variabili per segmento",
      "CAP: per pagamenti preferire CP (consistency over availability)",
      "CQRS + Event Sourcing: write in RDBMS ACID, proiezioni in NoSQL per read"
    ],
    tags: ["nosql", "database", "cap-theorem", "polyglot-persistence", "fraud-detection"],
    added_date: "2026-05-17"
  },

  // ─── AMBITO 2: CRITTOGRAFIA, DLT, PRIVACY ────────────────────────────────

  {
    id: "BI_A_CDL_OPEN_001",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "blockchain_dlt",
    type: "open",
    difficulty: "hard",
    question: "La Banca d'Italia sta valutando l'utilizzo di una DLT (Distributed Ledger Technology) per la gestione dei titoli di Stato digitali (tokenizzazione). Il candidato:",
    sub_questions: [
      "a) Confronti una blockchain pubblica (es. Ethereum) con una blockchain permissioned (es. Hyperledger Fabric) in termini di throughput, governance, privacy e idoneità al caso d'uso bancario.",
      "b) Descriva il funzionamento degli smart contracts nel contesto della tokenizzazione di titoli finanziari: ciclo di vita, gestione del pagamento delle cedole, e principali rischi di sicurezza.",
      "c) Illustri le soluzioni di scalabilità disponibili (Layer 2, sharding, sidechains) e valuti quale sarebbe più appropriata per un sistema di settlement interbancario.",
      "d) Identifichi le principali sfide normative e di privacy (GDPR) nell'adozione di DLT in un contesto regolamentato come quello bancario."
    ],
    hints: [
      "Hyperledger Fabric: canali privati (confidential transactions), identity via MSP, throughput ~3500 TPS",
      "Ethereum mainnet: 15-30 TPS, pubblico, pseudonimo",
      "Smart contracts: token ERC-20/ERC-1400 per security tokens",
      "Rischi smart contract: reentrancy, immutabilità = bug permanenti, oracle problem",
      "MiCA regulation in EU per crypto-assets",
      "GDPR e blockchain: right to erasure è problematico con immutabilità"
    ],
    structure_guide: "Struttura: (a) tabella comparativa con 5+ dimensioni; (b) lifecycle con diagramma/pseudocode dello smart contract cedole; (c) analisi quantitativa TPS vs requisiti settlement; (d) analisi GDPR+MiCA con soluzioni (off-chain storage, privacy coins, zero-knowledge).",
    key_points: [
      "Per uso bancario: Hyperledger Fabric > Ethereum pubblica per privacy e governance",
      "ERC-1400 (security token standard) con whitelist investitori on-chain",
      "Oracle problem: i dati off-chain (prezzi, eventi) devono entrare nella blockchain tramite oracle fidati (Chainlink)",
      "Right to erasure GDPR: soluzione = hash on-chain, dati off-chain (erasure = rende l'hash inutile)",
      "MiCA: regolamentazione EU 2024 per crypto-asset service providers",
      "CBDC (Central Bank Digital Currency) come contesto istituzionale rilevante"
    ],
    tags: ["dlt", "blockchain", "hyperledger", "smart-contracts", "tokenizzazione", "gdpr", "mica"],
    added_date: "2026-05-17"
  },

  {
    id: "BI_A_CDL_OPEN_002",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "privacy_crittografia",
    type: "open",
    difficulty: "hard",
    question: "Il candidato analizzi il tema della protezione dei dati personali dal punto di vista crittografico e delle Privacy-Enhancing Technologies (PET):",
    sub_questions: [
      "a) Descriva almeno tre Privacy-Enhancing Technologies (ZKP, differential privacy, homomorphic encryption, federated learning, secure multi-party computation) con il loro principio di funzionamento e un caso d'uso concreto in ambito finanziario.",
      "b) Illustri la transizione verso la crittografia post-quantum: quali algoritmi classici sono vulnerabili, quali standard ha adottato il NIST nel 2024 e quale piano di migrazione raccomanderebbe.",
      "c) Descriva come progettare un sistema di autenticazione forte (MFA) per i dipendenti di una banca che bilanci sicurezza e usabilità, indicando i protocolli e gli standard rilevanti."
    ],
    hints: [
      "ZKP: dimostrare solvibilità senza rivelare il saldo reale",
      "Differential privacy: Apple usa ε-DP per raccogliere statistiche di utilizzo iOS",
      "CRYSTALS-Kyber → ML-KEM (FIPS 203), CRYSTALS-Dilithium → ML-DSA (FIPS 204)",
      "RSA e ECDSA vulnerabili all'algoritmo di Shor",
      "FIDO2/WebAuthn per passwordless authentication",
      "TOTP (RFC 6238) per OTP, FIDO2 hardware token (YubiKey)"
    ],
    structure_guide: "Struttura: (a) per ogni PET: principio matematico intuitivo + caso bancario; (b) tabella algoritmi vulnerabili vs post-quantum standard; (c) architettura MFA con fallback, recovery e considerazioni UX.",
    key_points: [
      "Federated learning + differential privacy: addestramento modelli anti-frode senza condividere transazioni",
      "SMPC: più banche calcolano statistiche aggregate senza rivelare i dati individuali",
      "NIST PQC 2024: ML-KEM (ex Kyber) per KEM, ML-DSA (ex Dilithium) per firme, SLH-DSA (ex SPHINCS+) per firme hash-based",
      "Harvest now, decrypt later: minaccia attuale anche prima dei computer quantistici operativi",
      "FIDO2/WebAuthn: eliminare le password, resistente a phishing per design",
      "Crypto agility: progettare sistemi che possano cambiare algoritmo senza full redesign"
    ],
    tags: ["privacy-enhancing-technologies", "post-quantum", "nist-pqc", "mfa", "fido2", "zkp"],
    added_date: "2026-05-17"
  },

  // ─── AMBITO 3: INTELLIGENZA ARTIFICIALE, ML, DATA SCIENCE ───────────────

  {
    id: "BI_A_IML_OPEN_001",
    source: "banca_italia_a",
    batch: "initial_2026-05",
    category: "ia_ml_data_science",
    subcategory: "llm_sistemi_ai",
    type: "open",
    difficulty: "hard",
    question: "La Banca d'Italia intende implementare un sistema AI basato su LLM per assistere i dipendenti nella ricerca di normative interne e circolari. Il candidato progetta il sistema:",
    sub_questions: [
      "a) Descriva l'architettura del sistema RAG (Retrieval-Augmented Generation) scelto, motivando le scelte tecniche per la fase di indexing (chunking, embedding model, vector DB) e la fase di retrieval (similarity search, re-ranking).",
      "b) Identifichi le principali minacce di sicurezza specifiche ai sistemi LLM (prompt injection, data leakage, jailbreak, hallucination) e proponga misure di mitigazione per ciascuna.",
      "c) Descriva come valutare le performance del sistema RAG sia offline (metriche quantitative) che online (monitoring in produzione), indicando metriche e strumenti specifici.",
      "d) Illustri le implicazioni normative (GDPR, AI Act EU) nell'uso di questo sistema in un contesto regolamentato."
    ],
    hints: [
      "Chunking: sliding window con overlap per non spezzare concetti",
      "Re-ranking: cross-encoder (ms-marco) più accurato del bi-encoder per il final ranking",
      "Prompt injection: sistema di input validation + prompt hardening",
      "Hallucination: grounding con citation, temperature bassa, RAG-Fusion",
      "RAGAS framework: faithfulness, answer relevancy, context precision, context recall",
      "AI Act: sistemi AI ad alto rischio nel settore finanziario → conformità"
    ],
    structure_guide: "Struttura: (a) diagramma architettura con scelte motivate (es. text-embedding-3-large vs e5-large, Chroma vs pgvector); (b) tabella minacce + mitigazione; (c) metriche RAGAS offline + monitoring latency/cost online; (d) analisi AI Act categoria + obblighi.",
    key_points: [
      "Chunking semantico (non fisso) per preservare integrità delle norme",
      "Hybrid search: BM25 + vector search combinati con RRF (Reciprocal Rank Fusion)",
      "Prompt injection: separare sempre system prompt dai dati dell'utente, validazione input",
      "Citation obligatoria: ogni risposta deve citare la circolare sorgente → no hallucination accettabile",
      "RAGAS offline: faithfulness (risposta supportata dal context), answer relevancy",
      "AI Act: sistemi usati in ambito regolamentato/finanziario → rischio alto → trasparenza, audit trail",
      "GDPR: se le query degli utenti contengono dati personali → data retention policy"
    ],
    tags: ["rag", "llm", "sicurezza-ai", "prompt-injection", "ai-act", "gdpr", "ragas"],
    added_date: "2026-05-17"
  }

];
