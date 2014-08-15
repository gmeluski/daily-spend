var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
var mongoClient = new MongoClient(new Server(process.env.MONGO_HOST, process.env.MONGO_PORT));
var userModel = require('./user');
var moment = require('moment');
var User = new userModel();
var trashClient = MongoClient.connect(process.env.MONGOHQ_URL, function () {
    
});

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
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend');
        return collection;
    },

    writeExpense: function (userId, parameters, response) {
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend'); 
        var spendModel = this;
        var amount = parameters.amount;
        var clientTime = (parameters.dateString) ? moment(decodeURI(parameters.dateString)) : moment(); 
        var writeObject = spendModel.getWriteObject(userId, amount, clientTime);
         
        mongoClient.open(function(err, mongoClient) {
            collection.insert(writeObject, function () {
                spendModel.jsonResponse(response, {status: 200});
                mongoClient.close();
            });
        });
    },

    getWriteObject: function (userId, amount, clientTime) {
        return {
                userId: userId,
                createdOn: this.getIsoString(clientTime),
                amount: parseFloat(amount)
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

        var matchObject = { $match: { userId: request.user._id, createdOn: spendModel.getDayRange(dateString) }};
        var groupObject = {$group: {_id: '0', sum: {$sum: '$amount'} }}
        var db = mongoClient.db('expensesTest')
        var collection = db.collection('dailySpend');

        var aggregateCallback = function (err, result) {
                var remaining = (result[0]) ? request.user.spend - result[0].sum : request.user.spend;
                callback(remaining);
                mongoClient.close();
        }

        mongoClient.open(function (err, mongoClient) {
            collection.aggregate([matchObject, groupObject], aggregateCallback);
        });

    },

    jsonResponse: function(response, sendData) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(sendData));
    }

};
