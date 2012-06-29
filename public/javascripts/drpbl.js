(function ( exports ) {

	function Droppable ( element, callback ) {
	  if ( Draggable ){
      console.log ( element.offsetHeight );
			console.log ( element.offsetWidth );
 		  element.drpbl = true;
			for ( var i = 0; i < Draggable.elements.length; i++ ){
        console.log(Draggable.elements[i].draggableInstance);
				console.log(Draggable.elements[i].offsetWidth);
				console.log(Draggable.elements[i].offsetHeight);
			}
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
