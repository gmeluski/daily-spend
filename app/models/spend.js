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

    returnStartOfDay: function (desiredDate) {
        var newDayHours = 'T00:00:00.000Z';
        var properMonth = ("0" + (desiredDate.getMonth() + 1)).slice(-2);
        var properDate = ("0" + desiredDate.getDate()).slice(-2)
        var newDayString = desiredDate.getFullYear() + '-' + properMonth + '-' + properDate + newDayHours;
        return new Date(newDayString).toISOString(); 
    },


    aggregateExpenses: function () {
        var start = new Date(2014, 1, 1);

        var end = new Date(2014, 2, 1);
        var spendModel = this;
        var startToday = this.returnStartOfDay(new Date());
        
        //var startToday = new Date(todaysDate.getFullYear() + '-' + todaysDate.getMonth() + '-' + todaysDate.getDate() + startString);

        var testDate = new Date('2010-01-01T00:00:00.000Z').toISOString();

        console.log(startToday);
        console.log(testDate);
        var matchObject = { $match: { createdOn: { $gte: new Date('2010-01-01T00:00:00.000Z').toISOString()}}};   
        var groupObject = {$group: {_id: '0', sum: {$sum: '$amount'} }}
        var aggregateList = [matchObject, groupObject];
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend'); 
        
        mongoClient.open(function (err, mongoClient) {
            collection.aggregate([matchObject], function (err, result) {
                console.log('simpleMatch');
                console.log('-------------------');
                console.log(result); 
                mongoClient.close();
            }); 
        });

    }



    
};
