/**
 * DATABASE DOMANDE — AGGREGATORE
 *
 * Per aggiungere nuove domande:
 * 1. Crea un nuovo file questions_[source]_v[N].js seguendo lo schema in schema.js
 * 2. Importalo qui sotto
 * 3. Aggiungilo all'array QUESTION_SOURCES
 *
 * Il resto dell'app si aggiorna automaticamente.
 */

import { QUESTIONS_BI_A_V1 }           from "./questions_bi_a_v1.js";
import { QUESTIONS_BI_A_V2 }           from "./questions_bi_a_v2.js";
import { QUESTIONS_BI_OPEN_V1 }        from "./questions_bi_open_v1.js";
import { QUESTIONS_BI_OPEN_V2 }        from "./questions_bi_open_v2.js";
import { QUESTIONS_PRESELETTIVO_V1 }   from "./questions_preselettivo_v1.js";

// ─── REGISTRO SORGENTI ────────────────────────────────────────────────────────
// Aggiungere qui ogni nuovo batch importato sopra.
const QUESTION_SOURCES = [
  { data: QUESTIONS_BI_A_V1,          label: "BI Profilo A — v1 (2026-05)" },
  { data: QUESTIONS_BI_A_V2,          label: "BI Profilo A — v2 (2026-05)" },
  { data: QUESTIONS_BI_OPEN_V1,       label: "BI Aperte — v1 (2026-05)" },
  { data: QUESTIONS_BI_OPEN_V2,       label: "BI Aperte — v2 (2026-05)" },
  { data: QUESTIONS_PRESELETTIVO_V1,  label: "Preselettivo BI — v1 (2026-05)" },
  // { data: QUESTIONS_ACN_B_V1,      label: "ACN Codice B — v1" },   // ← esempio prossimo batch
];

// ─── DATABASE UNIFICATO ───────────────────────────────────────────────────────
export const ALL_QUESTIONS = QUESTION_SOURCES.flatMap(s => s.data);

// ─── HELPERS DI FILTRAGGIO ────────────────────────────────────────────────────

/** Ritorna tutte le domande di un certo tipo */
export const byType = (type) =>
  ALL_QUESTIONS.filter(q => q.type === type);

/** Ritorna tutte le domande di una sorgente (concorso) */
export const bySource = (source) =>
  ALL_QUESTIONS.filter(q => q.source === source);

/** Ritorna tutte le domande di una categoria */
export const byCategory = (category) =>
  ALL_QUESTIONS.filter(q => q.category === category);

/** Ritorna domande filtrate per tipo, sorgente e categoria (tutti opzionali) */
export const filterQuestions = ({ type, source, category, difficulty, tags } = {}) => {
  return ALL_QUESTIONS.filter(q => {
    if (type       && q.type       !== type)       return false;
    if (source     && q.source     !== source)     return false;
    if (category   && q.category   !== category)   return false;
    if (difficulty && q.difficulty !== difficulty) return false;
    if (tags       && !tags.some(t => q.tags.includes(t))) return false;
    return true;
  });
};

/** Mescola un array in modo Fisher-Yates */
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ─── STATISTICHE DATABASE ─────────────────────────────────────────────────────
export const DB_STATS = {
  total: ALL_QUESTIONS.length,
  byType: {
    multiple_choice: ALL_QUESTIONS.filter(q => q.type === "multiple_choice").length,
    open: ALL_QUESTIONS.filter(q => q.type === "open").length,
  },
  bySource: Object.fromEntries(
    [...new Set(ALL_QUESTIONS.map(q => q.source))].map(s => [
      s, ALL_QUESTIONS.filter(q => q.source === s).length
    ])
  ),
  byCategory: Object.fromEntries(
    [...new Set(ALL_QUESTIONS.map(q => q.category))].map(c => [
      c, ALL_QUESTIONS.filter(q => q.category === c).length
    ])
  ),
  sources: QUESTION_SOURCES.map(s => ({ label: s.label, count: s.data.length }))
};
