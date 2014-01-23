var Player=function (x,y,w,h)
{
	this.x=x;
	this.y=y;
	this.width=w;
	this.height=h;
	this.isAlive=true;
	this.speed = 4;

	this.nextY = y;
};


Player.prototype.draw = function(ctx)
{
	ctx.fillStyle=rgb(255,0,0);
	
	ctx.fillRect(this.x,this.y,this.width,this.height);
};


Player.prototype.clear = function()
{

};

Player.prototype.update = function()
{
	if(this.nextY>this.y){

		this.y+=this.speed;
	}
	
	else if(this.nextY<this.y){
		this.y-=this.speed;
	}
	if((this.y - this.nextY)<10&&(this.y - this.nextY)>-10) 
		{this.y = this.nextY;}
}


Player.prototype.move = function(x,y)
{

	this.x = x;
	this.nextY = y;
	
};

Player.prototype.collision = function(e)
{
 var collides=false;        
        //do the two bounding boxes overlap?
        if ((this.x < e.x + e.width) &&
        (this.x + this.width > e.x) &&
        (this.y + this.height > e.y) &&
        (this.y < e.y + e.height))
        {           
            collides = true;              
        }
        return collides;
};


Player.prototype.moveUp=function()
{
	if(this.y>=10){
		this.y-=this.speed;

	}
	else{
		this.y = 10;
	}
this.nextY = this.y;
};
Player.prototype.moveDown=function()
{
	if(this.y<=360){
		this.y+=this.speed;
	}
	else {
		this.y = 360
	}
	this.nextY = this.y;
};
