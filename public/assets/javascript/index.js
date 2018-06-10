$(document).ready(function() {

  console.log("Welcome to the Home page!");

  var articleContainer = $(".article-container");
  //onclick for save button
  $(document).on("click", ".scrape-new", scrapeArticle);

  initPage();

  function initPage() {
    articleContainer.empty();
    $.get("/api/headlines")
      .then(function(data) {
        console.log(data);
        if (data && data.length) {
          renderArticles(data);
        }
        // else {
        //   renderEmpty();
        // }
      });
  }

  function renderArticles(articles) {
    // $(".scrape-result").text("");
    var articlePanels = [];
    for (var i in articles) {
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function renderEmpty() {
    // $(".scrape-result").text("");
  }

  function createPanel(article) {
    var panel = $(`
    <div>
      <h3>${article.headline}</h3>
      <p>${article.summary}...</p>
      <a href="${article.link}" target="_blank">Click to read more!</a>
    </div>
    `);
    panel.data("_id", article._id);
    return panel;
  }

  function scrapeArticle() {
    $.get("/api/fetch")
      .then(function(data) {
        initPage();
        alert(data.message);
        console.log(data.message);
      });
  }
});