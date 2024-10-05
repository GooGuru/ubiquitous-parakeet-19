// src-sw.js
import { precaching } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precache assets
precaching.precacheAndRoute(self.__WB_MANIFEST);

// Cache API requests
registerRoute(
  ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'assets',
  })
);
