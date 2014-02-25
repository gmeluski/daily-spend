var chai = require('chai');
var Actions = require('../../public/scripts/actions.js'); 
var actions = new Actions();


describe('the actions', function (){
    it('should return an integer for getTimeZone', function() {
        chai.expect(actions.getTimeZoneOffset()).to.be.a('number'); 
    });

});
