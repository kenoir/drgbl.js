;(function(exports) {

	function Draggable(element, opts) {
		var draggable = this;

		draggable.events = this.deviceEvents();
		draggable.axis = undefined;
		draggable.callback = {};
		draggable.bound = function(m){return true;};
		draggable.options(opts);

		element.draggableInstance = draggable;

		Draggable.addListener(element,draggable.events.dragstart);
	}

	Draggable.prototype.options = function(opts){
		var draggable = this;
		if (opts) {
			if (opts.axis == "x" || opts.axis == "y") {
				draggable.axis = opts.axis;
			}
			if(opts.callback){
				draggable.callback = opts.callback;
			}
			if(opts.bound instanceof Function){
				draggable.bound = opts.bound;
			}
		}
	}
	Draggable.prototype.after = function(e,name){
		var target = Draggable.dragging || Draggable.draggableTarget(e);
		var draggable = target.draggableInstance; 

		if(draggable && draggable.callback[name] instanceof Function){
			draggable.callback[name].call(target,e);
		}
	}
	Draggable.prototype.deviceEvents = function(){
		var isTouchDevice = !!('ontouchstart' in window) ? 1 : 0;

		var touchEvents = { 
			dragstart:'touchstart',
			dragging:'touchmove',
			dragend:'touchend'
		}
		var mouseEvents = {
			dragstart:'mousedown',
			dragging:'mousemove',
			dragend:'mouseup'
		}

		return ( isTouchDevice ? touchEvents : mouseEvents );
	}
	Draggable.prototype.dragstart = function(e) {
		var draggable = this.draggableInstance;

		this.style.position = 'relative';
		Draggable.addListener(document,draggable.events.dragging);
		Draggable.addListener(document,draggable.events.dragend);

		var startingPosition = Draggable.dragPosition(e);
		var currentTargetPosition = Draggable.targetPosition(e);

		draggable.offset = {
			x: currentTargetPosition.x - startingPosition.x,
			y: currentTargetPosition.y - startingPosition.y,
		}

		Draggable.dragging = this; 
	}
	Draggable.prototype.dragging = function(e) {
		var draggable = Draggable.dragging.draggableInstance;
		var inPixels = function(n){
			return n + "px";
		}

		var currentMousePosition = Draggable.dragPosition(e);
		var movePosition = {
			x: currentMousePosition.x + draggable.offset.x,
			y: currentMousePosition.y + draggable.offset.y
		}

		if(draggable.bound(movePosition)){

			if (draggable.axis == 'x' || draggable.axis == undefined) {
				Draggable.dragging.style.left = inPixels(movePosition.x);
			}
			if (draggable.axis == 'y' || draggable.axis == undefined) {
				Draggable.dragging.style.top = inPixels(movePosition.y);
			}

		}
	}
	Draggable.prototype.dragend = function(e) {
		var draggable = this.draggableInstance;
		Draggable.removeListener(document, draggable.events.dragging);
		Draggable.removeListener(document, draggable.events.dragend);
		Draggable.dragging = undefined; 
	}

	Draggable.targetPosition = function(e) {
		var extractInt = function(value) {
			var n = parseInt(value);
			return n == null || isNaN(n) ? 0 : n;
		}
		var target = Draggable.draggableTarget(e);

		return {
			x: extractInt(target.style.left),
			y: extractInt(target.style.top),
		}
	}
	Draggable.target = function(e){
		return e.target || e.srcElement; 
        }
	Draggable.draggableTarget = function(e) {
		var target = Draggable.target(e); 
		var localTarget = target;

		while(localTarget.parentNode && 
		      localTarget.draggableInstance == undefined){

		  Draggable.disableNativeDragging(localTarget);
	          localTarget = localTarget.parentNode	      
		}
		if(localTarget.draggableInstance) target = localTarget;

		return target; 
	}
	Draggable.disableNativeDragging = function(target){
		target.draggable = false;
		target.onmousedown = function(event) {
			event.preventDefault();
			return false;
		};
	}
	Draggable.handleEvent = function(e){
		if (!e) e = window.event;
		var target = Draggable.draggableTarget(e);
		var draggable = target.draggableInstance || Draggable.dragging.draggableInstance;

		for(var eventName in draggable.events){
			if(draggable.events[eventName] == e.type){
				draggable[eventName].call(target,e);
				draggable.after(e,eventName);
			}
		}

		return true;
	}
	Draggable.dragPosition = function(e) {
		var posx = 0;
		var posy = 0;
		if (!e) var e = window.event;
		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) {
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return {
			x: posx,
			y: posy
			};
	}
	Draggable.addListener = function(target,eventName){
		if(target.addEventListener){
			target.addEventListener(eventName,Draggable.handleEvent,false);
		} else if(target.attachEvent){
			target.attachEvent('on' + eventName,Draggable.handleEvent);
		} 
	}
	Draggable.removeListener = function(target,eventName){
		if(target.removeEventListener){ 
			target.removeEventListener(eventName, Draggable.handleEvent, false);
		} else if(target.detachEvent){
			target.detachEvent('on' + eventName,Draggable.handleEvent);
		}
	}

	if(typeof define === 'function' && define.amd) {
		define(function() {
			return Draggable;
		});
	}

	exports.Draggable = Draggable;

}(this));
