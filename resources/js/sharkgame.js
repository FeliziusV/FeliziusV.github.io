// TODOs: ('-' = todo / '+' = done)
// - Random Shark at the beginning (and display the name of the shark)
// - Start Button at the Beginning (also maybe some tutorial for the game)
// - Collision detection
// - Eating mechanism
// - streaks mechanism (multiplier for stamina increase on eating...)
// 

$('document').ready(function(){
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var seaBorderMargin = 60;
  var bgScrollSpeed = 2;

  class seaObject {
    constructor(type) {
      this.type = type;
      this.x = canvas.width;
      this.y = canvas.height-seaBorderMargin*2 + ((Math.random()-0.5)*20);
      this.dx = -1.2;
      this.dy = 0;
      this.visible = true;
      this.deleted = false;
      this.imgSize = 1.0;
      this.imgFlipped = false;

      this.img = undefined;
      if (type === 'anchor') {
        this.img = document.getElementById("anchar");
        this.imgSize = 0.2;
        this.imgFlipped = true;
      }
	   if (type === 'bottle') {
        this.img = document.getElementById("bottle");
        this.imgSize = 0.05;
        this.imgFlipped = true;
      }
    }

    draw() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x < -20) { this.visible=false; this.dx=0; this.dy=0; this.deleted = true; }
      drawWithParamsCoordsSizeFlipped(this.img, this.x, this.y, this.imgSize, this.flipped);
    }
  }

  class sharky {
    constructor(type) {
      this.type = type;
      this.x = 0;
      this.y = 20;
      this.dx = 0;
      this.dy = 0;
      this.stamina = 1.0;
      this.visible = true;
      this.deleted = false;
      this.imgSize = 1.0;
      this.imgFlipped = false;

      this.diet = undefined;
      this.img = undefined;
      if(type === 'tiger') {
        this.imgFlipped = true;
        this.img = document.getElementById("shark");
        this.imgSize = 0.4;
        this.diet = {
          'greenfish' : 0.3, // wenn hai fish1 iss erlangt er 30% stamina dazu...
          'fishtype2' : 1.0, 
          'fishtype3' : 0.5, 
        }
      }
      else if (type === 'whale') {
        this.img = undefined // todo
        this.imgSize = 0.4;
        this.diet = {
          'greenfish' : 0.3, // wenn hai fish1 iss erlangt er 30% stamina dazu...
          'fishtype2' : 1.0, 
          'fishtype3' : 0.5, 
        }
      }
    }

    draw() {
      this.x += this.dx;
      this.y += this.dy;

      var toReset = false;
      if (this.y < 0) { this.y=0; toReset=true; }
      else if (this.y > canvas.height-seaBorderMargin) { this.y=canvas.height-seaBorderMargin; toReset=true; }

      if (this.visible) drawWithParamsCoordsSizeFlipped(this.img, this.x, this.y, this.imgSize, this.imgFlipped);

      this.decelerate(toReset);
      this.decreaseStamina();
    }

    decelerate(toReset) {
      if (toReset === true) this.dy = 0;
      else this.dy = this.dy - this.dy/50;
    }

    increaseStamina(value) {
      if (value !== undefined) {
        this.stamina += value;
      }
    }

    decreaseStamina(value) {
      if (value === undefined) {
        if (this.stamina - 0.001 < 0.0) this.stamina = 0;
        else this.stamina -= 0.001;
      } else {
        if (this.stamina - value < 0.0) this.stamina = 0;
        else this.stamina -= value;
      }

      if (this.stamina <= 0) {
        // GAME OVER!
        gameOver = true;
      }
    }

    eat(object) {
      if (object.hasOwnProperty('type')) {
        // game objects with type
        if (object.type in this.diet) {
          object.visible = false;
          this.increaseStamina(this.diet[object.type]);
        } else {
          this.decreaseStamina(0.3); // depends on object type???? Maybe introduce a damageTable like diet with negative values?
        }
      } else {
        // withoud type -> Gameover
        this.decreaseStamina(this.stamina);
      }
    }
  }

  class fischy {
    constructor(type) {
      this.visible = true;
      this.deleted = false;
      this.type = type;
      this.x = canvas.width;
      this.y = 80+(Math.random()*canvas.height-seaBorderMargin-80);
      this.dy = 0;
      this.dx = -2;
      this.imgSize = 1.0;
      this.imgFlipped = false;
      
      if(type === 'greenfish') {
        this.imgFlipped = true;
        this.imgSize = 0.2;
        this.img = document.getElementById("green_fish");
        this.dx = (Math.random()*(-2)) - 1;
      }
	  if(type === 'bluefish') {
        this.imgFlipped = true;
        this.imgSize = 0.2;
        this.img = document.getElementById("blue_fish");
        this.dx = (Math.random()*(-2)) - 1;
      }
	  
	   if(type === 'orangefish') {
        this.imgFlipped = true;
        this.imgSize = 0.2;
        this.img = document.getElementById("orange_fish");
        this.dx = (Math.random()*(-2)) - 1;
      }
	  
    }
    draw() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x < -20) { this.visible=false; this.dx=0; this.dy=0; this.deleted = true; }
      if (this.visible) drawWithParamsCoordsSizeFlipped(this.img, this.x, this.y, this.imgSize, this.imgFlipped);
    }
  }

  var fishes = [];
  var seaObjects = [];
  let shark = new sharky('tiger');
  var gameOver = false;

  var sea = document.getElementById("see");
 
  var seaPtnr = ctx.createPattern(sea, 'repeat'); // Create a pattern with this image, and set it to "repeat".
  
  //drawing = new Image();
  //drawing.onload = function() {
  //  setInterval(draw, 10);
  //};
  //drawing.src = "../../resources/binary/sharks/great_shark.PNG"; // can also be a remote URL e.g. http://
  var imgWidth = canvas.width; 


  function drawSea() {
    //ctx.fillStyle = seaPtnr;
    //ctx.fillRect(0, 0, canvas.width, canvas.height); // context.fillRect(x, y, width, height);
    //drawWithParamsCoordsSizeFlipped(sea, 0, 0, 3, true);
    ctx.drawImage(sea, imgWidth, 0,canvas.width,canvas.height);
    ctx.drawImage(sea, imgWidth - canvas.width, 0,canvas.width,canvas.height);
    imgWidth -= bgScrollSpeed; 
    if (imgWidth == 0) imgWidth = canvas.width; 
  }

  function draw() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	  drawSea();
    generateFish();
    generateSeaObjects();
    fishes.forEach(f => { f.draw(); });
    seaObjects.forEach(o => { o.draw(); });
    shark.draw();
    drawUI();
    
    collectGarbage();
    if (gameOver) drawGameOverScreen();
  }

  function collectGarbage() {
    fishes = fishes.filter(fish => {
      return !fish.deleted;
    });
    seaObjects = seaObjects.filter(object => {
      return !object.deleted;
    });
  }

  function generateFish() {
    var ran = Math.random()*300;
    if(Math.round(ran) === 50) {
      fishes.push(new fischy('greenfish'))
    }
	if(Math.round(ran) === 49) {
      fishes.push(new fischy('bluefish'))
    }
	
	if(Math.round(ran) === 48) {
      fishes.push(new fischy('orangefish'))
    }
  }

  function generateSeaObjects() {
    var ran = Math.random()*2500;
    if(Math.round(ran) === 100) {
      seaObjects.push(new seaObject('anchor'));
    }
	 if(Math.round(ran) === 101) {
      seaObjects.push(new seaObject('bottle'));
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
    shark = new sharky('tiger');
    fishes = [];
    gameOver = false; 
  }

  function drawUI() {
    drawStaminaBar();
  }

  function drawStaminaBar() {
    ctx.rect(10, canvas.height-20, canvas.width-20, 10);
    ctx.fillStyle = "lightgreen"; 
    ctx.fillRect(10, canvas.height-20, (canvas.width-20)*shark.stamina, 10)
    ctx.strokeStyle = "black"; 
    ctx.lineWidth = "2"; 
    ctx.stroke(); 
  }

  setInterval(draw, 16);

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
      if (e.code === "ArrowUp" && shark.dy > -10)       shark.dy -= 1.2;
      else if (e.code === "ArrowDown" && shark.dy < 10) shark.dy += 1.2;
    }
    else if (e.code === "Enter") {
      restartGame();
    }
  });
});