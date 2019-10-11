/*

	Template Name: Exhibit - Conference & Event HTML Template
	Author: Themewinter
	Author URI: https://themeforest.net/user/themewinter
	Description: Exhibit - Conference & Event HTML Template
	Version: 1.0
   =====================
   table of content
   ====================
   1.   menu toogle
   2.   event counter
   3.   funfact
   4.   isotope grid
   5.   main slider
   6.   speaker popup
   7.   gallery
   8.   video popup
   9.   hero area image animation
   10.  wow animated
   11.  back to top

*/

jQuery(function($) {
  /**-------------------------------------------------
    *Fixed HEader
    *----------------------------------------------------**/
  $(window).on('scroll', function() {
    /**Fixed header**/
    if ($(window).scrollTop() > 250) {
      $('.header').addClass('sticky fade_down_effect');
    } else {
      $('.header').removeClass('sticky fade_down_effect');
    }
  });

  /* ---------------------------------------------
                     Menu Toggle
   ------------------------------------------------ */

  if ($(window).width() < 991) {
    $('.navbar-nav li a').on('click', function() {
      $(this)
        .parent('li')
        .find('.dropdown-menu')
        .slideToggle();
      $(this)
        .find('i')
        .toggleClass('fa-angle-up fa-angle-down');
    });
  }

  /* ----------------------------------------------------------- */
  /*  Event counter
   /* -----------------------------------------------------------*/

  if ($('.countdown').length > 0) {
    $('.countdown').jCounter({
      date: '12 October 2019 10:00:00',
      fallback: function() {
        console.log('count finished!');
      }
    });
  }

  /*==========================================================
     funfact
     ======================================================================*/
  var skl = true;
  $('.ts-funfact').appear();

  $('.ts-funfact').on('appear', function() {
    if (skl) {
      $('.counterUp').each(function() {
        var $this = $(this);
        jQuery({
          Counter: 0
        }).animate(
          {
            Counter: $this.attr('data-counter')
          },
          {
            duration: 8000,
            easing: 'swing',
            step: function() {
              var num = Math.ceil(this.Counter).toString();
              if (Number(num) > 99999) {
                while (/(\d+)(\d{3})/.test(num)) {
                  num = num.replace(/(\d+)(\d{3})/, '');
                }
              }
              $this.html(num);
            }
          }
        );
      });
      skl = false;
    }
  });

  /*=====================
    isotop grid
    ========================*/

  if ($('.grid').length > 0) {
    var $portfolioGrid = $('.grid'),
      colWidth = function() {
        var w = $portfolioGrid.width(),
          columnNum = 1,
          columnWidth = 0;
        if (w > 1200) {
          columnNum = 3;
        } else if (w > 900) {
          columnNum = 3;
        } else if (w > 600) {
          columnNum = 2;
        } else if (w > 450) {
          columnNum = 2;
        } else if (w > 385) {
          columnNum = 1;
        }
        columnWidth = Math.floor(w / columnNum);
        $portfolioGrid.find('.grid-item').each(function() {
          var $item = $(this),
            multiplier_w = $item.attr('class').match(/grid-item-w(\d)/),
            multiplier_h = $item.attr('class').match(/grid-item-h(\d)/),
            width = multiplier_w ? columnWidth * multiplier_w[1] : columnWidth,
            height = multiplier_h ? columnWidth * multiplier_h[1] * 0.4 - 12 : columnWidth * 0.3;
          $item.css({
            width: width
            //height: height
          });
        });
        return columnWidth;
      },
      isotope = function() {
        $portfolioGrid.isotope({
          resizable: true,
          itemSelector: '.grid-item',
          masonry: {
            columnWidth: colWidth(),
            gutterWidth: 3
          }
        });
      };
    isotope();
    $(window).resize(isotope);
  } // End is_exists

  /*
  LOAD SPEAKERS
  */

  $.getJSON("./data/rockstars.json", function (data) {
    var items = [];
    // var items = data[Math.floor(Math.random()*data.length)];
    var item;
    $.each(data, function (key, val) {
      item = `<div class="col-lg-3 col-md-6 wow fadeIn" data-wow-duration="0.5s" data-wow-delay="300ms">
                        <div class="ts-speaker">
                           <div class="speaker-img">
                              <img class="img-fluid" src="images/speakers/${val.img}" alt="${val.nombre}">
                              <a href="#popup_${val.id}" class="view-speaker ts-image-popup" data-effect="mfp-zoom-in">
                                 <i class="icon icon-code"></i>
                              </a>
                           </div>
                           <div class="ts-speaker-info">
                              <h3 class="ts-title">${val.nombre}</h3>
                              <p>
                                 ${val.title}
                              </p>
                           </div>
                        </div>

                        <div id="popup_${val.id}" class="container ts-speaker-popup mfp-hide">
                           <div class="row">
                              <div class="col-lg-6">
                                 <div class="ts-speaker-popup-img" style="background-image: url(images/speakers/${val.img})">
                                    <!-- img src="images/speakers/${val.img}" alt="${val.nombre}" -->
                                 </div>
                              </div>
                              <div class="col-lg-6">
                                 <div class="ts-speaker-popup-content">
                                    <h3 class="ts-title">${val.nombre}</h3>
                                    <span class="speakder-designation">${val.title}</span>
                                    <p>
                                       ${val.bio}
                                    </p>
                                    <h4 class="session-name">
                                      Charla
                                    </h4>
                                    <div class="row">
                                      <div class="col">
                                        <div class="speaker-session-info">
                                          <span>${val.horario}</span>
                                          <p>
                                            ${val.charla}
                                          </p>
                                          <p class="desc">
                                            ${val.desc}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="ts-speakers-social">
                                       <a href="${val.rrss1}" target="_blank"><i class="${val.rrss1icon}"></i></a>
                                       <a href="${val.rrss2}" target="_blank"><i class="${val.rrss2icon}"></i></a>
                                       <a href="${val.rrss3}" target="_blank"><i class="${val.rrss3icon}"></i></a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>`;
      items.push(item);
    });
    $("<div/>", {
      class: "row",
      html: items.join("")
    }).appendTo("#speakers-holder");
  });

/*
 LOAD SPEAKERS
 */

  /*=============================================================
			 speaker popup
	=========================================================================*/

  $(document).magnificPopup({
    delegate: '.ts-image-popup',
    type: 'inline',
    closeOnContentClick: false,
    midClick: true,
    callbacks: {
      beforeOpen: function() {
        this.st.mainClass = this.st.el.attr('data-effect');
        $('html, body').css('overflow-y', 'hidden');
      },
      beforeClose: function() {
        $('html, body').css('overflow-y', 'auto');
      }
    },
    zoom: {
      enabled: true,
      duration: 500 // don't foget to change the duration also in CSS
    },
    mainClass: 'mfp-fade'
  });

  /*=============================================================
   			hero image animation
   	=========================================================================*/
  $('.tile')
    // tile mouse actions
    .on('mouseover', function() {
      $(this)
        .children('.photo')
        .css({
          transform: 'scale(' + $(this).attr('data-scale') + ')'
        });
    })
    .on('mouseout', function() {
      $(this)
        .children('.photo')
        .css({
          transform: 'scale(1)'
        });
    })
    .on('mousemove', function(e) {
      $(this)
        .children('.photo')
        .css({
          'transform-origin':
            (e.pageX - $(this).offset().left) / $(this).width() * 100 +
            '% ' +
            (e.pageY - $(this).offset().top) / $(this).height() * 100 +
            '%'
        });
    })
    // tiles set up
    .each(function() {
      $(this)
        // add a photo container
        .append('<div class="photo"></div>')
        // some text just to show zoom level on current item in this example
        //.append('<div class="txt"><div class="x">'+ $(this).attr('data-scale') +'x</div>ZOOM ON<br>HOVER</div>')
        // set up a background image for each tile based on data-image attribute
        .children('.photo')
        .css({
          'background-image': 'url(' + $(this).attr('data-image') + ')'
        });
    });

  /*==========================================================
   wow animated
    ======================================================================*/
  var wow = new WOW({
    animateClass: 'animated',
    mobile: false
  });
  wow.init();

  /* ----------------------------------------------------------- */
  /*  Back to top
   /* ----------------------------------------------------------- */

  $(window).on('scroll', function() {
    if ($(window).scrollTop() > $(window).height()) {
      $('.BackTo').fadeIn('slow');
    } else {
      $('.BackTo').fadeOut('slow');
    }
  });
  $('body, html').on('click', '.BackTo', function(e) {
    e.preventDefault();
    $('html, body').animate(
      {
        scrollTop: 0
      },
      800
    );
  });
});
