var helpers = require('../helpers');

var videoSection = document.querySelector('.video-section');
var youtubeVideoWrapper = document.querySelector('.youtube-video-wrapper');
var youtubeEmbed = document.querySelector('.youtube-embed');
var svgLogo = document.querySelector('#svg-logo');
var svgLogoSpaceHolder = document.querySelector('#svg-logo-space-holder');
var canvas = document.querySelector('#video-canvas');
var context;
var videoBackground;
var imageMask;
var videoXPos;
var videoVerticalRatio;
var playing = false;

var main = function() {
  /* If browser supports CSS function, it should be modern enough: https://developer.mozilla.org/en-US/docs/Web/API/CSS */
  var modernBrowser = typeof CSS !== 'undefined' ? true : false;

  if ( !videoSection ) return false;

  /* uncomment below to test canvasVideoMask in modern browsers */
  // modernBrowser = false;

  if ( modernBrowser && youtubeVideoWrapper && youtubeEmbed && svgLogo && svgLogoSpaceHolder ) {
    svgVideoMask();
  } else if ( canvas && videoMaskImage && mp4Video && mp4VideoStill && svgLogoSpaceHolder ) {
    canvasVideoMask();
  }
};

/* Modern browsers */
function svgVideoMask() {
  var youtubeSrc = youtubeEmbed ? youtubeEmbed.dataset.src : '';

  if ( !youtubeSrc ) return false;

  youtubeVideoWrapper.classList.remove('d-none');
  youtubeEmbed.src = youtubeSrc;
  svgLogo.classList.remove('d-none');
}

/* ie 11 fallback */
function canvasVideoMask() {
  canvas.classList.remove('d-none');
  context = canvas.getContext('2d', {
    alpha: true,
    antialias: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: true
  });
  imageMask = new Image();
  imageMask.src = videoMaskImage;

  imageMask.onload = function() {
    canvas.width = imageMask.width;
    canvas.height = imageMask.height;
    svgLogoSpaceHolder.classList.add('d-none');
    svgLogoSpaceHolder.classList.remove('invisible');
    createVideoBackground();
  }
}

function createVideoBackground() {
  videoBackground = document.createElement('video');
  videoBackground.src = mp4Video;
  videoBackground.preload = 'auto';
  videoBackground.loop = true;
  videoBackground.muted = true;
  videoBackground.setAttribute('playsinline', true);
  videoBackground.setAttribute('controls', true);

  drawVideoBackgroundStill();

  videoBackground.onloadedmetadata = function() {
    videoVerticalRatio = Math.floor(( canvas.height / videoBackground.videoHeight ) * videoBackground.videoWidth);
    videoXPos = Math.floor((canvas.width/2) - (videoBackground.videoWidth/2));

    function videoControl(playState) {
      playing = playState;

      if ( playing ) {
        videoBackground.play();
      } else {
        videoBackground.pause();
      }
      drawVideoBackground();
    }

    helpers.scrollListener(videoSection, .25, 0, videoControl);
  }
}

function drawVideoBackgroundStill() {
  var videoStill = new Image();
  videoStill.src = mp4VideoStill;

  videoStill.onload = function() {
    var videlStillVerticalRatio = Math.floor(( canvas.height / videoStill.height ) * videoStill.width);
    var videoStillXPos = Math.floor((canvas.width/2) - (videoStill.width/2));
    context.drawImage(videoStill, videoStillXPos, 0, videlStillVerticalRatio, Math.floor(canvas.height));
    context.globalCompositeOperation = 'destination-in';
    context.drawImage(imageMask, 0, 0);
    context.globalCompositeOperation = 'source-over';
  }
}

function drawVideoBackground() {
  if ( playing ) {
    context.drawImage(videoBackground, videoXPos, 0);
    context.globalCompositeOperation = 'destination-in';
    context.drawImage(imageMask, 0, 0);
    context.globalCompositeOperation = 'source-over';
    requestAnimationFrame(drawVideoBackground);
  }
}

module.exports = main;
