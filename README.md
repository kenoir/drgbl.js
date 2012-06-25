drgbl.js
============

Simple Drag &amp; Drop in the browser without a framework

## Example
	var opts = {
          axis: 'x',
	  callback: {
	    dragstart: function(){this.style.backgroundColor='red';},
	    dragging: function(){this.style.backgroundColor='blue';},
	    dragend: function(){this.style.backgroundColor='green';}
	  }
	};


	var draggableDiv = document.getElementById("someDiv");
	new Draggable(draggableDiv);

[http://drgbl.herokuapp.com/](http://drgbl.herokuapp.com/)

This is a work in progress, try [this completely different but similarly named project](https://github.com/gtramontina/draggable.js) if you want something that works right now.

[![Build Status](https://secure.travis-ci.org/kenoir/drgbl.js.png?branch=master)](http://travis-ci.org/kenoir/drgbl.js)
