const CACHE_NAME = 'kaj-semestralka-cache-v1';
const urlsToCache = [
    '/',
    '/templates/index.html',
    '/templates/route_detail.html',
    '/public/css/styles.css',
    '/public/css/route_details.css',
    '/public/css/media_control.css',
    '/public/js/main.js',
    '/public/js/route.js',
    '/public/js/media_control.js',
    '/public/js/new_app.js',
    '/public/js/vue-app.js',
    '/public/js/edit_modal.js',
    '/public/js/auth.js',
    '/public/images/madrid1.jpg',
    '/public/images/madrid2.jpg',
    '/public/images/madrid3.jpg',
    '/public/images/prague1.jpg',
    '/public/images/prague2.jpg',
    '/public/images/prague3.jpg',
    '/public/images/rome1.jpg',
    '/public/images/rome2.jpg',
    '/public/images/rome3.jpg',
    '/public/audio/madrid1.mp3',
    '/public/audio/madrid2.mp3',
    '/public/audio/prague1.mp3',
    '/public/audio/rome1.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request);
    })
  );
});