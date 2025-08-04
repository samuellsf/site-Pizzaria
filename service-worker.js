self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker ativado');
});

self.addEventListener('fetch', event => {
  // Você pode futuramente adicionar cache de páginas e imagens aqui
});
