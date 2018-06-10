$(document).ready(function() {
  var articleContainer = $(".article-container");
  //onclick, save
  $(document).on("click", ".scrape-new", scrapeArticle);

  initPage();

  function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=false")
      .then(function(data) {
        if (data && data.length) {
          renderArticles(data);
        }
        else {
          renderEmpty();
        }
      });
  }

  function renderArticles(articles) {
    var articlePanels = [];
    for (var i in articles) {
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function renderEmpty() {
    console.log("empty");
  }

  function createPanel(article) {
    var panel = $(`
    <div>
      <h3>article.headline</h3>
      <h5>article.summary</h5>
    </div>
    `);
    panel.data("_id", article._id);
    return panel;
  }

  function scrapeArticle() {
    $.get("/api/fetch")
      .then(function(data) {
        initPage();
        //bootbox.alert("")
        console.log(data.message);
      });
  }
})