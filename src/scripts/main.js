jQuery(document).ready(function($){
	var $lateral_menu_trigger = $('#cd-menu-trigger'),
		$content_wrapper = $('.cd-main-content'),
		$navigation = $('header');

	//open-close lateral menu clicking on the menu icon
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();
		
		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('body').toggleClass('overflow-hidden');
		$('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
		
		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('click', function(event){
		if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$navigation.removeClass('lateral-menu-is-open');
			$content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('#cd-lateral-nav').removeClass('lateral-menu-is-open');
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});

	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});

	var sections = $('a.section');
	sections.hover(
		function () {
			sections.not($(this)).addClass("unhover");
		},
		function () {
			sections.not($(this)).removeClass("unhover");
		});

	//slider
	jQuery(document).ready(function($) {
			$('.slider-wrap').unslider({
				autoplay : true,
				arrows: {
					prev: '<a class="unslider-arrow prev"><</a>',
					next: '<a class="unslider-arrow next">></a>'
				}
			});
		});

	});

window.onload = ymaps.ready(function () {
	var myMap = new ymaps.Map("map", {
		center: [44.95912356, 34.10562413],
		zoom: 13
	});

	var a = new ymaps.Placemark([44.94466062, 34.09975469], {
		hintContent: 'Кочерга - магазин шашлыка',
		balloonContent: 'на Турецкой, 28',
		iconContent : 'Кочерга - магазин шашлыка',
		balloonContentHeader : 'Кочерга - магазин шашлыка'
	},{
		preset :'islands#darkOrangeStretchyIcon'
	});

	var b = new ymaps.Placemark([44.59138563, 33.49232170], {
		hintContent: 'Кочерга - магазин шашлыка',
		balloonContent: 'на Руднева, 39В',
		iconContent : 'Кочерга - магазин шашлыка',
		balloonContentHeader : 'Кочерга - магазин шашлыка'
	},{
		preset :'islands#darkOrangeStretchyIcon'
	});


	myMap.geoObjects.add(a);
	myMap.geoObjects.add(b);
});