/**
 * Banca d'Italia — Profilo A: 10 Esperti ICT
 * Quesiti a risposta aperta — Batch v2 (maggio 2026)
 * Nuovi argomenti: Federated Learning, Transformer deep-dive, AI Act compliance
 */

export const QUESTIONS_BI_OPEN_V2 = [

  // ─── AMBITO 3: INTELLIGENZA ARTIFICIALE, ML, DATA SCIENCE ───────────────

  {
    id: "BI_A_IML_OPEN_002",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "ia_ml_data_science",
    subcategory: "federated_learning",
    type: "open",
    difficulty: "hard",
    question: "Più banche europee vogliono collaborare per addestrare un modello comune di rilevamento delle frodi senza condividere i dati delle proprie transazioni. Il candidato progetta il sistema:",
    sub_questions: [
      "a) Descriva l'architettura Federated Learning scelta (orizzontale vs verticale) e il protocollo di aggregazione, motivando le scelte in base alla topologia dei dati bancari.",
      "b) Illustri i principali rischi di sicurezza nel Federated Learning (model poisoning, gradient inversion, membership inference) e le contromisure crittografiche e algoritmiche adottabili.",
      "c) Spieghi come integrare Differential Privacy nell'addestramento federato per fornire garanzie formali di privacy, discutendo il trade-off con l'accuratezza del modello.",
      "d) Descriva come gestire la non-IID data distribution tra le banche (es. banca retail vs banca corporate) e il suo impatto sull'accuratezza del modello aggregato."
    ],
    hints: [
      "Federated Learning orizzontale: stesse feature, clienti diversi — adatto perché tutte le banche hanno le stesse colonne (importo, merchant, ecc.)",
      "FedAvg: aggregazione media pesata per numero di campioni; FedProx aggiunge un termine di regularizzazione per gestire heterogeneità",
      "Gradient inversion attack (Zhu et al. 2019): ricostruire i dati di training dai gradienti — mitiga con gradient compression e differential privacy",
      "DP-SGD: aggiunge rumore calibrato ai gradienti prima dell'invio; ε (privacy budget) controlla il trade-off privacy/utility",
      "Non-IID: una banca corporate ha transazioni molto diverse da una retail — FedAvg degrada; usare FedNova o SCAFFOLD",
      "Secure Aggregation: il server non vede i singoli update ma solo la somma — usa crittografia homomorfca o secret sharing"
    ],
    structure_guide: "Struttura: (a) schema architetturale con ruoli server/client e protocollo round-by-round; (b) tabella attacchi + mitigazioni; (c) spiegazione matematica intuitiva di ε-DP e clip + noise; (d) analisi quantitativa dell'impatto e tecniche di mitigazione. ~250 parole per punto.",
    key_points: [
      "Federated Learning orizzontale: appropriato quando le banche hanno le stesse feature ma clienti diversi",
      "FedAvg: W_global = Σ (n_k/N) · W_k — media pesata, i dati non lasciano mai il client",
      "Model poisoning: un client malevolo invia update alterati — difesa con Robust Aggregation (Krum, coordinate-wise median)",
      "Gradient inversion attack: ricostruzione dei dati dai gradienti — mitiga con gradient perturbation e DP",
      "DP-SGD: clip gradient norm + Gaussian noise; ε-DP garantisce plausible deniability formale",
      "Non-IID degradation: FedProx aggiunge termine ‖w - w_global‖² per stabilizzare i client divergenti",
      "Secure Aggregation: il server vede solo la somma aggregata, non i singoli update (secret sharing di Shamir)",
      "Privacy budget ε: valori pratici ε∈[1,10] per utility accettabile; ε<1 forte privacy ma modello degradato"
    ],
    approfondimento: `## Federated Learning — Approfondimento Teorico

### Architettura e Protocollo FedAvg

Il Federated Learning (FL) è un paradigma di machine learning distribuito introdotto da McMahan et al. (Google, 2017) che permette di addestrare modelli su dati distribuiti senza centralizzarli. Il protocollo FedAvg funziona in round:

1. Il **server** invia il modello globale W^t a un sottoinsieme di client partecipanti
2. Ogni **client k** esegue E epoche di SGD locale sul proprio dataset D_k, producendo W_k^t
3. Il **server** aggrega: W^(t+1) = Σ_k (|D_k|/|D|) · W_k^t

L'aggregazione ponderata per dimensione del dataset garantisce che i client con più dati abbiano maggiore influenza — appropriato per il contesto bancario dove una banca più grande ha pattern più rappresentativi.

**Federated Learning Orizzontale vs Verticale:**
- *Orizzontale*: le banche hanno le stesse feature (colonne) ma clienti diversi — es. tutte hanno campo `importo`, `merchant_category`, `ora_transazione`. Questo è il caso tipico per anti-frode interbancaria.
- *Verticale*: le banche hanno clienti in comune ma feature diverse — es. banca A ha dati transazionali, banca B ha dati creditizi. Richiede protocolli più complessi (split learning, PSI - Private Set Intersection).

### Differential Privacy nel Federated Learning

La Differential Privacy (Dwork & Roth, 2014) fornisce una garanzia formale: un algoritmo A è ε-differentially private se per ogni dataset D e D' che differiscono di un elemento, e per ogni output S: Pr[A(D)∈S] ≤ e^ε · Pr[A(D')∈S].

**DP-SGD** (Abadi et al. 2016, usato in TensorFlow Privacy):
1. Per ogni campione, calcola il gradiente individuale
2. **Clip**: tronca la norm L2 del gradiente a C (clipping threshold)
3. **Noise**: aggiunge rumore Gaussiano N(0, σ²C²I)
4. Media i gradienti perturbati

Il **privacy budget ε** accumula ad ogni round: con ε piccolo (es. ε=0.1) la privacy è forte ma il modello converge lentamente; ε∈[1,10] è il range pratico per utility accettabile. Il **privacy accountant** (momenti accountant o Rényi DP) traccia il budget totale consumato.

### Attacchi al Federated Learning

**Model Poisoning**: un client malevolo invia update W_k manipolati per degradare il modello o inserire un backdoor (es. classificare transazioni sospette come legittime se contengono un pattern specifico). Difese: *Byzantine-robust aggregation* come Krum (scarta update outlier), coordinate-wise median, Trimmed Mean.

**Gradient Inversion Attack** (Zhu et al. 2019 — "Deep Leakage from Gradients"): dati i gradienti ∂L/∂W, è possibile ricostruire i dati di training originali ottimizzando un input sintetico x' che minimizza ‖∂L(x')/∂W - ∂L(x)/∂W‖. Gli esperimenti mostrano ricostruzioni quasi perfette da singoli batch. Difese: gradient compression, large batch size, DP noise.

**Membership Inference**: determinare se un certo dato era nel training set. Rilevante per GDPR: anche senza vedere i dati, un avversario potrebbe inferire la presenza di un cliente specifico.

### Non-IID Data e FedProx

Quando i dati dei client hanno distribuzioni molto diverse (non-IID), FedAvg può divergere o convergere a un modello peggiore. **FedProx** (Li et al. 2020) aggiunge un termine di regularizzazione prossimale nell'obiettivo locale:

min_w [ h_k(w) + (μ/2) · ‖w - w^t‖² ]

Il termine μ‖w - w^t‖² penalizza update troppo lontani dal modello globale, stabilizzando la convergenza. **SCAFFOLD** usa variabili di controllo per correggere il client drift.`,
    tags: ["federated-learning", "fedavg", "differential-privacy", "dp-sgd", "model-poisoning", "non-iid"],
    added_date: "2026-05-17"
  },

  // ─── AMBITO 3 (bis): TRANSFORMER ARCHITECTURE ────────────────────────────

  {
    id: "BI_A_IML_OPEN_003",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "ia_ml_data_science",
    subcategory: "transformer_architettura",
    type: "open",
    difficulty: "hard",
    question: "Il meccanismo di attenzione è il componente fondamentale dei moderni LLM. Il candidato lo analizza in profondità:",
    sub_questions: [
      "a) Descriva il meccanismo di Scaled Dot-Product Attention spiegando il ruolo delle matrici Q, K, V, il fattore di scala e la funzione softmax. Perché è necessario scalare per √d_k?",
      "b) Illustri il Multi-Head Attention: come vengono combinate le teste, quali diverse 'prospettive' possono imparare e quale vantaggio offre rispetto all'attenzione a testa singola.",
      "c) Spieghi come il Positional Encoding permette al Transformer (che è permutation-invariant) di essere sensibile all'ordine della sequenza, confrontando encodings sinusoidali e appresi.",
      "d) Discuta i meccanismi di attenzione alternativi (Flash Attention, Sparse Attention, MLA in DeepSeek) che cercano di ridurre la complessità O(n²) del self-attention classico."
    ],
    hints: [
      "Attenzione = softmax(QKᵀ/√d_k) · V — il softmax converte score in pesi di combinazione convessa",
      "Scaling √d_k: evita saturazione del softmax per prodotti scalari grandi (alta varianza per dimensioni elevate)",
      "Multi-head: h=8 teste in BERT-base; ogni testa usa d_k = d_model/h = 64 dimensioni",
      "Positional encoding sinusoidale: PE(pos,2i) = sin(pos/10000^(2i/d_model)) — permette extrapolazione",
      "Flash Attention (Dao et al. 2022): tiling su SRAM per ridurre accessi HBM, stessa output ma IO-optimal",
      "GQA (Grouped Query Attention): più query heads per ogni key-value head — riduce KV cache in inferenza"
    ],
    structure_guide: "Struttura: (a) formula matematica + intuizione geometrica (query=domanda, key=indice, value=contenuto); (b) schema multi-head con concatenazione e proiezione finale; (c) confronto PE sinusoidale vs learnable con pro/contro; (d) tabella varianti con complessità e caso d'uso. Usa formule dove aiutano la comprensione.",
    key_points: [
      "Attention(Q,K,V) = softmax(QKᵀ/√d_k) · V — combinazione pesata dei values",
      "Il fattore √d_k previene la saturazione del softmax che blocca i gradienti",
      "Multi-head permette di apprendere pattern di dipendenza a diversi livelli di astrazione simultaneamente",
      "h teste di dimensione d_k = d_model/h: stesso costo computazionale dell'attenzione singola",
      "PE sinusoidale: deterministico, permette generalizzazione a sequenze più lunghe del training",
      "Flash Attention: non riduce la complessità FLOPs ma riduce accessi memoria HBM → ~3x speedup",
      "Sparse Attention (Longformer): attenzione locale + globale → O(n) invece di O(n²)",
      "KV Cache in inferenza: memorizza K,V passati per non ricalcolarli — fondamentale per la generazione autoRegressiva"
    ],
    approfondimento: `## Transformer e Self-Attention — Approfondimento Teorico

### Scaled Dot-Product Attention

Il meccanismo di attenzione (Vaswani et al. "Attention is All You Need", 2017) trasforma una sequenza di input in una nuova sequenza dove ogni posizione è una combinazione pesata di tutte le altre.

**Matematica:**
\`\`\`
Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k) · V
\`\`\`

- **Q** (Query, ℝⁿˣᵈᵏ): "cosa sto cercando?"
- **K** (Key, ℝⁿˣᵈᵏ): "cosa posso offrire?"
- **V** (Value, ℝⁿˣᵈᵛ): "qual è il mio contenuto?"
- **d_k**: dimensione delle chiavi (tipicamente 64)

Il prodotto Q·Kᵀ ∈ ℝⁿˣⁿ produce una matrice di *attention scores*: scores[i,j] misura quanto il token i dovrebbe "prestare attenzione" al token j. Il softmax normalizza gli score in pesi che sommano a 1 (distribuzione di probabilità), permettendo una combinazione convessa dei values.

**Perché √d_k?** Per d_k grande, i prodotti scalari crescono in varianza: Var(q·k) = d_k · Var(q_i)·Var(k_i). Con varianza alta, il softmax entra in regione di saturazione (output quasi one-hot) con gradienti vicini a zero → addestramento difficile. Dividere per √d_k riporta la varianza a 1.

### Multi-Head Attention

Invece di una singola attenzione di dimensione d_model, si usano h teste parallele:

\`\`\`
head_i = Attention(Q·W_i^Q, K·W_i^K, V·W_i^V)
MultiHead(Q,K,V) = Concat(head_1,...,head_h) · W^O
\`\`\`

Ogni testa usa proiezioni W_i^Q, W_i^K ∈ ℝᵈᵐᵒᵈᵉˡˣᵈᵏ con d_k = d_model/h. Il costo computazionale è identico all'attenzione singola ma il modello può apprendere pattern di dipendenza multipli simultaneamente:
- Testa 1: dipendenze sintattiche (soggetto-verbo)
- Testa 2: correference (pronomi e antecedenti)
- Testa 3: dipendenze semantiche a lungo raggio

In BERT-base: d_model=768, h=12, d_k=64. In GPT-4 (stimato): d_model≈25600, h≈128.

### Positional Encoding

Il Transformer elabora tutti i token in parallelo (permutation-invariant) — senza encoding posizionale, "il gatto mangia il topo" e "il topo mangia il gatto" producono gli stessi output (tranne l'ordine).

**Encodings sinusoidali** (Vaswani 2017):
\`\`\`
PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
\`\`\`

Vantaggi: deterministico, generalizza a sequenze più lunghe del training (frequenze diverse per ogni dimensione), la distanza relativa è calcolabile: PE(pos+k) = funzione lineare di PE(pos).

**Learnable positional embeddings** (BERT, GPT): vettori appresi durante il training. Più flessibili ma non generalizzano a sequenze più lunghe. **Rotary Position Embedding (RoPE)**, usato da LLaMA e GPT-NeoX, codifica la posizione relativa direttamente nella funzione di attenzione: permette migliore generalizzazione a contesti lunghi (RoPE + scaling = context extension a 128K+).

### Varianti Efficienti dell'Attention

La complessità O(n²·d) del self-attention è il bottleneck per sequenze lunghe:

| Metodo | Complessità | Idea chiave |
|---|---|---|
| Flash Attention (Dao 2022) | O(n²) FLOPs, O(n) HBM | Tiling in SRAM, nessun accesso a matrici intermedie complete |
| Longformer | O(n) | Attenzione locale + globale su token speciali |
| BigBird | O(n) | Random + local + global attention |
| GQA (Grouped Query Attention) | O(n²) | Più query per ogni KV head — riduce KV cache |
| Multi-Latent Attention (DeepSeek) | O(n·d) | Compressione KV in latent space di dimensione ridotta |

Flash Attention è oggi lo standard de facto: non cambia l'output matematico ma riorganizza i calcoli per minimizzare il trasferimento dati tra HBM (High Bandwidth Memory) e SRAM (on-chip), ottenendo 3-8x speedup e ~20x riduzione della memoria per la backward pass.`,
    tags: ["transformer", "self-attention", "multi-head", "positional-encoding", "flash-attention"],
    added_date: "2026-05-17"
  },

  // ─── AMBITO 2: CRITTOGRAFIA, DLT, PRIVACY (AI Act compliance) ────────────

  {
    id: "BI_A_CDL_OPEN_003",
    source: "banca_italia_a",
    batch: "v2_2026-05",
    category: "crittografia_dlt_privacy",
    subcategory: "ai_act_compliance",
    type: "open",
    difficulty: "hard",
    question: "La Banca d'Italia deve conformarsi all'AI Act UE per un sistema AI che valuta automaticamente le richieste di mutuo (credit scoring). Il candidato analizza gli obblighi normativi e la progettazione del sistema:",
    sub_questions: [
      "a) Classifichi il sistema nell'AI Act (categoria di rischio), identifichi gli obblighi specifici applicabili al fornitore e al deployer, e descriva il processo di valutazione della conformità.",
      "b) Progetta il sistema tecnico per soddisfare i requisiti AI Act: gestione del rischio, governance dei dati, documentazione tecnica, robustezza e cybersicurezza, supervisione umana.",
      "c) Illustri come garantire la non-discriminazione del modello (Art. 10 AI Act sui dati di training): quali analisi di fairness condurre, quali metriche usare e come documentarle.",
      "d) Descriva il registro di monitoraggio post-deployment richiesto e come implementare il diritto alla spiegazione (GDPR Art. 22) per le decisioni automatizzate di rifiuto del mutuo."
    ],
    hints: [
      "Credit scoring: esplicitamente elencato nell'Allegato III AI Act come sistema ad alto rischio",
      "Fornitore (provider): chi sviluppa il sistema; Deployer: la banca che lo usa operativamente",
      "Conformità alto rischio: valutazione di conformità interna o organismo notificato, registrazione EU AI database",
      "AI Act Art. 9: sistema di gestione del rischio continuo (non solo pre-deployment)",
      "Fairness metrics: demographic parity, equalized odds, calibration — scegliere in base al contesto",
      "GDPR Art. 22: diritto di non essere soggetti a decisioni automatizzate; obbligo di spiegazione + revisione umana"
    ],
    structure_guide: "Struttura: (a) classificazione + tabella obblighi fornitore/deployer; (b) architettura tecnica con riferimento agli articoli AI Act; (c) pipeline di fairness testing con metriche specifiche per il contesto creditizio; (d) schema del sistema di logging e interfaccia di spiegazione per i richiedenti. ~250 parole per punto.",
    key_points: [
      "Sistema ad alto rischio: Allegato III, punto 5b — sistemi per valutare il merito creditizio",
      "Obblighi fornitore: sistema gestione rischio, governance dati training, documentazione tecnica, registrazione EU AI database",
      "Obblighi deployer (banca): supervisione umana, log obbligatori 5 anni, comunicazione agli interessati",
      "Conformità: valutazione interna con documentazione o organismo notificato — non serve CE marking esterno per il settore finanziario se non richiesto da altra normativa",
      "Fairness: analisi disparate impact per genere, età, nazionalità; usare equalized odds non solo demographic parity",
      "GDPR Art. 22 + AI Act: decisioni automatizzate che producono effetti giuridici richiedono supervisione umana reale (non rubber-stamp)",
      "Explainability tecnica: SHAP per feature importance locale; counterfactual explanations ('cosa sarebbe dovuto cambiare per ottenere il mutuo')",
      "Post-market monitoring: PSI mensile per data drift, accuracy tracking su campione con label differiti, incident reporting a Banca d'Italia e AGCM"
    ],
    approfondimento: `## AI Act — Approfondimento Teorico

### Struttura dell'AI Act (Regolamento UE 2024/1689)

L'AI Act adotta un approccio basato sul rischio con 4 categorie:

**1. Rischio Inaccettabile (Art. 5) — Vietati:**
- Sistemi di social scoring da parte di governi
- Manipolazione subliminale
- Sfruttamento vulnerabilità psicologiche
- Riconoscimento biometrico in tempo reale in spazi pubblici (con eccezioni)

**2. Alto Rischio (Art. 6 + Allegato III) — Ammessi con obblighi:**
- Allegato III elenca 8 domini: infrastrutture critiche, istruzione, occupazione, accesso a servizi essenziali (credito, assicurazioni), applicazione della legge, gestione migrazione, giustizia, processi democratici
- **Credit scoring → punto 5b dell'Allegato III: alto rischio**

**3. Rischio Limitato — Obblighi di trasparenza:**
- Chatbot: must disclosure AI interaction
- Deepfake: labeling obbligatorio

**4. Rischio Minimo — Nessun obbligo specifico**

### Obblighi per Sistemi ad Alto Rischio

**Per il Fornitore (Art. 9-15):**
- Art. 9: Sistema di gestione del rischio — risk identification, evaluation, mitigation, monitoring continuo
- Art. 10: Governance dei dati — dataset di training, validation e testing documentati; analisi bias
- Art. 11: Documentazione tecnica (Allegato IV) — architettura, dati, performance, limitazioni
- Art. 12: Registrazione automatica degli eventi (logging di audit)
- Art. 13: Trasparenza — documentazione per il deployer
- Art. 14: Supervisione umana — progettare per permettere intervento umano
- Art. 15: Accuratezza, robustezza, cybersicurezza
- Art. 49: Registrazione nel database UE per sistemi ad alto rischio (ec.europa.eu/AI-database)

**Per il Deployer (Art. 26):**
- Usare il sistema secondo le istruzioni del fornitore
- Assegnare supervisione umana qualificata
- Conservare log per 5 anni
- Informare gli individui che sono soggetti al sistema
- Segnalare incidenti al fornitore e alle autorità

### Fairness nel Credit Scoring

Il credit scoring è storicamente soggetto a discrimination su genere, etnia, età. Il processo di fairness analysis include:

**Metriche di Fairness:**
1. *Demographic Parity*: P(Ŷ=1|A=0) = P(Ŷ=1|A=1) — stesso tasso di approvazione per gruppo A e B
2. *Equalized Odds*: stessa TPR e FPR per tutti i gruppi — più equo perché considera il ground truth
3. *Calibration*: P(Y=1|Ŷ=p, A=a) = p per tutti i gruppi — le probabilità stimate sono accurate per ogni gruppo
4. *Individual Fairness*: individui simili ricevono predizioni simili

**Impossibilità di ottimizzare tutte simultaneamente**: Chouldechova (2017) e Kleinberg et al. (2016) dimostrano che demografic parity, equalized odds e calibration non possono essere soddisfatte simultaneamente quando i tassi di base differiscono tra gruppi. La scelta della metrica è una decisione normativa, non tecnica.

**Pipeline di analisi:**
1. Analisi disparate impact pre-modeling: verificare che il dataset rifletta la popolazione da servire
2. Analisi durante training: monitorare metriche di fairness per ogni epoch
3. Audit post-training: fairness report per ogni sotto-gruppo (genere, fascia d'età, area geografica)
4. Counterfactual fairness: il modello cambierebbe decisione se il solo attributo protetto cambiasse?

### Spiegabilità e GDPR Art. 22

Il GDPR Art. 22 vieta decisioni *esclusivamente* automatizzate con effetti giuridici senza possibilità di revisione umana. Per il credit scoring:

**Livelli di spiegazione richiesti:**
1. *Spiegazione locale* (per il cliente): "Il mutuo è stato rifiutato principalmente perché il rapporto debito/reddito (40%) supera la soglia interna (35%) e la storia creditizia mostra due rate ritardate negli ultimi 12 mesi"
2. *Counterfactual*: "Se il rapporto debito/reddito fosse 33% e non ci fossero ritardi nell'ultimo anno, il mutuo sarebbe approvato"
3. *Spiegazione globale* (per audit): SHAP summary plot, feature importance aggregata

**Implementazione tecnica:**
- SHAP TreeExplainer per modelli gradient boosting (XGBoost, LightGBM)
- SHAP KernelExplainer per modelli black-box (reti neurali)
- Algoritmi di counterfactual: DiCE (Diverse Counterfactual Explanations) — genera multipli percorsi alternativi realistici
- Interfaccia cliente: comunicazione in linguaggio non tecnico, con possibilità di richiedere revisione umana entro X giorni`,
    tags: ["ai-act", "credit-scoring", "compliance", "fairness", "gdpr-art22", "explainability"],
    added_date: "2026-05-17"
  }

];
