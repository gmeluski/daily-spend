//var assert = require('chai').assert();
var chai = require('chai');
var spendModel = require('../models/spend');
var moment = require('moment');
var _ = require('underscore');

describe('the spendModel', function (){
    it('should return a string for start of day', function() {
        chai.expect(spendModel.getStartOfDay(new Date())).to.be.a('string'); 
    });
    
    it('should return a string for time string', function() {
        chai.expect(spendModel.getTimeString(new Date())).to.be.a('string'); 
    }); 

    it('should return a string for ISO string', function() {
        chai.expect(spendModel.getIsoString(moment())).to.be.a('string'); 
    }); 

    it('should return an object for getDayRange', function() {
        chai.expect(spendModel.getDayRange('2014-02-14')).to.be.an('object'); 
    });

    it('should return a number for getTimeZoneDifference', function() {
        chai.expect(spendModel.getTimeZoneDifference(new Date(), new Date().getTimezoneOffset())).to.be.a('number'); 
    });

});

describe('getWriteObject', function () {
    var writeObject = spendModel.getWriteObject('539a2d9530231f83160869af', '1.00', moment());
    
    it('should return an object', function () {
        chai.expect(writeObject).to.be.an('object');  
    });

    it('should have three properties', function () {
        chai.expect(_.size(writeObject)).to.equal(3);  
    });

});

describe('getTimeZoneDifference', function() {
    // this will return a value that will be used to adjust the server to the client timezone
    it('should return 0 when the two offsets are the same', function () {
        chai.expect(spendModel.getTimeZoneDifference(240,240)).to.be.equal(0); 
    });
    
    it('should return a negative value when the server time is greater than the client time', function () {
        chai.expect(spendModel.getTimeZoneDifference(240,120)).to.be.below(0); 
    });
    
    it('should return a positive value when the server offset is behind the client offset', function(){
        chai.expect(spendModel.getTimeZoneDifference(120,240)).to.be.above(0); 
    });
     
});

describe('getAdjustedTime', function () {
    var localDate = moment();   
    it('should return an adjusted time of two hours less the current time if the offset is 120', function () {
        var adjustedTime = spendModel.getAdjustedTime(localDate.toDate(), 360);
    });
      
    it('should return a date object for getAdjustedTime', function() {
        //chai.expect(spendModel.getAdjustedTime(new Date(), new Date().getTimezoneOffset())).to.be.an.instanceof(Date); 
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



