var game;

function main()
{
	//change version number if you suspect a problem with caching
	console.log("version 1");
	
	game= new Game();

	game.initCanvas();
	
	//ctx the drawing context, which lets you draw onto the canvas
	//Most people call it ctx for short	
	ctx.clearRect(0,0,canvas.width, canvas.height);

	game.initWorld();		
		
	//start game loop
	game.gameLoop();
			
}

