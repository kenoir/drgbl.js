var Draggable = function() {
    this.dragging = undefined;
}

Draggable.prototype.makeDraggable = function(element, opts) {
    element.draggableInstance = this;

    element.addEventListener('mousedown', this.mouseDown, false);
    document.addEventListener('mouseup', this.mouseUp, false);

    if (opts) {
        if (opts.axis == "x" || opts.axis == "y") {
            this.axis = opts.axis;
        }
    }
}
Draggable.prototype.mouseDown = function(e) {
    var draggable = e.target.draggableInstance;

    e.target.style.position = 'relative';
    document.addEventListener('mousemove', draggable.mouseMove, false);

    var startingPosition = Draggable.mousePosition(e);
    var currentTargetPosition = Draggable.targetPosition(e);

    draggable.offset = {
        x: currentTargetPosition.x - startingPosition.x,
        y: currentTargetPosition.y - startingPosition.y,
    }
    draggable.dragging = e.target;
}
Draggable.prototype.mouseMove = function(e) {
    var draggable = e.target.draggableInstance;

    if (draggable) {
        var currentMousePosition = Draggable.mousePosition(e);
        var movePosition = {
            x: currentMousePosition.x + draggable.offset.x,
            y: currentMousePosition.y + draggable.offset.y
        }

        if (draggable.axis == 'x' || draggable.axis == undefined) {
            draggable.dragging.style.left = movePosition.x + 'px';
        }

        if (draggable.axis == 'y' || draggable.axis == undefined) {
            draggable.dragging.style.top = movePosition.y + 'px';
        }
    }
}
Draggable.prototype.mouseUp = function(e) {
    var draggable = e.target.draggableInstance;

    document.removeEventListener('mousemove', draggable.mouseMove, false);
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