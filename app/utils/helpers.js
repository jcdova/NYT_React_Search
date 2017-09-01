// What is axios? - Promise based HTTP client for the browser and node.js
// Send async HTTP request to REST endpoints and perform CRUD operations
// XMLHttpRequest
import axios from "axios";

// NYT API key
// https://developer.nytimes.com/signup
var apikey = "e9db19e4654b4f4f9bd08840dd18671d";


const helpers = {

  runQuery: function(topic, startYr, endYr) {

    // cleans up format of search terms
    var q = topic.trim();
    var begin_date = startYr.trim() + "0101";
    var end_date = endYr.trim() + "1231";

    // runs search query
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
      params: {
        "apikey": apikey,
        "q": q,
        "begin_date": begin_date,
        "end_date": end_date
      }
    }).then(function(res) {
      console.log("Performs the Query");
      console.log(res.data.response);
      return res.data.response;
    }).catch(function(err) {
      console.log(err);
    });
  },

  getSaved: function() {
    return axios.get(
      '/api/saved'
    ).then(function(res) {
      console.log("Retrieving All Saved Articles" + " : " + res.data.length + " articles!");
      return res
    }).catch(function(err) {
      console.log(err);
    });
  },

  saveArticle: function(article) {
    return axios.post('/api/saved', {
      // formats nyt api data to store in db
      article_id: article._id,
      title: article.headline.main,
      url: article.web_url,
      pub_date: article.pub_date
    }).then(function(res) {
      console.log("Article Saved " + " : " + res.data.article_id);
    }).catch(function(err) {
      console.log(err);
    });
  },

  // NOTE: axios.delete() by itself does not work;
  // json needs to be specificied as the response type
  deleteSaved: function(article) {
    return axios({
      method: 'delete',
      url: '/api/saved',
      data: article,
      responseType: 'json'
    }).then(function(res) {
      console.log("Article Deleted");
    }).catch(function(err) {
      console.log(err);
    });
  }

};

export default helpers;
