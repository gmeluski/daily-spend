
var actions = (function (){
    
    return {
        updateToSpend: function () {
            $.get('/retrieve', function (data) {
                $('.to-spend').html(data.toSpend);
            });    
        },

        test: function () {
            console.log('test');
        }
    }
}());

if (typeof module !== 'undefined') {
    module.exports = actions;
}

