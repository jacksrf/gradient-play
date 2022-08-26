
$(window).on('load', function() {
  var slider = $('.taglines_slider').slick({
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000
  });

  // $('.change_circles').click(function() {
  //   console.log('NEXT')
  //   var lastID = $('.circles .circle:first').attr('id')
  //   var newID = $('.circles .circle:last').attr('id')
  //   $('.circles').prepend($('.circles .circle:last').addClass('tempLast'))
  //   setTimeout(function() {
  //     $('.circles .circle.tempLast').removeClass('tempLast')
  //   }, 1)
  //   $('body').removeClass(lastID)
  //   $('body').addClass(newID)
  // })

  $('.taglines_slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var lastID = $('.circles .circle:first').attr('id')
    console.log(lastID)
    var newID = $('.circles .circle:last').attr('id')
    console.log(newID)
    $('.circles').prepend($('.circles .circle:last').addClass('tempLast'))
    setTimeout(function() {
      $('.circles .circle.tempLast').removeClass('tempLast')
    }, 1)
    $('body').removeClass(lastID)
    $('body').addClass(newID)
  });

  $('.taglines_slider').addClass('show')
  $('.main_tagline').addClass('show')

})
