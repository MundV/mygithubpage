var serviceWorkerOption = {"assets":["/static/js/vendor.664030e8980c7d938901.js","/static/js/app.66d62d23dc36686a9b0e.js","/static/js/manifest.fb451724befa02752f03.js","/static/css/app.eb1275049737802937b36f9115f894d6.css","/index.html","/static/favicons/android-icon-192x192.png","/static/favicons/android-icon-36x36.png","/static/favicons/android-icon-48x48.png","/static/favicons/android-icon-144x144.png","/static/favicons/android-icon-72x72.png","/static/favicons/apple-icon-114x114.png","/static/favicons/android-icon-96x96.png","/static/favicons/apple-icon-120x120.png","/static/favicons/apple-icon-144x144.png","/static/favicons/apple-icon-152x152.png","/static/favicons/apple-icon-60x60.png","/static/favicons/apple-icon-180x180.png","/static/favicons/apple-icon-57x57.png","/static/favicons/apple-icon-76x76.png","/static/favicons/apple-icon-precomposed.png","/static/favicons/apple-icon-72x72.png","/static/favicons/apple-icon.png","/static/favicons/favicon-32x32.png","/static/favicons/favicon-16x16.png","/static/favicons/favicon-96x96.png","/static/favicons/ms-icon-144x144.png","/static/favicons/ms-icon-150x150.png","/static/favicons/ms-icon-310x310.png","/static/favicons/ms-icon-70x70.png","/static/favicons/browserconfig.xml","/static/options/default.json","/static/favicons/manifest.json","/static/favicons/favicon.ico","/static/manifest.json","/static/options/twin.json"]};
        
        !function(t){function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var e={};n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="/",n(n.s=0)}([function(t,n){importScripts("https://unpkg.com/sw-toolbox@3.6.0/sw-toolbox.js"),addEventListener("install",function(t){return t.waitUntil(skipWaiting())}),addEventListener("activate",function(t){return t.waitUntil(clients.claim())}),toolbox.precache(serviceWorkerOption.assets),toolbox.router.get("/*",toolbox.fastest)}]);
//# sourceMappingURL=sw.js.map