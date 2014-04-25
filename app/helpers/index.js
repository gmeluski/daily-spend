module.exports = {

    decimalSwitch: function (numberToTest) {
        var decimalPlaces = (numberToTest % 1 === 0) ? 0 : 2;
        return numberToTest.toFixed(decimalPlaces);
    }
};
