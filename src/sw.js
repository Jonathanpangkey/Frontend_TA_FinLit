
import {precacheAndRoute} from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("pwa-cache-v1").then((cache) => {
      return cache.addAll(["/", "/index.html", "/offline.html"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open("api-cache").then((cache) => {
        return fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => caches.match(event.request));
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).catch(() => {
            if (event.request.mode === "navigate") {
              return caches.match("/offline.html");
            }
          })
        );
      })
    );
  }
});
