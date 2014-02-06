$(document).ready(function () {
    $('.new-data').click(function () {
        $('.block.overlay').fadeIn();    
    }); 

    $('.push-data').click(function () {
        var expense, expenseUrl;
        expense = parseFloat($('.currency-input input').val());
        expenseUrl = '/expense/' + expense;
        $.get(expenseUrl, function (data){
            $.get('/retrieve', function (data) {
                $('.to-spend').html(data.toSpend);
            });    
        }); 
        
        $('.block.overlay').hide();    
    }); 

    
});
