const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    username : String,
    password : String,
    address : String,
    type : String,
    histories : [{
        date : Date,
        address : String,
        number : String,
    }]
});

module.exports = mongoose.model("Account", accountSchema);