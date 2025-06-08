// 서비스 워커 버전
const CACHE_NAME = 'honey-task-v1.0.0';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './manifest.json',
  './assets/icon-192x192.png',
  './assets/icon-512x512.png'
];

// 설치 이벤트
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('캐시 파일들을 저장했습니다');
        return cache.addAll(urlsToCache);
      })
  );
});

// 활성화 이벤트
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('기존 캐시를 삭제합니다:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 네트워크 요청 이벤트
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 캐시에서 찾으면 반환
        if (response) {
          return response;
        }

        // 네트워크에서 가져오기
        return fetch(event.request).then(
          function(response) {
            // 유효한 응답인지 확인
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 응답을 복사하여 캐시에 저장
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});