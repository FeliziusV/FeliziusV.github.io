$('document').ready(function(){
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  const initialX = 0;
  const initialY = 20;

  var x = initialX;
  var y = initialY;
  var initialx_grennFish=750;
  var initialy_greenFish=300;
  var x_grennFish=0;
  var y_greenFish=0;
  var dx = 0;
  var dy = 0;
  var shark = document.getElementById("shark");
  var shark_stamina = 1.0;

  var gameOver = false;

  var see = document.getElementById("see");
  var anchar = document.getElementById("anchar");
  var greenFish=document.getElementById("green_fish");


  
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
     function drawGreenFish() {
    drawWithParamsCoordsSizeFlipped(greenFish, 750, 300, 0.2, true);
  }

  function draw() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	  drawSee();
    drawShark();
    drawAnchar();
	drawGreenFish();
    drawUI();
    x += dx;
    y += dy;
    if (y < 0) {y=0; toReset=true;}
    else if (y > canvas.height-60) {y=canvas.height-60; toReset=true;}
    else toReset = false;
    decelerate(toReset);
    decreaseSharkStamina();
    if (gameOver) drawGameOverScreen();
  }

  function decreaseSharkStamina() {
    if (shark_stamina - 0.01 < 0.0) shark_stamina = 0;
    else shark_stamina -= 0.001;
    if (shark_stamina === 0) {
      // GAME OVER!
      gameOver = true;
    }
  }

  function drawGameOverScreen() {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "gray"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
    ctx.font = '48px serif';
    ctx.fillStyle = "#dd4444"; 
    ctx.fillText('GAME OVER', 10, 150);
    ctx.fillStyle = "white"; 
    ctx.font = '24px serif';
    ctx.fillText('Enter f\u00fcr Neustart', 10, 180);
  }

  function restartGame() {
    x = initialX;
    y = initialY;
    dy = 0;
    dx = 0;
    shark_stamina = 1.0;
    gameOver = false; 
  }

  function drawUI() {
    drawStaminaBar();
  }

  function drawStaminaBar() {
    ctx.rect(10, canvas.height-20, canvas.width-20, 10);
    ctx.fillStyle = "lightgreen"; 
    ctx.fillRect(10, canvas.height-20, (canvas.width-20)*shark_stamina, 10)
    ctx.strokeStyle = "black"; 
    ctx.lineWidth = "2"; 
    ctx.stroke(); 
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
    if (!gameOver) {
      if (e.code === "ArrowUp" && dy > -10)        dy -= 1.2;
      else if (e.code === "ArrowDown" && dy < 10) dy += 1.2;
    }
    else if (e.code === "Enter") {
      restartGame();
    }
    //else if (e.code === "ArrowRight")x += 10;
    //else if (e.code === "ArrowLeft") x -= 10;
    
  });
});