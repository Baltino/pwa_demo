const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html', '/images/forest_offline.jpg' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');

        return cache.addAll(urlsToCache);
      })
  )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if(url.pathname.includes('/forest_offline.jpg')) {
    event.respondWith(caches.match('/images/forest_offline.jpg'));
  }else {
    event.respondWith(
      caches.match(event.request)
        .then(() => {
          return fetch(event.request) 
            .catch(() => caches.match('offline.html'))
        })
    )
  }
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if(!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
          
  )
});