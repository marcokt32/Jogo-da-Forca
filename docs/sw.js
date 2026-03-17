importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyDonNicRdW-Cy1MkDVlTLEMksjFkITmg7A",
  authDomain: "oenforcado.firebaseapp.com",
  projectId: "oenforcado",
  storageBucket: "oenforcado.firebasestorage.app",
  messagingSenderId: "179259322356",
  appId: "1:179259322356:web:cecbc39bcf76c665b093a1",
  measurementId: "G-T5SGQRR3VZ"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const CACHE_NAME = "enforcado-v3";

const arquivos = [
  "/",
  "/index.html",
  "/manifest.json",

  "css/reset.css",
  "css/style.css",
  "css/flexbox.css",

  "js/render.js",
  "js/forca.js",
  "js/canvas.js",
  "js/banco-palavras.js",

  "icons/icon-192.png",
  "icons/icon-512.png"
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

self.addEventListener("push", function (event) {

  if (!event.data) return;

  const dados = event.data.json();

  const titulo = dados.notification?.title || "O Enforcado";
  const opcoes = {
    body: dados.notification?.body,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: {
      url: "/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(titulo, opcoes)
  );

});

self.addEventListener("notificationclick", function (event) {

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then(clientList => {

      for (let client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow("/");
      }

    })
  );

});