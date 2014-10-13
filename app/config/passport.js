var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var maxUsers = 10;

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },

        function (email, password, done) {

            process.nextTick(function (){

                var hookupUser = function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    // email is taken
                    if (user) {
                        return done(null, false);
                    } else {
                        var newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }

                            return done(null, newUser);
                        });
                    }
                }


                User.count({}, function (err, count) {
                    if (count < maxUsers) {
                        // begin user hookup
                        User.findOne({'local.email': email}, hookupUser); // end user hookup
                    } else {
                        return done(null, false)
                    }
                });
            });
        }

    ));


    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',

        },

        function (email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user){

                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false);
                }

                if (!user.validPassword(password)) {
                    return done(null, false);
                }

                return done(null, user);

            });
        }
    ));
};
