var width = window.innerWidth;
var height = window.innerHeight;
var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;
var lineSize = 3;
var triangleRadius = 10;

let arrows = []
let triangles = []
let lines = []
let nodes = []

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

stage.add(gridLayer);
stage.add(layer);

function newLine(layer) {
    var line = new Konva.Line({
        points: [30, 70, 30, 140],
        stroke: 'black',
        strokeWidth: lineSize,
        lineCap: 'round',
        lineJoin: 'round',
        draggable: true,

        });

    layer.add(line);
    return line
}

function newSupport(layer, stage) {
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
    return triangle
}

function addPointCharge(layer) {
    var arrow = new Konva.Arrow({
        x: stage.width() / 40,
        y: stage.height() / 40,
        points: [0, 0, width / 20, height / 20],
        pointerLength: 5,
        pointerWidth: 5,
        fill: 'red',
        stroke: 'red',
        strokeWidth: 4,
        draggable: true
      });

    layer.add(arrow);
    return arrow
}

var tr = new Konva.Transformer();
layer.add(tr);





document
            .getElementById('btnCreateLine')
            .addEventListener('click', function () {
                lines.push(newLine(layer))
                stage.add(layer);
            });

document
            .getElementById('btnCreateSupport')
            .addEventListener('click', function () {
                triangles.push(newSupport(layer, stage))
                stage.add(layer);
            });

document
            .getElementById('btnCreateArrow')
            .addEventListener('click', function () {
                arrows.push(addPointCharge(layer))
                stage.add(layer);
            });

