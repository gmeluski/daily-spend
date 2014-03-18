var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local : {
        email: String,
        password: String
    },
    
    spend: {  
        type: Number,
        default: 30
    }
    
});


userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.getUserTotal = function (id) {
    return 30;
};

userSchema.methods.setSpend = function (id, newSpend, callback) {
    var query = {'_id': ObjectId(id)};
    this.model('User').findByIdAndUpdate(id, { spend: newSpend }, callback);
};

module.exports = mongoose.model('User', userSchema);
