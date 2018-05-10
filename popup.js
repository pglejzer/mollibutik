var Popup = (function () {

    // Local variables
    // s == settings
    var s = {},
      isExitPopupShown = false,
      previousY = 0,
      isPopupVisible = false;
  
    // Show popup every...
    var setCookie = function() {
      Cookies.set('popup-shown', 'true', {
        expires: 3
      });
    };
  
    var close = function() {
      s.popupOverlayEl.addClass('visuallyhidden');
      s.popupEl.addClass('visuallyhidden');
  
      isPopupVisible = false;
    };
  
    var show = function() {
      // If another popup is already visible - don't show the next one
      if (!isPopupVisible) {
        s.popupOverlayEl.removeClass('visuallyhidden');
  
        // Show the popup
        s.popupEl.removeClass('visuallyhidden');
  
        isPopupVisible = true;
        setCookie();
      }
    };
  
    var showError = function(message) {
      // Add classes
      s.errorMsgEl.addClass('error');
      s.popupEl.find('.form-email').focus().addClass('error');
  
      // Show message
      s.errorMsgEl.show().text(message);
    };
  
    var init = function(config) {
      s = config;
  
      // Handle popup close events
  
      // On outside popup click
      s.popupOverlayEl.on('click', close);
  
      // On "x" click
      s.closeEl.on('click', close);
  
      // But do nothing when clicked inside popup
      s.popupEl.on('click', function (e) {
        e.stopPropagation();
      });
  
      // Handle form validation
      s.popupEl.find('form').on('submit', function (e) {
  
        if (this.email.value === '') {
          showError('Nie podałeś adresu e-mail');
          return false;
        }
  
        if (this.email.value.indexOf('@', 1) === -1 || this.email.value.indexOf('.', 1) === -1) {
          showError('Podałeś błędny adres e-mail');
          return false;
        } else {
  
          // Close the popup
          close();
  
          // And send the form
          return true;
        }
      });
  
      // Autoshow popup after x seconds
      if (!Cookies.get('popup-shown')) {
  
        // Show 1st time - autoshow
        window.setTimeout(function () {
          show();
        }, 2000);
  
        // Show 2nd time - on exit
        $(document).on('mousemove', function (e) {
          if (e.pageY - $(document).scrollTop() <= 20 && previousY > e.pageY && !isExitPopupShown) {
            show();
            isExitPopupShown = true;
          }
  
          previousY = e.pageY;
        });
        }, 5000);
      }
    };
  
    return {
      init: init
    };
  
  })();

  /*
Copyright: 2016 Jakub Jurkian
WWW: https://jakubjurkian.pl
*/

$(function () {

// Initialize Popup
Popup.init({
  popupOverlayEl: $('.popup-overlay'),
  popupEl: $('.popup'),
  closeEl: $('.popup').find('.close'),
  errorMsgEl: $('.popup').find('.validation-errors')
});
});


/*!
* JavaScript Cookie v2.1.2
* https://github.com/js-cookie/js-cookie
*
* Copyright 2006, 2015 Klaus Hartl & Fagner Brack
* Released under the MIT license
*/
;(function (factory) {
if (typeof define === 'function' && define.amd) {
  define(factory);
} else if (typeof exports === 'object') {
  module.exports = factory();
} else {
  var OldCookies = window.Cookies;
  var api = window.Cookies = factory();
  api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
  };
}
}(function () {
function extend () {
  var i = 0;
  var result = {};
  for (; i < arguments.length; i++) {
      var attributes = arguments[ i ];
      for (var key in attributes) {
          result[key] = attributes[key];
      }
  }
  return result;
}

function init (converter) {
  function api (key, value, attributes) {
      var result;
      if (typeof document === 'undefined') {
          return;
      }

      // Write

      if (arguments.length > 1) {
          attributes = extend({
              path: '/'
          }, api.defaults, attributes);

          if (typeof attributes.expires === 'number') {
              var expires = new Date();
              expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
              attributes.expires = expires;
          }

          try {
              result = JSON.stringify(value);
              if (/^[\{\[]/.test(result)) {
                  value = result;
              }
          } catch (e) {}

          if (!converter.write) {
              value = encodeURIComponent(String(value))
                  .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
          } else {
              value = converter.write(value, key);
          }

          key = encodeURIComponent(String(key));
          key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
          key = key.replace(/[\(\)]/g, escape);

          return (document.cookie = [
              key, '=', value,
              attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
              attributes.path    && '; path=' + attributes.path,
              attributes.domain  && '; domain=' + attributes.domain,
              attributes.secure ? '; secure' : ''
          ].join(''));
      }

      // Read

      if (!key) {
          result = {};
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling "get()"
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var rdecode = /(%[0-9A-Z]{2})+/g;
      var i = 0;

      for (; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var cookie = parts.slice(1).join('=');

          if (cookie.charAt(0) === '"') {
              cookie = cookie.slice(1, -1);
          }

          try {
              var name = parts[0].replace(rdecode, decodeURIComponent);
              cookie = converter.read ?
                  converter.read(cookie, name) : converter(cookie, name) ||
                  cookie.replace(rdecode, decodeURIComponent);

              if (this.json) {
                  try {
                      cookie = JSON.parse(cookie);
                  } catch (e) {}
              }

              if (key === name) {
                  result = cookie;
                  break;
              }

              if (!key) {
                  result[name] = cookie;
              }
          } catch (e) {}
      }

      return result;
  }

  api.set = api;
  api.get = function (key) {
      return api(key);
  };
  api.getJSON = function () {
      return api.apply({
          json: true
      }, [].slice.call(arguments));
  };
  api.defaults = {};

  api.remove = function (key, attributes) {
      api(key, '', extend(attributes, {
          expires: -1
      }));
  };

  api.withConverter = init;

  return api;
}

return init(function () {});
}));



/*faceebok*/
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.12';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));