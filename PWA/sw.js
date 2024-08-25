// console.log('哈哈');

self.addEventListener('install', event => {
    // console.log('install', event);
    event.waitUntil(self.skipWaiting());    // 固定写法，当install完成后，自动跳转到activate
    // 有service worker存在的话，不会自动触发activate，需要等待上一个service worker注销了才会继续执行，
    // 但是写了skipWaiting之后则直接停止等待，直接自动触发activate
});

self.addEventListener('activate', event => {
    console.log('activate', event);

    // 表示service worker激活后，立即获取控制权
    event.waitUntil(self.clients.claim())
});

self.addEventListener('fetch', event => {
    console.log('fetch', event);
});