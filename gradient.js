
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
    var lastID = $('.circles .circle:first').attr('id')
    console.log(lastID)
    var colorID = $('.circles .circle:nth-child(7)').attr('id')
    console.log(colorID)
    var newID = $('.circles .circle:last').attr('id')
    $('.circles').prepend($('.circles .circle:last').addClass('tempLast'))
    setTimeout(function() {
      $('.circles .circle.tempLast').removeClass('tempLast')
    }, 1)
    $('body').removeClass(lastID)
    $('body').addClass(colorID)
  });

  $('.taglines_slider').addClass('show')
  $('.main_tagline').addClass('show')

})
