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

