  
var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer();
stage.add(layer);

var rect1 = new Konva.Rect({
    x: 60,
    y: 60,
    width: 100,
    height: 90,
    fill: 'red',
    name: 'rect',
    draggable: true
});
layer.add(rect1);

var rect2 = new Konva.Rect({
    x: 250,
    y: 100,
    width: 150,
    height: 90,
    fill: 'green',
    name: 'rect',
    draggable: true
});
layer.add(rect2);
layer.draw();

stage.on('click', function (e) {
    // if click on empty area - remove all transformers
    if (e.target === stage) {
    stage.find('Transformer').destroy();
    layer.draw();
    return;
    }
    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('rect')) {
    return;
    }
    // remove old transformers
    // TODO: we can skip it if current rect is already selected
    stage.find('Transformer').destroy();

    // create new transformer
    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(e.target);
    layer.draw();
})