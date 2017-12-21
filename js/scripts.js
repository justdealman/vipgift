function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setPicRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.pic');
		t.height(t.width()*$(this).attr('data-ratio'));
	});
}
function setCategories() {
	var t = $('.categories');
	t.css({
		height: t.outerWidth()*1060/1920
	});
	$('.categories--item').eq(0).find('h5').width($('.categories--item').eq(1).find('h5').outerWidth());
}
function setGroupCatalog() {
	var t = $('.groups__catalog');
	t.find('.pic').css({
		height: (t.outerWidth()*534/1920)-50
	});
}
function setNewsGrid() {
	var t = $('.news__grid_all ul');
	t.height(t.width()*0.6);
	$('.news__grid_all .pic').each(function() {
		$(this).css({
			height: $(this).parent().height()
		});
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:999px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}


	$('.filter--title').on('click', function(e) {
		e.preventDefault();
		var t = $(this);
		if ( !t.hasClass('is-active') ) {
			if ( $('.filter--title.is-active').length > 0 ) {
				$('.filter--title.is-active').removeClass('is-active');
			}
			t.addClass('is-active');
		} else {
			t.removeClass('is-active');
		}
	});
	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.filter__item').length ) {
			$('.filter--title').removeClass('is-active');
		}
	});
	$('.card__picture').slick({
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300
	});
	$('.card__preview .pic').on('click', function(e) {
		e.preventDefault();
		$('.card__picture').slick('slickGoTo',parseInt($(this).attr('data'))-1);
	});
	$('.news__intro, .news__slider').slick({
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300
	});
	$('.news__gallery--slider').slick({
		slidesToShow: 5,
		slidesToSlide: 5,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300
	});
	$('input[type="checkbox"]').uniform();
	
	
	
	
	
	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {

			} else {

			}
		}
		if ( $('[data-ratio]').length ) {
			setPicRatio();
		}
		if ( $('.categories').length ) {
			setCategories();
		}
		if ( $('.groups__catalog').length ) {
			setGroupCatalog();
		}
		if ( $('.news__grid').length ) {
			setNewsGrid();
		}
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
});
