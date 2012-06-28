(function ( exports ) {

	function Droppable ( element, opts ) {
	  if(Droppable){						 	
 		  element.drpbl = true;
		} 
	}

	Droppable.addElement = function (element){
    Droppable.elements.push(elements);
	}

	if ( typeof define === 'function' && 
			 define.amd ) {

		define ( function () {
			return Droppable;
		});

	}

	exports.Droppable = Droppable;

}(this));
