var chai = require('chai');
var userModel = require('../models/user');

describe('the userModel', function (){
    it('should return a number for getUserTotal', function() {
        chai.expect(userModel.getUserTotal()).to.be.a('number'); 
    });

});
