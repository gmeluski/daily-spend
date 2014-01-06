var spendModel = require('../models/spend');

exports.index = function(req, res) {
    res.render('spend', { title: '30' });
};

exports.expense = function (req, res) {
    var amount = req.params.amount;
    spendModel.writeExpense(amount);
    res.type('text/plain');
    res.send('i am a beautiful butterfly'); 
}
