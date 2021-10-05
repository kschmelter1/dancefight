/* indexes correspond to .accent classes in dom, ie .accent-1 */
var trianglesElementsIndexes = [1, 4, 7, 8];
var starsElementsIndexes = [3,5,9,11];
var lightningBoltsElementsIndexes = [2,6,10];

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
    triangles: getAccentElements(parentElement, trianglesElementsIndexes),
    stars: getAccentElements(parentElement, starsElementsIndexes),
    lightningBolts: getAccentElements(parentElement, lightningBoltsElementsIndexes)
  }
}
