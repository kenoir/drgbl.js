var Draggable = function(element, opts) {
    var draggable = this;
    
    draggable.events = this.deviceEvents();
    element.draggableInstance = draggable;

    element.addEventListener(draggable.events.dragstart, draggable.dragStart, false);
    document.addEventListener(draggable.events.dragend, draggable.dragEnd, false);

    if (opts) {
        if (opts.axis == "x" || opts.axis == "y") {
            draggable.axis = opts.axis;
        }
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
Draggable.prototype.dragStart = function(e) {
    var draggable = e.target.draggableInstance;

    e.target.style.position = 'relative';
    document.addEventListener('mousemove', draggable.mouseMove, false);

    var startingPosition = Draggable.mousePosition(e);
    var currentTargetPosition = Draggable.targetPosition(e);

    draggable.offset = {
        x: currentTargetPosition.x - startingPosition.x,
        y: currentTargetPosition.y - startingPosition.y,
    }

    Draggable.dragging = e.target; 
}
Draggable.prototype.mouseMove = function(e) {
    var draggable = Draggable.dragging.draggableInstance; 
    var inPixels = function(n){
	return n + "px";
    }

    var currentMousePosition = Draggable.mousePosition(e);
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
Draggable.prototype.dragEnd = function(e) {
    var draggable = e.target.draggableInstance;

    document.removeEventListener('mousemove', draggable.mouseMove, false);
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
Draggable.mousePosition = function(e) {
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
