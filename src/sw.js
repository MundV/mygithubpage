/* globals toolbox importScripts addEventListener skipWaiting clients serviceWorkerOption*/
importScripts('https://unpkg.com/sw-toolbox@3.6.0/sw-toolbox.js')
addEventListener('install', event => event.waitUntil(skipWaiting()))
addEventListener('activate', event => event.waitUntil(clients.claim()))
toolbox.options.debug = true
toolbox.precache(serviceWorkerOption.assets)
toolbox.router.get('/*', toolbox.fastest)
