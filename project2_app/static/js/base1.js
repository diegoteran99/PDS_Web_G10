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

document
    .getElementById('btnCreateLine')
    .addEventListener('click', function () {
        const line = new Konva.Line({
            points: [50, 50, 250, 50],
            stroke: 'black'
          });
          layer.add(line);
          
          const anchor1 = new Konva.Circle({
            x: line.points()[0],
            y: line.points()[1],
            radius: 3,
            fill: 'red',
            draggable: true
          })
          layer.add(anchor1);
          
          const anchor2 = new Konva.Circle({
            x: line.points()[2],
            y: line.points()[3],
            radius: 3,
            fill: 'red',
            draggable: true
          })
          layer.add(anchor2);
          
          
          function updateLine() {
            const points = [
              anchor1.x(),
              anchor1.y(),
              anchor2.x(),
              anchor2.y(),
            ]
            line.points(points);
            layer.batchDraw();
          }
          
          anchor1.on('dragmove', updateLine);
          anchor2.on('dragmove', updateLine);
          
          layer.draw();
        stage.add(layer);
    });

document
    .getElementById('btnCreateSupport')
    .addEventListener('click', function () {
        const triangle =  new Konva.RegularPolygon({
            x: 150,
            y: 275,
            sides: 3,
            radius: triangleRadius,
            scaleY: 1.6,
            stroke: "black",
            fill: "rgba(200,0,200, 1)",
          });
          layer.add(triangle);
          
          const anchor1 = new Konva.Circle({
            x: line.points()[0],
            y: line.points()[1],
            radius: 3,
            fill: 'blue',
            draggable: true
          })
          layer.add(anchor1);
          
          const anchor2 = new Konva.Circle({
            x: line.points()[2],
            y: line.points()[3],
            radius: 3,
            fill: 'blue',
            draggable: true
          })
          layer.add(anchor2);
          
          
          function updateLine() {
            const points = [
              anchor1.x(),
              anchor1.y(),
              anchor2.x(),
              anchor2.y(),
            ]
            line.points(points);
            layer.batchDraw();
          }
          
          anchor1.on('dragmove', updateLine);
          anchor2.on('dragmove', updateLine);
          
          layer.draw();
        stage.add(layer);
    });

document
    .getElementById('btnCreateArrow')
    .addEventListener('click', function () {
        const arrow = new Konva.Arrow({
            x: stage.width() / 40,
            y: stage.height() / 40,
            points: [0, 0, width / 20, height / 20],
            pointerLength: 5,
            pointerWidth: 5,
            fill: 'red',
            stroke: 'red',
            strokeWidth: 3,
          });
          layer.add(arrow);
          
          const anchor1 = new Konva.Circle({
            x: arrow.points()[0],
            y: arrow.points()[1],
            radius: 3,
            fill: 'blue',
            draggable: true
          })
          layer.add(anchor1);
          
          const anchor2 = new Konva.Circle({
            x: arrow.points()[2],
            y: arrow.points()[3],
            radius: 3,
            fill: 'blue',
            draggable: true
          })
          layer.add(anchor2);
          
          
          function updateArrow() {
            const points = [
              anchor1.x(),
              anchor1.y(),
              anchor2.x(),
              anchor2.y(),
            ]
            arrow.points(points);
            layer.batchDraw();
          }
          
          anchor1.on('dragmove', updateArrow);
          anchor2.on('dragmove', updateArrow);
          
          layer.draw();
        stage.add(layer);
    });