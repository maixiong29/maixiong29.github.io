const FILES_TO_CACHE = [
    "/",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
    "https://code.jquery.com/jquery.js",
    "manifest.webmanifest",
    "/assets/css/burger_style.css",
    "/assets/javascript/burger_html.js",
    "/assets/img/burger.jpg"

];
const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";
// install
self.addEventListener('install', function(evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log('Your files were pre-cached successfully!');
        return cache.addAll(FILES_TO_CACHE);
      })
    );
    self.skipWaiting();
  });

// activate
self.addEventListener('activate', function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log('Removing old cache data', key);
              return caches.delete(key);
            }
          })
        );
      })
    );
  // Tells our new service worker to take over.
    self.clients.claim();
  });
// fetch
self.addEventListener("fetch", function (evt) {
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      }).catch(err => {
        console.log(err)
      })
    );
    return;
  }
  evt.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
      });
    })
  );
});