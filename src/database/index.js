const mongoose = require('mongoose');
const appconfig = require('../../config/appconfig');

const strconn = appconfig.URIMongoDB;

mongoose.connect(strconn, { useNewUrlParser:true, useCreateIndex:true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
