var Draggable = function(element, opts) {
    var draggable = this;
    
    draggable.events = this.deviceEvents();
    draggable.axis = undefined;
    draggable.callback = {};

    element.draggableInstance = draggable;

    draggable.addListener(element,draggable.events.dragstart);
    draggable.addListener(document,draggable.events.dragend);

    if (opts) {
        if (opts.axis == "x" || opts.axis == "y") {
            draggable.axis = opts.axis;
        }
	if(opts.callback){
	    draggable.callback = opts.callback;
	}
    }
}
Draggable.prototype.addListener = function(target,eventName){
    target.addEventListener(eventName,Draggable.handleEvent,false);
}
Draggable.prototype.after = function(e,name){
    var target = Draggable.dragging || Draggable.eventTarget(e);
    var draggable = target.draggableInstance; 

    if(draggable && draggable.callback[name] instanceof Function){
	    draggable.callback[name].call(target);
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
    draggable.addListener(document,draggable.events.dragging);

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

    if (draggable.axis == 'x' || draggable.axis == undefined) {
	    Draggable.dragging.style.left = inPixels(movePosition.x);
    }

    if (draggable.axis == 'y' || draggable.axis == undefined) {
	    Draggable.dragging.style.top = inPixels(movePosition.y);
    }
}
Draggable.prototype.dragend = function(e) {
    var draggable = this.draggableInstance;
    document.removeEventListener(draggable.events.dragging, Draggable.handleEvent, false);
    Draggable.dragging = undefined; 
}
Draggable.targetPosition = function(e) {
    var extractInt = function(value) {
        var n = parseInt(value);
        return n == null || isNaN(n) ? 0 : n;
    }

    return {
        x: extractInt(e.target.style.left),
        y: extractInt(e.target.style.top),
    }
}
Draggable.eventTarget = function(e) {
    return e.target || e.srcElement;
}
Draggable.handleEvent = function(e){
    if (!e) e = window.event;
    var target = Draggable.eventTarget(e);
    var draggable = target.draggableInstance || Draggable.dragging.draggableInstance;

    for(var eventName in draggable.events){
      if(draggable.events[eventName] == e.type){
	draggable[eventName].call(target,e);
	draggable.after(e,eventName);
      }
    }
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
