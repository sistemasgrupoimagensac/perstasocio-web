$(document).ready(function(){
    $("#owl-carousel").owlCarousel({
        items:3,
        loop:true,
        margin:10,
        autoplay:true,
        autoWidth:false,
        autoplayTimeout:1500,
        autoplayHoverPause:true,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items:2
            },
            768 : {
                items:3
            }
        }
        
    });
    $("#nosotros_owl-carousel").owlCarousel({
        items: 2,
        loop: true,
        margin: 10,
        autoplay: true,
        autoWidth: false,
        autoplayTimeout: 1500,
        autoplayHoverPause: true,
        responsive : {
            // breakpoint from 0 up
            768 : {
                items:1
            },
            992 : {
                items:2
            }
        }
    });
    
  });