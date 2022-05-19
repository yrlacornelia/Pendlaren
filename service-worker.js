self.addEventListener(`install`, (event) => {
    event.waitUntil(
        caches.open(`v1`).then((cache) => {
            return cache.addAll([`offline.html`, `styles.css`])
        })
    )
    console.log(`install service at`, new Date().toLocaleTimeString())
})
self.addEventListener(`activate`, (event) => {
    self.skipWaiting();
    console.log(`Activated service worker at`, new Date().toLocaleTimeString());
})
self.addEventListener('fetch', (event) => {
    console.log(event.request.url);
    if (!navigator.onLine) {     //checks if we are online or offline, true or false
        console.log('Offline');
        event.respondWith(
            caches.match(event.request).then((response) => {
                console.log('RESPONSE:', response);
                if (response) {
                    return response
                } else {
                    return caches.match(new Request('offline.html'))
                }
            })
        )
    } else {
        console.log('Online');
    }



})


async function updateCache() {
    
}