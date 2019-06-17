const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/desafionode', { useNewUrlParser:true, useCreateIndex:true});
mongoose.Promise = global.Promise;

module.exports = mongoose;