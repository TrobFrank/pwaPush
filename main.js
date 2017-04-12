if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(sw) {
    // registration worked!
    console.log("Registered Service Worker (sw.js)");
  }).catch(function() {
    // registration failed :(
       console.log("Registration FAILED");
  });
}

