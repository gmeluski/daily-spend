var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
var mongoClient = new MongoClient(new Server(process.env.MONGOHOST, process.env.MONGOPORT));
var userModel = require('./user');
var moment = require('moment');
var User = new userModel();

//console.log(mongoClient);



module.exports = {
    getTimeZoneDifference: function (serverSideOffset, desiredOffset) {
        return desiredOffset - serverSideOffset;
    },

    getAdjustedTime: function (serverSideTime, clientSideOffset) {
        var millisecondsPerMinute = 60000;
        var timeZoneDifference = this.getTimeZoneDifference(serverSideTime.getTimezoneOffset(), clientSideOffset);

        return new Date(serverSideTime + this.getTimeZoneDifference(serverSideTime.getTimezoneOffset(), clientSideOffset) * millisecondsPerMinute);
    },

    returnCollection: function () {
        var db = mongoClient.db(process.env.MONGODB)
        var collection = db.collection('dailySpend');
        return collection;
    },

    prepareAmount: function (amount) {
        var parsedAmount = parseFloat(amount)

        if (this.isNumber(parsedAmount)) {
            return parsedAmount
        }
        
        return false;
    },
    
    isNumber: function(valueToTest) {
        return !(valueToTest !== valueToTest)
    },

    writeExpense: function (userId, parameters, response) {
        var spendModel = this;
        var amount = this.prepareAmount(parameters.amount);    
        if (amount) {
            mongoClient.open(function(err, mongoClient) {
                var db = mongoClient.db(process.env.MONGODB);
                db.authenticate(process.env.MONGOUSER, process.env.MONGOPASS, function () {
                // db information
                    var collection = db.collection('dailySpend'); 
                    // assignments from inherited environment 
                    var clientTime = (parameters.dateString) ? moment(decodeURI(parameters.dateString)) : moment(); 
                    var writeObject = spendModel.getWriteObject(userId, amount, clientTime);
                    
                    collection.insert(writeObject, function () {
                        spendModel.jsonResponse(response, {status: 200});
                        mongoClient.close();
                    });
                });
            });
        }
        
    },

    getWriteObject: function (userId, amount, clientTime) {
        return {
                userId: userId,
                createdOn: this.getIsoString(clientTime),
                amount: amount
            } 
    },

    getIsoString: function (date) {
        return this.getMomentDateString(date) + this.getMomentTimeString(date);
    },

    getTimeString: function(date) {
        if (date) {
            return 'T' + this.padNumber(date.getHours()) + ':' + this.padNumber(date.getMinutes()) + ':' + this.padNumber(date.getSeconds()) + '.' + date.getMilliseconds() +'Z';
        } else {
            return 'T00:00:00.000Z';
        }
    },

    getMomentTimeString: function (date) {
        if (date) {
            return 'T' + this.padNumber(date.hour()) + ':' + this.padNumber(date.minutes()) + ':' + this.padNumber(date.seconds()) + '.' + date.milliseconds() +'Z';
        } else {
            return 'T00:00:00.000Z';
        }
    },

    getDateString: function (date) {
        return date.getFullYear() + '-' + this.padNumber(date.getMonth() + 1) + '-' + this.padNumber(date.getDate());
    },

    getMomentDateString: function (date) {
        return date.year() + '-' + this.padNumber(date.month() + 1) + '-' + this.padNumber(date.date());
    },
    
    padNumber: function (number) { 
        return ("0" + number).slice(-2); 
    },

    getStartOfDay: function (desiredDate) {
        var newDayString = this.getDateString(desiredDate) + this.getTimeString();
        return new Date(newDayString).toISOString();
    },

    getDayRange: function (dateString) {
        var today = (dateString) ? new Date(dateString) : new Date();
        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        var startToday = this.getStartOfDay(today);
        var endToday = this.getStartOfDay(tomorrow);

        return { $gte: startToday, $lt: endToday };
    },

    aggregateExpenses: function (request, callback) {
        var spendModel = this;

        if (request.params.dateString) {
            var dateString = request.params.dateString;
        }

        var aggregateCallback = function (err, result) {
                var remaining = (result[0]) ? request.user.spend - result[0].sum : request.user.spend;
                callback(remaining);
                mongoClient.close();
        }
        
        mongoClient.open(function(err, mongoClient) {
            var db = mongoClient.db(process.env.MONGODB);
            db.authenticate(process.env.MONGOUSER, process.env.MONGOPASS, function(err, result){
                var collection = db.collection('dailySpend'); 
                var matchObject = { $match: { userId: request.user._id, createdOn: spendModel.getDayRange(dateString) }};
                var groupObject = {$group: {_id: '0', sum: {$sum: '$amount'} }}
                collection.aggregate([matchObject, groupObject], aggregateCallback);
            });
        });
    },

    jsonResponse: function(response, sendData) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(sendData));
    }

};
