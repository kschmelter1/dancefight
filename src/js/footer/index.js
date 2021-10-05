var background = require('./background');
var timelines, timelinesTypes, loopTime;
var main = function() {
  background();

  // Check browser function, does not run code if Microsoft Browser
      function ieVersion(uaString) {
        uaString = uaString || navigator.userAgent;
        var match = /\b(MSIE |Trident.*?rv:|Edge\/)(\d+)/.exec(uaString);
        if (match) {console.log('Microsoft Browser Detected');}
        if (match) return parseInt(match[2])
      }
  //

  document.addEventListener("DOMContentLoaded", function() {
    var footerSection = document.querySelector('.main-footer');
    if (ieVersion()) return false;
    if ( !footerSection) return false;
        // this function runs when the DOM is ready, i.e. when the document has been parsed
        var elements = require('./elements.js')(footerSection);
        var elementsTimeline = require('./elements-timeline');
        var elementsHolders = require('./elements-holders')(footerSection);
        var elementsHoldersTimeline = require('./elements-holders-timeline');
        timelines = [elementsTimeline, elementsHoldersTimeline];
        timelinesTypes = [elements, elementsHolders];
        loopTime = 0;
      animate();
    });
};

function animate() {
  for (var i=0; i<timelines.length; i++) {
    var nextAnimations = getNextAnimations(timelines[i]);
    var nextAnimationsTarget = timelinesTypes[i];
    applyNextAnimations(nextAnimations, nextAnimationsTarget);
  }

  if ( loopTime > 200 ) loopTime = 0;
  loopTime++;
  requestAnimationFrame(animate);
}

function getNextAnimations(timeline) {
  var loopTimeKey = loopTime.toString();
  var timelineEntries = Object.keys(timeline);
  var nextAnimations = [];

  if ( timelineEntries.indexOf(loopTimeKey) !== -1 ) {
    nextAnimations = timeline[loopTimeKey];
  }

  return nextAnimations;
}

function applyNextAnimations(nextAnimations, nextAnimationsTarget) {
  for (var i=0; i<nextAnimations.length; i++) {
    applyAnimations(nextAnimations[i], nextAnimationsTarget);
  }
}

function applyAnimations(animations, animationsTarget) {
  var elements = animations ? Object.keys(animations) : false;

  if ( !elements && !elements.length ) return false;

  for (var i=0; i<elements.length; i++) {
    var currentAnimations = animations[elements[i]];
    var currentAnimationsTargets = animationsTarget[elements[i]];

    for (var k=0; k<currentAnimationsTargets.length; k++) {
      var currentAnimationsTarget = currentAnimationsTargets[k];

      for (var j=0; j<currentAnimations.length; j++) {
        manageRunningAnimations(elements[i], currentAnimations[j], currentAnimationsTarget);
        currentAnimationsTarget.classList.add(currentAnimations[j]);
      }
    }
  }
}

function getAnimationType(animationClass) {
  /* animation type is first word in animation class, ie type of 'fadeIn' === 'fade' */
  return animationClass && animationClass.split(/(?=[A-Z])/).map(s => s.toLowerCase())[0];
}

function manageRunningAnimations(elementType, currentAnimation, animationsTarget) {
  var currentRunningAnimations = animationsTarget.classList;
  var currentAnimationType = getAnimationType(currentAnimation);

  if ( !currentRunningAnimations && ! currentRunningAnimations.length ) return false;

  for (var i=0; i<currentRunningAnimations.length; i++) {
    var animationType = getAnimationType(currentRunningAnimations[i]);

    if ( animationType === currentAnimationType ) {
      currentRunningAnimations.remove(currentRunningAnimations[i]);
    }
  }
}

exports.content = main;
