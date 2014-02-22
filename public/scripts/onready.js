$(document).ready(function () {
    actions.updateToSpend(); 
    
    $('.new-data').click(function () {
        $('.block.overlay').fadeIn();    
    }); 

    $('.push-data').click(function () {
        var expense, expenseUrl;
        expense = parseFloat($('.currency-input input').val());
        expenseUrl = '/expense/' + expense;
        $.get(expenseUrl, function (data){
            actions.updateToSpend();
        }); 
        
        $('.block.overlay').hide();    
    });
    

    
});
