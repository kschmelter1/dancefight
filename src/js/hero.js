var main = function() {
  $ = jQuery;

  $(document).ready(function () {
    var slideCount = $('.carousel-wrap1 .swiper-slide').length;
    var dupCount = $('.carousel-wrap1 .swiper-slide-duplicate').length;
    slideCount = slideCount-dupCount;

    var heroSwiper1 = new Swiper('.swiper-hero1', {
      effect: 'coverflow',
      grabCursor: false,
      simulateTouch: false,
      centeredSlides: true,
      slidesPerView: 9,
      //this is kind of a hacky solution to prevent a jumping bug, but if it doesn't breaking anything else I'm not touching it
      initialSlide: slideCount+3,
      loop: true,
      controller: {
        inverse: true,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },
      // on: {
      //   touchStart: function () {
      //     $('.hero-section .vs').css({opacity: 0});
      //   },
      //   touchEnd: function () {
      //     $('.hero-section .vs').css({opacity: 1});
      //   },
      // },
    });
    var heroSwiper2 = new Swiper('.swiper-hero2', {
      effect: 'coverflow',
      grabCursor: false,
      simulateTouch: false,
      autoplay: true,
      centeredSlides: true,
      slidesPerView: 9,
      initialSlide: 0,
      loop: true,
      controller: {
        inverse: true,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },
      // on: {
      //   touchStart: function () {
      //     $('.hero-section .vs').css({opacity: 0});
      //   },
      //   touchEnd: function () {
      //     $('.hero-section .vs').css({opacity: 1});
      //   },
      // },
    });

    heroSwiper1.controller.control = heroSwiper2;
    heroSwiper2.controller.control = heroSwiper1;

    $('.swiper-hero').imagesLoaded( function() {
      $('.swiper-hero').addClass('vis');
      $('.hero-section .vs').addClass('vis');
    });
  });
};

exports.content = main;
