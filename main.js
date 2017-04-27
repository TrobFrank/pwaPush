window.onload = function() {
var subscribeStatus = document.getElementById("subscribeStatus");
var subscribeBtn = document.getElementById("subscribeBtn");
    
if ('serviceWorker' in navigator) {
    console.log("Will the service worker register?");
    navigator.serviceWorker.register('sw.js')
      .then(function(reg){
        reg.pushManager.getSubscription()
          .then(function(sub) {
            console.log('Subscription Info:', sub);
          });
        console.log("Yes, it did.");
      }).catch(function(err) {
        console.log("No it didn't. This happened: ", err)
      });
  }


function subscribe() {
  navigator.serviceWorker.getRegistration().then(function(reg){
    reg.pushManager.subscribe({userVisibilityOnly: true})
      .then(function(sub){
        console.log('Now we update the server with our subscription object', sub);
        updateServerWithSubscription(sub); //identifying specific user to server
        subscribeStatus.innerHTML = "Not Subscribed.";
        }).catch(function(error){
          console.log('Unable to subscribe this user', error);
      });
  });
}

function unsubscribe() {
  navigator.serviceWorker.getRegistration.then(function(reg) {
    reg.pushManager.getSubscription().then(function(sub){
      if (sub) {
        sub.unsubscribe().then(function(successful) {
        subscribeStatus.innerHTML = "Not Subscribed.";
        console.log('Updating our server with an unsubscription');
        };
      }//if sub
    }); //get sub
  }).catch(function(error){
      console.log('Unable to subscribe this user', error);
  });
}

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
