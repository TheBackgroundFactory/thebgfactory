 $(function() {
    $('#canvastoggler').change(function() {
    	if ($(this).prop('checked')) {
    		$('.replaced-canvas').replaceWith('<canvas id="'+$('.replaced-canvas').attr('canvasid')+'" width="700" height="400" alt="http://placehold.it/700x400">Sorry, your browser doesnt support canvas.</canvas>')
    		runDots();
    	}
    	else
    	{
      		$('canvas').replaceWith('<img class="img-responsive img-rounded replaced-canvas" src="'+$('canvas').attr('alt')+'" canvasid="canvas1" alt="">')
    	}
    })
  })