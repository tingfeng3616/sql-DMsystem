// Service Worker for DM管理后台 PWA
const CACHE_NAME = 'dm-cache-v2';  // 版本号递增，强制更新

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/alexico.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  console.log('[SW] 安装中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] 激活中...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (request.url.includes('lncld') || request.url.includes('leancloud')) return;

  // 跳过 version.json - 版本检测必须总是从网络获取最新
  if (request.url.includes('version.json')) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (request.mode === 'navigate') return caches.match('/index.html');
          return new Response('离线不可用', { status: 503 });
        });
      })
  );
});
