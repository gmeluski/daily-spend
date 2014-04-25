var spendModel = require('../models/spend');
var helpers = require('../helpers/index');

exports.index = function(req, res) {
    res.render('spend', { title: '30' });
};

exports.expense = function (req, res) {
    spendModel.writeExpense(res, req.params);
}

exports.retrieve = function (req, res) {
    spendModel.aggregateExpenses(req.params, function(remaining) {
        res.setHeader('Content-Type', 'application/json');
        // add a helper method to determine the switch
        res.end(JSON.stringify({ toSpend: helpers.decimalSwitch(remaining) })); 
    });

}
