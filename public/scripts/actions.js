var Actions = (function (){
    var Actions = function () {
        console.log('init');
    };
   
    Actions.prototype = {
        constructor: Actions,

        updateToSpend: function () {
            $.get('/retrieve', function (data) {
                $('.to-spend').html(data.toSpend);
            });    
        },

        test: function () {
            console.log('test');
        }

    };
    
    return Actions
}());

if (typeof module !== 'undefined') {
    module.exports = Actions;
}

