var Actions = (function (){
    var Actions = function () {
    };

    Actions.prototype = {
        constructor: Actions,

        updateToSpend: function () {
            $.get(this.getRetrieveUrl(), function (data) {
                $('.to-spend').html(data.toSpend);
            });
        },

        sendExpense: function (expense, timeString) {
            var actions = this;

            $.get(this.getExpenseUrl(expense, timeString), function (data){
                actions.updateToSpend();
            });
        },

        getTodaysDate: function () {
            var currentDate = new Date();
            return currentDate.getFullYear() + '-' + this.getTwoDigits(currentDate.getMonth() + 1) + '-' + this.getTwoDigits(currentDate.getDate());
        },

        getTwoDigits: function (numberToPad) {
            return ("0" + (numberToPad)).slice(-2);
        },

        getTimeZoneOffset: function () {
            var clientSideDate = new Date();
            return clientSideDate.getTimezoneOffset();
        },

        getRetrieveUrl: function () {
          return '/retrieve/' + encodeURIComponent(new Date().toDateString());
        },

        getExpenseUrl: function (expense, timeString) {
          return '/expense/' + expense + '/' + encodeURI(timeString);
        },

        killOverlay: function ($overlay) {
          $overlay.hide();
          $overlay.off('click');
          $overlay.find('.centered').off('click');
        },

        saveLead: function (leadEmail) {
          $.post('/leads/', { email: leadEmail }, function (returnHtml) {
            $('.messaging').html(returnHtml);
          });
        },
    };

    return Actions;
}());

if (typeof module !== 'undefined') {
    module.exports = Actions;
}

