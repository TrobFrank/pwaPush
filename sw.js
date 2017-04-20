// ABSTRACT
//
// sw.js will let you display your data to your user.
// this is where account portal information (ex. user ID, action needed, update made) will be populated. this data may need to be fetched or loaded from json
// for fetching data properties see: https://www.youtube.com/watch?v=_dXBibRO0SM (~time stamp 30:00)
//
// actions are available with custom outcomes. (ex. Yes or No options with specific destinations) 
//
// user subscription and authentication takes place in main.js
// at this point, the service worker is already registered from main.js and waiting for instructions from server to display to user
//////////////////////////////

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

//in php, will need to build switch with appropriate data for invoices, service requests  
  const title = '$title'; 
  const options = {
    body: '$summary',
    icon: 'logo.png',
    badge: 'logo.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://www.legendwebworks.com/support/')
  );
});
