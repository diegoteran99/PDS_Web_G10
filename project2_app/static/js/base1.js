var width = window.innerWidth;
var height = window.innerHeight;
var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;
var lineSize = 3;
var triangleRadius = 10;

// import {h} from "new_task.js"

console.log(jsonkonva)

if (!jsonkonva){
  //var stage = Konva.Node.create(jsonkonva, 'container');
  
}
else{
  var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
  });
}



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

function coord(number) {
  return (Math.round(number/30))*30
}
  
var layer = new Konva.Layer();
stage.add(gridLayer);
stage.add(layer);

document
    .getElementById('btnCreateLine')
    .addEventListener('click', function () {
        const line = new Konva.Line({
            points: [30, 30, 150, 30],
            stroke: 'black',
            strokeWidth: 12,
          });
          layer.add(line);
          
          const anchor1 = new Konva.Circle({
            x: coord(line.points()[0]),
            y: coord(line.points()[1]),
            radius: 5,
            draggable: true
          })
          layer.add(anchor1);
          
          const anchor2 = new Konva.Circle({
            x: coord(line.points()[2]),
            y: coord(line.points()[3]),
            radius: 5,
            draggable: true
          })
          layer.add(anchor2);
          
          
          function updateLine() {
            const points = [
              coord(anchor1.x()),
              coord(anchor1.y()),
              coord(anchor2.x()),
              coord(anchor2.y()),
            ]
            line.points(points);
            anchor1.x(line.points()[0])
            anchor1.y(line.points()[1])
            anchor2.x(line.points()[2])
            anchor2.y(line.points()[3])
            layer.batchDraw();
          } 
          
          function anchor1show() {
            anchor1.fill('red')
          }
          function anchor2show() {
            anchor2.fill('red')
          }
          function anchor1clean() {
            anchor1.fill('')
          }
          function anchor2clean() {
            anchor2.fill('')
          }
          anchor1.on('dragmove', updateLine);
          anchor2.on('dragmove', updateLine);
          anchor1.on('dragmove', anchor1show);
          anchor2.on('dragmove', anchor2show);
          anchor1.on('dragend', anchor1clean);
          anchor2.on('dragend', anchor2clean);
          layer.draw();
        stage.add(layer);
        line.on('dblclick', function() {
          line.remove();
          anchor1.remove();
          anchor2.remove();
          layer.draw()
        })
    });


document
    .getElementById('btnCreateArrow')
    .addEventListener('click', function () {

        const arrow = new Konva.Arrow({
            points: [30, 30, 150, 30],
            pointerLength: 10,
            pointerWidth: 10,
            fill: 'red',
            stroke: 'red',
            strokeWidth: 3,
          });
          layer.add(arrow);
          arrow.on('dblclick', function() {
            arrow.remove();
            layer.draw()
          })
          var simpleText = new Konva.Text({
            x: arrow.points()[2]-30,
            y: arrow.points()[3]-30,
            text: '1 kN', //que esto sea un input
            fontSize: 15,
            fontFamily: 'Calibri',
            fill: 'red',
          });
          layer.add(simpleText);
          
          simpleText.on('dblclick dbltap', () => {
            // create textarea over canvas with absolute position
    
            // first we need to find position for textarea
            // how to find it?
    
            // at first lets find position of text node relative to the stage:
            var textPosition = simpleText.getAbsolutePosition();
    
            // then lets find position of stage container on the page:
            var stageBox = stage.container().getBoundingClientRect();
    
            // so position of textarea will be the sum of positions above:
            var areaPosition = {
              x: stageBox.left + textPosition.x,
              y: stageBox.top + textPosition.y,
            };
    
            // create textarea and style it
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
    
            textarea.value = simpleText.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = simpleText.width();
    
            textarea.focus();
    
            textarea.addEventListener('keydown', function (e) {
              // hide on enter
              if (e.keyCode === 13) {
                simpleText.text(textarea.value);
                document.body.removeChild(textarea);
              }
            });
          });
          const anchor1 = new Konva.Circle({
            x: coord(arrow.points()[0]),
            y: coord(arrow.points()[1]),
            radius: 5,
            draggable: true
          })
          layer.add(anchor1);
          
          const anchor2 = new Konva.Circle({
            x: coord(arrow.points()[2]),
            y: coord(arrow.points()[3]),
            radius: 5,
            draggable: true
          })
          layer.add(anchor2);
          
          
          function updateArrowAndText() {
            const points = [
              coord(anchor1.x()),
              coord(anchor1.y()),
              coord(anchor2.x()),
              coord(anchor2.y()),
            ]
            arrow.points(points);
            anchor1.x(arrow.points()[0]);
            anchor1.y(arrow.points()[1]);
            anchor2.x(arrow.points()[2]);
            anchor2.y(arrow.points()[3]);
            simpleText.x(points[2]-30);
            simpleText.y(points[3]-30);
            layer.batchDraw();
          }
          
          function anchor1show() {
            anchor1.fill('blue')
          }
          function anchor2show() {
            anchor2.fill('blue')
          }
          function anchor1clean() {
            anchor1.fill('')
          }
          function anchor2clean() {
            anchor2.fill('')
          }
          anchor1.on('dragmove', updateArrowAndText);
          anchor2.on('dragmove', updateArrowAndText);
          anchor1.on('dragmove', anchor1show);
          anchor2.on('dragmove', anchor2show);
          anchor1.on('dragend', anchor1clean);
          anchor2.on('dragend', anchor2clean);
          layer.draw();
        stage.add(layer);
        arrow.on('dblclick', function() {
          arrow.remove();
          simpleText.remove();
          layer.draw()
        });
    });

    document
    .getElementById('btnCreateCurvedArrow')
    .addEventListener('click', function () {

        const arrow = new Konva.Arrow({
          points: [30*1, 30*1, 30*4, 30*4, 30*7, 30*1 ],
          stroke: 'red',
          pointerLength : 20,
          pointerWidth : 20,
          tension: 1,
          strokeWidth: 3,
          fill: 'red',
          });
          layer.add(arrow);

          var simpleText = new Konva.Text({
            x: arrow.points()[2],
            y: arrow.points()[3],
            text: '1 kN', //que esto sea un input
            fontSize: 15,
            fontFamily: 'Calibri',
            fill: 'red',
          });
          layer.add(simpleText);
          
          simpleText.on('dblclick dbltap', () => {
            // create textarea over canvas with absolute position
    
            // first we need to find position for textarea
            // how to find it?
    
            // at first lets find position of text node relative to the stage:
            var textPosition = simpleText.getAbsolutePosition();
    
            // then lets find position of stage container on the page:
            var stageBox = stage.container().getBoundingClientRect();
    
            // so position of textarea will be the sum of positions above:
            var areaPosition = {
              x: stageBox.left + textPosition.x,
              y: stageBox.top + textPosition.y,
            };
    
            // create textarea and style it
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
    
            textarea.value = simpleText.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = simpleText.width();
    
            textarea.focus();
    
            textarea.addEventListener('keydown', function (e) {
              // hide on enter
              if (e.keyCode === 13) {
                simpleText.text(textarea.value);
                document.body.removeChild(textarea);
              }
            });
          });
          const anchor1 = new Konva.Circle({
            x: coord(arrow.points()[0]),
            y: coord(arrow.points()[1]),
            radius: 5,
            fill: 'blue',
            draggable: true
          })
          layer.add(anchor1);
          
          const anchor2 = new Konva.Circle({
            x: coord(arrow.points()[2]),
            y: coord(arrow.points()[3]),
            radius: 5,
            fill: 'blue',
            draggable: true
          })
          layer.add(anchor2);

          const anchor3 = new Konva.Circle({
            x: coord(arrow.points()[4]),
            y: coord(arrow.points()[5]),
            radius: 5,
            fill: 'blue',
            draggable: true
          })
          layer.add(anchor3);
          
          
          function updateArrowAndText() {
            const points = [
              coord(anchor1.x()),
              coord(anchor1.y()),
              coord(anchor2.x()),
              coord(anchor2.y()),
              coord(anchor3.x()),
              coord(anchor3.y()),
            ]
            arrow.points(points);
            anchor1.x(arrow.points()[0]);
            anchor1.y(arrow.points()[1]);
            anchor2.x(arrow.points()[2]);
            anchor2.y(arrow.points()[3]);
            anchor3.x(arrow.points()[4]);
            anchor3.y(arrow.points()[5]);
            simpleText.x(points[2]);
            simpleText.y(points[3]);
            layer.batchDraw();
          }
          
          function anchor1show() {
            anchor1.fill('blue')
          }
          function anchor2show() {
            anchor2.fill('blue')
          }
          function anchor3show() {
            anchor3.fill('blue')
          }
          function anchor1clean() {
            anchor1.fill('')
          }
          function anchor2clean() {
            anchor2.fill('')
          }
          function anchor3clean() {
            anchor3.fill('')
          }
          anchor1.on('dragmove', updateArrowAndText);
          anchor2.on('dragmove', updateArrowAndText);
          anchor3.on('dragmove', updateArrowAndText);
          anchor1.on('dragmove', anchor1show);
          anchor2.on('dragmove', anchor2show);
          anchor3.on('dragmove', anchor3show);
          anchor1.on('dragend', anchor1clean);
          anchor2.on('dragend', anchor2clean);
          anchor3.on('dragend', anchor3clean);
          layer.draw();
        stage.add(layer);
        arrow.on('dblclick', function() {
          arrow.remove();
          anchor1.remove();
          anchor2.remove();
          anchor3.remove();
          simpleText.remove();
          layer.draw()
        });
    });

    document
    .getElementById('btnCreatePoints')
    .addEventListener('click', function () {
        const circle = new Konva.Circle({
          x: 30,
          y: 30,
          radius: 5,
          fill: 'blue',
          draggable: true,
        })
        layer.add(anchor1);

          var simpleText = new Konva.Text({
            x: circle.x(),
            y: circle.y(),
            y: 25,
            text: 'texto', //que esto sea un input
            fontSize: 15,
            fontFamily: 'Calibri',
            fill: 'green',
            draggable: true
          });
          layer.add(simpleText);
          
          simpleText.on('dblclick dbltap', () => {
            // create textarea over canvas with absolute position
    
            // first we need to find position for textarea
            // how to find it?
    
            // at first lets find position of text node relative to the stage:
            var textPosition = simpleText.getAbsolutePosition();
    
            // then lets find position of stage container on the page:
            var stageBox = stage.container().getBoundingClientRect();
    
            // so position of textarea will be the sum of positions above:
            var areaPosition = {
              x: stageBox.left + textPosition.x,
              y: stageBox.top + textPosition.y,
            };
    
            // create textarea and style it
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
    
            textarea.value = simpleText.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = simpleText.width();
    
            textarea.focus();
    
            textarea.addEventListener('keydown', function (e) {
              // hide on enter
              if (e.keyCode === 13) {
                simpleText.text(textarea.value);
                document.body.removeChild(textarea);
              }
            });
          });
          

        stage.add(layer);
    });
document.getElementById('delete-button').addEventListener('click', () => {
  const tr = layer.find('Transformer').toArray().find(tr => tr.nodes()[0] === currentShape);
  tr.destroy();
  currentShape.destroy();
  layer.draw();
});
    jsonkonva = stage.toJSON();