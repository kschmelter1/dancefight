var main = function() {
  $(document).ready(function () {
    var stepsOnce = true;
    var waypoints = $('.steps-section').waypoint(function(direction) {
      if(stepsOnce) {
        var stepsSection = $(this.element);
        stepsSection.addClass('animate');
        $($('.accent-3'),stepsSection).addClass('vis');
        stepsOnce = false;
        setTimeout(function() {
          stepsSection.removeClass('animate');
        }, 500);
      }
    }, {
      offset: '25%'
    });
  });
};

exports.content = main;
