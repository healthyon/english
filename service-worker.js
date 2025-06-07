// 서비스 워커 스크립트
// PWA의 오프라인 기능을 담당합니다.

const CACHE_NAME = 'english-learning-app-cache-v1';
// 앱을 실행하는 데 필요한 최소한의 파일 목록을 캐싱합니다.
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 1. 서비스 워커 설치
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// 2. 네트워크 요청 가로채기 (Fetch)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// 3. 오래된 캐시 정리 (Activate)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
