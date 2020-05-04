$('document').ready(function(){
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var x = 0;
  var y = 20;
  var dx = 0;
  var dy = 0;
  var shark = document.getElementById("shark");
  var see = document.getElementById("see");
  var anchar = document.getElementById("anchar");


  
  //drawing = new Image();
  //drawing.onload = function() {
  //  setInterval(draw, 10);
  //};
  //drawing.src = "../../resources/binary/sharks/great_shark.PNG"; // can also be a remote URL e.g. http://

  function drawShark() {
    drawWithParamsCoordsSizeFlipped(shark, x, y, 0.4, true);
  }
   function drawSee() {
    drawWithParamsCoordsSizeFlipped(see, 0, 0, 3, true);
  }
   function drawAnchar() {
    drawWithParamsCoordsSizeFlipped(anchar, 550, 400, 0.2, true);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSee();
    drawShark();
	drawAnchar();
    x += dx;
    y += dy;
    if (y < 0) {y=0; toReset=true;}
    else if (y > canvas.height-60) {y=canvas.height-60; toReset=true;}
    else toReset = false;
    decelerate(toReset);
  }

  function decelerate(reset) {
    if (reset === true) dy = 0;
    dy = dy - dy/50;
  }

  setInterval(draw, 10);

  function drawWithParamsCoords(object, x, y) {
    drawWithParamsCoordsSize(object, x, y, 1);
  }

  function drawWithParamsCoordsSize(object, x, y, size) {
    drawWithParamsCoordsSizeFlipped(object, x, y, size, 0, false);
  }

  function drawWithParamsCoordsSizeFlipped(object, x, y, size, flipped) {
    drawWithParamsCoordsSizeRotFlipped(object, x, y, size, 0, flipped);
  }

  function drawWithParamsCoordsSizeRotFlipped(object, x, y, size, rotation, flipped) {
    drawWithParams(object, x, y, object.width*size, object.height*size, rotation, flipped);
  }

  function drawWithParams(object, x, y, width, height, rotation, flipped) {
    ctx.save();
    if(typeof width === "undefined") width = object.width;
    if(typeof height === "undefined") height = object.height;

    ctx.translate(x + width/2, y + height/2);
    var rad = 2 * Math.PI - rotation * Math.PI / 180;    
    ctx.rotate(rad);
    if(flipped) {
      ctx.scale(-1,1);
    }

    ctx.drawImage(object, -width/2, -height/2, width, height);
    ctx.restore();
  }

  document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowUp")        dy -= 0.75;
    else if (e.code === "ArrowDown") dy += 0.75;
    //else if (e.code === "ArrowRight")x += 10;
    //else if (e.code === "ArrowLeft") x -= 10;
  });
});