/*global $, jQuery, alert*/
$(document).ready(function() {

  'use strict';

  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //


  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
      if ($(window).width() < 768) {
        $('.nav-menu').slideUp();
      }
    });

    $(this).addClass('active');

    var target = this.hash,
        menu = target;

    target = $(target);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = target.selector;
      $(document).on("scroll", onScroll);
    });
  });


  function onScroll(event) {
    if ($('.home').length) {
      var scrollPos = $(document).scrollTop();
      $('nav ul li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // ========================================================================= //
  //  //NAVBAR SHOW - HIDE
  // ========================================================================= //


  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200 ) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass('subpage-nav');
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass('subpage-nav');
    }
  });

  // ========================================================================= //
  //  // RESPONSIVE MENU
  // ========================================================================= //

  $('.responsive').on('click', function(e) {
    $('.nav-menu').slideToggle();
  });

  // ========================================================================= //
  //  Typed Js
  // ========================================================================= //

  var typed = $(".typed");

  $(function() {
    typed.typed({
      strings: ["Nathan Phan.", "A Student.", "A Developer.", "An Engineer."],
      typeSpeed: 100,
      loop: true,
    });
  });


  // ========================================================================= //
  //  Owl Carousel Services
  // ========================================================================= //


  $('.services-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    margin: 20,
    dots: true,
    nav: false,
    responsiveClass: true,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 4 } }
  });

  // ========================================================================= //
  //  magnificPopup
  // ========================================================================= //

  var magnifPopup = function() {
    $('.popup-img').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By default, it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which the popup was initialized, in this case, it's an <a> tag
          // you don't need to add the "opener" option if this code matches your needs, it's the default one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  };


  // Call the functions
  magnifPopup();

});

// ========================================================================= //
//  Porfolio isotope and filter
// ========================================================================= //
$(window).load(function(){

  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-thumbnail',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on('click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

})

$('.socials-media ul li').each(function() {
  var socialLink = $(this).find('a');
  var socialIcon = socialLink.find('i');
  var socialPlatform = socialIcon.attr('class');

  if (socialPlatform === 'ion-social-facebook') {
    socialLink.attr('href', 'https://www.facebook.com/nathan.phan.92775/');
  } else if (socialPlatform === 'ion-social-twitter') {
    socialLink.attr('href', 'https://twitter.com/nothan_val');
  } else if (socialPlatform === 'ion-social-instagram') {
    socialLink.attr('href', 'https://www.instagram.com/nathann.fan');
  } else if (socialPlatform === 'ion-social-googleplus') {
    socialLink.attr('href', 'mailto:nathanmtp03@gmail.com');
  }

  socialLink.attr('target', '_blank'); // Add this line to open links in a new tab
});

$('.header-content .list-social li').each(function() {
  var socialLink = $(this).find('a');
  var socialIcon = socialLink.find('i');
  var socialPlatform = socialIcon.attr('class');

  if (socialPlatform === 'ion-social-facebook') {
    socialLink.attr('href', 'https://www.facebook.com/nathan.phan.92775/');
  } else if (socialPlatform === 'ion-social-twitter') {
    socialLink.attr('href', 'https://twitter.com/nothan_val');
  } else if (socialPlatform === 'ion-social-instagram') {
    socialLink.attr('href', 'https://www.instagram.com/nathann.fan');
  } else if (socialPlatform === 'ion-social-googleplus') {
    socialLink.attr('href', 'mailto:nathanmtp03@gmail.com');
  }
  socialLink.attr('target', '_blank'); // Add this line to open links in a new tab
});

// Parse the URL parameters to check for a success message
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Check if the success parameter is present in the URL
var success = getUrlParameter('success');
if (success === 'true') {
  $('#sendmessage').addClass('show');
}

// Handle form submission
$('.contactForm').submit(function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  var form = $(this);
  var url = form.attr('action');

  // Perform AJAX request
  $.ajax({
    type: 'POST',
    url: url,
    data: form.serialize(), // Serialize the form data
    success: function(response) {
      // Display success message
      $('#sendmessage').addClass('show');
      form.trigger('reset'); // Reset the form
    },
    error: function(xhr, status, error) {
      // Display error message
      $('#errormessage').html('An error occurred while sending the message.');
      $('#errormessage').addClass('show');
    }
  });
});
