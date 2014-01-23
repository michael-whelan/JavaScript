Key = new (function() {
	this.UP = 38; 
	this.LEFT = 37; 
	this.RIGHT = 39;
	this.DOWN = 40; 
	this.SPACE = 32; 
	this.S = 83;
	this.W = 87;
	this.R = 82;
	this.ENTER = 13;
	this.ESC = 27;
})(); 


KeyController = new (function(){
	
	this.keysPressed = {}; 

	var keyDownListeners = this.keyDownListeners = []; 
	var keyUpListeners = this.keyUpListeners = []; 
		
	this.isKeyDown = function (key) { 
		if (typeof key == 'string')
			key = key.charCodeAt(0); 
		//console.log( key + ' ' + this.keysPressed[key] );
		return(this.keysPressed[key]);
	};
	
	document.addEventListener("keydown", function(e) {	

		for(var i = 0; i<keyDownListeners.length; i++) { 
			if((e.keyCode == keyDownListeners[i].key ) && (!KeyController.keysPressed[e.keyCode])) keyDownListeners[i].func();  
			
		}
		KeyController.keysPressed[e.keyCode] = true; 
	}); 
		
	document.addEventListener("keyup", 	function(e) {
		KeyController.keysPressed[e.keyCode] = false;
		
			for(var i = 0; i<keyUpListeners.length; i++) { 
				if(e.keyCode == keyUpListeners[i].key ) keyUpListeners[i].func();  
			}
		}); 
		
	this.addKeyDownListener = function(key, func) { 
		
		if (typeof key == 'string')
			key = key.charCodeAt(0);
		this.keyDownListeners.push({key:key, func:func});
		
	};
	
	this.addKeyUpListener = function(key, func) { 
		
		if (typeof key == 'string')
			key = key.charCodeAt(0); 
		
		this.keyUpListeners.push({key:key, func:func});
		
	};
	
		
})();