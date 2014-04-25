var helpers = require('../helpers/index.js');
var chai = require('chai');

describe('decimal switch', function (){ 
    it('should return a string', function() {
        chai.expect(helpers.decimalSwitch(2.00)).to.be.a('string'); 
    });
    
    it('should no decimals when given a number rounded to zero', function() {
        chai.expect(helpers.decimalSwitch(2.00)).to.equal('2'); 
    });
    
    
    it('should decimals when given a number that is not rounded to zero', function() {
        chai.expect(helpers.decimalSwitch(2.35)).to.equal('2.35'); 
    });
});
