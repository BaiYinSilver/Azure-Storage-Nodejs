function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}
      
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var sources = {
    darthVader: 'left.png',
    yoda: 'grass.jpg'
};

var dataURL;

loadImages(sources, function(images) {
    context.drawImage(images.yoda, 0, 0, 480, 200);
    context.drawImage(images.darthVader, 100, 30, 20, 20);
    dataURL = canvas.toDataURL();
    $('.box').attr("src",dataURL);
});