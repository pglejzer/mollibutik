/* Smooth scroll without carousel */

$(document).on('click', 'a[href^="#"]:not(.carousel-control)', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});

/*Nav*/

$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar-fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});
/*Hamburger*/

$(document).ready(function () {
  $('.navbar-collapse a').click(function () {
    $('.navbar-collapse').css('height', '0');
    $('.navbar-collapse').removeClass('in');
  });
});


var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 52.1689738,
      lng: 22.2675806
    },
    zoom: 15
  });
}