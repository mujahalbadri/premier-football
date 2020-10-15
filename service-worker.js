// Script Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('Workbox berhasil dimuat');
    workbox.precaching.precacheAndRoute([
        { url: '/index.html', revision: '2' },
        { url: '/nav.html', revision: '2' },
        { url: '/img/icon/logo-push.png', revision: '2' },
        { url: '/img/icon/icon-192x192.png', revision: '2' },
        { url: '/img/icon/icon-512x512.png', revision: '2' },
        { url: '/css/materialize.min.css', revision: '2' },
        { url: '/css/style.css', revision: '2' },
        { url: '/css/Material Icon/Material-icon.css', revision: '2' },
        { url: '/css/Material Icon/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '2' },
        { url: '/js/materialize.min.js', revision: '2' },
        { url: '/js/nav.js', revision: '2' },
        { url: '/js/api.js', revision: '2' },
        { url: '/js/push.js', revision: '2' },
        { url: '/js/main.js', revision: '2' },
        { url: '/js/team.js', revision: '2' },
        { url: '/js/idb.js', revision: '2' },
        { url: '/js/db.js', revision: '2' },
        { url: '/img/icon/logo.png', revision: '2' },
        { url: '/img/icon/sidenav-logo.png', revision: '2' },
        { url: 'manifest.json', revision: '2' },
    ]);

    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages',
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('/team.html'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'team',
        }),
    );

    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        /^https:\/\/api\.football-data\.org\/v2/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'football-data-API',
        }),
    );

    // Menyimpan cache dari CSS Google Fonts
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        }),
    );

    // Menyimpan cache untuk file Google Fonts selama 1 tahun
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        }),
    );

    // Menyimpan cache untuk file Fontawesome selama 1 tahun
    workbox.routing.registerRoute(
        /^https:\/\/kit\.fontawesome\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'kit.fontawesome',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        /^https:\/\/kit-free\.fontawesome\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'kit-free.fontawesome',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        }),
    );
} else {
    console.log('Workbox gagal dimuat');
}

// Script Push Notification
self.addEventListener('push', (event) => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body,
        icon: 'img/icon/logo-push.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options),
    );
});
