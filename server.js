// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
// mongoose.connect("mongodb://admin:codingrocks@ds023664.mlab.com:23664/reactlocate");

// if (PORT === 3000) {
//   mongoose.connect("mongodb://localhost/nytreact", {
//     useMongoClient: true
//   });
// } else {
//   mongoose.connect("mongodb://????", {
//     useMongoClient:true
//   });
// };

mongoose.connect("mongodb://localhost/nytreact", {
  useMongoClient: true
});
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Require History Schema
var Article = require("./models/Article");

// This is the route we will send GET requests to retrieve 
// We will call this route the moment our page gets rendered
app.get("/api/saved", function(req, res) {
  Article.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  })
});

// This is the route we will send POST requests to save each article.
app.post("/api/saved", function(req, res) {
  var NewSave = new Article({
  article_id: req.body.article_id,
  title: req.body.title,
  url: req.body.url,
  pub_date: req.body.pub_date
});

//Check if Article already exists
Article.find({article_id: req.body.article_id}, function(err, doc) {
    if (doc.length === 0) {
      NewSave.save(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      })
    }
  })
});


app.delete("/api/saved", function(req, res) {
  Article.findOneAndRemove({
    article_id: req.body.article_id}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  })
});


// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
