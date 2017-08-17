let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cheerio = require('cheerio');
let request = require('request');

let app = express();
let port = process.env.PORT || 8000;

app.listen(port, function() {
	console.log("App listening on PORT " + port);
});

//Requiring Handlebars
let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars")

app.use(express.static("public"));

// Requiring routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('CONNECTED');

	var articleSchema = mongoose.Schema({
		title: String
	});

	var Article = mongoose.model('Article', articleSchema);

	var latest = new Article({ title: 'Mongoose article' });
	console.log(latest.title); 

	latest.save(function (err, latest) {
		if (err) return console.error(err);
		console.log('Latest saved!');
	});


	Article.find(function (err, articles) {
	  if (err) return console.error(err);
	  console.log('List of articles', articles);
	})

});