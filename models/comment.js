var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create the comment schema
var CommentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

// Create the comment model with the commentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the comment model
module.exports = Comment;
