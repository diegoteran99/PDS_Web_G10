var width = window.innerWidth;
var height = window.innerHeight;
var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;
var lineSize = 3;
var triangleRadius = 10;

// var shadowRectangle = new Konva.Rect({
//   x: 0,
//   y: 0,
//   width: blockSnapSize * 6,
//   height: blockSnapSize * 3,
//   fill: '#FF7B17',
//   opacity: 0.6,
//   stroke: '#CF6412',
//   strokeWidth: 3,
//   dash: [20, 2]
// });

// function newRectangle(x, y, layer, stage) {
//   let rectangle = new Konva.Rect({
//     x: x,
//     y: y,
//     width: blockSnapSize * 6,
//     height: blockSnapSize * 3,
//     fill: '#fff',
//     stroke: '#ddd',
//     strokeWidth: 1,
//     shadowColor: 'black',
//     shadowBlur: 2,
//     shadowOffset: {x : 1, y : 1},
//     shadowOpacity: 0.4,
//     draggable: true
//   });
//   rectangle.on('dragstart', (e) => {
//     shadowRectangle.show();
//     shadowRectangle.moveToTop();
//     rectangle.moveToTop();
//   });
//   rectangle.on('dragend', (e) => {
//     rectangle.position({
//       x: Math.round(rectangle.x() / blockSnapSize) * blockSnapSize,
//       y: Math.round(rectangle.y() / blockSnapSize) * blockSnapSize
//     });
//     stage.batchDraw();
//     shadowRectangle.hide();
//   });
//   rectangle.on('dragmove', (e) => {
//     shadowRectangle.position({
//       x: Math.round(rectangle.x() / blockSnapSize) * blockSnapSize,
//       y: Math.round(rectangle.y() / blockSnapSize) * blockSnapSize
//     });
//     stage.batchDraw();
//   });
//   layer.add(rectangle);
// }

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
    strokeWidth: 1,
  }));
}

var layer = new Konva.Layer();
// shadowRectangle.hide();
// layer.add(shadowRectangle);
// newRectangle(blockSnapSize * 3, blockSnapSize * 3, layer, stage);
// newRectangle(blockSnapSize * 10, blockSnapSize * 3, layer, stage);

stage.add(gridLayer);
stage.add(layer);

function newLine(layer) {
    var scale = 1;

    var line = new Konva.Line({
        points: [30, 70, 30, 140],
        stroke: 'red',
        strokeWidth: lineSize,
        lineCap: 'round',
        lineJoin: 'round',
        draggable: true,

        });

    layer.add(line);
}

function newSupport(layer, stage) {
    var scale = 1;

    var triangle = new Konva.RegularPolygon({
        x: 150,
        y: 275,
        sides: 3,
        radius: triangleRadius,
        scaleY: 1.6,
        stroke: "black",
        fill: "rgba(200,0,200, 1)",
        draggable: true,
      });
    //   triangle.on('dragstart', (e) => {
    //     triangle.moveToTop();
    //   });
    //   triangle.on('dragend', (e) => {
    //     triangle.position({
    //       x: Math.round(triangle.x() / triangleRadius) * triangleRadius,
    //       y: Math.round(triangle.y() / triangleRadius) * triangleRadius
    //     });
    //     stage.batchDraw();
    //   });

    layer.add(triangle);
}

function addPointCharge(layer) {
    var scale = 1;

    var arrow = new Konva.Arrow({
        x: stage.width() / 40,
        y: stage.height() / 40,
        points: [0, 0, width / 20, height / 20],
        pointerLength: 5,
        pointerWidth: 5,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      });

    layer.add(arrow);
}



document
            .getElementById('btnCreateRectangle')
            .addEventListener('click', function () {
                newLine(layer)
                stage.add(layer);
            });

document
            .getElementById('btnCreateSupport')
            .addEventListener('click', function () {
                newSupport(layer, stage)
                // newRectangle(blockSnapSize * 3, blockSnapSize * 3, layer, stage);
                stage.add(layer);
            });

document
            .getElementById('btnCreateArrow')
            .addEventListener('click', function () {
                addPointCharge(layer)
                stage.add(layer);
            });
