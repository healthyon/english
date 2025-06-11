// sw.ts
/// <reference lib="webworker" />

// self is implicitly ServiceWorkerGlobalScope in a service worker file
// when "webworker" lib is referenced. TypeScript's inference can sometimes be tricky,
// so explicit casting is used for self.skipWaiting() and self.clients.claim().

const CACHE_NAME = 'ggoolmoney-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Add other static assets like JS/CSS bundles if not loaded from CDN
  // '/app.js', - Example, if you have bundled JS
  // '/styles.css', - Example
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/maskable_icon_x192.png',
  '/icons/maskable_icon_x512.png'
  // Note: Tailwind is loaded via CDN, so it won't be cached by this SW unless explicitly added.
  // The browser might cache CDN resources based on its own policies.
];

self.addEventListener('install', (event) => {
  const installEvent = event as ExtendableEvent;
  installEvent.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  (self as ServiceWorkerGlobalScope).skipWaiting();
});

self.addEventListener('activate', (event) => {
  const activateEvent = event as ExtendableEvent;
  const cacheWhitelist = [CACHE_NAME];
  activateEvent.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
  (self as ServiceWorkerGlobalScope).clients.claim();
});

self.addEventListener('fetch', (event) => {
  const fetchEvent = event as FetchEvent;
  // We only want to handle GET requests for caching
  if (fetchEvent.request.method !== 'GET') {
    return;
  }

  // For navigation requests, try network first, then cache (Network falling back to cache)
  // This ensures users get the latest HTML if online, but can still access if offline
  if (fetchEvent.request.mode === 'navigate') {
    fetchEvent.respondWith(
      fetch(fetchEvent.request)
        .then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            // If network fails or returns an error, try to serve from cache
            return caches.match(fetchEvent.request) as Promise<Response>;
          }
          
          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(fetchEvent.request, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          return caches.match(fetchEvent.request) as Promise<Response>;
        })
    );
    return;
  }

  // For other requests (assets, etc.), use a cache-first strategy
  fetchEvent.respondWith(
    caches.match(fetchEvent.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - fetch from network
        return fetch(fetchEvent.request).then(
          (networkResponse) => {
            // Check if we received a valid response
            if(!networkResponse || networkResponse.status !== 200) { // networkResponse.type !== 'basic' for same-origin
              return networkResponse;
            }

            // IMPORTANT: Clone the response.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(fetchEvent.request, responseToCache);
              });

            return networkResponse;
          }
        ).catch(() => {
          // If fetch fails (e.g., offline) and it wasn't in cache,
          // you could return a fallback offline page/image if appropriate.
          // For now, just let the browser handle the error.
          // For specific image types, you could return a placeholder.
          if (fetchEvent.request.destination === 'image') {
            // return caches.match('/icons/offline-placeholder.png'); // Example placeholder
          }
          return new Response("Network error and not in cache.", {
            status: 404,
            statusText: "Not Found"
          });
        });
      })
  );
});
