var width = window.innerWidth;
var height = window.innerHeight;
var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;
var lineSize = 3;
var triangleRadius = 10;

console.log(jsonkonva)

if (jsonkonva){
  var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
  });  
}
else{
  var stage = Konva.Node.create(jsonkonva, 'container');
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
            stroke: 'grey',
            strokeWidth: 12,
          });
          
          const anchor1 = new Konva.Circle({
            x: coord(line.points()[0]),
            y: coord(line.points()[1]),
            radius: 8,
            draggable: true
          })
          
          const anchor2 = new Konva.Circle({
            x: coord(line.points()[2]),
            y: coord(line.points()[3]),
            radius: 8,
            draggable: true
          })

          layer.add(line, anchor1, anchor2);
          
          
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
            pointerLength: 12,
            pointerWidth: 12,
            fill: 'red',
            stroke: 'red',
            strokeWidth: 4,
          });

          const anchor1 = new Konva.Circle({
            x: coord(arrow.points()[0]),
            y: coord(arrow.points()[1]),
            radius: 7,
            draggable: true
          })
          
          const anchor2 = new Konva.Circle({
            x: coord(arrow.points()[2]),
            y: coord(arrow.points()[3]),
            radius: 7,
            draggable: true
          })
          
          var simpleText = new Konva.Text({
            x: arrow.points()[2]-30,
            y: arrow.points()[3]-30,
            text: '1 kN', 
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'red',
          });
          layer.add(arrow, anchor1, anchor2, simpleText);
          

          simpleText.on('dblclick dbltap', () => {
            
            var textPosition = simpleText.getAbsolutePosition();
    
            var stageBox = stage.container().getBoundingClientRect();
    
            var areaPosition = {
              x: stageBox.left + textPosition.x,
              y: stageBox.top + textPosition.y,
            };
    
            
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
    
            textarea.value = simpleText.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = simpleText.width();
    
            textarea.focus();
    
            textarea.addEventListener('keydown', function (e) {
              
              if (e.keyCode === 13) {
                simpleText.text(textarea.value);
                document.body.removeChild(textarea);
              }
            });
          });
          
          
          
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
          strokeWidth: 6,
          fill: 'red',
          });
          layer.add(arrow);

          var simpleText = new Konva.Text({
            x: arrow.points()[2],
            y: arrow.points()[3]-30,
            text: '1 kN', 
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'red',
          });
          layer.add(simpleText);
          
          simpleText.on('dblclick dbltap', () => {
            
            var textPosition = simpleText.getAbsolutePosition();
    
            
            var stageBox = stage.container().getBoundingClientRect();
    
            
            var areaPosition = {
              x: stageBox.left + textPosition.x,
              y: stageBox.top + textPosition.y,
            };
    
            
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
    
            textarea.value = simpleText.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = simpleText.width();
    
            textarea.focus();
    
            textarea.addEventListener('keydown', function (e) {
              
              if (e.keyCode === 13) {
                simpleText.text(textarea.value);
                document.body.removeChild(textarea);
              }
            });
          });
          const anchor1 = new Konva.Circle({
            x: coord(arrow.points()[0]),
            y: coord(arrow.points()[1]),
            radius: 7,
            fill: 'blue',
            draggable: true
          })
          layer.add(anchor1);
          
          const anchor2 = new Konva.Circle({
            x: coord(arrow.points()[2]),
            y: coord(arrow.points()[3]),
            radius: 7,
            fill: 'blue',
            draggable: true
          })
          layer.add(anchor2);

          const anchor3 = new Konva.Circle({
            x: coord(arrow.points()[4]),
            y: coord(arrow.points()[5]),
            radius: 7,
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
            simpleText.y(points[3]-30);
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
          radius: 10,
          fill: 'blue',
          draggable: true,
        })

        const anchor1 = new Konva.Circle({
          x: coord(circle.x()),
          y: coord(circle.y()),
          radius: 15,
          draggable: true
        })

          var simpleText = new Konva.Text({
            x: circle.x()-8,
            y: circle.y()-30,
            text: 'A', 
            fontSize: 25,
            fontFamily: 'Calibri',
            fill: 'black'
          });
        layer.add(circle, anchor1, simpleText);
          
          simpleText.on('dblclick dbltap', () => {
            
            var textPosition = simpleText.getAbsolutePosition();
    
            var stageBox = stage.container().getBoundingClientRect();
    
            var areaPosition = {
              x: stageBox.left + textPosition.x,
              y: stageBox.top + textPosition.y,
            };
    
            
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
    
            textarea.value = simpleText.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = simpleText.width();
    
            textarea.focus();
    
            textarea.addEventListener('keydown', function (e) {
              
              if (e.keyCode === 13) {
                simpleText.text(textarea.value);
                document.body.removeChild(textarea);
              }
            });
          });
          
        function updateCircleAndText() {
            circle.x(coord(anchor1.x()))
            circle.y(coord(anchor1.y()))
            simpleText.x(circle.x()-8);
            simpleText.y(circle.y()-30);
            anchor1.x(circle.x());
            anchor1.y(circle.y());
            layer.batchDraw();
        }
        anchor1.on('dblclick', function() {
          circle.remove();
          simpleText.remove();
          layer.draw()
        });

        anchor1.on('dragmove', updateCircleAndText);

        stage.add(layer);

    });
    document
    .getElementById('btnCreateArrow2')
    .addEventListener('click', function () {

        const arrow = new Konva.Arrow({
            points: [30, 30, 150, 30],
            pointerLength: 12,
            pointerWidth: 12,
            fill: 'green',
            stroke: 'green',
            strokeWidth: 4,
          });
         
          const anchor1 = new Konva.Circle({
            x: coord(arrow.points()[0]),
            y: coord(arrow.points()[1]),
            radius: 7,
            draggable: true
          })
          
          const anchor2 = new Konva.Circle({
            x: coord(arrow.points()[2]),
            y: coord(arrow.points()[3]),
            radius: 7,
            draggable: true
          })

          var simpleText = new Konva.Text({
            x: arrow.points()[2]-30,
            y: arrow.points()[3]-30,
            text: '1 kN', 
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'green',
          });
          layer.add(arrow, anchor1, anchor2, simpleText);
          
          simpleText.on('dblclick dbltap', () => {
            
            var textPosition = simpleText.getAbsolutePosition();
    
            var stageBox = stage.container().getBoundingClientRect();
    
            var areaPosition = {
              x: stageBox.left + textPosition.x,
              y: stageBox.top + textPosition.y,
            };
    
            
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
    
            textarea.value = simpleText.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = simpleText.width();
    
            textarea.focus();
    
            textarea.addEventListener('keydown', function (e) {
              
              if (e.keyCode === 13) {
                simpleText.text(textarea.value);
                document.body.removeChild(textarea);
              }
            });
          });
          
          
          
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
    .getElementById('btnCreatePinnedSupport')
    .addEventListener('click', function () {

        const triangle = new Konva.RegularPolygon({
            x: 90,
            y: 83,
            sides: 3,
            fill: 'CornflowerBlue',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20
          });
          
          const anchor1 = new Konva.RegularPolygon({
            x: 90,
            y: 83,
            sides: 3,
            fill: 'CornflowerBlue',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20
          });
          layer.add(triangle, anchor1);  

          function updatePinnedSupport() {
            triangle.x(coord(anchor1.x()))
            triangle.y(coord(anchor1.y())-7)
            anchor1.x(triangle.x());
            anchor1.y(triangle.y());          
            layer.batchDraw();
          }
      
          anchor1.on('dblclick', function() {
            triangle.remove();
            anchor1.remove();
            layer.draw()
          });
          
        stage.add(layer);
        
        anchor1.on('dragmove', updatePinnedSupport);
    });

    document
    .getElementById('btnCreatePinnedSupport90')
    .addEventListener('click', function () {

        const triangle = new Konva.RegularPolygon({
            x: 66,
            y: 90,
            sides: 3,
            fill: 'CornflowerBlue',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20,
            rotation: 90,
          });
          
          const anchor1 = new Konva.RegularPolygon({
            x: 66,
            y: 90,
            sides: 3,
            fill: 'CornflowerBlue',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20,
            rotation: 90,
          });
          layer.add(triangle, anchor1);  

          function updatePinnedSupport() {
            triangle.x(coord(anchor1.x())-24)
            triangle.y(coord(anchor1.y()))
            anchor1.x(triangle.x());
            anchor1.y(triangle.y());          
            layer.batchDraw();
          }
      
          anchor1.on('dblclick', function() {
            triangle.remove();
            anchor1.remove();
            layer.draw()
          });
          
        stage.add(layer);
        
        anchor1.on('dragmove', updatePinnedSupport);
    });

    document
    .getElementById('btnCreatePinnedSupport-90')
    .addEventListener('click', function () {

        const triangle = new Konva.RegularPolygon({
            x: 115,
            y: 90,
            sides: 3,
            fill: 'CornflowerBlue',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20,
            rotation: 30,
          });
          
          const anchor1 = new Konva.RegularPolygon({
            x: 115,
            y: 90,
            sides: 3,
            fill: 'CornflowerBlue',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20,
            rotation: 30,
          });
          layer.add(triangle, anchor1);  

          function updatePinnedSupport() {
            triangle.x(coord(anchor1.x())+25)
            triangle.y(coord(anchor1.y()))
            anchor1.x(triangle.x());
            anchor1.y(triangle.y());          
            layer.batchDraw();
          }
      
          anchor1.on('dblclick', function() {
            triangle.remove();
            anchor1.remove();
            layer.draw()
          });
          
        stage.add(layer);
        
        anchor1.on('dragmove', updatePinnedSupport);
    });


    document
    .getElementById('btnCreateRollingSupport')
    .addEventListener('click', function () {

        const triangle = new Konva.RegularPolygon({
            x: 90,
            y: 83,
            sides: 3,
            fill: 'coral',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20
          });
          
          const anchor1 = new Konva.RegularPolygon({
            x: 90,
            y: 83,
            sides: 3,
            fill: 'coral',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20
          });

          const anchor2 = new Konva.Circle({
            x: triangle.x() - 15,
            y: triangle.y() + 19,
            radius: 8,
            fill: 'transparent',
            stroke: 'black',
          })

          const anchor3 = new Konva.Circle({
            x: triangle.x() + 15,
            y: triangle.y() + 19,
            radius: 8,
            fill: 'transparent',
            stroke: 'black',
          })

          const line = new Konva.Line({
            points: [anchor2.x()-10, anchor2.y() + 10, anchor3.x() + 10, anchor3.y()+10],
            stroke: 'black',
            strokeWidth: 3,
          });
          layer.add(triangle, anchor1, anchor2, anchor3, line);

          function updateRollingSupport() {
            triangle.x(coord(anchor1.x()))
            triangle.y(coord(anchor1.y())-7)
            anchor1.x(triangle.x());
            anchor1.y(triangle.y());
            anchor2.x(anchor1.x() - 15);
            anchor2.y(anchor1.y() + 19);
            anchor3.x(anchor1.x() + 15);
            anchor3.y(anchor1.y() + 19);
            const points = [anchor2.x()-10, anchor2.y() + 10, anchor3.x() + 10, anchor3.y()+10]
            line.points(points);            
            layer.batchDraw();
          }
      
          anchor1.on('dblclick', function() {
            triangle.remove();
            anchor1.remove();
            anchor2.remove();
            anchor3.remove();
            line.remove();
            layer.draw()
          });
          
        stage.add(layer);
        
        anchor1.on('dragmove', updateRollingSupport);
    });

    document
    .getElementById('btnCreateRollingSupport90')
    .addEventListener('click', function () {

        const triangle = new Konva.RegularPolygon({
            x: 96,
            y: 90,
            sides: 3,
            fill: 'coral',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20,
            rotation: 90,
          });
          
          const anchor1 = new Konva.RegularPolygon({
            x: 96,
            y: 90,
            sides: 3,
            fill: 'coral',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20,
            rotation: 90,
          });

          const anchor2 = new Konva.Circle({
            x: triangle.x() - 21,
            y: triangle.y() - 15,
            radius: 8,
            fill: 'transparent',
            stroke: 'black',
          })

          const anchor3 = new Konva.Circle({
            x: triangle.x() - 21,
            y: triangle.y() + 15,
            radius: 8,
            fill: 'transparent',
            stroke: 'black',
          })

          const line = new Konva.Line({
            points: [anchor2.x()-10, anchor2.y()-10 , anchor3.x() - 10, anchor3.y()+10],
            stroke: 'black',
            strokeWidth: 3,
          });
          layer.add(triangle, anchor1, anchor2, anchor3, line);

          function updateRollingSupport() {
            triangle.x(coord(anchor1.x())+6)
            triangle.y(coord(anchor1.y()))
            anchor1.x(triangle.x());
            anchor1.y(triangle.y());
            anchor2.x(anchor1.x() - 21);
            anchor2.y(anchor1.y() - 15);
            anchor3.x(anchor1.x() - 21);
            anchor3.y(anchor1.y() + 15);
            const points = [anchor2.x()-10, anchor2.y()-10 , anchor3.x() - 10, anchor3.y()+10]
            line.points(points);            
            layer.batchDraw();
          }
      
          anchor1.on('dblclick', function() {
            triangle.remove();
            anchor1.remove();
            anchor2.remove();
            anchor3.remove();
            line.remove();
            layer.draw()
          });
          
        stage.add(layer);
        
        anchor1.on('dragmove', updateRollingSupport);
    });

    document
    .getElementById('btnCreateRollingSupport-90')
    .addEventListener('click', function () {

        const triangle = new Konva.RegularPolygon({
            x: 115,
            y: 90,
            sides: 3,
            fill: 'coral',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20,
            rotation: 30,
          });
          
          const anchor1 = new Konva.RegularPolygon({
            x: 115,
            y: 90,
            sides: 3,
            fill: 'coral',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            radius: 20,
            rotation: 30,
          });

          const anchor2 = new Konva.Circle({
            x: triangle.x() + 21,
            y: triangle.y() - 15,
            radius: 8,
            fill: 'transparent',
            stroke: 'black',
          })

          const anchor3 = new Konva.Circle({
            x: triangle.x() + 21,
            y: triangle.y() + 15,
            radius: 8,
            fill: 'transparent',
            stroke: 'black',
          })

          const line = new Konva.Line({
            points: [anchor2.x()+10, anchor2.y()-10 , anchor3.x()+10, anchor3.y()+10],
            stroke: 'black',
            strokeWidth: 3,
          });
          layer.add(triangle, anchor1, anchor2, anchor3, line);

          function updateRollingSupport() {
            triangle.x(coord(anchor1.x())+25)
            triangle.y(coord(anchor1.y()))
            anchor1.x(triangle.x());
            anchor1.y(triangle.y());
            anchor2.x(anchor1.x() + 21);
            anchor2.y(anchor1.y() - 15);
            anchor3.x(anchor1.x() + 21);
            anchor3.y(anchor1.y() + 15);
            const points = [anchor2.x()+10, anchor2.y()-10 , anchor3.x()+10, anchor3.y()+10]
            line.points(points);            
            layer.batchDraw();
          }
      
          anchor1.on('dblclick', function() {
            triangle.remove();
            anchor1.remove();
            anchor2.remove();
            anchor3.remove();
            line.remove();
            layer.draw()
          });
          
        stage.add(layer);
        
        anchor1.on('dragmove', updateRollingSupport);
    });

    jsonkonva = stage.toJSON();
