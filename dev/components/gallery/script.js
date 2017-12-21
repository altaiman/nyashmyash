$('.gallery__item').on('click', function() {
    $('.gallery__item.active').removeClass('active');

    var image = $(this).data('image');

    $(this).addClass('active');
    $('.gallery__big').empty().append('<img src="'+image+'"/>')
});

$('.gallery__item').first().trigger('click');