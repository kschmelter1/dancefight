import {BulgePinchFilter} from '@pixi/filter-bulge-pinch';
import {TwistFilter} from '@pixi/filter-twist';
import * as PIXI from 'pixi.js';

var helpers = require('../helpers');

var videoSection = document.querySelector('.video-section');
var videoSectionWidth = videoSection ? Math.floor(videoSection.offsetWidth) : 0;
var videoSectionHeight = videoSection ? Math.floor(videoSection.offsetHeight) : 0;;
var canvas = document.querySelector('#video-section-background');
var app;
var appWidth;
var appOffsetLeft;
var appOffsetTop;
var container;
var backgroundImageTiled;
var textureHeight;
var containerGradient;
var posX;
var posY;
var lastPosX;
var lastPosY;
var timeout;
var currentRequest;
var filterCenter = {};
var filters = {
  bulgePinchFilter: new BulgePinchFilter(),
  twistFilter: new TwistFilter()
}

var main = function() {
  if ( !videoSection || !canvas ) return false;

  if ( isDesktop() ) {
    createInteractiveBackgroundImage();
  } else {
    createSimpleBackgroundImage()
  }
};

function isDesktop() {
  var modernDesktop = window.matchMedia('(pointer: fine)');
  var ieOld = window.matchMedia('(-ms-high-contrast: none), (-ms-high-contrast: active)');

  return modernDesktop.matches || ieOld.matches;
}

function createSimpleBackgroundImage() {
  var backgroundImage = canvas.dataset.backgroundImage;

  canvas.classList.add('simple-image-background');
  canvas.style.backgroundImage = 'url(' + backgroundImage + ')';
  resize();

  window.addEventListener('resize', function() {
    resize();
  });

  function resize() {
    canvas.width = videoSection.offsetWidth;
    canvas.height = videoSection.offsetHeight;
  }
}

function createInteractiveBackgroundImage() {
  appSetup();
  containerSetup();
  backgroundImageTiledSetup();
  filtersSetup();
  appInit();
  resize();

  window.addEventListener('resize', function() {
    cancelAnimationFrame(currentRequest);
    currentRequest = requestAnimationFrame(resize);
  });
}

function appSetup() {
  app = new PIXI.Application({
    view: canvas,
    transparent: true,
    autoResize: true,
    autoDensity: true,
    resolution: window.devicePixelRatio,
    resizeTo: canvas,
    antialias: true,
    preserveDrawingBuffer: true
  });
}

function appInit() {
  app.renderer.render(container);
  app.stage.addChild(container);
}

function containerSetup() {
  container = new PIXI.Container({
    width: videoSectionWidth,
    height: videoSectionHeight,
  });
}

function backgroundImageTiledSetup() {
  var timestamp = Date.now();
  var texture = PIXI.Texture.from(canvas.dataset.backgroundImage + '?' + timestamp);

  backgroundImageTiled = new PIXI.TilingSprite(
    texture,
    videoSectionWidth * 1.3,
    videoSectionHeight,
  );

  backgroundImageTiled.texture.baseTexture.on('loaded', function() {
    function interactionControl(playState, scrollPos) {
      backgroundImageTiled.interactive = playState;

      if ( playState ) {
        backgroundImageTiled.filters = [filters.bulgePinchFilter, filters.twistFilter];
        backgroundImageTiled.on('mousemove', onPointerMove);
      } else {
        backgroundImageTiled.filters = null;
        backgroundImageTiled.off('mousemove', onPointerMove);
      }
    }

    backgroundImageTiledResize();
    helpers.scrollListener(videoSection, .25, 0, interactionControl);
  });

  container.addChild(backgroundImageTiled);
}

function onScroll(scrollPos) {
  var xScale = videoSectionWidth / videoSectionHeight;
  var x = Math.floor(scrollPos * xScale);
  var y = Math.floor(videoSectionHeight / 3);

  if ( y > 0 && y < videoSectionHeight ) {
    posX = x;
    posY = y;

    filtersUpdate(posX, posY);
  }

  if ( ( posX && posX !== lastPosX) && ( posY && posY !== lastPosY) ) {
    lastPosX = posX;
    lastPosY = posY;
  }
}

function onPointerMove(eventData) {
  var x = Math.floor(eventData.data.global.x);
  var y = Math.floor(eventData.data.global.y);

  if ( y > 0 && y < videoSectionHeight ) {
    posX = x;
    posY = y;

    filtersUpdate(posX, posY);
  }

  if ( ( posX && posX !== lastPosX) && ( posY && posY !== lastPosY) ) {
    lastPosX = posX;
    lastPosY = posY;
  }
}

function backgroundImageTiledResize() {
  var scaleRatio = (videoSectionWidth > backgroundImageTiled.texture.width)
    ? videoSectionWidth / 2 / backgroundImageTiled.texture.width
    : videoSectionWidth / backgroundImageTiled.texture.width;

  textureHeight = backgroundImageTiled.texture.height;
  backgroundImageTiled.tileScale.x = scaleRatio;
  backgroundImageTiled.tilePosition.x = appWidth * .16;
  backgroundImageTiled.width = appWidth;
}

function filtersSetup() {
  filters.bulgePinchFilter.strength = 0;

  filters.twistFilter.angle = 0;
  filters.twistFilter.offset = new PIXI.Point();
}

function filtersUpdate(posX, posY) {
  if ( posY > videoSectionHeight * .75 ) return false;

  filterCenter.x = posX / appWidth;
  filterCenter.y = posY / videoSectionHeight;

  filters.bulgePinchFilter.center = [filterCenter.x, filterCenter.y];
  filters.bulgePinchFilter.radius = videoSectionHeight;
  filters.bulgePinchFilter.strength = filterCenter.y;

  filters.twistFilter.angle = 1.75;
  filters.twistFilter.radius = videoSectionWidth * .3;
  filters.twistFilter.offset.x = posX;
  filters.twistFilter.offset.y = videoSectionHeight * .4;
}

function resize() {
  /* reset videoSection dimensions */
  videoSectionWidth = Math.floor(videoSection.offsetWidth);
  videoSectionHeight = Math.floor(videoSection.offsetHeight);

  appWidth = Math.floor(videoSectionWidth * 1.3);
  
  backgroundImageTiledResize();

  appOffsetTop = Math.floor(0 - textureHeight);
  appOffsetLeft = Math.floor(0 - ( appWidth * .16 ));

  app.view.width = appWidth;
  app.view.style.top = appOffsetTop + 'px';
  app.view.style.left = appOffsetLeft + 'px';
	app.renderer.resize(appWidth, videoSectionHeight);
}

module.exports = main;
