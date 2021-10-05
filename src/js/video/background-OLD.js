var videoSection = document.querySelector('.video-section');
var canvas = document.querySelector('#video-section-background');
var context;
var backgroundImage;
var mousePosition;
var mousePositionLast;
var canvasWidth;
var canvasHeight;

var main = function() {
  if ( !videoSection || !canvas ) return false;

  console.log('videoSection', videoSection.offsetHeight);
  createBackgroundImage();
};

function createBackgroundImage() {
  backgroundImage = new Image();
  backgroundImage.src = canvas.dataset.backgroundImage;
  backgroundImage.onload = animateBackgroundIimage;
}

function animateBackgroundIimage() {
  /* Adapted from https://stackoverflow.com/questions/39008771/create-image-warping-effect-in-webgl-three-js */
  context = canvas.getContext('2d');

  canvas.addEventListener('mouseover', function(event) {
    mousePosition = getMousePosition(canvas, event);
  });

  canvas.addEventListener('mouseout', function(event) {
    mousePosition = false;
  });

  function mix(a, b, l) {
    return a + (b - a) * l;
  }

  function upDown(v) {
    return Math.sin(v) * 0.5 + 0.5;
  }

  function render(time) {
    time *= 0.00035;

    resize(canvas);

    var t1 = time;
    var t2 = time * 0.37;

    // for each line in the canvas
    for (var dstY = 0; dstY < canvas.height; ++dstY) {
      var imageOffset = 0;

      if ( mousePosition && mousePosition !== mousePositionLast ) {
        imageOffset = dstY + mousePosition.y;
        console.log('imageOffset');
        // return false;
      }

      // v is value that goes 0 to 1 down the canvas
      var v = dstY / canvas.height;

      // compute some amount to offset the src
      var off1 = Math.sin((v + 0.25) * mix(3, 12, upDown(t1))) * 100;
      var off2 = Math.sin((v + 0.25) * mix(3, 12, upDown(t2))) * 100;
      var off = off1 + off2;

      // compute what line of the source image we want
      // NOTE: if off = 0 then it would just be stretching
      // the image down the canvas.
      var srcY = dstY * backgroundImage.height / canvas.height + off;

      // clamp srcY to be inside the image
      srcY = Math.max(0, Math.min(backgroundImage.height - 1, srcY));

      // draw a single line from the src to the canvas
      context.drawImage(
        backgroundImage,
        0, srcY, backgroundImage.width, 1,
        0, dstY, canvas.width, 1);
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  function resize(canvas) {
    canvasWidth = canvas.clientWidth;
    canvasHeight = videoSection.offsetHeight;

    if (canvasWidth != canvas.width || canvasHeight != canvas.height) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }
  }
}

function canvasImageWarp() {
  console.log('canvasImageWarp', canvasImageWarp);
}

function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

module.exports = main;
