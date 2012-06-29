(function ( exports ) {

	function Droppable ( element, callback ) {
		if ( Draggable ){
			element.drpbl = true;
			self = this;

			//TODO: drpbl should fire custom events so we
			// don't have to rely on mouseup
			Draggable.addListener(
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
		console.log('t-l',this.offsetLeft);
		console.log('t-t',this.offsetTop);

		for ( var i = 0; i < Draggable.elements.length; i++ ){
			console.log('w'+i,Draggable.elements[i].offsetWidth);
			console.log('h'+i,Draggable.elements[i].offsetHeight);
			console.log('l'+i,Draggable.elements[i].offsetLeft);
			console.log('t'+i,Draggable.elements[i].offsetTop);
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
