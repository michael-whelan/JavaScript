var Brick=function (x,y,w,h,i,rY)
{
	this.x=x;
	this.y= rY;
	this.nextY = y;
	this.width=w;
	this.height=h;
	this.isAlive=1;
	this.meNum = i;
	
};


Brick.prototype.draw = function(ctx)
{ 
	if(this.isAlive===1){
		if(this.meNum ===0||this.meNum===2){
			ctx.fillStyle=rgb(255,0,0);
		}
		else 
		{
			ctx.fillStyle=rgb(255,0,255);
		}
		//console.log(this.meNum);
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
	if(this.nextY != this.y){
		this.y += 5;
	}
};



Brick.prototype.collision = function(e)
{
 var collides=false;        
        //do the two bounding boxes overlap?
        if ((this.x < e.x + e.width) &&
        (this.x + this.width > e.x) &&
        (this.y + this.height > e.y) &&
        (this.y < e.y + e.height) &&this.isAlive===1)
        {  
        	collides = true;
        }
        return collides;
};