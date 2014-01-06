var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
var mongoClient = new MongoClient(new Server('localhost', 27017));

module.exports = {
 
    testYo: function () {
        
        console.log('out');    
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
    }
    
};
