var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	article_id: String,
	title: String,
	url: String,
	pub_date: Date
});

var Article = mongoose.model("Article", ArticleSchema)
module.exports = Article;