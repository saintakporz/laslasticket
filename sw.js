const CACHE_NAME = 'my-pwa-cache-v1';
const CACHE_EXPIRATION = 7 * 24 * 60 * 60; // Cache expiration time in seconds
const CACHE_DYNAMIC_PREFIX = 'dynamic-cache-';
const CACHE_DYNAMIC_MAX_ENTRIES = 50;
let deferredPrompt;

self.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallPrompt();
});

function showInstallPrompt() {
  // Customize the installation prompt UI based on your needs
  const installButton = document.createElement('button');
  installButton.textContent = 'Install';

  installButton.addEventListener('click', () => {
    // Show the browser's default installation prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User installed the PWA');
        // Perform any additional actions after installation
      } else {
        console.log('User dismissed the PWA installation');
        // Perform any additional actions if installation was dismissed
      }

      // Clear the deferredPrompt variable
      deferredPrompt = null;
    });
  });

  // Append the install button to the DOM
  document.body.appendChild(installButton);
}

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/src/main.css',
          '/src/script.js',
          '/image/ticket109.png'
          // Add more URLs of core assets to cache
        ]);
      }) 
    );
    if (deferredPrompt) {
      showInstallPrompt();
    }
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(name => name !== CACHE_NAME && name.startsWith(CACHE_DYNAMIC_PREFIX))
            .map(name => caches.delete(name))
        );
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request)
          .then(response => {
            if (response) {
              // Serve the cached response (stale-while-revalidate strategy)
              event.waitUntil(updateCache(event.request, cache)); // Trigger a cache update in the background
              return response;
            }

            // Fetch from the network and cache the response (cache-first strategy)
            return fetch(event.request).then(fetchResponse => {
                if (shouldCache(event.request)) {
                  cacheResponse(event.request, fetchResponse.clone(), cache);
                }
                return fetchResponse;
              });
          });
      })
  );
});

// Cache update function
function updateCache(request, cache) {
  return fetch(request).then(response => {
      if (shouldCache(request)) {
        cacheResponse(request, response.clone(), cache);
      }
      return response;
    })
    .catch(error => {
      console.log('Cache update failed:', error);
    });
}

// Cache response function
function cacheResponse(request, response, cache) {
  cache.put(request, response);

  // Limit the cache size by removing the oldest entries
  caches.keys().then(keys => {
    if (keys.length > CACHE_DYNAMIC_MAX_ENTRIES) {
      cache.delete(keys[0]);
    }
  });
}

// Determine if a request should be cached
function shouldCache(request) {
  return true;
}