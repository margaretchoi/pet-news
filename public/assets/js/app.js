// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the information on the page
    $("#all-articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].image + "</p>");
  }
});