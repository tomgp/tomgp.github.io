if(document.querySelector){
(function(){
    var context, drawing = false;

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

    document.querySelector('article').appendChild(face);

    document.addEventListener('mousedown',function(e){
        context.beginPath(e.clientX, e.clientY);
        drawing = true;
    }, false)

    document.addEventListener('mouseup',function(e){
        drawing = false;
    }, false);

    document.addEventListener('mousemove', function(e) {
        if(drawing){
            context.lineTo(e.clientX, e.clientY);
            context.stroke();
        }
    }, false);

    window.addEventListener('resize',function(){
        var c = document.querySelector('canvas').remove();
        addCanvas();
    })
})();
}