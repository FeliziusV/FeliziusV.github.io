window.onload = function() {
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("shark");
  ctx.drawImage(img, 10, 10);
};