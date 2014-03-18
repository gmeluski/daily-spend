var chai = require('chai');
var userModel = require('../models/user');
var User = new userModel();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var testUserId = '539a2d9530231f83160869af';

mongoose.connect('mongodb://localhost/expensesTest');

describe('the userModel', function (){
    it('should return a number for getUserTotal', function() {
        //chai.expect(User.getUserTotal(testUserId)).to.be.a('number');
    });

    it('should return a success code when updating the user data', function(done) {
        var max = 100;
        var min = 1;
        var newSpend = Math.floor(Math.random() * (max - min + 1)) + min;

        var callback =  function (err, doc) {
            chai.expect(doc).to.be.an('object');
            chai.expect(doc.spend).to.equal(newSpend);
            done();
        };

        User.setSpend(testUserId, newSpend, callback);
    });

});
