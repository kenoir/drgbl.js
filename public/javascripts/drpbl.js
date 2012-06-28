;(function(exports) {

	function Droppable(element) {
 		element.drpbl = true;
	}


	if(typeof define === 'function' && define.amd) {
		define(function() {
			return Droppable;
		});
	}

	exports.Droppable = Droppable;

}(this));
