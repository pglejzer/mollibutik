/*Nav*/

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

/*Slider1*/
$('#carousel-example-generic').carousel({
    interval: 3000,
    pause: null
  });

/*Smooth scroll*/

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});

/*Hamburger*/

 $(document).ready(function() {
    $('.navbar-collapse a').click(function(){ 
      $('.navbar-collapse').css('height', '0');
      $('.navbar-collapse').removeClass('in');
    });  
 });


function initMap() {
        var uluru = {lat: 52.168951, lng: 22.269369};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }