$(document).ready(function () {
    var actions = new Actions();
    if ($('.to-spend').length > 0) {
        actions.updateToSpend();
    }

    $('.new-data').click(function () {
        var $overlay = $('.block.overlay');

        $overlay.fadeIn();
        // add listener for focusout
        $overlay.on('click', function () {
           actions.killOverlay($(this))
        });

        $overlay.find('.centered').on('click', function (e) {
           e.stopPropagation();
        });

    });

    $('.push-data').click(function () {
        var expense = parseFloat($('.currency-input input').val());
        actions.sendExpense(expense, moment().format("YYYY-MM-DDTHH:mm:ss.SSS"));
        $('.block.overlay').hide();
    });

});
