var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headlineSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  date: String,
  saved: {
    type: String,
    default: 'false'
  }
});

module.exports = mongoose.model("Headline", headlineSchema);