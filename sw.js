const CACHE_NAME = 'honeydung-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js'
];

// 설치 이벤트 - 캐시 생성
self.addEventListener('install', (event) => {
  console.log('Service Worker: 설치 중...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: 캐시 오픈됨');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: 파일들이 캐시됨');
        return self.skipWaiting();
      })
  );
});

// 활성화 이벤트 - 오래된 캐시 삭제
self.addEventListener('activate', (event) => {
  console.log('Service Worker: 활성화됨');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: 오래된 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: 클라이언트 제어 시작');
      return self.clients.claim();
    })
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
  // GET 요청만 처리
  if (event.request.method !== 'GET') {
    return;
  }

  // 외부 API 요청은 캐시하지 않음
  if (event.request.url.includes('googleapis.com') || 
      event.request.url.includes('docs.google.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시에 있으면 캐시에서 반환
        if (response) {
          console.log('Service Worker: 캐시에서 반환:', event.request.url);
          return response;
        }

        // 캐시에 없으면 네트워크에서 가져오기
        console.log('Service Worker: 네트워크에서 가져오기:', event.request.url);
        
        return fetch(event.request).then((response) => {
          // 유효한 응답인지 확인
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 응답을 복제 (한 번만 사용할 수 있으므로)
          const responseToCache = response.clone();

          // 응답을 캐시에 저장
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // 네트워크 실패시 오프라인 페이지 또는 기본 응답
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// 백그라운드 동기화 (선택사항)
self.addEventListener('sync', (event) => {
  console.log('Service Worker: 백그라운드 동기화:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // 여기에 오프라인 중 저장된 데이터를 서버로 전송하는 로직 추가 가능
      Promise.resolve()
    );
  }
});

// 푸시 알림 처리 (선택사항)
self.addEventListener('push', (event) => {
  console.log('Service Worker: 푸시 알림 수신');
  
  const options = {
    body: event.data ? event.data.text() : '새로운 할일이 있어요!',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: '확인하기',
        icon: '/icon-72.png'
      },
      {
        action: 'close',
        title: '닫기',
        icon: '/icon-72.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('꿀둥스', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: 알림 클릭됨:', event.notification.tag);
  
  event.notification.close();

  if (event.action === 'explore') {
    // 앱 열기
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // 알림만 닫기
    console.log('알림 닫기');
  } else {
    // 기본 동작: 앱 열기
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 메시지 처리 (앱과 Service Worker 간 통신)
self.addEventListener('message', (event) => {
  console.log('Service Worker: 메시지 수신:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// 설치 프롬프트 관련 이벤트
self.addEventListener('beforeinstallprompt', (event) => {
  console.log('Service Worker: 설치 프롬프트 준비됨');
  // 이 이벤트는 Service Worker가 아닌 메인 스레드에서 처리됨
});

// 앱 설치 완료 이벤트
self.addEventListener('appinstalled', (event) => {
  console.log('Service Worker: 앱 설치 완료됨');
  
  // 설치 완료 알림 (선택사항)
  self.registration.showNotification('꿀둥스 설치 완료!', {
    body: '이제 꿀둥스를 앱으로 사용하실 수 있어요! 🎉',
    icon: '/icon-192.png',
    badge: '/icon-72.png'
  });
});

// 오류 처리
self.addEventListener('error', (event) => {
  console.error('Service Worker 오류:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker 처리되지 않은 Promise 거부:', event.reason);
});

console.log('Service Worker: 스크립트 로드됨 - ', CACHE_NAME);