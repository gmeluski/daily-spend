$(document).ready(function () {
    var actions = new Actions(); 
    actions.updateToSpend(); 
    
    $('.new-data').click(function () {
        $('.block.overlay').fadeIn();    
    }); 

    $('.push-data').click(function () {
        var expense = parseFloat($('.currency-input input').val());
        actions.sendExpense(expense); 
        $('.block.overlay').hide();    
    });
    

    
});
