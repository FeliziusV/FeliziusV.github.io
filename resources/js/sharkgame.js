$('document').ready(function(){
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var x = canvas.width/2;
  var y = canvas.height-30;
  var dx = 2;
  var dy = -2;
  var drawing = document.getElementById("shark");
  //drawing = new Image();
  //drawing.onload = function() {
  //  setInterval(draw, 10);
  //};
  //drawing.src = "../../resources/binary/sharks/great_shark.PNG"; // can also be a remote URL e.g. http://

  function drawShark() {
    ctx.drawImage(drawing,canvas.width/2, canvas.height/2);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShark();
    x += dx;
    y += dy;
  }
  setInterval(draw, 10);
});