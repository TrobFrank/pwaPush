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
        console.log('Updating our server with an unsubscription');
      }
    });
  }).catch(function(error){
      console.log('Unable to subscribe this user', error);
  });
}

///////////////

var subscribeStatus = document.getElementById("subscribeStatus");
subscribeStatus.innerHTML = "Not Subscribed.";

var subscribeBtn = document.getElementById("subscribeBtn");
subscribeBtn.addEventListener("click", subscribeUI);
function subscribeUI(){
  if (subscribeBtn.classList.contains("subscribed")) {
    subscribeStatus.innerHTML = "<p>Not Subscribed.</p>";
        subscribeBtn.classList.remove("subscribed");
        //unsubscribe();  
     } else {
    subscribeBtn.classList.add("subscribed");
    subscribeStatus.innerHTML = "Not Subscribed.";
       //subscribe();
    }
 }; //subscribe UI
