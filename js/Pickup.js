var Pickup=function ()
{
	this.alive = false;
};

Pickup.prototype.set = function(x,y,w,h)
{
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
};

Pickup.prototype.update = function(e){

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


Pickup.prototype.draw = function(ctx)
{
	ctx.fillStyle=rgb(0,0,0);
	ctx.fillRect(this.x,this.y,this.width,this.height);
};
