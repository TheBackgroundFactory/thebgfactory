//Variables To Change For Customization

/*
Change Color of Background by altering rgb values at 1)
Change Color of Pixels by altering rgb values at 2)
Alter Pixel Shape at 3) see canvas2 for more info
Change Function the is graphed at 4) Note Current Function depends on mouse position
*/

function runLinear() {

	var canvas2 = document.getElementById("canvas2");
	var ctx = canvas2.getContext('2d');

	var self = document.getElementById('scr_back')
	if (self) {
	    if ( self.classList[0] == "fullscreen") {
	      canvas2.width = window.innerWidth;
	      canvas2.height = window.innerHeight;  
	    }
	 }

	function update(e) {
		if (e.type == 'touchmove') {
	      e.preventDefault();
	      msX = e.touches[0].pageX;
	      msY = e.touches[0].pageY;      
	    }
	    else {
	      msX = e.clientX;
	      msY = e.clientY;
	    }
	    toCart(msX,msY)
	}

	function toCart (x,y)
	{
			zeroX = canvas2.width/2
			zeroY = canvas2.height/2
			cartX = x+zeroX
			cartY = y+zeroY
			a = 1//constant that can be used in a custom function
			angle = Math.tan(cartY/cartX)
			//radius = a/angle    //Other Function for Polar Graphs
			//console.log("CartX: " + cartX + ", CartY: " + cartY)  //Use this to output the cartesian versions of X and Y
			draw2(x,y)
	}


	//draw2 FUNCTION

	function draw2(x,y) 
	{
	   //var w = canvas2.width = window.innerWidth;
	   //var h = canvas2.height = window.innerHeight;
	  ctx.fillStyle = 'rgb(28,28,28)'//1)
	  ctx.clearRect(0, 0, canvas2.width, canvas2.height);
	  ctx.fillRect (0,0,canvas2.width,canvas2.height);
	  r = Math.random()*10//Random function used for linear function
	  ctx.fillStyle = 'rgb(110,110,110)'//2)
	  //ctx.fillStyle = 'rbg('+e.pageX%256+','+e.pageY%256+',0)'//use to generate random colors based on x and y
	  for (i=0;i<canvas2.width;i=i+canvas2.width/35)//change the value i is incremented by to increase or decrease points
	  {
	  	yValue = angle*i+angle*Math.random()*100//4) Function can be altered to change graphed pattern
	  	ctx.fillRect(i,yValue,10,10)//3) Change fillRect to another method to change shape of graphed values
	  	//console.log("Graphing") //Outputs the amount of times it graphs
	  }
	  //ctx.fillRect(x-10,y-10,10,10);
	}

	toCart(0,0)
	canvas2.addEventListener('mousemove',update);
	canvas2.addEventListener('touchmove',update)
}
runLinear()