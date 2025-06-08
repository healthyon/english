// Service Worker for 꿀둥스 PWA
const CACHE_NAME = 'honey-todos-v1.0.0';
const STATIC_CACHE = 'honey-todos-static-v1.0.0';
const DYNAMIC_CACHE = 'honey-todos-dynamic-v1.0.0';

// 캐시할 정적 파일들
const STATIC_FILES = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png',
    // CSS와 JS는 인라인이므로 제외
];

// 캐시할 API URL 패턴
const API_URLS = [
    'https://generativelanguage.googleapis.com',
    'https://docs.google.com'
];

// 설치 이벤트
self.addEventListener('install', (event) => {
    console.log('Service Worker: Install');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Skip waiting');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Install failed', error);
            })
    );
});

// 활성화 이벤트
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activate');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Clearing old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Claiming clients');
                return self.clients.claim();
            })
            .catch((error) => {
                console.error('Service Worker: Activate failed', error);
            })
    );
});

// Fetch 이벤트 (네트워크 요청 가로채기)
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // API 요청인지 확인
    const isApiRequest = API_URLS.some(apiUrl => request.url.includes(apiUrl));
    
    if (isApiRequest) {
        // API 요청: Network First 전략
        event.respondWith(handleApiRequest(request));
    } else {
        // 정적 리소스: Cache First 전략
        event.respondWith(handleStaticRequest(request));
    }
});

// API 요청 처리 (Network First)
async function handleApiRequest(request) {
    try {
        // 네트워크 우선 시도
        const response = await fetch(request);
        
        if (response.ok) {
            // 성공한 응답을 동적 캐시에 저장
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        console.log('Service Worker: Network failed, trying cache', error);
        
        // 네트워크 실패 시 캐시에서 반환
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // 캐시에도 없으면 오프라인 응답
        return new Response(
            JSON.stringify({
                error: 'Network unavailable',
                message: '네트워크 연결을 확인해주세요'
            }),
            {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// 정적 리소스 처리 (Cache First)
async function handleStaticRequest(request) {
    try {
        // 캐시에서 먼저 찾기
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // 캐시에 없으면 네트워크에서 가져오기
        const response = await fetch(request);
        
        if (response.ok) {
            // 성공한 응답을 캐시에 저장
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        console.log('Service Worker: Fetch failed', error);
        
        // 오프라인 상태에서 기본 페이지 반환
        if (request.destination === 'document') {
            return caches.match('/');
        }
        
        // 기타 리소스는 404 반환
        return new Response('오프라인 상태입니다', {
            status: 404,
            statusText: 'Not Found'
        });
    }
}

// 푸시 알림 처리 (향후 확장용)
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push event received');
    
    if (!event.data) {
        return;
    }
    
    const data = event.data.json();
    const options = {
        body: data.body || '새로운 알림이 있습니다',
        icon: '/icon-192x192.png',
        badge: '/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: data.id || 1,
            url: data.url || '/'
        },
        actions: [
            {
                action: 'view',
                title: '보기',
                icon: '/icon-192x192.png'
            },
            {
                action: 'close',
                title: '닫기'
            }
        ],
        requireInteraction: true,
        tag: 'honey-todos-notification'
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || '꿀둥스', options)
    );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification click received');
    
    event.notification.close();
    
    if (event.action === 'view') {
        const urlToOpen = event.notification.data?.url || '/';
        
        event.waitUntil(
            clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            }).then((clientList) => {
                // 이미 열린 창이 있으면 포커스
                for (const client of clientList) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // 새 창 열기
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
        );
    }
});

// 백그라운드 동기화 (향후 확장용)
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync event', event.tag);
    
    if (event.tag === 'sync-todos') {
        event.waitUntil(syncTodos());
    }
});

// 할일 동기화 함수
async function syncTodos() {
    try {
        console.log('Service Worker: Syncing todos in background');
        
        // 로컬 스토리지에서 동기화할 데이터 가져오기
        const pendingSync = await getStorageData('pendingSync');
        
        if (pendingSync && pendingSync.length > 0) {
            // 서버와 동기화 로직 (구글 시트 API 호출 등)
            // 실제 구현시 여기에 API 호출 코드 추가
            
            console.log('Service Worker: Background sync completed');
        }
    } catch (error) {
        console.error('Service Worker: Background sync failed', error);
    }
}

// 스토리지 데이터 가져오기 헬퍼 함수
async function getStorageData(key) {
    return new Promise((resolve) => {
        // IndexedDB 사용 (localStorage는 Service Worker에서 접근 불가)
        const request = indexedDB.open('HoneyTodosDB', 1);
        
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['data'], 'readonly');
            const store = transaction.objectStore('data');
            const getRequest = store.get(key);
            
            getRequest.onsuccess = () => {
                resolve(getRequest.result?.value || null);
            };
            
            getRequest.onerror = () => {
                resolve(null);
            };
        };
        
        request.onerror = () => {
            resolve(null);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('data')) {
                db.createObjectStore('data', { keyPath: 'key' });
            }
        };
    });
}

// 메시지 처리 (메인 스레드와 통신)
self.addEventListener('message', (event) => {
    console.log('Service Worker: Message received', event.data);
    
    const { type, payload } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'GET_VERSION':
            event.ports[0].postMessage({ version: CACHE_NAME });
            break;
            
        case 'CLEAR_CACHE':
            clearAllCaches().then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;
            
        case 'SYNC_REQUEST':
            // 백그라운드 동기화 요청
            self.registration.sync.register('sync-todos');
            break;
            
        default:
            console.log('Service Worker: Unknown message type', type);
    }
});

// 모든 캐시 삭제
async function clearAllCaches() {
    try {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('Service Worker: All caches cleared');
        return true;
    } catch (error) {
        console.error('Service Worker: Failed to clear caches', error);
        return false;
    }
}

// 주기적 백그라운드 동기화 (Periodic Background Sync)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'content-sync') {
        event.waitUntil(syncTodos());
    }
});

// 오류 처리
self.addEventListener('error', (event) => {
    console.error('Service Worker: Error occurred', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker: Unhandled promise rejection', event.reason);
});

// Service Worker 업데이트 감지
self.addEventListener('updatefound', () => {
    console.log('Service Worker: Update found');
});

console.log('Service Worker: Script loaded');