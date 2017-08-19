let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cheerio = require('cheerio');
let request = require('request');

let db = mongoose.connection;

module.exports = function(app) {


	app.get("/scraped", function(req, res){


		var articleSchema = mongoose.Schema({
			title: String
		});

		var Article = mongoose.model('Article', articleSchema);

		var latest = new Article({ title: 'Mongoose article' });

		latest.save(function (err, latest) {
			if (err) return console.error(err);
			console.log('Latest saved!');
		});


		Article.find(function (err, articles) {
		  if (err) return console.error(err);
		  console.log('List of articles', articles);
		})


		//Function to add article to the database
		request('http://www.huffingtonpost.com/topic/pets', function (error, response, html) {
		    let $ = cheerio.load(html);
		    $('.card__link').each(function(i, element){

				let title = $(this).text();

				db.collection("articles").insert({
		          title: title
		        });
		    });
		    
		});	

		res.redirect("/");

	});

	app.get("/all", function(req, res) {

	  // Find all articles in the articles collection
	  db.collection("articles").find({}, function(error, allData) {
	    if (error) {
	      console.log(error);
	    } else {
	      console.log("Getting");
	      console.log(allData);

	      res.render("articles", allData);
	    }
	  });
	});

};
