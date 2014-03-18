var chai = require('chai');
var moment = require('moment');
var Actions = require('../../public/scripts/actions.js'); 
var actions = new Actions();


describe('the actions', function (){
    it('should return an integer for getTimeZone', function() {
        chai.expect(actions.getTimeZoneOffset()).to.be.a('number'); 
    });

    it('should return a two digit string for getTwoDigits', function() {
        var twoDigitsResponse = actions.getTwoDigits(5);
        chai.assert.lengthOf(twoDigitsResponse, 2, 'string has a length of two'); 
    });

    it('should return an string for getExpenseUrl', function() {
        var timeString = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"); 
        chai.expect(actions.getExpenseUrl('1.00'), timeString).to.be.a('string'); 
    });
    
    it('should return an string for getRetrieveUrl', function() {
        chai.expect(actions.getRetrieveUrl()).to.be.a('string'); 
    });
    
    it('should return an string for getTodaysDate', function() {
        var regularExpression = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
        var dateResult = actions.getTodaysDate();
        chai.expect(regularExpression.test(dateResult)).to.be.ok
        chai.expect(dateResult).to.be.a('string'); 
    });

});
