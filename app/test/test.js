//var assert = require('chai').assert();
var chai = require('chai');
var spendModel = require('../models/spend');

describe('the spendModel', function (){
    it('should return a string for start of day', function() {
        chai.expect(spendModel.getStartOfDay(new Date())).to.be.a('string'); 
    });
    
    it('should return a string for time string', function() {
        chai.expect(spendModel.getTimeString(new Date())).to.be.a('string'); 
    }); 


    it('should return a string for ISO string', function() {
        chai.expect(spendModel.getIsoString(new Date())).to.be.a('string'); 
    }); 
});

describe('getDateString', function () {
    var testDate = new Date();
    var dateString = spendModel.getDateString(testDate);
    
    it('should return a string for date string', function() {
        chai.expect(dateString).to.be.a('string'); 
    }); 

    it('should return a the right year as the first part of the string', function () {
       var dateStorage = dateString.split('-');
       chai.assert.equal(dateStorage[0], testDate.getFullYear().toString());
    });
});
