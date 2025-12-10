self.addEventListener("install", () => {
  console.log("Service Worker: Installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker: Activated");
});

self.addEventListener("fetch", () => {
  // Simple pass-through fetch handler to satisfy PWA requirements
  // In a real production app, you might want to implement caching strategies here
});
