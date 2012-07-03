(function (exports) {

	function Compatible(){

	}

  Compatible.preventDefault = function (e) {
    if (e && e.preventDefault instanceof Function) {
      e.preventDefault();
    }
    e.returnValue = false;
  }

  Compatible.eventPosition = function (e) {
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;

    if (e.changedTouches && e.changedTouches[0]) {
      posx = e.changedTouches[0].pageX;
      posy = e.changedTouches[0].pageY;
    } else if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    };
  }

  Compatible.positionFromStyle = function (target) {
   var extractInt = function (value) {
      var n = parseInt(value);
      return n == null || isNaN(n) ? 0 : n;
    }
    return {
      x: extractInt(target.style.left),
      y: extractInt(target.style.top)
    }
  }

  Compatible.addListener = function (target, eventName, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventName, callback, false);
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventName, callback);
    }
  }

  Compatible.removeListener = function (target, eventName, callback) {
    if (target.removeEventListener) {
      target.removeEventListener(eventName, callback, false);
    } else if (target.detachEvent) {
      target.detachEvent('on' + eventName, callback);
    }
  }


  Compatible.positionFromOffset = function (target){
    var currentLeft = currentTop = 0;

    if (target.offsetParent) {
      while (target.offsetParent) {
        currentLeft += target.offsetLeft;
       	currentTop = target.offsetTop;
	      target = target.offsetParent;
      }

      return { x: currentLeft, y: currentTop }
    }

  }

  Compatible.target = function (e) {
    return e.target || e.srcElement;
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return Compatible;
    });
  }

  exports.Compatible = Compatible;

}(this));
