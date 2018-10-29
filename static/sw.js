importScripts('/smipaint/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/smipaint/_nuxt/80211a75cb0a3c6e822e.js",
    "revision": "126822ea7014a53213c7b48d3fd01d81"
  },
  {
    "url": "/smipaint/_nuxt/9dbe6d7c840853855806.js",
    "revision": "6c85c2f8dab8b88fd7777e958faed2ef"
  },
  {
    "url": "/smipaint/_nuxt/ac56db2c3485c73164f0.js",
    "revision": "8da1d541638339d7ef704523ad1447a6"
  },
  {
    "url": "/smipaint/_nuxt/ea105b548f493883ac28.js",
    "revision": "139c4f04693a11f12a3da25661cf89b9"
  },
  {
    "url": "/smipaint/_nuxt/f6d7f68dbaa23a358323.js",
    "revision": "c2555dc2b5b8ac95edaf5c4f628754a5"
  }
], {
  "cacheId": "smipaintpwa",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/smipaint/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/smipaint/.*'), workbox.strategies.networkFirst({}), 'GET')





