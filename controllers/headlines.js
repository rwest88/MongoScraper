var scrape = require("../scripts/scrape.js");
//var makeDate = require

var Headline = require("../models/Headline.js");

module.exports = {
  fetch: function(cb) {
    scrape(function(data) {
      var articles = data;
      for (var i in articles) {
        articles[i].date = "sometime";
        articles[i].saved = "false";
      }
      Headline.collection.insertMany(articles, {ordered: false}, function(err, docs) {
        cb(err, docs);
      });
    });
  },
  //delete
  get: function(query, cb) {
    Headline
    .find(query)
    .sort({_id: -1})
    .exec(function(err, doc) {cb(doc);});
  },
  //update
}