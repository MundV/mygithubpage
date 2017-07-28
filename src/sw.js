/* globals toolbox importScripts addEventListener skipWaiting clients */
importScripts('https://unpkg.com/sw-toolbox@3.6.0/sw-toolbox.js')
addEventListener('install', event => event.waitUntil(skipWaiting()))
addEventListener('activate', event => event.waitUntil(clients.claim()))
toolbox.options.debug = true
toolbox.precache(['/', '/static/options/default.json', '/static/options/twin.json', '/sw.js', '/app.js'])
toolbox.router.get('/*', toolbox.fastest)
