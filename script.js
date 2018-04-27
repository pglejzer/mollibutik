    /* Cookies */

        
    function WHCreateCookie(name, value, days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      var expires = "; expires=" + date.toGMTString();
    document.cookie = name+"="+value+expires+"; path=/";
  }
  function WHReadCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  /*Popup window-facebook*/


  
  window.onload = WHCheckCookies;
  
  function WHCheckCookies() {
      if(WHReadCookie('cookies_accepted') != 'T') {
          var message_container = document.createElement('div');
          message_container.id = 'cookies-message-container';
          var html_code = '<div id="cookies-message" style="padding: 25px 0px;font-size: 14px; line-height: 22px; border-bottom: 1px solid #D3D0D0; text-align: center; position: fixed; top: 0px; background-color: #EFEFEF; width: 100%; z-index: 1999;">Ta strona używa ciasteczek (cookies), dzięki którym nasz serwis może działać lepiej. <a href="http://wszystkoociasteczkach.pl" target="_blank">Dowiedz się więcej</a><a href="javascript:WHCloseCookiesWindow();" id="accept-cookies-checkbox" name="accept-cookies" style="background-color: #00AFBF; padding: 5px 10px; color: #FFF; border-radius: 4px; -moz-border-radius: 4px; -webkit-border-radius: 4px; display: inline-block; margin-left: 10px; text-decoration: none; cursor: pointer;">Rozumiem</a></div>';
          message_container.innerHTML = html_code;
          document.body.appendChild(message_container);
      }
  }
  
  function WHCloseCookiesWindow() {
      WHCreateCookie('cookies_accepted', 'T', 365);
      document.getElementById('cookies-message-container').removeChild(document.getElementById('cookies-message'));
  }

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


    

