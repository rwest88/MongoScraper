var scrape = require("../scripts/scrape.js");
var headlinesController = require("../controllers/headlines");

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
      // if (err) console.log(err);
      if (!docs || docs.insertedCount === 0) {
        return res.json({
          message: "No new articles at this moment!"
        });
      }
      res.json({
        message: docs.insertedCount + " new articles added!"
      });
    });
  });

  router.get("/api/headlines", function(req, res) {
    var query = {};
    // if (req.query.saved) {
    //   query = req.query;
    // }
    headlinesController.get(query, function(data) {
      res.json(data);
    });
  });

  router.patch("/api/headlines", function(req, res) {
    headlinesController.update(req.body, function(err, data) {
      res.json(data);
    });
  });
}