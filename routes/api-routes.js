let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cheerio = require('cheerio');
let request = require('request');

module.exports = function(app) {

	request('http://www.huffingtonpost.com/topic/pets', function (error, response, html) {
	    let $ = cheerio.load(html);
	    $('.card__link').each(function(i, element){

			let title = $(this).text();

			let metadata = {
				title: title,
			};

			// console.log(metadata);
	    });
	});	

};
