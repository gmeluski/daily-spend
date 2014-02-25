var spendModel = require('../models/spend');

exports.index = function(req, res) {
    res.render('spend', { title: '30' });
};

exports.expense = function (req, res) {
    spendModel.writeExpense(res, req.params);
}

exports.retrieve = function (req, res) {
    spendModel.aggregateExpenses(function(remaining) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ toSpend: remaining })); 
    });

}
