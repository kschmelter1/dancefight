var main = function() {
  $(document).ready(function () {
    var vsOnce = true;
    var waypoints = $('.vs-section').waypoint(function(direction) {
      if(vsOnce) {
        var vsSection = $(this.element);
        $($('.accent-l4'),vsSection).addClass('vis');
        vsOnce = false;

        setTimeout(function() {
          $($('.accent-l2, .accent-r2'),vsSection).addClass('vis');
          $($('.accent-l1, .accent-r1'),vsSection).addClass('vis');
        }, 400);

        setTimeout(function() {
          $($('.accent-l1, .accent-r1'),vsSection).addClass('vis2');
        }, 600);
      }
    }, {
      offset: '25%'
    });
  });
};

exports.content = main;
