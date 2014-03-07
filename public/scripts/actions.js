var Actions = (function (){
    var Actions = function () {
    };
   
    Actions.prototype = {
        constructor: Actions,

        updateToSpend: function () {
            var getUrl = '/retrieve/' + this.getTimeZoneOffset();
            
            $.get(getUrl, function (data) {
                $('.to-spend').html(data.toSpend);
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
        }


    };
    
    return Actions
}());

if (typeof module !== 'undefined') {
    module.exports = Actions;
}

