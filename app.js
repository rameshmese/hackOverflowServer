var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var cors = require('cors');
var app = express();

app.use(cors({origin: 'http://localhost:3000'}));
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/hackathon.routes.js')(app);

var server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});
