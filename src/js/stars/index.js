var helpers = require('../helpers');

var starsSection = document.querySelector('.stars-section');
if (starsSection) {
  var elements = require('./elements.js')(starsSection);
  var elementsTimeline = require('./elements-timeline');
  var elementsHolders = require('./elements-holders')(starsSection);
  var elementsHoldersTimeline = require('./elements-holders-timeline');
  var timelines = [elementsTimeline, elementsHoldersTimeline];
  var timelinesTypes = [elements, elementsHolders]
  var loopTime = 0;
  var playing = false;
}

var main = function() {
  if ( !starsSection || !elements.stars || !elementsHolders.stars ||
    !elements.lightningBolts || !elementsHolders.lightningBolts ) return false;

  function animationControl(playState) {
    playing = playState;
  }

  animate();
  helpers.scrollListener(starsSection, .25, 0, animationControl);
};

function animate() {
  for (var i=0; i<timelines.length; i++) {
    if ( playing ) {
      var nextAnimations = getNextAnimations(timelines[i]);
      var nextAnimationsTarget = timelinesTypes[i];

      applyNextAnimations(nextAnimations, nextAnimationsTarget);
    }
  }

  if ( loopTime > 200 ) loopTime = 0;

  if ( playing ) {
    loopTime++;
  }
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
