/* indexes correspond to .accent classes in dom, ie .accent-1 */
var starsElementsIndexes = [1,4,5,8];
var lightningBoltsElementsIndexes = [2,3,6,7];

function getAccentElements(parentElement, elementIndexes) {
  var accentElements = [];

  for (var i=0; i<elementIndexes.length; i++) {
    var element = parentElement.querySelector('.accent-' + elementIndexes[i]);

    if ( element ) accentElements.push(element);
  }

  return accentElements;
}

module.exports = function(parentElement) {
  return {
    stars: getAccentElements(parentElement, starsElementsIndexes),
    lightningBolts: getAccentElements(parentElement, lightningBoltsElementsIndexes)
  }
}
