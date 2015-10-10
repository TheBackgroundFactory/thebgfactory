var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var w = canvas.width = window.innerWidth
var h = canvas.height = window.innerHeight

var lastX = -1
var lastY = -1

var nextX = -1
var nextY = -1

var mouseDown = 0

var offset = 15
var sqrDim = 10

var h = 0

function init(){
    //ctx.fillStyle = 'rgb(255,255,255)'
    ctx.fillRect (0, 0, w, h);	
  	draw();
}

window.addEventListener('mousemove', function(e){
  nextX = e.clientX;
  nextY = e.clientY;
  draw()
});

document.body.onmousedown=function(){mouseDown = 1;}
document.body.onmouseup=function(){mouseDown = 0;}

document.body.onkeydown=function(){ctx.clearRect(0,0,w,h)};

function draw() {
  ctx.fillStyle = 'rgba(10,10,10,0.5)'
  //ctx.fillRect (offset, offset, w-offset*2, h-offset*2);

  if (lastX < 0 && lastY < 0){
    lastX = nextX
    lastY = nextY
  }

  //ctx.strokeStyle = 'rgba(255,255,255,1)'
  //rgb = hsv_to_rgb(h,1,1)
  //h = h + 1;
  //ctx.strokeStyle = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')'
  ctx.strokeStyle = 'rgba('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+',1)'
  
  //ctx.fillRect (x-sqrDim/2, y-sqrDim/2, sqrDim, sqrDim);

  if (mouseDown == 1){
    drawLine(lastX, lastY, nextX, nextY)
    drawLine(w-lastX, lastY, w-nextX, nextY)
  }

  lastX = nextX
  lastY = nextY
}

function drawLine(x0, y0, x1, y1){
  var t = new Date();

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineWidth = 8;
  ctx.stroke();
}

init()