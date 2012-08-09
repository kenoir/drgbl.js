drgbl.js
============

Simple Drag &amp; Drop in the browser without a framework

## Example

      var draggableDiv1 = document.getElementById("dragBox1");
      var draggableDiv2 = document.getElementById("dragBox2");
      var draggableDiv3 = document.getElementById("dragBox3");

      var droppableDiv1 = document.getElementById("dropBox1");

      var opts1 = {
        axis:'x'
      };

      var opts2 = {
        callback: {
          dragstart: function(){this.style.backgroundColor='red';},
          dragging: function(){this.style.backgroundColor='blue';},
          dragend: function(){this.style.backgroundColor='green';}
        }
      };

      var opts3 = {
        bound: function(m){
          if(m.x < 200 &&
             m.x > 0 &&
             m.y < 200 &&
             m.y > 0 ){return true;}
          return false;
        }
      };

      new Draggable(draggableDiv1,opts1);
      new Draggable(draggableDiv2,opts2);
      new Draggable(draggableDiv3,opts3);

      var events1 = {
        dropped: function(){
          droppableDiv1.style.backgroundColor='purple';
          this.style.backgroundColor='yellow';
        }
      }

      new Droppable(droppableDiv1,events1);

