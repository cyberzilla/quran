const CACHE_NAME = 'quran-pwa-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './icon-192.png',
    './quran.sqlite', // File database SQLite
    './sql-wasm.js',
    './sql-wasm.wasm',
    './omar.woff2',
    './inter-regular.woff2',
    './inter-semibold.woff2'
];

// Install Event: Menyimpan semua aset awal ke Cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Membuka cache dan menyimpan aset...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event: Membersihkan cache versi lama jika ada pembaruan
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Menghapus cache lama:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event: Mengambil dari Cache dulu, jika tidak ada baru ke Network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Kembalikan file dari cache
                }
                return fetch(event.request); // Ambil dari server jika belum di-cache
            })
    );
});