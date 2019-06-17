const mongoose = require('mongoose');

//const strconn = 'mongodb://localhost/desafionode';
const strconn = 'mongodb+srv://desafionode:testenode@cluster0-2vbef.mongodb.net/test?retryWrites=true&w=majority';
//const strconn = 'mongodb://desafionode:testenode1@ds139037.mlab.com:39037/demonode';

mongoose.connect(strconn, { useNewUrlParser:true, useCreateIndex:true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
