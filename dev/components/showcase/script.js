$('.showcase__list').slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    // arrows: false,
    prevArrow: $('.showcase__btn_prev'),
    nextArrow: $('.showcase__btn_next')
});

$('.showcase__item').on('click', function() {
    var img = $(this).find('img').clone();

    $('.showcase__pic').empty().append(img);
});

$('.showcase__item').first().trigger('click');