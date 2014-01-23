var Goal=function (x,y,w,h,xval,yval)
{
	this.x=x;
	this.y=y;
	this.width=w;
	this.height=h;
	this.isAlive=true;
	this.xval = xval;
	this.yval = yval;
};


Goal.prototype.draw = function(ctx)
{
	ctx.fillStyle=rgb(0,0,0);
	ctx.fillRect(this.x,this.y,this.width,this.height);
};


Goal.prototype.clear = function()
{
};


Goal.prototype.update = function(s){

	this.x += this.xval;
	this.y+= this.yval;

if(this.y <=10 || this.y >=395){
		this.yval *= -1;
		s.play();
	}
};

Goal.prototype.move = function(x,y)
{
	this.x = x;
	this.y = y;	
};