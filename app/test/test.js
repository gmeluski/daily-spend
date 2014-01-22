//var assert = require('chai').assert();
var chai = require('chai');
var spendModel = require('../models/spend');

describe('testing the spendModel', function (){
    it('should return a string for start of day', function() {
        chai.expect(spendModel.getStartOfDay(new Date())).to.be.a('string'); 
    }); 
    
});
