let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cheerio = require('cheerio');
let request = require('request');
mongoose.Promise = Promise;

// Bring in our Models: Comment and Article
var Comment = require("./models/comment.js");
var Article = require("./models/article.js");

//Start server using Express
let app = express();
let port = process.env.PORT || 8000;

app.listen(port, function() {
	console.log("App listening on PORT " + port);
});

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

//Requiring Handlebars
let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Public Directory
app.use(express.static("public"));

// Connecting Mongoose to mongoDB
mongoose.connect('mongodb://heroku_rxgxccb9:lm8t3qfgqnr3tcr0disbfh9vo8@ds111589.mlab.com:11589/heroku_rxgxccb9');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log('CONNECTED');
});

// Requiring routes in the routes folder
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
