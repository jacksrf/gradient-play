
$(window).on('load', function() {
  var slider = $('.taglines_slider').slick({
    dots: true,
    infinite: true,
    speed: 750,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000
  });

  $('.taglines_slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var colorID = $('.circles .circle:nth-child(8)').attr('id')
    console.log(colorID)
    var lastID = $('.circles .circle:last').attr('id')
    console.log(lastID)
    $('.circles').prepend($('.circles .circle:nth-child(8)'))
    $('.circles .circle:last').addClass('tempLast')
    setTimeout(function() {
      $('.circles .circle.tempLast').removeClass('tempLast')
    }, 1)
    $('body').removeClass(lastID)
    $('body').addClass(colorID)
  });

  $('.taglines_slider').addClass('show')
  $('.main_tagline').addClass('show')

})
