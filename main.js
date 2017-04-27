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
        document.getElementById("subscribeStatus").innerHTML = "Not Subscribed.";
        updateServerWithSubscription(sub); //identifying specific user to server
        }).catch(function(error){
          console.log('Unable to subscribe this user', error);
      });
  });
}

function unsubscribe() {
  navigator.serviceWorker.getRegistration.then(function(reg) {
    reg.pushManager.getSubscription().then(function(sub){
      if (sub) {
        sub.unsubscribe();
        document.getElementById("subscribeStatus").innerHTML = "Not Subscribed.";
        console.log('Updating our server with an unsubscription');
      }
    });
  }).catch(function(error){
      console.log('Unable to subscribe this user', error);
  });
}

/////////////


document.getElementById("subscribeBtn").onclick = function() {
  if (subscribeBtn.classList.contains("subscribed")) {
    document.getElementById("subscribeStatus").innerHTML = "Not Subscribed.";
        subscribeBtn.classList.remove("subscribed");
        //unsubscribe();  
     } else {
    subscribeBtn.classList.add("subscribed");
    document.getElementById("subscribeStatus").innerHTML = "Subscribed!";
       //subscribe();
    }
};
  
