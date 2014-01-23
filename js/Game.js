//These are global variables and are NOT recommended because they cause bad things to happen
//Some refactoring will be needed...
var canvas, ctx;


function Game (){
	//gamestates
	this.gameState= 0;
	this.gamePlay = 1;
	this.menu = 0;
	this.endGame = 2;
	this.startGame=3;

	this.pause = 0;
	this.highlight = 0;		
	this.timer = 0;
	this.highlightY = 100;

	this.lastplayerHit = 0;
	this.numHits = 0;
	this.on = false;
	this.pickuptimer = 0;
}

Game.prototype.initWorld = function(){
	this.rand = Math.floor(Math.random()*4);
	if(this.rand === 1){
		this.rand =-5;
	}
	this.player = new Player(100,50,10,50);
	this.player2 = new Player(700,50,10,50);
	this.sound = new Sound();
	this.boom = new Sound();
   	this.goal = new Goal(400,200,10,10,2,this.rand);
  this.pickup = new Pickup();
   	//this.brickR = [new Brick(780,10,30,100,0), new Brick(780,10,30,200,1), new Brick(780,10,30,300,2), new Brick(780,10,30,400,3)];//new Array();
   	this.brickR = new Array();
	this.brickL = new Array();
   var num = 10; ///////////////////////////////////////////////////////////this is new
	for (var i = 0; i < 4; i++) {
		this.brickR[i] = new Brick(780,num,30,100,i, 10);
		this.brickL[i] = new Brick(0,num,30,100,i, 10);
		num +=100;
	}
}

Game.prototype.initCanvas=function () { 
	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas);
	//set canvas to size of the screen.
	canvas.width = window.innerWidth -20; 
	canvas.height = window.innerHeight - 200;
	canvas.addEventListener("mousedown",mouseClick,false);
}

function mouseClick(e){ 
	if(game.gameState === game.menu){
		game.updateMenuTouch(e);
	}
	else if(game.gameState === game.startGame){
		game.updateStartTouch(e);
	}
	else if (game.gameState === game.gamePlay){
		game.updateGameTouch(e);
	}
		else if (game.gameState === game.endGame){
		game.gameState = game.startGame;
		game.initWorld();
		canvas.width = canvas.width;
	}
} 

Game.prototype.updateEndGame = function () {
 		if(KeyController.isKeyDown(Key.R)){
 			this.initWorld();
 			canvas.width = canvas.width;
 			this.gameState = this.startGame;
 		}
}

Game.prototype.checkWin = function () {
  		if(this.goal.x < 10)
  		{
		ctx.font = 'italic 40pt Calibri';
		ctx.textBaseline = "top";
		ctx.fillText("Player 2  Wins!!",100,100);
		ctx.fillText("Press R to Restart",100,150);
		this.gameState = this.endGame;
		this.sound.playWin();
		}
		if(this.goal.x > 800)
		{
		ctx.font = 'italic 40pt Calibri';
		ctx.textBaseline = "top";
		ctx.fillText("Player 1  Wins!!",100,100);
		ctx.fillText("Press R to Restart",100,150);
		this.gameState = this.endGame;
		this.sound.playWin();
		}
}

Game.prototype.pauseGame = function () {
	if(this.timer>=10){
		canvas.width = canvas.width;
		if(this.pause === 0){
			this.pause = 1;
		}
	else if(this.pause ===1){
		this.pause = 0;
	}
	this.timer = 0;
	}
}

Game.prototype.updatePickup = function () {
	if(this.pickup.alive){
	//pick
	if(this.pickup.update(this.goal)){
		if(this.lastplayerHit ===1){
				this.player2.speed = 8;
		}
		else{
				this.player.speed = 8;
		}
	this.pickup.alive = false;
	}

	}
}

Game.prototype.updateGamePlay = function () {
	if(this.pause ===0){
	 	ctx.clearRect(this.goal.x,this.goal.y,this.goal.width,this.goal.height);
		this.goal.update(this.sound);
 	  	this.collisionResponse();
 	  	this.updatePickup();
 	  	this.player.update();
 	  	this.player2.update();
 	  	canvas.width = canvas.width;
    	this.checkWin();

		   if(KeyController.isKeyDown(Key.UP)) {
		  	  	ctx.clearRect(this.player2.x,this.player2.y,this.player2.width,this.player2.height);
		   		this.player2.moveUp();
   	   		}
	
		  else if(KeyController.isKeyDown(Key.DOWN)) {
		  	  	ctx.clearRect(this.player2.x,this.player2.y,this.player2.width,this.player2.height);
		   		this.player2.moveDown();
    	  }
   	     if(KeyController.isKeyDown(Key.W)) {
		  	  	ctx.clearRect(this.player.x,this.player.y,this.player.width,this.player.height);
		   		this.player.moveUp();
    	  }
    	    else if(KeyController.isKeyDown(Key.S)) {
		  	   ctx.clearRect(this.player.x,this.player.y,this.player.width,this.player.height);
		   		this.player.moveDown();
    	  }
    	  if(KeyController.isKeyDown(Key.ESC)) {
   	   	canvas.width = canvas.width;
		  	 this.gameState = this.menu;
    	  }
    }
    
    	if(KeyController.isKeyDown(Key.SPACE)) {
    		this.pauseGame();
    	}

    	if(this.on === true)
    	{
    		this.rand2 = Math.floor(Math.random()*300);
    		this.pickup.set(400,this.rand2+20,15,15);//this.rand2+20
    		this.pickup.alive = true;
    		this.on = false;
    	}
}

Game.prototype.updateGameTouch = function (e) {
	/*if(e.clientX <400 &&e.clientY<200){
		game.player.moveUp();
	}
	else if(e.clientX <400 &&e.clientY>200){
		game.player.moveDown();
	}

	if(e.clientX >400 &&e.clientY<200){
		game.player2.moveUp();
	}
	else if(e.clientX >400 &&e.clientY>200){
		game.player2.moveDown();
	}*/
	if(e.clientX <400){
		game.player.move(game.player.x,e.clientY);
	}
	if(e.clientX >400){
		game.player2.move(game.player2.x,e.clientY);
	}
	canvas.width = canvas.width;
}

Game.prototype.updateMenu = function () {

	
	if(this.timer>=10){
		if(this.highlight===0){
			canvas.width = canvas.width;
			this.highlightY = 100;
			if (KeyController.isKeyDown(Key.DOWN)){
				//canvas.width = canvas.width;
		 		this.highlight = 1;
		 		timer = 0;
		 	}
			else if(KeyController.isKeyDown(Key.ENTER)){		
				this.initWorld();
 				canvas.width = canvas.width;
 				this.gameState = this.startGame;
 				timer = 0;
			 }
		}
		if(this.highlight ===1){
			canvas.width = canvas.width;
			this.highlightY = 200;
			if (KeyController.isKeyDown(Key.UP)) {
				//canvas.width = canvas.width;
				this.highlight = 0;
				timer = 0;
			}
			else if(KeyController.isKeyDown(Key.ENTER)){		
				
			 }
		}
	}
}

Game.prototype.updateStartTouch = function (e){
	game.gameState = game.gamePlay;
	canvas.width = canvas.width;
}

Game.prototype.updateMenuTouch = function (e){
	if(e.clientX >100 && e.clientX <200&&e.clientY>100&&e.clientY<150){
		game.gameState = game.startGame;
		canvas.width = canvas.width;
	}
}

Game.prototype.update = function(){
	this.timer++;
	if(this.gameState === this.endGame){
		this.updateEndGame();
	}

	else if(this.gameState === this.gamePlay){
		this.updateGamePlay();
	}
	else if(this.gameState === this.menu){
		this.updateMenu();
	}
	else if (this.gameState === this.startGame){
		this.updateStart();
	}
}

Game.prototype.updateStart=function(){
	if(KeyController.isKeyDown(Key.SPACE)){
		canvas.width = canvas.width;
		var num = 0;
		for (var i = 0; i < 4; i++) {
			if (this.brickR[i].y == this.brickR[i].nextY && this.brickL[i].y == this.brickL[i].nextY) {
				num++;
			};
		};
		if (num === 4) {
			this.pause = 1;
			this.gameState = this.gamePlay;
		};
	}
}

Game.prototype.collisionResponse=function(){
		
	ctx.save();
	ctx.fillStyle==rgb(0,255,0); 
	ctx.clearRect(this.goal.x,this.goal.y,this.goal.width,this.goal.height);
	ctx.restore();

	if(this.player.collision(this.goal)||this.player2.collision(this.goal)){
 		this.sound.play(); 	

 		if(this.goal.xval === 2){
 			this.lastplayerHit = 1;
 		}
 		else{
 			this.lastplayerHit = -1;
 		}
 		
		this.goal.xval *=-1;
		
		if(this.numHits <3){
			this.numHits++;
		}
		if(this.numHits === 3) {
			this.on = true; this.numHits = 0;
			console.log(this.numHits);
		}
		}


	for (var i =0; i< this.brickR.length;  i++) {
		if(this.brickR[i].collision(this.goal)){

			this.goal.xval *=-1;
			this.goal.x = 400;
			this.brickR[i].isAlive = 0;
			canvas.width = canvas.width;
			console.log(this.brickR[i].isAlive);
			this.sound.play();
			//ctx.clearRect(this.brick[i].x,this.brick[i].y,this.brick[i].width,this.brick[i].height);
		};
		if (this.brickL[i].collision(this.goal)) {
			this.goal.xval *=-1;
			this.goal.x = 400;
			this.brickL[i].isAlive = 0;
			canvas.width = canvas.width;
			console.log(this.brickL[i].isAlive);
			this.sound.play();
		};
	}
}

Game.prototype.gameLoop = function (){
   var GAME_RUNNING=0;
 	  game.update();
	  game.draw();

	  
	  window.requestAnimFrame(game.gameLoop);
}

Game.prototype.draw =function (){
	if(this.gameState === this.gamePlay||this.gameState === this.startGame){
		ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";

	ctx.fillStyle=rgb(255,0,0);
	ctx.lineWidth = 4;
	ctx.strokeRect(10,10,800,400);

		if(this.pickup.alive === true){
			//canvas.width = canvas.width;
			this.pickup.draw(ctx);
		}
		this.player.draw(ctx);	
		this.player2.draw(ctx);
		this.goal.draw(ctx);
		for (var i =0; i< this.brickR.length;  i++) {
			this.brickR[i].draw(ctx);
			//canvas.width = canvas.width;
			this.brickL[i].draw(ctx);
		};

		if(this.gameState === this.gamePlay){
			if(this.pause === 1){
				ctx.font = 'italic 40pt Calibri';
				ctx.textBaseline = "top";
			ctx.fillStyle=rgb(255,0,0);
			ctx.fillText("Paused",200,50);
			ctx.fillText("Press Space to unpause",100,200);
			}
		}
	}
	else if(this.gameState === this.menu){
		ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.fillText("MENU",300,15);
	ctx.fillText("Play",100,100);
	ctx.fillText("Quit",100,200);

	ctx.fillStyle=rgb(255,0,0);
	ctx.lineWidth = 4;
	ctx.strokeRect(100,this.highlightY,100,50);
	}
	if(this.gameState === this.startGame){
		ctx.font = 'italic 40pt Calibri';
		ctx.textBaseline = "top";
		ctx.fillStyle=rgb(255,0,0);
		ctx.fillText("Press Space To Play",200,200);
		
	}
}

