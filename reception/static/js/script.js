(function(a){function c(){if(a(".preloader").length){a(".preloader").delay(200).fadeOut(500)}}function d(){if(a(".main-header").length){var m=a(window).scrollTop();var k=a(".main-header");var j=a(".scroll-to-top");var l=a(".main-header .sticky-header");if(m>700){k.addClass("fixed-header");j.fadeIn(300)}else{k.removeClass("fixed-header");j.fadeOut(300)}}}d();(function(j){var k=0;var l=j(".main-header .sticky-header");j(window).scroll(function(){var m=j(this).scrollTop();if(m>k){j(".main-header .sticky-header").css({position:"fixed",width:"100%",top:"-120px"})}else{j(".main-header .sticky-header").css({top:"0"})}k=m})})(jQuery);if(a(".main-header li.dropdown ul").length){a(".main-header .navigation li.dropdown").append('<div class="dropdown-btn"><span class="fa fa-plus"></span></div>')}if(a(".mobile-menu").length){var f=a(".main-header .nav-outer .main-menu").html();var e=a(".main-header .nav-outer .outer-box").html();var g=a(".main-header .nav-outer .main-menu").html();a(".mobile-menu").append('<div class="close-btn"><span class="icon fa fa-times"></span></div>');a(".mobile-header .nav-outer").append('<div class="mobile-nav-toggler"><span class="icon fa fa-bars"></span></div>');a(".mobile-menu .menu-box").append(f);a(".mobile-header .nav-outer").append(e);a(".sticky-header .main-menu").append(g);a(".sticky-header .main-menu .navbar-collapse").addClass("show");a(".mobile-menu .menu-box .navbar-collapse").addClass("show");a(".mobile-menu .close-btn").on("click",function(){a("body").removeClass("mobile-menu-visible")});a(".mobile-menu li.dropdown .dropdown-btn").on("click",function(){a(this).prev("ul").slideToggle(500);a(this).toggleClass("active")});a(".mobile-nav-toggler").on("click",function(){a("body").addClass("mobile-menu-visible")});a(".mobile-menu .menu-backdrop,.mobile-menu .close-btn").on("click",function(){a("body").removeClass("mobile-menu-visible")})}if(a(".search-btn").length){a(".search-btn").on("click",function(){a(".main-header").addClass("search-active")});a(".close-search, .search-back-drop").on("click",function(){a(".main-header").removeClass("search-active")})}if(a(".services-carousel").length){a(".services-carousel").owlCarousel({loop:true,margin:0,nav:false,smartSpeed:700,autoplay:false,navText:['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],responsive:{0:{items:1},600:{items:2},768:{items:2},1024:{items:3},1280:{items:4}}})}if(a(".recipes-carousel").length){a(".recipes-carousel").owlCarousel({loop:true,margin:0,nav:false,smartSpeed:400,autoplay:false,navText:['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],responsive:{0:{items:1},768:{items:1},1024:{items:1}}})}if(a(".testimonial-carousel").length){a(".testimonial-carousel").owlCarousel({loop:true,margin:0,nav:true,smartSpeed:700,autoplay:true,navText:['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],responsive:{0:{items:1},600:{items:1},1024:{items:1},}})}if(a(".testimonial-carousel-two").length){a(".testimonial-carousel-two").owlCarousel({loop:false,margin:30,nav:true,smartSpeed:700,autoplay:true,navText:['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],responsive:{0:{items:1},768:{items:2},1024:{items:3},}})}if(a(".portfolio-carousel").length){a(".portfolio-carousel").owlCarousel({loop:false,margin:0,nav:false,smartSpeed:400,autoplay:false,navText:['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],responsive:{0:{items:1},600:{items:2},768:{items:2},1024:{items:3}}})}if(a(".team-carousel").length){a(".team-carousel").owlCarousel({loop:false,margin:0,nav:false,smartSpeed:700,autoplay:false,navText:['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],responsive:{0:{items:1},600:{items:2},768:{items:2},1024:{items:3},1280:{items:4}}})}if(a(".single-item-carousel").length){a(".single-item-carousel").owlCarousel({loop:true,margin:0,nav:true,smartSpeed:700,autoplay:false,navText:['<span class="fa fa-arrow-left"></span>','<span class="fa fa-arrow-right"></span>'],responsive:{0:{items:1},600:{items:1},1024:{items:1}}})}if(a(".four-items-carousel").length){a(".four-items-carousel").owlCarousel({loop:false,margin:0,nav:false,smartSpeed:700,autoplay:false,navText:['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],responsive:{0:{items:1},600:{items:2},768:{items:2},1024:{items:3},1280:{items:4}}})}if(a(".sticky-sidebar").length){a(".sidebar-side").theiaStickySidebar({additionalMarginTop:60})}if(a(".sortby-select").length){a(".sortby-select").select2()}if(a(".cooked-single-ingredient").length){a(".cooked-single-ingredient .cooked-ingredient-checkbox").on("click",function(){a(this).parent(".cooked-single-ingredient").toggleClass("checked")})}a("#call-btn").on("click",function(j){j.preventDefault();this.blur();a.get(this.href,function(k){a(k).appendTo("body").modal({clickClose:false,closeClass:"cooked-close-fsm",closeExisting:true,fadeDuration:300,fadeDelay:0.15})})});if(a(".dial").length){a(".dial").appear(function(){var k=a(this);var j=k.attr("data-fgColor");var l=k.attr("value");k.knob({value:0,min:0,max:100,skin:"tron",readOnly:true,thickness:0.06,dynamicDraw:true,displayInput:false});a({value:0}).animate({value:l},{duration:2000,easing:"swing",progress:function(){k.val(Math.ceil(this.value)).trigger("change")}});a(this).append(function(){})},{accY:20})}if(a(".video-section").length){function i(){a(function(){a("[data-youtube]").youtube_background({})})}i()}function b(){if(a(".masonry-items-container").length){var k=a(window);var j=a(".masonry-items-container");j.isotope({itemSelector:".masonry-item",masonry:{columnWidth:".masonry-item"},animationOptions:{duration:500,easing:"linear"}});k.on("resize",function(){j.isotope({itemSelector:".masonry-item",animationOptions:{duration:500,easing:"linear",queue:false}})})}}b();if(a(".filter-list").length){a(".filter-list").mixItUp()}if(a(".message-box").length){a(".message-box .close-btn").on("click",function(j){a(this).parent(".message-box").fadeOut()})}if(a(".accordion-box").length){a(".accordion-box").on("click",".acc-btn",function(){var j=a(this).parents(".accordion-box");var k=a(this).parents(".accordion");if(a(this).hasClass("active")!==true){a(j).find(".accordion .acc-btn").removeClass("active ")}if(a(this).next(".acc-content").is(":visible")){return false}else{a(this).addClass("active");a(j).children(".accordion").removeClass("active-block");a(j).find(".accordion").children(".acc-content").slideUp(300);k.addClass("active-block");a(this).next(".acc-content").slideDown(300)}})}if(a(".count-box").length){a(".count-box").appear(function(){var j=a(this),k=j.find(".count-text").attr("data-stop"),l=parseInt(j.find(".count-text").attr("data-speed"),10);if(!j.hasClass("counted")){j.addClass("counted");a({countNum:j.find(".count-text").text()}).animate({countNum:k},{duration:l,easing:"linear",step:function(){j.find(".count-text").text(Math.floor(this.countNum))},complete:function(){j.find(".count-text").text(this.countNum)}})}},{accY:0})}if(a(".progress-line").length){a(".progress-line").appear(function(){var j=a(this);var k=j.data("width");a(j).css("width",k+"%")},{accY:0})}if(a(".tabs-box").length){a(".tabs-box .tab-buttons .tab-btn").on("click",function(j){j.preventDefault();var k=a(a(this).attr("data-tab"));if(a(k).is(":visible")){return false}else{k.parents(".tabs-box").find(".tab-buttons").find(".tab-btn").removeClass("active-btn");a(this).addClass("active-btn");k.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0);k.parents(".tabs-box").find(".tabs-content").find(".tab").removeClass("active-tab animated fadeIn");a(k).fadeIn(300);a(k).addClass("active-tab animated fadeIn")}})}if(a(".price-range-slider").length){a(".price-range-slider").slider({range:true,min:0,max:90,values:[0,84],slide:function(j,k){a("input.property-amount").val(k.values[0]+" - "+k.values[1])}});a("input.property-amount").val(a(".price-range-slider").slider("values",0)+" - $"+a(".price-range-slider").slider("values",1))}if(a(".lightbox-image").length){a(".lightbox-image").fancybox({openEffect:"fade",closeEffect:"fade",helpers:{media:{}}})}if(a("#email-form").length){a("#submit").click(function(){var l=new Object();var k="#email-form";var m=a("#email-form .username").val();var j=a("#email-form .email").val();if(m==""||j==""){a("#email-form .response").html('<div class="failed">Please fill the required fields.</div>');return false}a.ajax({url:"sendemail.php",method:"POST",data:a(k).serialize(),beforeSend:function(){a("#email-form .response").html('<div class="text-info"><img src="images/icons/preloader.gif"> Loading...</div>')},success:function(n){a("form").trigger("reset");a("#email-form .response").fadeIn().html(n);setTimeout(function(){a("#email-form .response").fadeOut("slow")},5000)},error:function(){a("#email-form .response").fadeIn().html(data)}})})}if(a("#subscribe-form").length){a("#subscribe-newslatters").click(function(){var l=new Object();var k="#subscribe-form";var j=a("#subscribe-form .email").val();if(j==""){a("#subscribe-form .response").html('<div class="failed">Please enter your Email Address.</div>');return false}a.ajax({url:"sendnewslatters.php",method:"POST",data:a(k).serialize(),beforeSend:function(){a("#subscribe-form .response").html('<div class="text-info"><img src="images/icons/preloader.gif"> Loading...</div>')},success:function(m){a("form").trigger("reset");a("#subscribe-form .response").fadeIn().html(m);setTimeout(function(){a("#subscribe-form .response").fadeOut("slow")},5000)},error:function(){a("#subscribe-form .response").fadeIn().html(data)}})})}if(a(".scroll-to-target").length){a(".scroll-to-target").on("click",function(){var j=a(this).attr("data-target");a("html, body").animate({scrollTop:a(j).offset().top},1500)})}if(a(".wow").length){var h=new WOW({boxClass:"wow",animateClass:"animated",offset:0,mobile:false,live:true});h.init()}a(window).on("scroll",function(){d()});a(window).on("load",function(){c();b()})})(window.jQuery);