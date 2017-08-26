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

		    	let urlString = $('div.card__image__src', this).css('background-image');

		    	function parseUrl(urlString) {
	    			let newString = urlString.replace("url(", "");
	    			let finalString = newString.replace(")", "");
	    			return finalString;
		    	};

				result.title = $('a.bn-card-headline', this).text();
				result.image = parseUrl(urlString);
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
			          // console.log(doc);
			        }
				});
			});
		    
		});	
		console.log("Scrape completed!");
		res.redirect("/articles");
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

	  console.log('REQ body', req.body);

	  // Create a new comment and pass the req.body to the entry
	  var newComment = new Comment(req.body);

	  // And save the new comment the db
	  newComment.save(function(error, doc) {
	    if (error) {
	      console.log(error);
	    }
	    else {

	  	  console.log('saving');

		   Article.findOneAndUpdate({ "_id": req.params.id }, { $push: { "comment": doc._id } }, { new: true }, function(err, newdoc) {
	        // Send any errors to the browser
	        if (err) {
	          res.send(err);
	        }
	        // Or send the newdoc to the browser
	        else {
	          // res.send(newdoc);
	          res.redirect("/articles/" + req.params.id);
	        }
	      });


	    }
	  });
	});


	app.get("/articles/:id/delete", function(req, res) {

	   Comment.findByIdAndRemove({ "_id": req.params.id }, function(err, newdoc) {
        // Send any errors to the browser
        if (err) {
          res.send(err);
        }
        // Or send the newdoc to the browser
        else {
          res.send(newdoc);
        }
      });

	});

};
