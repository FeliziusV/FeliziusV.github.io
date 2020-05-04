$('document').ready(function(){
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var x = 0
  var y = 0;
  var dx = 0.2;
  var dy = -0.2;
  var drawing = document.getElementById("shark");
  
  //drawing = new Image();
  //drawing.onload = function() {
  //  setInterval(draw, 10);
  //};
  //drawing.src = "../../resources/binary/sharks/great_shark.PNG"; // can also be a remote URL e.g. http://

  function drawShark() {
    drawWithParams(drawing, x, y);
    //ctx.drawImage(drawing,x,y);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShark();
    x += dx;
    y += dy;
  }
  setInterval(draw, 10);
  
  function drawWithParams(object, x, y) {
    drawWithParams(object, x, y, 1);
  }

  function drawWithParams(object, x, y, size) {
    drawWithParams(object, x, y, size, 0, false);
  }

  function drawWithParams(object, x, y, size, rotation, flipped) {
    drawWithParams(object, x, y, object.height*size, object.width*size, rotation, flipped);
  }

  function drawWithParams(object, x, y, width, height, rotation, flipped) {
    ctx.save();
    if(typeof width === "undefined") width = img.width;
    if(typeof height === "undefined") height = img.height;

    ctx.translate(x + width/2, y + height/2);
    var rad = 2 * Math.PI - rotation * Math.PI / 180;    
    ctx.rotate(rad);
    if(flipped) {
      ctx.scale(-1,1);
    }

    ctx.drawImage(object, -width/2, -height/2, width, height);
    ctx.restore();
  }
});