import {BulgePinchFilter} from '@pixi/filter-bulge-pinch';
import {TwistFilter} from '@pixi/filter-twist';
import * as PIXI from 'pixi.js';

var helpers = require('../helpers');

var footerSection
var canvas
var app;
var container;
var texture;
var backgroundImage;
var bulgePinchFilter;
var bulgePinchFilterTwo;
var twistFilter;
var twistFilterTwo;
var filterCenter = {};
var posX;
var posY;
var lastPosX;
var lastPosY;

var main = function() {
  // Need to wait until footer fully loads or queries return null
  document.addEventListener("DOMContentLoaded", function() {
    footerSection = document.querySelector('.main-footer');
    canvas = document.querySelector('#footer-section-background');
    if ( !footerSection || !canvas ) return false;
      // this function runs when the DOM is ready, i.e. when the document has been parsed
      createBackgroundImage();
  });

function createBackgroundImage() {
  var timestamp = Date.now();

  app = new PIXI.Application({
    width: Math.floor(footerSection.offsetWidth),
    height: Math.floor(footerSection.offsetHeight),
    view: canvas,
    backgroundColor: 0x0601F7,
    autoResize: true,
    autoDensity: true,
    resolution: devicePixelRatio,
    transparent: true, antialias: true, preserveDrawingBuffer: true
  });
  container = new PIXI.Container();
  texture = PIXI.Texture.from(canvas.dataset.backgroundImage + '?' + timestamp);
  bulgePinchFilter = new BulgePinchFilter();
  bulgePinchFilter.strength = 0;
  bulgePinchFilterTwo = new BulgePinchFilter();
  bulgePinchFilterTwo.strength = 0;
  twistFilter = new TwistFilter();
  twistFilter.angle = 0;
  twistFilter.offset = new PIXI.Point();
  twistFilterTwo = new TwistFilter();
  twistFilterTwo.angle = 0;
  twistFilterTwo.offset = new PIXI.Point();
  backgroundImage = new PIXI.Sprite(texture);
  backgroundImage.width = footerSection.offsetWidth;
  backgroundImage.scale.set(0.5, 0.4);
  /// test area
  /*backgroundImage = new PIXI.TilingSprite(
    texture,
    footerSection.offsetWidth,
    footerSection.offsetHeight,
  );*/
  ///

  function interactionControl(playState) {
    backgroundImage.interactive = playState;

    if ( playState ) {
      backgroundImage.filters = [bulgePinchFilter, bulgePinchFilterTwo, twistFilter, twistFilterTwo];
      backgroundImage.on('mousemove', onPointerMove);
    } else {
      backgroundImage.filters = null;
      backgroundImage.off('mousemove', onPointerMove);
    }
  }

  resize();
  helpers.scrollListener(footerSection, .25, 0, interactionControl);

  container.addChild(backgroundImage);
  app.stage.addChild(container);


  resize();
  window.addEventListener('resize', resize);

  // app.ticker.add((delta) => {
  //   console.log('animation running...');
  // });
}

function onPointerMove(eventData) {
  var x = eventData.data.global.x;
  var y = eventData.data.global.y;

  if ( y > 0 && y < footerSection.offsetHeight ) {
    posX = parseInt(x);
    posY = parseInt(y);
  }

  if ( ( posX && posX !== lastPosX) && ( posY && posY !== lastPosY) ) {
    lastPosX = posX;
    if (posX < 200) {posX = 200;}
    if (posX > footerSection.offsetWidth - 200) {posX = footerSection.offsetWidth - 200;}
    lastPosY = posY;
    filterCenter.x = posX / footerSection.offsetWidth;
    filterCenter.y = ( posY + 200 ) / footerSection.offsetHeight;
    bulgePinchFilter.center = [filterCenter.x * .75, .75];
    bulgePinchFilter.radius = footerSection.offsetHeight * .5;
    bulgePinchFilter.strength = filterCenter.x > footerSection.offsetWidth * .25 ?  0 - .5 : 0;
    bulgePinchFilterTwo.center = [filterCenter.x * 1.5, filterCenter.y * 1];
    bulgePinchFilterTwo.radius = footerSection.offsetHeight * filterCenter.y * .5;
    bulgePinchFilterTwo.strength = filterCenter.y;
    twistFilter.angle = -1.5;
    twistFilter.radius = footerSection.offsetWidth * .35;
    twistFilter.offset.x = posX;// * 1.35;
    twistFilter.offset.y = footerSection.offsetHeight * .5;
    twistFilterTwo.angle = filterCenter.x > footerSection.offsetWidth * .25 ? -1.75 : 0;
    twistFilterTwo.radius = footerSection.offsetWidth * .35;
    twistFilterTwo.offset.x = posX;// * .7;
    twistFilterTwo.offset.y = footerSection.offsetHeight * .9;
  }
}

function resize() {
  backgroundImage.width = Math.floor(footerSection.offsetWidth);
	app.renderer.resize(Math.floor(footerSection.offsetWidth), Math.floor(footerSection.offsetHeight));
}

};
module.exports = main;
