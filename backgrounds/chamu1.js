function runDots() {
  //IMPORTANT VARIABLES TO CHANGE
  var GRAD1 = "#111111" //First color of gradient
  var GRAD2 = "#222222" // Second color of gradient
  var SEP = 16 // SEPeration between points
  var MINDIST = 200 //Distance the node starts lighting up
  var MINDIST_V = 100 //Random variance for minimum distance
  var LIGHTNESS = 100 //Lightness of each node
  var LIGHTNESS_V = 155 //Random variance in lightness
  var TYPE = "circle" //Type of node, "circle" or "square"
  var FULLSCREEN = false //whether the background takes the fullpage or not.
  var SIZE = 5 //radius of the dot
  ///////////////////////////////

  var msX
  var msY
  var canvas = document.getElementById("canvas1")
  if (FULLSCREEN) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;  
  }
  var surface = canvas.getContext("2d")

  var Node  = function (x,y,mindist,mindistVariance,lightness,lightnessVariance,size,type) {
    this.x = x
    this.y = y
    this.mindist = mindist+Math.random()*mindistVariance
    this.gr = Math.floor(lightness+Math.random()*lightnessVariance)
    this.size = size
    //console.log("Node "+x+"|"+y+" created")
  }

  Node.prototype.draw = function() {
      dis = Math.sqrt( Math.pow(msY-this.y,2) + Math.pow(msX-this.x,2) )
      //console.log(dis)
      if (dis<this.mindist) {
        if (this.type = "circle") {
          surface.strokeStyle = "rgba("+this.gr+","+this.gr+","+this.gr+","+(1.25-dis/this.mindist)+")"
          surface.beginPath()
          surface.arc(this.x,this.y,this.size,0,2*Math.PI)
          surface.stroke()
        }
        else if (this.type = "square") {
          surface.fillStyle="rgba("+this.gr+","+this.gr+","+this.gr+","+(1.25-dis/this.mindist)+")"
          surface.fillRect(this.x,this.y,this.size*2,this.size*2)     
        }
      }
  }

  var columns = Math.ceil(canvas.width/SEP);
  var rows = Math.ceil(canvas.height/SEP);

  var nodeList = []
  for (var i=0; i<columns; i++) {
    nodeList[i] = []
  }

  for (var i=0; i<columns; i++) {
    for (var j=0; j<rows; j++) {
      nodeList[i][j] = new Node(SIZE+2+i*SEP,SIZE+2+j*SEP,MINDIST,MINDIST_V,LIGHTNESS,LIGHTNESS_V,SIZE,TYPE)
    }
  }

  function draw() {
  	var bg_gr = surface.createLinearGradient(0,0,0,canvas.height)
  	bg_gr.addColorStop(0,GRAD1)
  	bg_gr.addColorStop(1,GRAD2)

  	surface.fillStyle = bg_gr
  	surface.fillRect(0,0,canvas.width,canvas.height)
  }

  // window.addEventListener('resize', function() {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // });

  // document.body.addEventListener('mousemove', function(e) {
  //   msX = e.clientX;
  //   msY = e.clientY;
  //   draw();
  //   for (var i=0; i<columns; i++) {
  //     for (var j=0; j<rows; j++) {
  //       nodeList[i][j].draw()
  //     }
  //   }
  // });

  function fixPageXY(e)
  {
    if (e.pageX == null && e.clientX != null ) 
    { 
        var html = document.documentElement
        var body = document.body

        e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0)
        e.pageX -= html.clientLeft || 0

        e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0)
        e.pageY -= html.clientTop || 0
      }
  }
  document.onmousemove = function(e) 
  {
      e = e || window.event
      fixPageXY(e)
      msX = e.pageX;
      msY = e.pageY-100;
      draw();
      for (var i=0; i<columns; i++) {
        for (var j=0; j<rows; j++) {
          nodeList[i][j].draw()
        }
      }
  }
}
runDots()