// Cache resources for offline use
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
   '/',
   '/index.html',
   '/styles.css',
   '/app.js',
   '/icons/icon-192x192.png',
   '/icons/icon-512x512.png',
   '/C1P-W8A/',
   '/C1P-W8A/index.html',
   '/C1P-W8A/app.js',
   '/C1P-W8A/icons/icon-192x192.png',
   '/C1P-W8A/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Default Title';
  const options = {
    body: data.body || 'Default Body',
    icon: 'icons/icon-512x512.png', // You can change the icon URL
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
