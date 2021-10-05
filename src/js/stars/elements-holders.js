module.exports = function(parentElement) {
  return {
    stars: parentElement.querySelectorAll('.stars-holder'),
    lightningBolts: parentElement.querySelectorAll('.lightning-bolts-holder')
  }
}
