window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker registered successfully.'))
    .catch((error) => console.error('Service Worker registration failed:', error));
    }
   };
   self.addEventListener('fetch', (event) => {
    event.respondWith(
    caches.match(event.request).then((response) => {
    return response || fetch(event.request).then((fetchResponse) => {
    if (event.request.method === 'GET') {
    return caches.open(cacheName).then((cache) => {
    cache.put(event.request, fetchResponse.clone());
    return fetchResponse;
    });
    }
    return fetchResponse;
    });
    }).catch(() => {
    if (event.request.mode === 'navigate') {
    return caches.match('/index.html');
    }
    })
    );
   });