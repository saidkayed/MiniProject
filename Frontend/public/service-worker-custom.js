//de sider der skal cashes.
const filesToCache = [

];

const staticCacheName = 'pages-cache-v1';

//installere Service Worker
self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

//Når du er offline vil den modtage fetch kald, og vil prøve at finde den caschede side, hvis den er gemt.
self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }



      // de sider du besøger bliver cashet. eller videre sender den dig videre til en 404 side/offline side
      console.log('Network request for ', event.request.url);
      return fetch(event.request)
      .then(response => {

          return caches.open(staticCacheName).then(cache => {
            cache.put(event.request.url, response.clone());
            console.log("added");
            return response;
          });
        });


    }).catch(error => {
       console.log("ERROR",error);
    })
  );
});