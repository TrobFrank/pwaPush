  if ('serviceWorker' in navigator) {
    console.log("Will the service worker register?");
    navigator.serviceWorker.register('sw.js')
      .then(function(reg){
        reg.pushManager.getSubScription()
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
        updateServerWithSubscription(sub);
        }).catch(function(error){
          console.log('Unable to subscribe this user', error);
      });
  });
}

function unsubscribe() {
  
}

var subscribeBtn = document.getElementById("subscribeBtn");

subscribeBtn.addEventListener(click, function(){
 
    if (subscribeBtn.classList.contains("subscribed")) {
        subscribeBtn.classList.remove("subscribed");
        //unsubscribe();  
     } else {
    subscribeBtn.classList.add("subscribed");
       //subscribe();
    }
 }); //subscribe UI
