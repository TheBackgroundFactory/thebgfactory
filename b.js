function draw() {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        var w = canvas.width = window.innerWidth
        var h = canvas.height = window.innerHeight

        console.log(w);
        console.log(h);

        ctx.fillStyle = "rgb(120,120,120"

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (w/4, h/4, w/2, h/2);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (0, 0, w/2, h/2);
      }
    }