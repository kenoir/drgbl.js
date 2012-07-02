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

		console.log('t-w',this.offsetWidth);
		console.log('t-h',this.offsetHeight);

		console.log(Compatible.positionFromOffset(this));

		for ( var i = 0; i < Draggable.elements.length; i++ ){
			console.log('w'+i,Draggable.elements[i].offsetWidth);
			console.log('h'+i,Draggable.elements[i].offsetHeight);

			console.log(Compatible.positionFromOffset(Draggable.elements[i]));
		}	
 	}

	Droppable.intersect = function(firstElement,secondElement){
		var inRange = function(n,start,end){
			if(start <= n && end >= n){
				return true;
			}
			return false;
		}



	}

	if ( typeof define === 'function' && 
		define.amd ) {

		define ( function () {
			return Droppable;
		});

	}

	exports.Droppable = Droppable;

}(this));
