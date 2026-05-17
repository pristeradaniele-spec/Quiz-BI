/**
 * Service Worker — Cache offline per la PWA
 * Strategia: Cache First per assets statici, Network First per dati
 */

const CACHE_NAME = "quiz-ict-v2";
const ASSETS_TO_CACHE = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./data/index.js",
  "./data/schema.js",
  "./data/questions_bi_a_v1.js",
  "./data/questions_bi_a_v2.js",
  "./data/questions_bi_open_v1.js",
  "./data/questions_bi_open_v2.js",
  "./data/questions_preselettivo_v1.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Installazione: pre-carica tutti gli asset in cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Attivazione: rimuove cache vecchie
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache first per assets, network first per API Claude
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Richieste API Claude: sempre network (non cacheable)
  if (url.hostname === "api.anthropic.com") {
    event.respondWith(fetch(event.request));
    return;
  }

  // Assets statici: cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Aggiorna la cache per le nuove risorse
        if (response.ok && event.request.method === "GET") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback per HTML
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
