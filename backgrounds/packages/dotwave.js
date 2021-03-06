// FINAL Variables
function runWaves() {
    var canvas = document.getElementById("canvas3");
    var ctx = canvas.getContext('2d');



    var self = document.getElementById('scr_back')
    if (self) {
      if ( self.classList[0] == "fullscreen") {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;  
      }
    }

    var w = canvas.width;
    var h = canvas.height

    // Variable parameters
    var dotDistance = 140 // Pixels between dots 
    var pathRadius = 110 // Dot path radius
    var dotRadius = 20 // Radius of each dot
    var dotPeriod = 3 // Period of each circle revolution
    var bShade = 50 // Shade of background
    var pathShade = 200 // Shade of circle path
    var dotShade = 255 // Shade of dot
    var dotAlpha = 0.9 // Alpha value of dot
    var shadColour = '#909090' // Colour of dot shadow
    var shadBlur = 10 // Shadow blur value
    var shadOffsetX = 0 // Shadow offset along x-dimension
    var shadOffsetY = 0 // Shadow offset along y-dimension
    var waveFactor = 20 // Waviness of dot motion

    var dots = []

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


    function draw() {
      var t = (new Date()).getMilliseconds()+1000*(((new Date()).getSeconds())%dotPeriod)
      
      ctx.fillStyle = 'rgb('+bShade+','+bShade+','+bShade+')'
      ctx.fillRect(0,0,w,h);

      ctx.strokeStyle = 'rgb('+pathShade+','+pathShade+','+pathShade+')'  

      for (i = 0 ; i < w/dotDistance+1 ; i++){
          for (j = -1 ; j < h/dotDistance+1 ; j++){
            ctx.beginPath();
            ctx.arc(i*dotDistance,j*dotDistance,pathRadius,0,2*Math.PI);
            ctx.lineWidth = 1
            ctx.stroke();
          }
      }

      ctx.fillStyle = 'rgba('+dotShade+','+dotShade+','+dotShade+','+dotAlpha+')'

      for (i = 0 ; i < w/dotDistance+1 ; i++){
          for (j = -1 ; j < h/dotDistance+1 ; j++){
            dots[i][j] = [i*dotDistance+pathRadius*Math.cos(Math.PI*2*t/(1000*dotPeriod)), j*dotDistance+pathRadius*Math.sin(Math.PI*2*t/(1000*dotPeriod))];

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
}
runWaves();