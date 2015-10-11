// FINAL Variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var w = canvas.width = window.innerWidth
var h = canvas.height = window.innerHeight

// Variable parameters
var dotDistance = 160 // Pixels between dots 140
var pathRadius = 125 // Dot path radius
var dotRadius = 18 // Radius of each dot
var dotPeriod = 3 // Period of each circle revolution
var waveFactor = 10 // Waviness of dot motion

var bShade = 30 // Shade of background
var dotShade = 255 // Shade of dot
var dotAlpha = 0.8 // Alpha value of dot

var shadColour = '#909090' // Colour of dot shadow
var shadBlur = 10 // Shadow blur value
var shadOffsetX = 0 // Shadow offset along x-dimension
var shadOffsetY = 0 // Shadow offset along y-dimension

var pathShadeRadii = [pathRadius*1.4, pathRadius*2.5, pathRadius*3.5] // Path ring cursor hover ranges

var pathShades = [110, 80, 60] // Path ring cursor hover shades
var pathShade = 45 // Default path shade

var dots = []

var mouseX = -1
var mouseY = -1
var ringDistance = -1

function init() {
    for (i = 0 ; i < w/dotDistance+1 ; i ++){
      var col = []
      for (j = -1 ; j < h/dotDistance+1 ; j ++){
        col.push([i*dotDistance+w/dotDistance/2, j*dotDistance+h/dotDistance/2])
      }
      dots.push(col)
    }	

    draw()
}

function fixPageXY(e) {
  if (e.pageX == null && e.clientX != null ) { 
    var html = document.documentElement
    var body = document.body

    e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0)
    e.pageX -= html.clientLeft || 0
    
    e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0)
    e.pageY -= html.clientTop || 0
  }
}

document.onmousemove = function(e) {
  e = e || window.event
  fixPageXY(e)
  mouseX = e.pageX;
  mouseY = e.pageY;
}

function getDistance(x0, y0, x1, y1){
  return Math.sqrt(Math.pow(x1-x0, 2)+Math.pow(y1-y0, 2))
}

function draw() {
  var t = (new Date()).getMilliseconds()+1000*(((new Date()).getSeconds())%dotPeriod)
  
  ctx.fillStyle = 'rgb('+bShade+','+bShade+','+bShade+')'
  ctx.fillRect(0,0,w,h);

  for (i = 0 ; i < w/dotDistance+1 ; i++){
      for (j = -1 ; j < h/dotDistance+1 ; j++){
        var ringDistance = getDistance(i*dotDistance,j*dotDistance, mouseX, mouseY)

        if (ringDistance < pathShadeRadii[0]){
          ctx.strokeStyle = 'rgb('+pathShades[0]+','+pathShades[0]+','+pathShades[0]+')' 
        } else if (ringDistance < pathShadeRadii[1]){
          ctx.strokeStyle = 'rgb('+pathShades[1]+','+pathShades[1]+','+pathShades[1]+')' 
        } else if (ringDistance < pathShadeRadii[2]){
          ctx.strokeStyle = 'rgb('+pathShades[2]+','+pathShades[2]+','+pathShades[2]+')' 
        } else {
          ctx.strokeStyle = 'rgb('+pathShade+','+pathShade+','+pathShade+')' 
        }

        ctx.beginPath();
        ctx.arc(i*dotDistance,j*dotDistance,pathRadius,0,2*Math.PI);
        ctx.lineWidth = 1
        ctx.stroke();
      }
  }

  ctx.fillStyle = 'rgba('+dotShade+','+dotShade+','+dotShade+','+dotAlpha+')'

  for (i = 0 ; i < w/dotDistance+1 ; i++){
      for (j = -1 ; j < h/dotDistance+1 ; j++){
        var theta = Math.PI*2*t/(1000*dotPeriod)

        dots[i][j] = [i*dotDistance+pathRadius*Math.cos(theta), j*dotDistance+pathRadius*Math.sin(theta)];

        ctx.save()
        ctx.shadowColor = shadColour;
        ctx.shadowBlur = shadBlur;
        ctx.shadowOffsetX = shadOffsetX;
        ctx.shadowOffsetY = shadOffsetY;

        ctx.beginPath();
        ctx.arc(dots[i][j][0],dots[i][j][1],dotRadius,0,2*Math.PI);
        ctx.fill();

        ctx.restore();

        t += waveFactor;
      }
  }

  window.requestAnimationFrame(draw);
}

init()