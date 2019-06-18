const mongoose = require('mongoose');

//const strconn = 'mongodb://localhost/desafionode';
//const strconn = 'mongodb+srv://desafionode:testenode@cluster0-2vbef.mongodb.net/test?retryWrites=true&w=majority';
//const strconn = 'mongodb://desafionode:testenode1@ds139037.mlab.com:39037/demonode';
const strconn = 'mongodb://uzk0jxponfxwyhcd1rlv:RW4VGugBk5VOnBFgj5t6@bhoxzuvhnqsbu4i-mongodb.services.clever-cloud.com:27017/bhoxzuvhnqsbu4i';

mongoose.connect(strconn, { useNewUrlParser:true, useCreateIndex:true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
