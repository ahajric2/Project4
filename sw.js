var appName = 'app-cache-1';
let urlCache = [
  '/',
  '/restaurant.html',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
];

self.addEventListener('install',function(event){

  event.waitUntil(
    caches.open(appName).then(function(cache){
    console.log(cache);
    return cache.addAll(urlCache);
  }).catch(error=>{console.log(error);
  })
);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        //creates a new array of all caches that aren't the defined appname
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('app-') && cacheName != appName;
        }).map(function(cacheName) {
            return caches.delete(cacheName);
        })
      );
    })
  );
});
