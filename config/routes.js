var scrape = require("../scripts/scrape.js");
var headlinesController = require("../controllers/headlines.js");

module.exports = function(router) {
  router.get("/", function(req, res) {
    res.render("home");
  });
  router.get("/saved", function(req, res) {
    res.render("saved");
  });
  router.get("/api/fetch", function(req, res) {
    console.log("/api/fetch hit!");
    headlinesController.fetch(function(err, docs) {
      res.json({
        // message: docs.insertedCount + " new articles added!"
      });
    });
  });
  router.get("/api/headlines", function(req, res) {
    var query = {};
    if (req.query.saved) {
      query = req.query;
    }
    headlinesController.get(query, function(data) {
      res.json(data);
    });
  });
}