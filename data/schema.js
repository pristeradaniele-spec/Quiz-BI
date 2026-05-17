/**
 * SCHEMA DEL DATABASE DOMANDE
 *
 * Ogni batch di domande è un file separato: questions_[source]_v[N].js
 * Per aggiungere domande: crea un nuovo file versione o aggiungi a uno esistente,
 * poi registralo in index.js nell'array QUESTION_SOURCES.
 *
 * FONTI VALIDE (source):
 *   "banca_italia_a"            → BI Profilo A, prova scritta/orale
 *   "banca_italia_preselettivo" → BI test preselettivo logico-matematico
 *   "acn_b"                     → ACN Codice B, test scritto
 *   "acn_b_open"                → ACN Codice B, quesiti aperti
 *
 * CATEGORIE BI PROFILO A:
 *   "computazione_software_sistemi"   → Ambito 1
 *   "crittografia_dlt_privacy"        → Ambito 2
 *   "ia_ml_data_science"              → Ambito 3
 *
 * TIPI:
 *   "multiple_choice" → 4 opzioni, una sola corretta
 *   "open"            → risposta libera con guida strutturata
 *
 * DIFFICOLTA':
 *   "easy" | "medium" | "hard"
 */

export const SCHEMA_VERSION = "1.0";

/**
 * @typedef {Object} MultipleChoiceQuestion
 * @property {string}   id           - Identificatore univoco (es. "BI_A_CSS_001")
 * @property {string}   source       - Concorso di origine
 * @property {string}   batch        - Batch di inserimento (es. "initial_2026-05")
 * @property {string}   category     - Ambito tematico
 * @property {string}   subcategory  - Sotto-argomento specifico
 * @property {"multiple_choice"} type
 * @property {"easy"|"medium"|"hard"} difficulty
 * @property {string}   question     - Testo della domanda
 * @property {string[]} options      - Array di 4 opzioni (A, B, C, D)
 * @property {number}   correct      - Indice 0-based della risposta corretta
 * @property {string}   explanation  - Spiegazione della risposta corretta
 * @property {string[]} tags         - Tag per ricerca e filtro
 * @property {string}   added_date   - Data aggiunta (YYYY-MM-DD)
 */

/**
 * @typedef {Object} OpenQuestion
 * @property {string}   id
 * @property {string}   source
 * @property {string}   batch
 * @property {string}   category
 * @property {"open"}   type
 * @property {"hard"}   difficulty
 * @property {string}   question        - Testo principale del quesito
 * @property {string[]} sub_questions   - Sotto-punti a), b), c)...
 * @property {string[]} hints           - Spunti per non rimanere bloccato
 * @property {string}   structure_guide - Come strutturare la risposta
 * @property {string[]} key_points      - Punti chiave che devono comparire
 * @property {string[]} tags
 * @property {string}   added_date
 */
