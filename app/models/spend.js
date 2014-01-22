var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
var mongoClient = new MongoClient(new Server('localhost', 27017));

module.exports = {
    returnCollection: function () {
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend'); 
        return collection;
    },

    writeExpense: function (amount) {
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend'); 
        var insertObject = {
                userId: 1,
                createdOn: new Date().toISOString(),
                amount: parseFloat(amount)
            };

        mongoClient.open(function(err, mongoClient) {
            collection.insert(insertObject, function () {
                mongoClient.close();    
            });
        });   
    },

    getStartOfDay: function (desiredDate) {
        var newDayHours = 'T00:00:00.000Z';
        var properMonth = ("0" + (desiredDate.getMonth() + 1)).slice(-2);
        var properDate = ("0" + desiredDate.getDate()).slice(-2)
        var newDayString = desiredDate.getFullYear() + '-' + properMonth + '-' + properDate + newDayHours;
        return new Date(newDayString).toISOString(); 
    },

    getDayRange: function () {
        var today = new Date();
        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        var startToday = this.getStartOfDay(today);
        var endToday = this.getStartOfDay(tomorrow);
        return { $gte: startToday, $lt: endToday }; 
    },


    aggregateExpenses: function () {
        var spendModel = this;

        var matchObject = { $match: { createdOn: spendModel.getDayRange() }};   
        var groupObject = {$group: {_id: '0', sum: {$sum: '$amount'} }}
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend'); 
        
        mongoClient.open(function (err, mongoClient) {
            collection.aggregate([matchObject, groupObject], function (err, result) {
                console.log(result); 
                mongoClient.close();
            }); 
        });

    }



    
};
