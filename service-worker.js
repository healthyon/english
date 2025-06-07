// 서비스 워커 스크립트
// PWA의 오프라인 기능을 담당합니다.

const CACHE_NAME = 'english-learning-app-cache-v1';
// 앱을 실행하는 데 필요한 최소한의 파일 목록을 캐싱합니다.
const urlsToCache = [
  '/',
  'index.html', // './' 와 'index.html' 둘 다 캐싱
  'manifest.json'
];

// 1. 서비스 워커 설치
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // 네트워크 오류에 강건하게 만들기 위해 개별적으로 캐시 추가
        return Promise.all(
          urlsToCache.map(url => cache.add(url).catch(err => console.warn(`Failed to cache ${url}:`, err)))
        );
      })
  );
  self.skipWaiting();
});

// 2. 네트워크 요청 가로채기 (Fetch)
self.addEventListener('fetch', event => {
  // Gemini API 요청은 캐싱하지 않고 항상 네트워크로 보냅니다.
  if (event.request.url.includes('generativelanguage.googleapis.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 응답이 있으면 그것을 반환합니다.
        if (response) {
          return response;
        }
        // 캐시에 없으면 네트워크로 실제 요청을 보냅니다.
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
