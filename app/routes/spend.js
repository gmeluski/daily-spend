var spendModel = require('../models/spend');
var helpers = require('../helpers/index');
var userModel = require('../models/user');
var leadModel = require('../models/lead');

exports.index = function(req, res) {
    // use req.user to lookup stuff??
    res.render('spend', { title: '30' });
};


exports.why = function(req, res) {
    res.render('why', { title: 'Why Daily Spend' });
};

exports.landing = function(req, res) {
    res.render('landing', { title: 'Daily Spend' });
};

exports.expense = function (req, res) {
    spendModel.writeExpense(req.user._id, req.params, res);
};

exports.leads = function (req, res) {
  var leadData = new leadModel({email: req.body.email });
  leadData.save(function (err) {
    if (err) {
      res.send('oops, something blew up');
      return handleError(err);
    }

   res.send('it worked');
  });

};

exports.retrieve = function (req, res) {
    spendModel.aggregateExpenses(req, function(remaining) {
        res.setHeader('Content-Type', 'application/json');
        // add a helper method to determine the switch
        res.end(JSON.stringify({ toSpend: helpers.decimalSwitch(remaining) }));
    });

};

exports.roadmap = function (req, res) {
    res.render('roadmap', {title: 'Roadmap'});
};
