module.exports = {
  
    writeExpense: function () {
        var db = mongoClient.db('daily-spend')
        var collection = db.collection('expenses-test'); 
        
        mongoClient.open(function(err, mongoClient) {
            collection.insert({hello:'world_no_safe'});
            mongoClient.close();    
        });   
    }
    
};
