/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />
// import { version } from '$service-worker';
import { build, files, version } from '$service-worker';

const CACHE_NAME = `primal-poetry-v${version}`;
const EXTERNAL_CACHE_NAME = `fonts-v1`;
const CACHES = [CACHE_NAME, EXTERNAL_CACHE_NAME];

const ASSETS = [
	...build, // the app itself
	...files // everything in `static`
];

const FONTS = [
	'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Rock+Salt&display=swap'
];

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE_NAME);
		const externalCache = await caches.open(EXTERNAL_CACHE_NAME);
		await externalCache.addAll(FONTS);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

// This will delete all old caches when a new version is installed
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames
					.filter((cacheName) => !CACHES.includes(cacheName))
					.map((cacheName) => caches.delete(cacheName))
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	// ignore POST requests etc
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			const assetsCache = await caches.open(CACHE_NAME);
			const response = await assetsCache.match(url.pathname);

			if (response) {
				return response;
			}
		}

		const cache = await caches.open(EXTERNAL_CACHE_NAME);
		const cached = cache.match(event.request);
		const fetched = fetch(event.request);
		const fetchedCopy = fetched.then((resp) => resp.clone());

		// Update the cache with the version we fetched
		event.waitUntil(
			Promise.all(fetchedCopy)
				.then((response) => cache.put(event.request, response))
				.catch(() => {
					/* eat any errors */
				})
		);

		// Call respondWith() with whatever we get first.
		// If the fetch fails (e.g disconnected), wait for the cache.
		// If there's nothing in cache, wait for the fetch.
		// If neither yields a response, return a 404.
		return await Promise.race([fetched.catch(() => cached), cached])
			.then((resp) => resp || fetched)
			.catch(() => new Response(null, { status: 404 }));
	}

	event.respondWith(respond());
});
