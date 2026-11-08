/* Uncorked service worker: lets the game and cheat sheet work offline.
   Online, it always fetches the latest files (so updates show straight away)
   and saves a copy. Offline, or on a very slow connection, it uses the saved copy.
   Bump VERSION whenever you change any file. */
const VERSION = 'uncorked-v6';
const ASSETS = ['./', 'index.html', 'css/style.css', 'js/data.js', 'js/app.js', 'icon.svg', 'manifest.webmanifest'];
const NETWORK_TIMEOUT = 4000; // ms before falling back to the saved copy

self.addEventListener('install', e => {
  // cache: 'reload' skips the browser's own short-term cache, so we never save stale files
  e.waitUntil(caches.open(VERSION)
    .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Network first, saved copy as a fallback.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const network = fetch(req, { cache: 'no-cache' }).then(res => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    });
    const timeout = new Promise(resolve => setTimeout(resolve, NETWORK_TIMEOUT));
    try {
      const res = await Promise.race([network, timeout]);
      if (res) return res;
    } catch (err) { /* offline: fall through to the saved copy */ }
    const cached = await cache.match(req, { ignoreSearch: true });
    return cached || network;
  })());
});
