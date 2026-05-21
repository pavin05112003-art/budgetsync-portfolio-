const CACHE_NAME = 'budget-sync-v2';

// Install without waiting
self.addEventListener('install', event => {
    self.skipWaiting();
});

// Activate and claim clients
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

// Dynamic cache-first strategy
self.addEventListener('fetch', event => {
    // Only cache GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached response if found, else fetch from network
            return response || fetch(event.request).then(fetchRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    // Dynamically cache the new resource
                    cache.put(event.request, fetchRes.clone());
                    return fetchRes;
                });
            });
        }).catch(() => {
            // Fallback (do nothing if offline and not in cache)
        })
    );
});
