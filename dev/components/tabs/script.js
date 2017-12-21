$('.tab').on('click', function(e) {
    e.preventDefault();

    var tabs = $(this).parent();
    $(tabs).find('.tab_selected').removeClass('tab_selected');

    $(this).addClass('tab_selected');

    var tab = $(this).find('a').first().attr('href').split('#')[1],
        container = $(this).parentsUntil('.tabs').parent().get(0);

    $(container).find('[data-tab]').hide();
    $(container).find('[data-tab="'+tab+'"]').show();
})

$('.tabs').each(function(i,tabs){
    $(tabs).find('.tab').first().trigger('click');
})