Notification.requestPermission(); //asks users to allow or deny notifications

var notification = new Notification("Desktop Notification", {
  body:"Only appears on desktop upon visit",
  icon:"logo.png",
  tag:"desktop",// use this prop to limit amount of notifications showing (will only show most recent of each tag)
  
});

notification.onclick = function(){
 location.href = "https://www.legendwebworks.com/support/";
}
