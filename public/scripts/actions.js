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

        sendExpense: function (expense) {
            $.get(this.getExpenseUrl(expense), function (data){
                this.updateToSpend();
            }); 
        },

        getTodaysDate: function () {
            var currentDate = new Date();
            return currentDate.getFullYear() + '-' + this.getTwoDigits(currentDate.getMonth() + 1) + '-' + this.getTwoDigits(currentDate.getDate());
        },

        getTwoDigits: function (numberToPad) {
            return ("0" + (numberToPad)).slice(-2)
        },

        getTimeZoneOffset: function () {
            var clientSideDate = new Date();
            return clientSideDate.getTimezoneOffset();
        },

        getRetrieveUrl: function () {
            return '/retrieve/' + encodeURIComponent(new Date().toDateString());
        },
        
        getExpenseUrl: function (expense) {
            return '/expense/' + expense + '/' + this.getTimeZoneOffset();
        }

    };
    
    return Actions
}());

if (typeof module !== 'undefined') {
    module.exports = Actions;
}

