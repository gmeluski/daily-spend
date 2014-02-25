$(document).ready(function () {
    var actions = new Actions(); 
    actions.updateToSpend(); 
    
    $('.new-data').click(function () {
        $('.block.overlay').fadeIn();    
    }); 

    $('.push-data').click(function () {
        var expense, expenseUrl;
        expense = parseFloat($('.currency-input input').val());
        expenseUrl = '/expense/' + expense + '/' + actions.getTimeZoneOffset();
        
        $.get(expenseUrl, function (data){
            actions.updateToSpend();
        }); 
        
        $('.block.overlay').hide();    
    });
    

    
});
