// Network-first: always try the latest version from the server, and fall back
// to the last saved copy when offline. Saved fasts live in localStorage, not here.
const CACHE = "fast-app-v2";
const FILES = ["./", "./index.html", "./app.js", "./styles.css", "./manifest.json"];

self.addEventListener("install", (event) => {
  // "reload" skips the browser's own copy so the new cache never starts out stale.
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(FILES.map((f) => new Request(f, { cache: "reload" }))))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    // Fetch by URL: page loads can't be re-sent with changed options, and
    // "no-cache" makes the browser check with the server instead of reusing
    // its own copy for the 10 minutes GitHub Pages allows.
    fetch(request.url, { cache: "no-cache" })
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: true }).then((hit) => hit || caches.match("./index.html")))
  );
});
