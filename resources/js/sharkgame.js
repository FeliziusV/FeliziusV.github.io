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
  var debug = false;
  const drawPerMs = 16;
  const minutesToPlay = 1;
  const framesToPlay = Math.round((minutesToPlay*60*1000)/drawPerMs);
  var framesPlayed = 0;
  var win = false;
  var gameLoop;
  
  class human{
    static NAMES = ['diver', 'surfer'];

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
	    this.tex="Haie greifen Menschen nur dann, wenn der Mensch ihm Angst macht, also als Verteidigung. Im Jahr 2019, wurden insgesamt nur 64 Menschen von Haien angegriffen. Die Chancen von einem Hai attackiert zu werden liegen bei 11.5 Millionen zu eins.";
      if (type === 'diver') {
		    this.y = Math.floor(Math.random() * (500 - 60 + 1) + 60);
        this.img = document.getElementById("diver");
        this.imgSize = 0.3;
        this.imgFlipped = true;
		    this.h1="Taucher";
		    this.src="../../resources/binary/objects/diver.svg";
      }
      if (type === 'surfer') {
		    this.y = Math.floor(Math.random() * (50 - 45 + 1) + 45);
        this.img = document.getElementById("surfer");
        this.imgSize = 0.3;
        this.imgFlipped = true;
		    this.h1="Taucher";
		    this.src="../../resources/binary/objects/surfer.svg";
      }
    }
	  draw() {
      this.x += this.dx;
      this.y += this.dy;

      if (framesPlayed % 320 == 0) this.flipped = !this.flipped;
      if (this.x < ((this.img.width*this.imgSize*-1)-20)) { this.visible=false; this.dx=0; this.dy=0; this.deleted = true; }
      if (this.visible) drawWithParamsCoordsSizeFlipped(this.img, this.x, this.y, this.imgSize, this.flipped);
    }
  }
  
  class seaObject {
    static NAMES = ['anchor', 'bottle', 'rock', 'treasure'];
  
    constructor(type) {
      this.type = type;
      this.x = canvas.width;
      this.y =Math.floor(Math.random() * (450 - 70 + 1) + 70);

      this.dx = -bgScrollSpeed;
      this.dy = 0;
      this.visible = true;
      this.deleted = false;
      this.imgSize = 1.0;
      this.imgFlipped = false;
      this.rotate = false;

      this.img = undefined;
      if (type === 'anchor') {
        this.y = canvas.height-seaBorderMargin;
        this.img = document.getElementById("anchar");
        this.imgSize = 0.3;
        this.imgFlipped = true;
      }
      if (type === 'bottle') {
        this.img = document.getElementById("bottle");
        this.imgSize = 0.15;
        this.imgFlipped = false;
        this.rotate = true;
		    this.h1="Plastikmüll";
		    this.tex="Jedes Jahr landen ungefähr 8 Millionen Tonnen Plastik im Meer. Momentan gibt es bereits mehr als 140 Millionen Tonnen Plastikmüll in den Meeren und Ozeanen. Dieser Plastik ist gefährlich für die Haie und andere Meeresbewohner und verursacht zu vielen Krankheiten für diese Tiere.";
		    this.src="../../resources/binary/objects/bottle.svg";
	    }
	    if (type === 'rock') {
        this.y = canvas.height - seaBorderMargin;
        this.img = document.getElementById("rock");
        this.imgSize = 0.65;
        this.imgFlipped = true;
		
      }
	     if (type === 'treasure') {
        this.y = canvas.height - seaBorderMargin;
        this.img = document.getElementById("treasure");
        this.imgSize = 0.2;
        this.imgFlipped = true;
		
      }
    }

    draw() {
      this.x += this.dx;
      this.y += this.dy;


      if (this.x < ((this.img.width*this.imgSize*-1)-20)) { this.visible=false; this.dx=0; this.dy=0; this.deleted = true; }
      if (this.visible) {
        if(this.rotate) drawWithParamsCoordsSizeRotFlipped(this.img, this.x, this.y, this.imgSize, framesPlayed/2.0, this.flipped);
        else drawWithParamsCoordsSizeFlipped(this.img, this.x, this.y, this.imgSize, this.flipped);
      }
	  }
  }

  class sharky {
    static NAMES = ['great', 'whale'];

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
      if(type === 'great') {
        this.idleStaminaDecreaseValue = 0.0015;
        this.imgFlipped = true;
        this.img = document.getElementById("shark");
        this.imgSize = 0.4;
        this.diet = {
          'greenfish' : 0.1, // wenn hai fish1 iss erlangt er 30% stamina dazu...
          'bluefish' : 0.12, 
          'orangefish' : 0.15,
          'dolphin' : 0.4,
          'seaturtle' : 0.3,
          'seal' : 0.55
        };
        this.damageTable = {
          'diver' : 1.0,
          'surfer' : 1.0,
          'octopus' : 0.2,
          'plankton' : 0.05,
          'plankton_blue' : 0.05,
          'seahorse_green' : 0.05,
          'seahorse_pink' : 0.05,
          'starfish_orange' : 0.05,
          'anchor' : 0.65,
          'bottle' : 0.35,
          'rock' : 1.0,
          'treasure' : 0
        };
      }
      else if (type === 'whale') {
        this.idleStaminaDecreaseValue = 0.001;
        this.imgFlipped = false;
        this.img = document.getElementById("whale");
        this.imgSize = 0.4;
        this.diet = {
          'greenfish' : 0.1,
          'bluefish' : 0.1, 
          'orangefish' : 0.1,
          'plankton' : 0.15, 
          'plankton_blue' : 0.15, 
          'seahorse_green' : 0.2,
          'seahorse_pink' : 0.2,
          'starfish_orange' : 0.2,
          'seaturtle' : 0.25
        };
        this.damageTable = {
          'diver' : 1.0,
          'surfer' : 1.0,
          'octopus' : 0.3,
          'dolphin' : 0.35,
          'seal' : 0.35,
          'anchor' : 0.65,
          'bottle' : 0.35,
          'rock' : 1.0,
          'treasure' : 0
        };
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
        if ((this.stamina + value) >= 1.0) this.stamina = 1.0;
        else this.stamina += value;
      }
    }

    decreaseStamina(value) {
      if (value === undefined && !win) {
        if (this.stamina - 0.0015 < 0.0) this.stamina = 0;
        else this.stamina -= 0.0015;
      } else if (!win){
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
        if(!object.deleted && object.visible) {
          if (object.type in this.diet) {
            // object is in diet of shark -> gain stamina!
            object.visible = false;
            this.increaseStamina(this.diet[object.type]);
          } else if (object.type in this.damageTable) {
            // object is NOT in diet of shark -> decrease stamina!
            object.visible = false;
            this.decreaseStamina(this.damageTable[object.type]); 
			      if(object.hasOwnProperty("h1")){
				      $('#infoModal').modal('show');
			        document.getElementById("sharkimage").src=object.src;
			        document.getElementById("text").textContent=object.tex;
			        document.getElementById("infoModalLongTitle").innerHTML =object.h1;
			        document.getElementById("continue").disabled = true;
        			document.getElementById("exit").disabled = true;
			        document.getElementById("continue").style="background-color: grey"
			
              clearInterval(gameLoop);
              setTimeout(function () {
            	  document.getElementById("exit").disabled = false;
			          document.getElementById("continue").disabled = false;
			          document.getElementById("continue").style="background-color: #6aa84f";
              }, 5000);
			      }	
          }
        }
      } else {
        // withoud type -> Gameover
        this.decreaseStamina(this.stamina);
      }
    }
  }

  class fischy {
    static NAMES = ['greenfish', 'bluefish', 'orangefish', 'dolphin', 'octopus', 
                    'plankton', 'plankton_blue', 'seahorse_green', 'seahorse_pink', 'seal', 
                    'seaturtle', 'starfish_orange'];

    constructor(type) {
      this.visible = true;
      this.deleted = false;
      this.type = type;
      this.x = canvas.width;
      this.y =Math.floor(Math.random() * (450 - 70 + 1) + 70);
      this.dy = 0;
      this.dx = -2;
      this.imgSize = 1.0;
      this.imgFlipped = false;
      this.rotate = false;
      this.sightDistance = 140;
      this.fleeSpeed = 0.6;

      if(type === 'greenfish') {
        this.imgFlipped = true;
        this.imgSize = 0.15;
        this.img = document.getElementById("green_fish");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.sightDistance = 100;
      }
	    if(type === 'bluefish') {
        this.imgFlipped = true;
        this.imgSize = 0.15;
        this.img = document.getElementById("blue_fish");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.sightDistance = 100;
      }
	    if(type === 'orangefish') {
        this.imgFlipped = true;
        this.imgSize = 0.15;
        this.img = document.getElementById("orange_fish");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.sightDistance = 100;
      }
	    if(type === 'dolphin') {
        this.imgFlipped = false;
        this.imgSize = 0.25;
        this.img = document.getElementById("dolphin");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.fleeSpeed = 1.4;
      }
	    if(type === 'octopus') {
        this.imgFlipped = true;
        this.imgSize = 0.2;
        this.img = document.getElementById("octopus");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.fleeSpeed = 1.6;
      }
	    if(type === 'plankton') {
        this.imgFlipped = false;
        this.imgSize = 0.1;
        this.img = document.getElementById("plankton");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.sightDistance = 60;
        this.fleeSpeed = 0.1;
      }
	    if(type === 'plankton_blue') {
        this.imgFlipped = true;
        this.imgSize = 0.1;
        this.img = document.getElementById("plankton_blue");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.sightDistance = 60;
        this.fleeSpeed = 0.1;
      }
	    if(type === 'seahorse_green') {
        this.imgFlipped = true;
        this.imgSize = 0.15;
        this.img = document.getElementById("seahorse_green");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.sightDistance = 60;
        this.fleeSpeed = 0.4;
      }
	    if(type === 'seahorse_pink') {
        this.imgFlipped = true;
        this.imgSize = 0.15;
        this.img = document.getElementById("seahorse_pink");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.sightDistance = 60;
        this.fleeSpeed = 0.4;
      }
	    if(type === 'seal') {
        this.imgFlipped = true;
        this.imgSize = 0.35;
        this.img = document.getElementById("seal");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.sightDistance = 160;
        this.fleeSpeed = 1.5;
      }
	    if(type === 'seaturtle') {
        this.imgFlipped = false;
        this.imgSize = 0.25;
        this.img = document.getElementById("seaturtle");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.sightDistance = 110;
      }
	    if(type === 'starfish_orange') {
        this.imgFlipped = true;
        this.imgSize = 0.15;
        this.img = document.getElementById("starfish_orange");
        this.dx = (Math.random()*(-2.5)) - 1;
        this.sightDistance = 60;
      }
    }
    draw() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x < ((this.img.width*this.imgSize*-1)-20)) { this.visible=false; this.dx=0; this.dy=0; this.deleted = true; }
      if (this.visible) drawWithParamsCoordsSizeFlipped(this.img, this.x, this.y, this.imgSize, this.imgFlipped);
    }
  }

  var fishes = [];
  var otherFishes = [];
  var seaObjects = [];
  var humans = [];
  let shark = new sharky('great');
  var gameOver = false;

  var sea = document.getElementById("see");
  var imgWidth = canvas.width; 

  function drawSea() {
    ctx.drawImage(sea, imgWidth, 0,canvas.width,canvas.height);
    ctx.drawImage(sea, imgWidth - canvas.width, 0,canvas.width,canvas.height);
    imgWidth -= bgScrollSpeed; 
    if (imgWidth == 0) imgWidth = canvas.width; 
  }

  function increaseFramesPlayed () {
    if (!gameOver && !win) {
      if (framesPlayed < framesToPlay) framesPlayed++;
      else win = true
    }
  }

  function globalDraw() {
    increaseFramesPlayed();
    generateObjects();
    drawAllObjects();
    detectCollisionAllObjects();
    collectGarbage();
    drawUI();
  }

  function drawAllObjects() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSea();
    fishes.forEach(f => { f.draw(); });
    otherFishes.forEach(f => { f.draw(); });
    seaObjects.forEach(o => { o.draw(); });
    humans.forEach(h => { h.draw(); });
    shark.draw();
  }

  function detectCollisionAllObjects() {
    if(!gameOver && !win) {
      if (!gameOver && !win) fishes.forEach(f => { detectCollision(shark, f, true); });
      if (!gameOver && !win) otherFishes.forEach(f => { detectCollision(shark, f, false); });
      if (!gameOver && !win) seaObjects.forEach(o => { detectCollision(shark, o, false); });
      if (!gameOver && !win) humans.forEach(h => { detectCollision(shark, h, false); });
    }
  }

  function detectCollision(sharkObj, coliderObj, isDietObj) {
    if (sharkObj.x < coliderObj.x + coliderObj.img.width*coliderObj.imgSize &&
      sharkObj.x + sharkObj.img.width*sharkObj.imgSize > coliderObj.x &&
      sharkObj.y < coliderObj.y + coliderObj.img.height*coliderObj.imgSize &&
      sharkObj.y + sharkObj.img.height*sharkObj.imgSize > coliderObj.y) {
       
        sharkObj.eat(coliderObj);
    } else if (isDietObj) {
      //move away from shark
      if (Math.abs((sharkObj.x+sharkObj.img.width*sharkObj.imgSize)- coliderObj.x) < coliderObj.sightDistance &&
          Math.abs((sharkObj.y+sharkObj.img.width*sharkObj.imgSize)- coliderObj.y) < coliderObj.sightDistance) {
        var sign = -1;
        if ((sharkObj.y - coliderObj.y) < 0) sign = 1;
        coliderObj.dy = sign*coliderObj.fleeSpeed;
      } else {
        coliderObj.dy = 0;
      }
    }


    if (debug) {
      ctx.rect(sharkObj.x, sharkObj.y, sharkObj.img.width*sharkObj.imgSize, sharkObj.img.height*sharkObj.imgSize)
      ctx.strokeStyle = "red"; 
      ctx.lineWidth = "2"; 
      ctx.stroke(); 

      ctx.rect(coliderObj.x, coliderObj.y, coliderObj.img.width*coliderObj.imgSize, coliderObj.img.height*coliderObj.imgSize)
      ctx.strokeStyle = "green"; 
      ctx.lineWidth = "2"; 
      ctx.stroke(); 
    }
  }

  function collectGarbage() {
    fishes = fishes.filter(fishObj => {
      return !fishObj.deleted;
    });
    otherFishes = otherFishes.filter(otherFishObj => {
      return !otherFishObj.deleted;
    });
    seaObjects = seaObjects.filter(seaObj => {
      return !seaObj.deleted;
    });
    humans = humans.filter(humanObj => {
      return !humanObj.deleted;
    });
  }

  var lastframerendered = 1;
  function generateObjects() {
    if (!gameOver && !win) {
      const maxfishesrendered = 6;
      const seastuffratio = 0.1;
      const otherfishesratio = 0.65;
      const humansratio = 0.05;
      const maxseastuffrendered = Math.ceil(maxfishesrendered*seastuffratio);
      const maxhumansrendered = Math.ceil(maxfishesrendered*humansratio);
      const maxotherfishesrendered = Math.ceil(maxfishesrendered*otherfishesratio);
      const maxModuloValue = 20;

      var frameprobability = 1.0-(lastframerendered/framesPlayed);

      var sharkstaminaprobability = (1.0 - shark.stamina);
      var fishesprobability = 1.0-(fishes.length/maxfishesrendered);

      var dietkeys = Object.keys(shark.diet);
      var diettospawnkey = dietkeys[(framesPlayed % dietkeys.length)]; 
      var diettospawnprobability = 1.0-(shark.diet[diettospawnkey]*0.4);
      
      var spawningfishprobability = sharkstaminaprobability*diettospawnprobability*fishesprobability;
      var modulooperator = getModuloOperatorByProbability(spawningfishprobability, maxModuloValue);
      // if (debug) console.log('prob:' + spawningfishprobability*100);

      if (spawningfishprobability >= 1/maxModuloValue && (framesPlayed % modulooperator) == 0) {
        fishes.push(new fischy(diettospawnkey));
      }

      var otherFishesNames = fischy.NAMES.filter((name) => !(Object.keys(shark.diet)).includes(name));
      var maxotherfishesprobability = (1.0-(otherFishes.length/maxotherfishesrendered))*frameprobability;
      var otherfishtodraw = otherFishesNames[(framesPlayed % otherFishesNames.length)]
      modulooperator = getModuloOperatorByProbability(maxotherfishesprobability, maxModuloValue);
      if (maxotherfishesprobability >= 1/maxModuloValue && (framesPlayed % modulooperator) == 0) {
        otherFishes.push(new fischy(otherfishtodraw));
        lastframerendered = framesPlayed;
      }

      var seaObjectNames = seaObject.NAMES;
      var seastuffrenderprobability = (1.0-(seaObjects.length/maxseastuffrendered))*frameprobability;
      var stufftorender = seaObjectNames[(framesPlayed % seaObjectNames.length)]
      if(stufftorender === 'treasure') seastuffrenderprobability=seastuffrenderprobability*0.33;
      modulooperator = getModuloOperatorByProbability(seastuffrenderprobability, maxModuloValue*2);
      if (seastuffrenderprobability >= 1/maxModuloValue && (framesPlayed % modulooperator) == 0) {
        seaObjects.push(new seaObject(stufftorender));
        lastframerendered = framesPlayed;
      }

      var humanNames = human.NAMES;
      var humanrenderprobability = (1.0-(humans.length/maxhumansrendered))*0.2*frameprobability;
      var humantorender = humanNames[(framesPlayed % humanNames.length)]
      modulooperator = getModuloOperatorByProbability(humanrenderprobability, maxModuloValue*2);
      if (humanrenderprobability >= 1/maxModuloValue && (framesPlayed % modulooperator) == 0) {
        humans.push(new human(humantorender));
        lastframerendered = framesPlayed;
      }
    }
  }

  function getModuloOperatorByProbability(probability, maxModuloValue) {
    var modulooperator = 1;
    for (var i=1; probability <= 1/i && i <= maxModuloValue; i++) {
      modulooperator = i;
    }
    return modulooperator;
  }

  function drawGameOverScreen() {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "gray"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
    ctx.font = '48px serif';
    ctx.fillStyle = "#dd4444"; 
    ctx.fillText('GAME OVER', 250, 200);
    ctx.fillStyle = "white"; 
    ctx.font = '24px serif';
    ctx.fillText('Enter f\u00fcr Neustart', 300, 250);
  }

  function drawWinScreen() {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "gray"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
    ctx.font = '48px serif';
    ctx.fillStyle = "#52e590"; 
    ctx.fillText('GEWONNEN!', 250, 200);
    ctx.fillStyle = "white"; 
    ctx.font = '24px serif';
    ctx.fillText('Enter f\u00fcr Neustart', 300, 250);
  }

  var isDefaultShark = true;
  function restartGame() {
    isDefaultShark = !isDefaultShark;
    var sharkname = sharky.NAMES[0];
    if(!isDefaultShark) sharkname = sharky.NAMES[1];
    
    shark = new sharky(sharkname);
    fishes = [];
    otherFishes = [];
    seaObjects = [];
    humans = [];
    gameOver = false; 
    win = false;
    framesPlayed = 0;
    lastframerendered = 1;
  }

  function getGameTimePercentage() {
    return framesPlayed/framesToPlay;
  }

  function drawUI() {
    drawStaminaBar();
    drawTimeBar();
    if (gameOver && !win) drawGameOverScreen();
    if (win && !gameOver) drawWinScreen();
  }

  function drawTimeBar() {
    ctx.rect(10, 10, canvas.width-50, 10);
    ctx.fillStyle = "orange"; 
    ctx.fillRect(10, 10, (canvas.width-50)*getGameTimePercentage(), 10)
    ctx.strokeStyle = "black"; 
    ctx.lineWidth = "2"; 
    ctx.stroke();
    ctx.fillStyle = "black"; 
    ctx.font='28px FontAwesome';
    ctx.fillText('\uf11e',canvas.width-35,25);
  }

  function drawStaminaBar() {
    ctx.rect(35, canvas.height-20, canvas.width-45, 10);
    ctx.fillStyle = "lightgreen"; 
    ctx.fillRect(35, canvas.height-20, (canvas.width-45)*shark.stamina, 10)
    ctx.strokeStyle = "black"; 
    ctx.lineWidth = "2"; 
    ctx.stroke(); 

    ctx.fillStyle = "green"; 
    ctx.font='24px FontAwesome';
    ctx.fillText('\uf067',10,canvas.height-10);
  }

  gameLoop = setInterval(globalDraw, drawPerMs);

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
 
 function continueGame(){
   gameLoop = setInterval(globalDraw, drawPerMs);
 }

  document.addEventListener('keydown', (e) => {
    if (!gameOver && !win) {
      if (e.code === "ArrowUp" && shark.dy > -10)       shark.dy -= 1.2;
      else if (e.code === "ArrowDown" && shark.dy < 10) shark.dy += 1.2;
    }
    else if (e.code === "Enter") {
      restartGame();
    }
  });
  document.getElementById("continue").addEventListener("click", continueGame); 
});
