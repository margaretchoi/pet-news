let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cheerio = require('cheerio');
let request = require('request');

//Start server using Express
let app = express();
let port = process.env.PORT || 8000;

app.listen(port, function() {
	console.log("App listening on PORT " + port);
});

//Requiring Handlebars
let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Requiring routes in the routes folder
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


// Connecting Mongoose to mongoDB
mongoose.connect('mongodb://localhost/huffpetsdb');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log('CONNECTED');
});