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

    it('should return an object for getDayRange', function() {
        chai.expect(spendModel.getDayRange()).to.be.an('object'); 
    });

});



describe('getDateString', function () {
    var testDate = new Date();
    var dateString = spendModel.getDateString(testDate);
    var dateStorage = dateString.split('-');
    
    it('should return a string for date string', function() {
        chai.expect(dateString).to.be.a('string'); 
    }); 

    it('should return a the right year as the first part of the string', function () {
       chai.assert.equal(dateStorage[0], testDate.getFullYear().toString());
    });

    it('should return the right month as the second part of the string', function () {
       chai.assert.equal(dateStorage[1], ('0' + (testDate.getMonth() + 1)).slice(-2));
    });

    it('should return the right day as the third part of the string', function () {
       chai.assert.equal(dateStorage[2], ('0' + (testDate.getDate())).slice(-2));
    });

});
