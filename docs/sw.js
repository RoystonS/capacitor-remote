// Service worker
const version = 67;

self.importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.setConfig({
  debug: true,
});

const registerRoute = workbox.routing.registerRoute;

registerRoute(
  ({ request }) => request.url.includes("swversion"),
  () => {
    console.log("generating response from service worker");

    const response = new Response(
      JSON.stringify({
        responseGeneratedByServiceWorker: version,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
);

console.log(`ServiceWorker v${version} booting`);

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async function doInstall() {
      console.log("performing install");
      self.skipWaiting();
    })()
  );
});
