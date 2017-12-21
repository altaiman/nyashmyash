$('[data-open]').on('click', function(e) {
    e.preventDefault();

    var modal = $(this).data('open');

    if (modal === 'login') {
        var type = $(this).data('type');
                
        $.fancybox.open({
            src: '#'+modal,
        })

        $('#login .tab a[href="#'+type+'"]').trigger('click');
        
        return
    }

    $.fancybox.open({
        src: '#'+modal,
    })
});