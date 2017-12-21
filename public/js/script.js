$(function(){
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
});
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

$('.showcase__item').first().trigger('click');;
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
};
    $('.gallery__item').on('click', function() {
    $('.gallery__item.active').removeClass('active');

    var image = $(this).data('image');

    $(this).addClass('active');
    $('.gallery__big').empty().append('<img src="'+image+'"/>')
});

$('.gallery__item').first().trigger('click');;
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
});;

    $('.city__current').on('click', function() {
        $('.city__choose').show();
    });

    $('.close').on('click', function() {
        $(this).parent().hide();
    });

    $('.cart__items').jScrollPane();

    function rangeSlider() {
        var range = $('.range__slider'),
            min = $(range).attr('min'),
            max = $(range).attr('max'),
            value = $(range).attr('value'),
            step = $(range).attr('step');

        $('.range__num_from input').val(min);
        $('.range__num_to input').val(max);

        $(range).ionRangeSlider({
            type: 'double',
            min: min,
            max: max,
            from: value,
            step: step,

            onChange: function(data) {
                console.log(data);
                $('.range__num_from input').val(data.from);
                $('.range__num_to input').val(data.to);
            }
        });
    }

    rangeSlider();

    $('[data-toggle]').on('click', function() {
        var status = $(this).attr('data-toggle');

        (status === 'open') ? $(this).attr('data-toggle', 'close') : $(this).attr('data-toggle', 'open');
    })

    $('select').niceSelect();

    $('.counter__btn').on('click', function() {
        
        var counter = $(this).parent().find('input').get(0),
            val = +$(counter).val(),
            max = $(counter).data('max');

        switch ($(this).hasClass('counter__btn_up')) {
            case true:
                if (val === max) return;
                $(counter).val(++val);
                break;
            case false:
                if (val <= 1) return;
                $(counter).val(--val);
                break;
        }
    });

    $('.counter__input').on('change', function() {
        var val = $(this).val(),
            max = $(this).data('max');

        if (isNaN(val) || val <= 0) {
            $(this).val(1);
        } else if (val > max) {
            $(this).val(max);
        }
    })

    $('.m-nav__menu-btn').on('click', function() {
        $(this).parent().toggleClass('open');
    });
    
    $('.m-list__item_back').on('click', function(e) {
        e.preventDefault();
        $('.m-list__item_drop.open').removeClass('open');
        $('.m-list').css('height', '');
        $('.m-list__item_drop').css('position', '');
    });

    $('.m-list__item_drop').on('click', function(e) {
        e.preventDefault();
        if ($(e.target).parent().hasClass('m-list__item_back')) return;

        $(this).addClass('open');
        $(this).css('position', 'static');

        var th = $(this).get(0),
            h = $(th).find('.m-list__drop').first().css('height');

        $('.m-list').css('height', h);
    });

    $('.search_m').on('click', function(e) {
        var target = e.target;

        if ($(this).hasClass('focus') && target.tagName === 'DIV') {
            $(this).removeClass('focus');
            return;
        }

        $(this).addClass('focus');
    })


    $('.radio').on('click', function() {
        $(this).parent().find('.radio.checked').removeClass('checked').removeClass('checked_more');
        $(this).addClass('checked');
        
        if ($(this).find('.radio__more').get(0)) {
            $(this).addClass('checked_more')
        }
    })

    $('.radio input:checked').parent().trigger('click');


    if ($('#pointmap').get(0)) {
        ymaps.ready(init);
        var myMap, 
            myPlacemark;
    
        function init(){ 
            myMap = new ymaps.Map("pointmap", {
                center: [55.76, 37.64],
                zoom: 7,
                controls: []
            }); 
            
            myPlacemark = new ymaps.Placemark([55.76, 37.64], {
                balloonContent: '<div class="baloon"><b>Название:</b><p>Няшки</p><b>Адрес</b><p>Москва 125047 1 Тверская-Ямская ул 4</p><b>Время работы</b><p>09:00 - 19:00</p><b>Срок доставки:</b><p>2-3 дня</p><button class="btn btn_sq">Выбрать</button></div>'
            }, {
                iconLayout: 'default#image',
                iconImageHref: '../img/mark.png',
                iconImageSize: [43, 61],
                iconImageOffset: [-23, -58]
            });
            
            myMap.geoObjects.add(myPlacemark);
        }
    } 
});