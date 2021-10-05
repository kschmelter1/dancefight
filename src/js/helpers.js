
function scrollListener(element, offsetTop, offsetBottom, callback, callbackScrollHandler) {
  var started = false;
  var playing = false;

  window.addEventListener('scroll', throttle(function() {
    var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var elementTop = element.getBoundingClientRect().top + scrollPos;
    var elementBottom = element.getBoundingClientRect().bottom + scrollPos;
    var browserHeight = window.innerHeight;

    if ( ( (!started && browserHeight >= elementTop && scrollPos > browserHeight * .25)
      || (browserHeight >= elementTop - (elementTop * offsetTop) && elementTop + scrollPos < elementBottom ))
      || (scrollPos > elementTop - (elementTop * offsetTop)
        && scrollPos < elementBottom - (elementBottom * offsetBottom)) ) {
      started = true;

      if ( !playing ) {
        playing = true;
        callback(playing);
      }

      if ( callbackScrollHandler ) {
        callbackScrollHandler(scrollPos);
      }
    } else {
      if ( playing ) {
        playing = false;
        callback(playing);
      }
    }
  }, 30));
}

function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

module.exports = {
  scrollListener: scrollListener
}
