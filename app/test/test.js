//var assert = require('chai').assert();
var chai = require('chai');
var spendModel = require('../models/spend');

describe('the spendModel', function (){
    it('should return a string for start of day', function() {
        chai.expect(spendModel.getStartOfDay(new Date())).to.be.a('string'); 
    }); 
    
    it('should return a string for the proper time', function() {
        chai.expect(spendModel.getProperTime(new Date(), 'T00:00:00.000Z')).to.be.a('string'); 
    }); 

    
    it('should return a string for time string', function() {
        chai.expect(spendModel.getTimeString(new Date())).to.be.a('string'); 
    }); 
    
});
