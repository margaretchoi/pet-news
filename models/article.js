var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    unique: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
