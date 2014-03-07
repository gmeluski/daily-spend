var chai = require('chai');
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

    it('should return an string for getTodaysDate', function() {
        var regularExpression = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
        var dateResult = actions.getTodaysDate();
        chai.expect(regularExpression.test(dateResult)).to.be.ok
        chai.expect(dateResult).to.be.a('string'); 
    });

});
