var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema({
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  date: String,
  text: String
});

module.exports = mongoose.model("Note", noteSchema);