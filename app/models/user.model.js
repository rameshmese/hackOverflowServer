const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    mailId: String,
    password: String,
    name: String,
    portfolio:String,
    level:String,
    admin:String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
