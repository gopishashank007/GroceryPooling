history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});
jQuery(document).ready(function () {
    $('#divvehno').hide();
    $('#btnsubmit').hide();
    $('#divalert').hide();
    //debugger;
    if($('#divalert').html() == "")
        $('#divalert').hide();
    else {
        $('#divalert').show();
        setTimeout(function() {
            $('#divalert').fadeOut('slow');
        }, 5000);
    }

    /*
        Login form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function () {
        $(this).removeClass('input-error');
    });

    $('.login-form').on('submit', function (e) {
        $('#divalert').html();
        $(this).find('input[type="text"], input[type="password"], textarea').each(function () {
            if ($(this).val() == "") {
                e.preventDefault();
                $(this).addClass('input-error');
            } else {
                $(this).removeClass('input-error');
            }
        });

    });

    /*
        Registration form validation
    */
    $('.registration-form input[type="text"], .registration-form textarea').on('focus', function () {
        $(this).removeClass('input-error');
    });

    $('.registration-form').on('submit', function (e) {

        $(this).find('input[type="text"], textarea').each(function () {
            if ($(this).val() == "") {
                e.preventDefault();
                $(this).addClass('input-error');
            } else {
                $(this).removeClass('input-error');
            }
        });

    });

    $('input:radio').change(function () {
        //debugger;
        if (this.value == '1') {
            $('#btnsubmit').show();
            $('#divvehno').hide();
        } else if (this.value == '2') {
            $('#btnsubmit').show();
            $('#divvehno').show();
        } else
            $('#btnsubmit').hide();
    });

    if (!navigator.geolocation) {


    } else {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Get the coordinates of the current possition.
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            $('#location').val(lat + ',' + lng);
        });
    }
});
