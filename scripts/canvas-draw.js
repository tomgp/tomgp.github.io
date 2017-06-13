if(document.querySelector){
(function(){
    var context;
    var drawing = false;

    function addCanvas(){
        var canvas = document.createElement('canvas');
        canvas.className = 'sketch-canvas';
        document.querySelector('body').appendChild(canvas);
        document.querySelector('body').classList.add('unselectable');

        var size = canvas.getBoundingClientRect();
        canvas.width = size.width * 2;
        canvas.height = size.height * 2;

        context = canvas.getContext('2d');
        context.strokeStyle = '#ff2800';
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.lineWidth = '5';
        context.scale(2,2);

        document.querySelectorAll('body, div, a')
            .forEach(function(a){
                a.classList.add('drawable');
            });
    }

    addCanvas();

    var face = document.createElement('img')
        face.width = '250';
        face.height = '250';
        face.src = 'face.svg';

    function startDraw(e){
      e.preventDefault();
      var coords = normaliseEvent(e);
      context.beginPath(coords.x, coords.y);
      drawing = true;
    }

    function endDraw(e){
      e.preventDefault();
      drawing = false;
    }

    function draw(e) {
      e.preventDefault();
      var coords = normaliseEvent(e);
      if(drawing){
          context.lineTo(coords.x, coords.y);
          context.stroke();
      }
    }

    function normaliseEvent(e){
      var x = e.clientX;
      var y = e.clientY;
      if(e.touches){
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }
      return {x:x, y:y};
    }

    document.querySelector('article').appendChild(face);

    document.addEventListener('mousedown', startDraw, false);
    document.addEventListener('touchstart', startDraw, false);
    document.addEventListener('mouseup', endDraw, false);
    document.addEventListener('touchend', endDraw, false);
    document.addEventListener('mousemove', draw, false);
    document.addEventListener('touchmove', draw, false);

    window.addEventListener('resize',function(){
        var c = document.querySelector('canvas').remove();
        addCanvas();
    })
})();
}
