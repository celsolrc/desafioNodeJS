const express = require('express');
const bodyParser = require('body-parser');

const appconfig = require('../config/appconfig');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./controllers/userController')(app);
require('./controllers/authController')(app);

app.listen(appconfig.appPort);
