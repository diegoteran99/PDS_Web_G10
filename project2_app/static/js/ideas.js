
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

////////////////////////////// BASE.JS BASE ////////////////////////////////////////////
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

// shadowRectangle.hide();
// layer.add(shadowRectangle);
// newRectangle(blockSnapSize * 3, blockSnapSize * 3, layer, stage);
// newRectangle(blockSnapSize * 10, blockSnapSize * 3, layer, stage);



///////////////////////////////////// ROTATE LINE AND RESHAPE IT //////////////////77
const line = new Konva.Line({
    points: [50, 50, 250, 50],
    stroke: 'green'
  });
  layer.add(line);
  
  const anchor1 = new Konva.Circle({
    x: line.points()[0],
    y: line.points()[1],
    radius: 10,
    fill: 'red',
    draggable: true
  })
  layer.add(anchor1);

  const anchor2 = new Konva.Circle({
    x: line.points()[2],
    y: line.points()[3],
    radius: 10,
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
  