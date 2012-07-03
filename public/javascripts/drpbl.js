(function ( exports ) {

	function Droppable ( element, callback ) {
		if ( Draggable && Compatible ){
			element.drpbl = true;
			self = this;

			//TODO: drpbl should fire custom events so we
			// don't have to rely on mouseup
			Compatible.addListener(
			  document,
				'mouseup',
				function() { 
				  self.dropped.call(element);
				});
		} 
	}

	Droppable.prototype.dropped = function(e){
		for ( var i = 0; i < Draggable.elements.length; i++ ){
			var intersect = Droppable.intersect(this,Draggable.elements[i]);
			if(intersect){
				console.log("INTERSECT",Draggable.elements[i]);
			}
		}	
 	}

	Droppable.intersect = function(firstElement,secondElement){

		var inRange = function(n,start,end){
			if(start <= n && end >= n){
				return true;
			}
			return false;
		}

		var edgeIntersect = function(firstEdge,secondEdge){
			if( inRange(firstEdge.e0,secondEdge.e0,secondEdge.e1 ||
					inRange(firstEdge.e1,secondEdge.e0,secondEdge,e1))){

						return true;
			}
			return false;
		}

		var topEdge = function(p,w){
			return {
				e0: p.x,
				e1: p.x + w
			}
		}

		var sideEdge = function(p,h){
			return {
				e0: p.y,
				e1: p.y + h
			}
		}
	
		var p1 = Compatible.positionFromOffset(firstElement);
		var p2 = Compatible.positionFromOffset(secondElement);
		var w1 = firstElement.offsetWidth;
		var w2 = secondElement.offsetWidth;
		var h1 = firstElement.offsetHeight;
		var h2 = secondElement.offsetHeight;

		if(edgeIntersect(
				topEdge(p1,w1),
				topEdge(p2,w2)) ||
			 edgeIntersect(
				sideEdge(p1,h2),
				sideEdge(p2,h2))){

				return true;
		}

		return false;

	}

	if ( typeof define === 'function' && 
		define.amd ) {

		define ( function () {
			return Droppable;
		});

	}

	exports.Droppable = Droppable;

}(this));
