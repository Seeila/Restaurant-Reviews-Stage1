let staticCacheName = 'mws-restaurant-v2';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


self.addEventListener('install', (event) => {
   event.waitUntil(
      caches.open(staticCacheName).then(cache => {
         return cache.addAll([
            '/',
            'index.html',
            '/js/main.js',
            '/css/styles.css',
            '/js/restaurant_info.js',
            '/js/dbhelper.js',
            '/img/1.jpg',
            '/img/2.jpg',
            '/img/3.jpg',
            '/img/4.jpg',
            '/img/5.jpg',
            '/img/6.jpg',
            '/img/7.jpg',
            '/img/8.jpg',
            '/img/9.jpg',
            '/img/10.jpg'
         ]).then(() => console.log('everything is cached')).catch(err => {
            console.log('fail', err)
         })
      })
   );
});

self.addEventListener('activate', function(event) {
   event.waitUntil(
      caches.keys().then(function(cacheNames) {
         return Promise.all(
            cacheNames.filter(function(cacheName) {
               return cacheName.startsWith('mws-restaurant-') &&
                  cacheName != staticCacheName;
            }).map(function(cacheName) {
               return caches.delete(cacheName);
            })
         );
      })
   );
});

self.addEventListener('fetch', function(event) {
   let requestUrl = new URL(event.request.url);
   event.respondWith(
      caches.match(event.request).then(function(response) {
         return response || fetch(event.request);
      })
   );
});
