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

/*Google maps*/

      function initMap() {
        var myLatlng = {lat: 52.168299, lng: 22.26951,};

          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: myLatlng
          });
  
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Click to zoom'
          });
  
          map.addListener('center_changed', function() {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            window.setTimeout(function() {
              map.panTo(marker.getPosition());
            }, 3000);
          });
  
          marker.addListener('click', function() {
            map.setZoom(20);
            map.setCenter(marker.getPosition());
          });
        }