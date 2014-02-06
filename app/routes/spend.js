var spendModel = require('../models/spend');

exports.index = function(req, res) {
    res.render('spend', { title: '30' });
};

exports.expense = function (req, res) {
    var amount = req.params.amount;
    spendModel.writeExpense(amount, res);
}

exports.retrieve = function (req, res) {
    var total = 30;
    spendModel.aggregateExpenses(total, res);

}
