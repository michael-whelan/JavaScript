var Sound=function ()
{
		
};


Sound.prototype.play = function()
{
	var boom = new Audio("boop.wav");

    boom.play();
};


Sound.prototype.playWin = function()
{
	var winAudio = new Audio("victory.wav");

    winAudio.play();
};


Sound.prototype.playBackgroundLoop = function()
{
var back = new Audio("backtrack.wav");

	//an alternative method 
	back.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);

	back.play();
};
