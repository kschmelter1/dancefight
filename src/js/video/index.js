var logo = require('./logo');
var background = require('./background');

var main = function() {
  logo();
  background();
}

exports.content = main;
