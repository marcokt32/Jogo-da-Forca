const CACHE_NAME = "enforcado-v2";

const arquivos = [
  "/",
  "/index.html",
  "/manifest.json",

  "/css/reset.css",
  "/css/style.css",
  "/css/flexbox.css",

  "/js/script.js", 
  "/js/pontuacoes.js",

  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(arquivos);
    })
  );

});

self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );

});

self.addEventListener("fetch", event => {

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );

});