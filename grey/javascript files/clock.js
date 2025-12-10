var clock = document.getElementById('clock');

function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  clock.textContent = 
  "0d " + ("0" + h).substr(-2) + "h " + ("0" + m).substr(-2) + "m";
}

setInterval(time, 1000);
