importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");


if(workbox){
console.log("My custom service worker")
}else{
    console.log("My custom workbox didnt load")
}

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    new workbox.strategies.NetworkFirst()
);


workbox.routing.registerRoute(
    "http://localhost:3001",
    workbox.strategies.networkFirst(),
);


workbox.routing.registerRoute(
    "http://localhost:3001/#/",
    workbox.strategies.networkFirst(),
);

workbox.routing.registerRoute(
    "http://localhost:3001/#/create",
    workbox.strategies.networkFirst(),
);

workbox.routing.registerRoute(
    "http://localhost:3001/#/login",
    workbox.strategies.networkFirst(),
);


