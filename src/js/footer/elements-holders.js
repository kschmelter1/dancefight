module.exports = function(parentElement) {
  return {
    triangles: parentElement.querySelectorAll('.triangles'),
    stars: parentElement.querySelectorAll('.stars'),
    lightningBolts: parentElement.querySelectorAll('.lightning-bolts')
  }
}
