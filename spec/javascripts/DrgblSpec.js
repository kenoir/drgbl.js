describe("drgbl", function() {

  var loadScript = function(scriptLocation,callback){
    var documentHead = document.getElementsByTagName('head')[0];
    var newScript = document.createElement('script');

    newScript.setAttribute('src',scriptLocation);
    newScript.addEventListener('load',callback);

    documentHead.appendChild(newScript);
  }

  beforeEach(function() {
    //drgbl = new Draggable();
  });

  it("should add an instance of the draggable object to the DOM element", function() {
    expect(true).toEqual(false);
  });

  describe("Draggable.deviceEvents",function(){

    it("if the ontouchstart property is not available on the window deviveEvents returns mouse events",function(){
      window.ontouchstart = undefined; 

      var actualEvents = Draggable.deviceEvents;
      var expectedEvents = { 
	dragstart:'mousedown',
	dragging:'mousemove',
	dragend:'mouseup'
      }
 
      var assertion = function(){
	      expect(actualEvents).toEqual(expectedEvents);
      }

      loadScript('/public/javascripts/drgbl.js',assertion);
    });


    it("if the ontouchstart property is available on the window deviceEvents returns touch events",function(){
      window.ontouchstart = function(){};

      var actualEvents = Draggable.deviceEvents;
      var expectedEvents = { 
	dragstart:'touchstart',
	dragging:'touchmove',
	dragend:'touchend'
      }
 
      var assertion = function(){
	      expect(actualEvents).toEqual(expectedEvents);
      }

      loadScript('/public/javascripts/drgbl.js',assertion);
    });
  });


});
