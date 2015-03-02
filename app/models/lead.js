var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leadSchema = new Schema({
    email: String,
    date: {type: Date, default: Date.now()}
});


module.exports = mongoose.model('Lead', leadSchema);
