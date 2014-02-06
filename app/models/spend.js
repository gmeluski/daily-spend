var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
var mongoClient = new MongoClient(new Server('localhost', 27017));
var userModel = require('./user');


module.exports = {
    returnCollection: function () {
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend'); 
        return collection;
    },

    writeExpense: function (amount) {
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend'); 
        // why is ISOString time farther ahead of getDate at say, 7 o'clock local time. WTF is up with that?
        
        var insertObject = {
                userId: 1,
                createdOn: this.getIsoString(new Date()),
                amount: parseFloat(amount)
            };

        mongoClient.open(function(err, mongoClient) {
            collection.insert(insertObject, function () {
                mongoClient.close();    
            });
        });   
    },

    getIsoString: function (date) {
        return this.getDateString(date) + this.getTimeString(date);
    },
    
    getTimeString: function(date) {
        if (date) {
            return 'T' + this.padNumber(date.getHours()) + ':' + this.padNumber(date.getMinutes()) + ':' + this.padNumber(date.getSeconds()) + '.' + date.getMilliseconds() +'Z';
        } else {
            return 'T00:00:00.000Z';
        }
    },

    getDateString: function (date) {
        return date.getFullYear() + '-' + this.padNumber(date.getMonth() + 1) + '-' + this.padNumber(date.getDate());
    },

    padNumber: function (number) { 
        return ("0" + number).slice(-2); 
    },

    getStartOfDay: function (desiredDate) {
        var newDayString = this.getDateString(desiredDate) + this.getTimeString();
        return new Date(newDayString).toISOString(); 
    },

    getDayRange: function () {
        var today = new Date();
        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        var startToday = this.getStartOfDay(today);
        var endToday = this.getStartOfDay(tomorrow);
        return { $gte: startToday, $lt: endToday }; 
    },

    aggregateExpenses: function (total, response) {
        var spendModel = this;

        var matchObject = { $match: { createdOn: spendModel.getDayRange() }};  
        var groupObject = {$group: {_id: '0', sum: {$sum: '$amount'} }}
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend'); 
       
        var aggregateCallback = function (err, result) {
                console.log(result);
                var remaining = (result) ? userModel.getUserTotal() - result[0].sum : userModel.getUserTotal(); 
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify({ toSpend: remaining })); 
                mongoClient.close();
        }
        
        mongoClient.open(function (err, mongoClient) {
            collection.aggregate([matchObject, groupObject], aggregateCallback); 
        });

    }



    
};
