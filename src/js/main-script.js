$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    $('.center').slick({
        centerMode: true,
        centerPadding: '0',
        dots: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 771,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.popup-gallery1').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        }
    });
    $('.popup-gallery2').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        }
    });


    let consultationCheckbox = false;

    $('.consultation .non-checked').on('click', function () {
        $('.consultation .checkmark').toggleClass('show-checkmark');
        consultationCheckbox = !consultationCheckbox;
    });

    $('.btn.burger').on('click', function () {
        $('.pop-up-menu').addClass('menu-open');
    });

    $('.pop-up-menu *:not(span)').each(function () {
        $(this).on('click', function () {
            $('.pop-up-menu').removeClass('menu-open');
        });
    });

    let hasError = false;

    $('#consultation-btn').click(function () {
        let name = $('#consultation-name');
        let phone = $('#consultation-phone');
        let checkboxPath = $('.consultation .non-checked path');

        // loader.css('display', 'flex');
        name.css('border-color', 'rgb(255, 255, 255)');
        phone.css('border-color', 'rgb(255, 255, 255)');
        checkboxPath.css('stroke', 'rgb(255, 255, 255)');

        $('.error-input').hide();

        if (!name.val()) {
            name.next().show();
            name.css('border-color', '#ff4343');
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('border-color', '#ff4343');
            hasError = true;
        }
        if (!consultationCheckbox) {
            $('.consultation-checkbox .error-input').show();
            checkboxPath.css('stroke', '#ff4343');
            hasError = true;
        }

        if (!hasError) {
            $.ajax({
                method: 'POST',
                url: 'https://testologia.ru/checkout',
                data: {name: name.val(), consultationCheckbox: consultationCheckbox, phone: phone.val()}
            })
                .done(function (message) {
                    if (message.success) {
                        alert('Ваша заявка успешно отправлена, ожидайте звонка!');
                        $('#consultation-form').hide();
                        $('.consultation .success-info').css('display', 'flex');
                    } else {
                        alert('Возникла ошибка, позвоните и мы вас проконсультируем!');
                    }
                })
        }
    });

    let bookingCheckbox = false;
    $('.booking .non-checked').on('click', function () {
        $('.booking .checkmark').toggleClass('show-checkmark');
        bookingCheckbox = !bookingCheckbox;
    });

    $('#booking-popup-btn').click(function () {
        let name = $('#booking-name');
        let phone = $('#booking-phone');
        let checkboxPath = $('.booking .non-checked path');
        let hasError = false;

        // loader.css('display', 'flex');
        name.css('border-color', 'rgb(255, 255, 255)');
        phone.css('border-color', 'rgb(255, 255, 255)');
        checkboxPath.css('stroke', 'rgb(255, 255, 255)');

        $('.error-input').hide();

        if (!name.val()) {
            name.next().show();
            name.css('border-color', '#ff4343');
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('border-color', '#ff4343');
            hasError = true;
        }
        if (!bookingCheckbox) {
            $('.booking-checkbox .error-input').show();
            checkboxPath.css('stroke', '#ff4343');
            hasError = true;
        }

        if (!hasError) {
            $.ajax({
                method: 'POST',
                url: 'https://testologia.ru/checkout',
                data: {name: name.val(), bookingCheckbox: bookingCheckbox, phone: phone.val()}
            })
                .done(function (message) {
                    if (message.success) {
                        alert('Ваша заявка успешно отправлена, ожидайте звонка!');
                        $('#booking-form').hide();
                        $('.booking .success-info').css('display', 'flex');
                    } else {
                        alert('Возникла ошибка, позвоните нам!');
                    }
                })
        }
    });

    $('#booking-close-btn').on('click', function () {
        $('.booking-modal').css('display', 'none');
    });

    $('#booking-btn').on('click', function () {
        $('.booking-modal').css('display', 'flex');
    });

    let visibleProjects;

    let showAdditionalText = $('#show-additional span');
    $('#show-additional').click(function () {
        if (showAdditionalText.text() === 'Посмотреть ещё 3 проекта') {
            // console.log(showAdditionalText.text());
            $('.additional').css('display', 'flex');
            visibleProjects = $('.project:visible');
            visibleProjects.removeClass('last'); // Добавляем класс last к последнему видимому проекту
            visibleProjects.last().addClass('last'); // Добавляем класс last к последнему видимому проекту
            showAdditionalText.text('Свернуть');
            showAdditionalText.next().css('transform', 'rotate(180deg)');
        } else {
            $('.additional').css('display', 'none');
            visibleProjects = $('.project:visible');
            visibleProjects.removeClass('last'); // Добавляем класс last к последнему видимому проекту
            visibleProjects.last().addClass('last'); // Добавляем класс last к последнему видимому проекту
            showAdditionalText.text('Посмотреть ещё 3 проекта');
            showAdditionalText.next().css('transform', 'rotate(0)');
        }
    });

    $('.technology-btn').on('click', function() {
        // Удаляем класс .active у всех родителей
        $('.technology-btn').parent().removeClass('active');

        // Добавляем класс .active к родителю нажатой кнопки
        $(this).parent().addClass('active');
    });
});