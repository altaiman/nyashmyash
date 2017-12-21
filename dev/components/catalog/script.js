$('.catalog__item-wrap').on('click', function(e) {
    var d = $(this).data('d');

    $('.catalog__item-wrap.open').removeClass('open');
    $('.open-left').removeClass('open-left')
    $('.open-right').removeClass('open-right');

    $(this).addClass('open');

    switch (d) {
        case 0:
            $(this).parent().addClass('open-left');
            break;
        case 1:
            $(this).parent().addClass('open-right');
            break;
    } 
});

if ($(window).width() <= 1000) {
    var block = $('.catalog__item_wide .catalog__item-wrap:nth-child(2)');
    $(block).attr('data-d', 0);
}