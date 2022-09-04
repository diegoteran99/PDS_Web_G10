
// var width = window.innerWidth;
// var height = window.innerHeight;

// var stage = new Konva.Stage({
// container: 'container',
// width: width,
// height: height
// });

// var layer = new Konva.Layer();
// stage.add(layer);

// var rect1 = new Konva.Rect({
// x: 60,
// y: 60,
// width: 100,
// height: 90,
// fill: 'red',
// name: 'rect',
// draggable: true
// });
// layer.add(rect1);

// var rect2 = new Konva.Rect({
// x: 250,
// y: 100,
// width: 150,
// height: 90,
// fill: 'green',
// name: 'rect',
// draggable: true
// });
// layer.add(rect2);
// layer.draw();

// stage.on('click', function (e) {
// // if click on empty area - remove all transformers
// if (e.target === stage) {
// stage.find('Transformer').destroy();
// layer.draw();
// return;
// }
// // do nothing if clicked NOT on our rectangles
// if (!e.target.hasName('rect')) {
// return;
// }
// // remove old transformers
// // TODO: we can skip it if current rect is already selected
// stage.find('Transformer').destroy();

// // create new transformer
// var tr = new Konva.Transformer();
// layer.add(tr);
// tr.attachTo(e.target);
// layer.draw();
// })

var width = window.innerWidth;
var height = window.innerHeight;
var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;

var shadowRectangle = new Konva.Rect({
  x: 0,
  y: 0,
  width: blockSnapSize * 6,
  height: blockSnapSize * 3,
  fill: '#FF7B17',
  opacity: 0.6,
  stroke: '#CF6412',
  strokeWidth: 3,
  dash: [20, 2]
});

// var shadowLine = new Konva.Line({
//     points: [5, 70, 140, 23, 250, 60, 300, 20],
//     fill: '#FF7B17',
//     opacity: 0.6,
//     stroke: '#CF6412',
//     strokeWidth: e,
//     lineCap: 'round',
//     lineJoin: 'round',
//     dash: [20, 2]
//   });

function newRectangle(x, y, layer, stage) {
  let rectangle = new Konva.Rect({
    x: x,
    y: y,
    width: blockSnapSize * 6,
    height: blockSnapSize * 3,
    fill: '#fff',
    stroke: '#ddd',
    strokeWidth: 1,
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: {x : 1, y : 1},
    shadowOpacity: 0.4,
    draggable: true
  });
  rectangle.on('dragstart', (e) => {
    shadowRectangle.show();
    shadowRectangle.moveToTop();
    rectangle.moveToTop();
  });
  rectangle.on('dragend', (e) => {
    rectangle.position({
      x: Math.round(rectangle.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(rectangle.y() / blockSnapSize) * blockSnapSize
    });
    stage.batchDraw();
    shadowRectangle.hide();
  });
  rectangle.on('dragmove', (e) => {
    shadowRectangle.position({
      x: Math.round(rectangle.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(rectangle.y() / blockSnapSize) * blockSnapSize
    });
    stage.batchDraw();
  });
  layer.add(rectangle);
}

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

var gridLayer = new Konva.Layer();
var padding = blockSnapSize;
console.log(width, padding, width / padding);
for (var i = 0; i < width / padding; i++) {
  gridLayer.add(new Konva.Line({
    points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
    stroke: '#ddd',
    strokeWidth: 1,
  }));
}

gridLayer.add(new Konva.Line({points: [0,0,10,10]}));
for (var j = 0; j < height / padding; j++) {
  gridLayer.add(new Konva.Line({
    points: [0, Math.round(j * padding), width, Math.round(j * padding)],
    stroke: '#ddd',
    strokeWidth: 0.5,
  }));
}

var layer = new Konva.Layer();
shadowRectangle.hide();
layer.add(shadowRectangle);
newRectangle(blockSnapSize * 3, blockSnapSize * 3, layer, stage);
newRectangle(blockSnapSize * 10, blockSnapSize * 3, layer, stage);

stage.add(gridLayer);
stage.add(layer);

function addBeam(layer) {
    var scale = 1;

    var beam = new Konva.Line({
        points: [20, 70, 20, 140],
        stroke: 'red',
        strokeWidth: 15,
        lineCap: 'round',
        lineJoin: 'round',

      });

    layer.add(beam);
}

function addSupport(layer) {
    var scale = 1;

    var beam = new Konva.Line({
        points: [20, 70, 20, 140],
        stroke: 'red',
        strokeWidth: 15,
        lineCap: 'round',
        lineJoin: 'round',

      });

    layer.add(beam);
}

function addPointCharge(layer) {
    var scale = 1;

    var arrow = new Konva.Arrow({
        x: stage.width() / 4,
        y: stage.height() / 4,
        points: [0, 0, width / 2, height / 2],
        pointerLength: 20,
        pointerWidth: 20,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4,
      });

    layer.add(arrow);
}



document
            .getElementById('btnCreateRectangle')
            .addEventListener('click', function () {
                addBeam(layer)
                stage.add(layer);
            });

document
            .getElementById('btnCreateSupport')
            .addEventListener('click', function () {
                addSupport(layer)
                stage.add(layer);
            });

document
            .getElementById('btnCreateArrow')
            .addEventListener('click', function () {
                addPointCharge(layer)
                stage.add(layer);
            });
