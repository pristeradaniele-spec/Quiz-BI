/**
 * Quiz App — Logica principale
 * PWA per simulazione concorsi pubblici ICT
 */

import {
  ALL_QUESTIONS, filterQuestions, shuffle, DB_STATS
} from "./data/index.js";

// ─── STATO GLOBALE ────────────────────────────────────────────────────────────
const state = {
  // Sessione quiz corrente
  session: null,

  // Settings persistenti
  settings: loadSettings(),

  // Progressi per categoria (localStorage)
  progress: loadProgress(),

  // Testo salvato per le domande aperte (localStorage)
  openDrafts: loadOpenDrafts(),
};

// ─── COSTANTI ─────────────────────────────────────────────────────────────────
const SOURCES = {
  banca_italia_a:            { label: "BI Profilo A",      icon: "🏦" },
  banca_italia_preselettivo: { label: "Preselettivo BI",   icon: "🧮" },
  acn_b:                     { label: "ACN Codice B",      icon: "🔐" },
};

const CATEGORIES = {
  computazione_software_sistemi:  { label: "Computazione & Software",  color: "blue"   },
  crittografia_dlt_privacy:       { label: "Crittografia & DLT",       color: "orange" },
  ia_ml_data_science:             { label: "IA & ML",                   color: "green"  },
  preselettivo:                   { label: "Preselettivo",              color: "yellow" },
};

const DIFFICULTIES = {
  easy:   { label: "Facile",   color: "green"  },
  medium: { label: "Medio",    color: "yellow" },
  hard:   { label: "Difficile",color: "red"    },
};

// ─── PERSISTENZA ─────────────────────────────────────────────────────────────
function loadSettings() {
  try { return JSON.parse(localStorage.getItem("quiz_settings")) || {}; }
  catch { return {}; }
}
function saveSettings() {
  localStorage.setItem("quiz_settings", JSON.stringify(state.settings));
}
function loadProgress() {
  try { return JSON.parse(localStorage.getItem("quiz_progress")) || {}; }
  catch { return {}; }
}
function saveProgress() {
  localStorage.setItem("quiz_progress", JSON.stringify(state.progress));
}
function loadOpenDrafts() {
  try { return JSON.parse(localStorage.getItem("quiz_open_drafts")) || {}; }
  catch { return {}; }
}
function saveOpenDrafts() {
  localStorage.setItem("quiz_open_drafts", JSON.stringify(state.openDrafts));
}

function recordAnswer(questionId, correct) {
  if (!state.progress[questionId]) {
    state.progress[questionId] = { attempts: 0, correct: 0 };
  }
  state.progress[questionId].attempts++;
  if (correct) state.progress[questionId].correct++;
  saveProgress();
}

function resetAllProgress() {
  state.progress = {};
  state.openDrafts = {};
  saveProgress();
  saveOpenDrafts();
}

// ─── UTILITY ─────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
};

function toast(msg, duration = 2500) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), duration);
}

function badge(text, color) {
  return `<span class="badge badge-${color}">${text}</span>`;
}

function categoryStats(cat) {
  const qs = ALL_QUESTIONS.filter(q => q.category === cat && q.type === "multiple_choice");
  const answered = qs.filter(q => state.progress[q.id]);
  const correct  = qs.filter(q => state.progress[q.id]?.correct > 0);
  return { total: qs.length, answered: answered.length, correct: correct.length };
}

// ─── TABS / NAVIGAZIONE ───────────────────────────────────────────────────────
const SCREENS = ["home", "quiz-select", "quiz", "open", "settings", "db-info"];

function showScreen(name) {
  SCREENS.forEach(s => {
    const el = $(`screen-${s}`);
    if (el) el.classList.toggle("hidden", s !== name);
  });
  document.querySelectorAll(".tab-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.tab === name)
  );
}

// ─── HOME / DASHBOARD ─────────────────────────────────────────────────────────
function renderHome() {
  const mcqs = ALL_QUESTIONS.filter(q => q.type === "multiple_choice");
  const answered = mcqs.filter(q => state.progress[q.id]);
  const correct  = mcqs.filter(q => (state.progress[q.id]?.correct || 0) > 0);
  const pct = mcqs.length ? Math.round(correct.length / mcqs.length * 100) : 0;

  $("home-total").textContent = DB_STATS.total;
  $("home-answered").textContent = answered.length;
  $("home-correct").textContent = correct.length;
  $("home-pct").textContent = pct + "%";

  // Progress bar totale
  $("home-progress-bar").style.width = pct + "%";

  // Statistiche per categoria
  const catContainer = $("home-categories");
  catContainer.innerHTML = "";
  Object.entries(CATEGORIES).forEach(([key, meta]) => {
    const s = categoryStats(key);
    if (!s.total) return;
    const pctCat = s.total ? Math.round(s.correct / s.total * 100) : 0;
    const row = el("div", "category-row");
    row.innerHTML = `
      <div class="label">${meta.label}</div>
      <div style="flex:1; margin:0 12px">
        <div class="progress-bar-wrap">
          <div class="progress-bar" style="width:${pctCat}%"></div>
        </div>
      </div>
      <div class="score">${s.correct}/${s.total}</div>
    `;
    catContainer.appendChild(row);
  });

  // DB sources
  const dbContainer = $("home-db-sources");
  dbContainer.innerHTML = "";
  DB_STATS.sources.forEach(src => {
    const row = el("div", "db-source-row");
    row.innerHTML = `<span>${src.label}</span><span class="db-badge">${src.count} domande</span>`;
    dbContainer.appendChild(row);
  });
}

// ─── QUIZ SELECTOR ────────────────────────────────────────────────────────────
let quizConfig = {
  source: "banca_italia_a",
  category: null,
  count: 20,
  timer: true,
  timerSeconds: 90,
};

function renderQuizSelect() {
  const container = $("quiz-source-grid");
  container.innerHTML = "";

  // Sorgenti disponibili
  [...new Set(ALL_QUESTIONS.filter(q=>q.type==="multiple_choice").map(q=>q.source))].forEach(src => {
    const meta = SOURCES[src] || { label: src, icon: "📋" };
    const count = ALL_QUESTIONS.filter(q=>q.source===src && q.type==="multiple_choice").length;
    const card = el("div", "selector-card" + (quizConfig.source===src ? " selected" : ""));
    card.innerHTML = `<div class="sel-icon">${meta.icon}</div>
      <div class="sel-title">${meta.label}</div>
      <div class="sel-sub">${count} domande</div>`;
    card.addEventListener("click", () => {
      quizConfig.source = src;
      quizConfig.category = null;
      renderQuizSelect();
    });
    container.appendChild(card);
  });

  // Categorie per la sorgente scelta
  const catContainer = $("quiz-cat-grid");
  catContainer.innerHTML = "";
  const cats = [...new Set(
    ALL_QUESTIONS.filter(q=>q.source===quizConfig.source && q.type==="multiple_choice")
      .map(q=>q.category)
  )];

  const allCard = el("div", "selector-card" + (!quizConfig.category ? " selected" : ""));
  allCard.innerHTML = `<div class="sel-icon">🎲</div>
    <div class="sel-title">Tutte le materie</div>
    <div class="sel-sub">Mix completo</div>`;
  allCard.addEventListener("click", () => { quizConfig.category = null; renderQuizSelect(); });
  catContainer.appendChild(allCard);

  cats.forEach(cat => {
    const meta = CATEGORIES[cat] || { label: cat, color: "blue" };
    const count = ALL_QUESTIONS.filter(q=>q.source===quizConfig.source && q.category===cat && q.type==="multiple_choice").length;
    const card = el("div", "selector-card" + (quizConfig.category===cat ? " selected" : ""));
    card.innerHTML = `<div class="sel-icon">${badge(meta.label, meta.color)}</div>
      <div class="sel-title" style="margin-top:6px">${meta.label}</div>
      <div class="sel-sub">${count} domande</div>`;
    card.addEventListener("click", () => { quizConfig.category = cat; renderQuizSelect(); });
    catContainer.appendChild(card);
  });

  // Conteggio disponibile
  const available = ALL_QUESTIONS.filter(q =>
    q.type === "multiple_choice" &&
    q.source === quizConfig.source &&
    (!quizConfig.category || q.category === quizConfig.category)
  );
  $("quiz-available-count").textContent = `${available.length} domande disponibili`;
  $("quiz-count-input").max = available.length;
  if (parseInt($("quiz-count-input").value) > available.length) {
    $("quiz-count-input").value = available.length;
  }
}

function startQuiz() {
  const count = parseInt($("quiz-count-input").value) || 20;
  const timerOn = $("quiz-timer-toggle").checked;
  const timerSec = parseInt($("quiz-timer-input").value) || 90;

  let pool = filterQuestions({
    type: "multiple_choice",
    source: quizConfig.source,
    category: quizConfig.category || undefined,
  });

  // Priorità alle domande mai risposte o sbagliate
  const wrong   = pool.filter(q => state.progress[q.id] && state.progress[q.id].correct === 0);
  const fresh   = pool.filter(q => !state.progress[q.id]);
  const correct = pool.filter(q => state.progress[q.id]?.correct > 0);

  pool = shuffle([...wrong, ...fresh, ...correct]).slice(0, count);

  if (!pool.length) { toast("Nessuna domanda trovata con questi filtri."); return; }

  state.session = {
    questions: pool,
    current: 0,
    answers: [],       // { questionId, selected, correct }
    timerOn,
    timerSeconds: timerSec,
    timeLeft: timerSec,
    timerInterval: null,
    answered: false,
  };

  showScreen("quiz");
  renderQuizQuestion();
}

// ─── QUIZ SCREEN ──────────────────────────────────────────────────────────────
function renderQuizQuestion() {
  const s = state.session;
  const q = s.questions[s.current];
  s.answered = false;

  // Header
  $("quiz-num").textContent = `${s.current + 1} / ${s.questions.length}`;
  $("quiz-top-progress").style.width = `${(s.current / s.questions.length) * 100}%`;

  // Meta badges
  const cat  = CATEGORIES[q.category] || { label: q.category, color: "blue" };
  const diff = DIFFICULTIES[q.difficulty] || { label: q.difficulty, color: "yellow" };
  $("quiz-meta").innerHTML =
    badge(cat.label, cat.color) + badge(diff.label, diff.color);

  // Domanda
  $("quiz-question").textContent = q.question;

  // Opzioni
  const optContainer = $("quiz-options");
  optContainer.innerHTML = "";
  const letters = ["A", "B", "C", "D"];
  q.options.forEach((opt, i) => {
    const btn = el("button", "option-btn");
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener("click", () => selectAnswer(i));
    optContainer.appendChild(btn);
  });

  // Explanation hidden
  $("quiz-explanation").classList.add("hidden");
  $("quiz-explanation").innerHTML = "";

  // Nav buttons
  $("quiz-btn-next").classList.add("hidden");
  $("quiz-btn-skip").classList.remove("hidden");

  // Timer
  clearInterval(s.timerInterval);
  if (s.timerOn) {
    $("quiz-timer").classList.remove("hidden");
    s.timeLeft = s.timerSeconds;
    renderTimer();
    s.timerInterval = setInterval(() => {
      s.timeLeft--;
      renderTimer();
      if (s.timeLeft <= 0) {
        clearInterval(s.timerInterval);
        if (!s.answered) autoSkip();
      }
    }, 1000);
  } else {
    $("quiz-timer").classList.add("hidden");
  }
}

function renderTimer() {
  const s = state.session;
  const t = $("quiz-timer");
  const m = Math.floor(s.timeLeft / 60);
  const sec = s.timeLeft % 60;
  t.textContent = `${m}:${sec.toString().padStart(2, "0")}`;
  t.className = "timer";
  if (s.timeLeft <= 10) t.classList.add("danger");
  else if (s.timeLeft <= 30) t.classList.add("warning");
}

function selectAnswer(index) {
  const s = state.session;
  if (s.answered) return;
  s.answered = true;
  clearInterval(s.timerInterval);

  const q = s.questions[s.current];
  const isCorrect = index === q.correct;
  recordAnswer(q.id, isCorrect);

  s.answers.push({ questionId: q.id, selected: index, correct: isCorrect });

  // Colorazione opzioni
  const btns = document.querySelectorAll(".option-btn");
  btns.forEach((btn, i) => {
    btn.disabled = true;
    btn.classList.add("revealed");
    if (i === q.correct) btn.classList.add("correct");
    if (i === index && !isCorrect) btn.classList.add("wrong");
  });

  // Spiegazione
  const expBox = $("quiz-explanation");
  expBox.innerHTML = `<strong>${isCorrect ? "✓ Corretto!" : "✗ Sbagliato."}</strong> ${q.explanation}`;
  expBox.classList.remove("hidden");

  // Nav
  $("quiz-btn-skip").classList.add("hidden");
  $("quiz-btn-next").classList.remove("hidden");
  const isLast = s.current === s.questions.length - 1;
  $("quiz-btn-next").textContent = isLast ? "Vedi risultati →" : "Prossima →";
}

function autoSkip() {
  const s = state.session;
  if (s.answered) return;
  s.answered = true;
  const q = s.questions[s.current];
  s.answers.push({ questionId: q.id, selected: null, correct: false });

  const btns = document.querySelectorAll(".option-btn");
  btns.forEach((btn, i) => {
    btn.disabled = true;
    btn.classList.add("revealed");
    if (i === q.correct) btn.classList.add("correct");
  });

  $("quiz-explanation").innerHTML = `<strong>⏱ Tempo scaduto.</strong> ${q.explanation}`;
  $("quiz-explanation").classList.remove("hidden");
  $("quiz-btn-skip").classList.add("hidden");
  $("quiz-btn-next").classList.remove("hidden");
  const isLast = s.current === s.questions.length - 1;
  $("quiz-btn-next").textContent = isLast ? "Vedi risultati →" : "Prossima →";
}

function nextQuestion() {
  const s = state.session;
  if (s.current < s.questions.length - 1) {
    s.current++;
    renderQuizQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const s = state.session;
  clearInterval(s.timerInterval);

  const correct = s.answers.filter(a => a.correct).length;
  const total   = s.questions.length;
  const pct     = Math.round(correct / total * 100);

  // BI soglia: 18/30 per quesito (qui simuliamo su proporzione)
  const passed = pct >= 60;

  $("result-num").textContent = correct;
  $("result-den").textContent = `/ ${total}`;
  $("result-pct").textContent = pct + "%";
  $("result-status").textContent = passed ? "✓ Soglia superata" : "✗ Sotto soglia";
  $("result-status").style.color = passed ? "var(--green)" : "var(--red)";

  // Review domande sbagliate
  const wrongQs = s.answers.filter(a => !a.correct);
  const reviewEl = $("result-review");
  reviewEl.innerHTML = "";
  if (wrongQs.length) {
    reviewEl.innerHTML = `<h3 style="margin-bottom:12px;font-size:.95rem">Domande sbagliate o saltate (${wrongQs.length})</h3>`;
    wrongQs.forEach(a => {
      const q = s.questions.find(q => q.id === a.questionId);
      if (!q) return;
      const item = el("div", "card", `
        <div class="muted" style="margin-bottom:6px">${q.id}</div>
        <div style="font-weight:600;margin-bottom:8px">${q.question.slice(0,120)}${q.question.length>120?"…":""}</div>
        <div style="font-size:.85rem;color:var(--green)">✓ ${q.options[q.correct]}</div>
        ${a.selected !== null ? `<div style="font-size:.85rem;color:var(--red)">✗ ${q.options[a.selected]}</div>` : `<div style="font-size:.85rem;color:var(--muted)">— Saltata</div>`}
        <div class="explanation-box" style="margin-top:10px">${q.explanation}</div>
      `);
      reviewEl.appendChild(item);
    });
  } else {
    reviewEl.innerHTML = `<div class="center muted" style="padding:20px">🎉 Perfetto! Tutte corrette.</div>`;
  }

  showScreen("quiz-results");
}

// ─── OPEN QUESTIONS SCREEN ────────────────────────────────────────────────────
function renderOpenQuestions() {
  const source = $("open-source-select").value;
  const pool = ALL_QUESTIONS.filter(q => q.type === "open" && (!source || q.source === source));
  const container = $("open-questions-container");
  container.innerHTML = "";

  if (!pool.length) {
    container.innerHTML = `<div class="center muted" style="padding:40px">Nessun quesito aperto disponibile per questa sorgente.</div>`;
    return;
  }

  pool.forEach(q => {
    const card = el("div", "card open-question-card");
    const cat  = CATEGORIES[q.category] || { label: q.category, color: "blue" };
    const savedDraft = state.openDrafts[q.id] || "";

    card.innerHTML = `
      <div class="question-meta">
        ${badge(cat.label, cat.color)}
        ${badge("Risposta aperta", "orange")}
      </div>
      <div class="question-text">${q.question}</div>
      ${q.sub_questions ? `<ul class="sub-questions">${q.sub_questions.map(s=>`<li>${s}</li>`).join("")}</ul>` : ""}

      <div class="hints-section">
        <button class="hints-toggle" data-qid="${q.id}">💡 Mostra spunti</button>
        <ul class="hints-list" id="hints-${q.id}">
          ${q.hints.map(h=>`<li>${h}</li>`).join("")}
        </ul>
      </div>

      <div class="structure-guide">
        📋 <strong>Come strutturare la risposta:</strong> ${q.structure_guide}
      </div>

      <textarea class="open-textarea" id="draft-${q.id}"
        placeholder="Scrivi qui la tua risposta..."
        rows="8">${savedDraft}</textarea>

      <div class="open-actions mt-12">
        <button class="btn btn-secondary btn-sm" data-action="save-draft" data-qid="${q.id}">💾 Salva bozza</button>
        <button class="btn btn-secondary btn-sm" data-action="show-key-points" data-qid="${q.id}">✅ Punti chiave</button>
        <button class="btn btn-secondary btn-sm" data-action="ai-eval" data-qid="${q.id}">🤖 Valuta con AI</button>
        <button class="btn btn-secondary btn-sm" data-action="share" data-qid="${q.id}">📤 Condividi</button>
      </div>

      <div class="key-points-section" id="keypoints-${q.id}">
        <h4>✅ Punti chiave da coprire:</h4>
        <ul>${q.key_points.map(p=>`<li>${p}</li>`).join("")}</ul>
      </div>

      <div class="ai-panel hidden" id="ai-panel-${q.id}">
        <h4>🤖 Valutazione AI (richiede connessione)</h4>
        <div class="muted" style="margin-bottom:10px;font-size:.82rem">
          Inserisci la tua API key Anthropic per ricevere una valutazione. La chiave viene salvata solo in localStorage.
        </div>
        <input type="password" class="api-key-input" id="apikey-${q.id}"
          placeholder="sk-ant-api03-..."
          value="${state.settings.apiKey || ""}">
        <button class="btn btn-primary btn-sm" data-action="send-ai" data-qid="${q.id}">Invia per valutazione →</button>
        <div class="ai-response" id="ai-resp-${q.id}"></div>
      </div>
    `;
    container.appendChild(card);
  });

  // Event delegation
  container.addEventListener("click", handleOpenAction);
  container.addEventListener("input", e => {
    if (e.target.matches(".open-textarea")) {
      const qid = e.target.id.replace("draft-", "");
      state.openDrafts[qid] = e.target.value;
      saveOpenDrafts();
    }
  });
}

function handleOpenAction(e) {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;
  const qid = btn.dataset.qid;
  const q = ALL_QUESTIONS.find(q => q.id === qid);

  if (action === "save-draft") {
    const text = $(`draft-${qid}`)?.value || "";
    state.openDrafts[qid] = text;
    saveOpenDrafts();
    toast("Bozza salvata ✓");

  } else if (action === "show-key-points") {
    $(`keypoints-${qid}`).classList.toggle("open");

  } else if (action === "ai-eval") {
    const panel = $(`ai-panel-${qid}`);
    panel.classList.toggle("hidden");

  } else if (action === "share") {
    const draft = $(`draft-${qid}`)?.value || "";
    if (!draft.trim()) { toast("Scrivi prima una risposta."); return; }
    const text = buildShareText(q, draft);
    if (navigator.share) {
      navigator.share({ title: "Valutazione risposta concorso", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => toast("Testo copiato negli appunti ✓"));
    }

  } else if (action === "send-ai") {
    const apiKey = $(`apikey-${qid}`)?.value?.trim();
    if (!apiKey) { toast("Inserisci prima una API key."); return; }
    state.settings.apiKey = apiKey;
    saveSettings();
    const draft = $(`draft-${qid}`)?.value || "";
    if (!draft.trim()) { toast("Scrivi prima una risposta."); return; }
    sendToAI(qid, q, draft, apiKey);

  } else if (e.target.matches(".hints-toggle")) {
    $(`hints-${qid}`).classList.toggle("open");
    e.target.textContent = $(`hints-${qid}`).classList.contains("open")
      ? "💡 Nascondi spunti" : "💡 Mostra spunti";
  }
}

function buildShareText(q, draft) {
  return `[SIMULAZIONE CONCORSO PUBBLICO ICT]\n` +
    `Domanda (${q.id}):\n${q.question}\n\n` +
    (q.sub_questions ? q.sub_questions.join("\n") + "\n\n" : "") +
    `[MIA RISPOSTA]:\n${draft}\n\n` +
    `---\nValutami questa risposta come se fossi un commissario del concorso Banca d'Italia Profilo A ICT. ` +
    `Criteri: attinenza alla traccia, conoscenze tecniche, chiarezza espositiva, capacità di sintesi, ` +
    `capacità di argomentare. Indica i punti chiave mancanti e un giudizio sintetico.`;
}

async function sendToAI(qid, q, draft, apiKey) {
  const respEl = $(`ai-resp-${qid}`);
  respEl.className = "ai-response visible ai-loading";
  respEl.textContent = "⏳ Invio in corso...";

  const systemPrompt = `Sei un commissario esperto del concorso pubblico Banca d'Italia Profilo A (10 Esperti ICT).
Valuta la risposta del candidato secondo questi criteri: attinenza alla traccia (pertinenza, completezza),
conoscenze tecniche (applicazione al caso specifico), chiarezza espositiva, capacità di sintesi,
capacità di argomentare. Struttura il feedback in: PUNTI DI FORZA, PUNTI MANCANTI, VOTO SINTETICO (su 30) e SUGGERIMENTI.`;

  const userPrompt = buildShareText(q, draft);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }]
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    respEl.className = "ai-response visible";
    respEl.textContent = data.content?.[0]?.text || "Risposta vuota.";

  } catch (err) {
    respEl.className = "ai-response visible";
    respEl.textContent = `❌ Errore: ${err.message}\n\nUsa il pulsante "Condividi" per copiare il testo e incollarlo in una chat Claude.`;
  }
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────
function renderSettings() {
  const mcTotal  = ALL_QUESTIONS.filter(q=>q.type==="multiple_choice").length;
  const answered = Object.keys(state.progress).length;
  $("settings-db-info").textContent =
    `${DB_STATS.total} domande totali · ${mcTotal} multiple choice · ${answered} risposte`;
}

// ─── DB INFO ─────────────────────────────────────────────────────────────────
function renderDbInfo() {
  const container = $("db-info-container");
  container.innerHTML = "";

  DB_STATS.sources.forEach(src => {
    const row = el("div", "db-source-row");
    row.innerHTML = `<span>${src.label}</span><span class="db-badge">${src.count} domande</span>`;
    container.appendChild(row);
  });

  $("db-stats-total").textContent = DB_STATS.total;
  $("db-stats-mc").textContent = DB_STATS.byType.multiple_choice;
  $("db-stats-open").textContent = DB_STATS.byType.open;
}

// ─── INIZIALIZZAZIONE ─────────────────────────────────────────────────────────
function init() {
  // Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  // Tab navigation
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      showScreen(tab);
      if (tab === "home") renderHome();
      if (tab === "quiz-select") renderQuizSelect();
      if (tab === "open") renderOpenQuestions();
      if (tab === "settings") renderSettings();
      if (tab === "db-info") renderDbInfo();
    });
  });

  // Quiz start button
  $("btn-start-quiz")?.addEventListener("click", startQuiz);

  // Quiz navigation
  $("quiz-btn-next")?.addEventListener("click", nextQuestion);
  $("quiz-btn-skip")?.addEventListener("click", () => {
    const s = state.session;
    if (!s.answered) {
      clearInterval(s.timerInterval);
      autoSkip();
    } else {
      nextQuestion();
    }
  });
  $("quiz-btn-exit")?.addEventListener("click", () => {
    clearInterval(state.session?.timerInterval);
    showScreen("home"); renderHome();
  });

  // Results buttons
  $("result-btn-home")?.addEventListener("click", () => { showScreen("home"); renderHome(); });
  $("result-btn-retry")?.addEventListener("click", () => { showScreen("quiz-select"); renderQuizSelect(); });

  // Open source select
  $("open-source-select")?.addEventListener("change", renderOpenQuestions);

  // Settings: reset progress
  $("settings-reset-btn")?.addEventListener("click", () => {
    if (confirm("Resettare tutti i progressi? L'operazione è irreversibile.")) {
      resetAllProgress();
      toast("Progressi azzerati.");
      renderHome();
    }
  });

  // Install PWA prompt
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    $("btn-install")?.classList.remove("hidden");
  });
  $("btn-install")?.addEventListener("click", () => {
    deferredPrompt?.prompt();
    deferredPrompt = null;
  });

  // Render home iniziale
  renderHome();
  showScreen("home");
}

document.addEventListener("DOMContentLoaded", init);
