var user = require('../models/user');
var User = new user();

exports.login = function(req, res){
    res.render('login');
};

exports.loginFail = function (req, res) {
    res.render('loginFail');    
};


exports.signup = function(req, res){
    res.render('signup');
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/login');
};

exports.profile = function(req, res) {
    res.render('profile', {pageData: { spend: req.user.spend } });
};

exports.updateProfile = function(req, res) {
    var newSpend = req.param('spend');
    var userId = req.user._id;

    var callback = function () {
        res.render('profile', {pageData: { spend: newSpend }});
    };

    User.setSpend(userId.toString(), newSpend, callback);
}

exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login')
};
