window.onload = function() {
var subscribeStatus = document.getElementById("subscribeStatus");
var subscribeBtn = document.getElementById("subscribeBtn");

 //registering service worker, checking for subscription
if ('serviceWorker' in navigator && 'PushManager' in window) {
     function registerServiceWorker() {
        return navigator.serviceWorker.register('sw.js')
          .then(function(registration) {
            console.log('Service worker successfully registered: ', registration);
            return registration;
           })
        .catch(function(err) {
        console.error('Unable to register service worker.', err);
     });
     }
  }//runs if supported

 
function askPermission() {
    return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
            resolve(result);
        });
        if (permissionResult) {
            permissionResult.then(resolve, reject);
            }
        })
        .then(function(permissionResult) {
            if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
        }
    });
} 
 
function subscribeUserToPush() {
    return getSWRegistration()
    .then(function(registration) {
        const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey:
        urlBase64ToUint8Array('BO4llm7cJof4PGwvBPauOKzSoxzz6ZYy3j9fPhbCn1HzVevA0AdsbSVApTAVYDtojV9JOeUqnjW-2XFflrIcwd4')
     };//public key
    return registration.pushManager.subscribe(subscribeOptions);
    }).then(function(pushSubscription) {
         console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
         return pushSubscription;
    });
}/////


function unsubscribe() {
  navigator.serviceWorker.getRegistration.then(function(reg) {
    reg.pushManager.getSubscription().then(function(sub){
        sub.unsubscribe();
    }); //get sub
  }).catch(function(error){
      console.log('Unable to subscribe this user', error);
  });
}

 
 
////////////
 
 const subscriptionObject = {
  endpoint: pushSubscription.endpoint,
  keys: {
    p256dh: pushSubscription.getKeys('p256dh'),
    auth: pushSubscription.getKeys('auth')
  }
}; 
 
/////////////

subscribeBtn.onclick = function() {
  if (subscribeBtn.classList.contains("subscribed")) {
    subscribeStatus.innerHTML = "Not Subscribed.";
        subscribeBtn.classList.remove("subscribed");
        unsubscribe();  
     } else {
    subscribeBtn.classList.add("subscribed");
    subscribeStatus.innerHTML = "Subscribed!";
       subscribe();
    }
};
 
}; //window.onload
