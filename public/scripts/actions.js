$(document).ready(function () {
    updateToSpend();
    
    $('.new-data').click(function () {
        $('.block.overlay').fadeIn();    
    }); 

    $('.push-data').click(function () {
        var expense, expenseUrl;
        expense = parseFloat($('.currency-input input').val());
        expenseUrl = '/expense/' + expense;
        $.get(expenseUrl, function (data){
            updateToSpend();
        }); 
        
        $('.block.overlay').hide();    
    });
    
    function updateToSpend() {
        $.get('/retrieve', function (data) {
            $('.to-spend').html(data.toSpend);
        });    
    }

    
});
