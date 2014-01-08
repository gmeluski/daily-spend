var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
var mongoClient = new MongoClient(new Server('localhost', 27017));

module.exports = {
 
    testYo: function () {
        
        console.log('out');    
    },

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
                date: new Date(),
                amount: amount
            };

        mongoClient.open(function(err, mongoClient) {
            
            collection.insert(insertObject, function () {
                mongoClient.close();    
            });
        });   
    },


    aggregateExpenses: function () {
        var start = new Date(2014, 1, 1);
        var end = new Date(2014, 2, 1);
        var spendModel = this;

        
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend'); 
        
        mongoClient.open(function (err, mongoClient) {
            collection.find({'date': {$gte: start}}).toArray(function(e, docs){
                console.log(docs.length); 
                mongoClient.close(); 
            });
        });

    }



    
};
