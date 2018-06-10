var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
  console.log("scraping...");
  request("https://techcrunch.com", function(err, res, body) {
    var $ = cheerio.load(body);
    var articles = [];
    
    $(".post-block").each(function(i, element) {
      var title = $(this).find(".post-block__title__link");
      var head = title.text().trim();
      var link = title.attr('href');
      var sum = $(this).find(".post-block__content").text().trim();
      // console.log(head, link, sum);
      if (head && sum) {
        var article = {
          headline: head,
          summary: sum,
          link: link
        };
        articles.push(article);
      }
    });
    cb(articles);
  });
}

module.exports = scrape;