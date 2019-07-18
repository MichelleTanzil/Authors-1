var mongoose = require('mongoose');

var authorSchema = new mongoose.Schema({
    name: {type: String, required : true, minlength : 3},
    quotes : [{quote : {type: String, required: true , minlength: 3}, rank : {type: Number}}]
});

module.exports = mongoose.model('Author', authorSchema);