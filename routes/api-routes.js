let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cheerio = require('cheerio');
let request = require('request');

var Comment = require("../models/comment.js");
var Article = require("../models/article.js");

let db = mongoose.connection;

module.exports = function(app) {

	//Route to scrape the article from huff post pets
	app.get("/scraped", function(req, res){

		//Function to scrape the article from huff post pets
		request('http://www.huffingtonpost.com/topic/pets', function (error, response, html) {
		    let $ = cheerio.load(html);
		    $('.card__content').each(function(i, element){

		    	let result = {};

				// result.title = $(this).html();
				// result.title = $(a[class=cbn-card-headline]').text();
				result.title = $('a.bn-card-headline', this).text();
				result.image = $('div.card__image__src', this).css('background-image');
				result.label = $('h3.card__label__text', this).html();
				
				let entry = new Article(result);


				// Save new entry to the database
				entry.save(function(err, doc){
					// Log any errors
			        if (err) {
			          console.log(err);
			        }
			        // Or log the doc
			        else {
			          console.log(doc);
			        }
				});
			});
		    
		});	
		console.log("Scrape completed!");
		res.redirect("/");
	});

	// Route to grab all articles in the database
	app.get("/articles", function(req, res) {
		  // Grab every doc in the Articles array
		  Article.find({}, function(error, doc) {
		    if (error) {
		      console.log(error);
		    }
		    else {
		      // res.json(doc);
		      let articleDoc = {
		      	article: doc
		      };

		      res.render("articles", articleDoc);
		    }
		  });
	});

	// Route to grab an article by it's ObjectId
	app.get("/articles/:id", function(req, res) {
	  Article.findOne({ "_id": req.params.id })
	  .populate("comment")
	  .exec(function(error, doc) {
	    if (error) {
	      console.log(error);
	    }
	    else {
	      let currentArticle = {
	      	  article: doc
	      }; 
	      res.render("articles-page", currentArticle);
	    }
	  });

	});

	// Create a new comment or replace an existing comment
	app.post("/articles/:id", function(req, res) {

	  // Create a new comment and pass the req.body to the entry
	  var newComment = new Comment(req.body);

	  // And save the new comment the db
	  newComment.save(function(error, doc) {
	    if (error) {
	      console.log(error);
	    }
	    else {
	      // Use the article id to find and update it's comment
	      Article.findOneAndUpdate({ "_id": req.params.id }, { "comment": doc._id })
	      .exec(function(err, doc) {
	        if (err) {
	          console.log(err);
	        }
	        else {
	          res.send(doc);
	        }
	      });
	    }
	  });
	});


};
