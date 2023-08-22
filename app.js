//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the schema and model for articles
const articleSchema = {
  title: String,
  content: String
};
const Article = mongoose.model("Article", articleSchema);



app.get("/articles", function(req, res) {
  Article.find()
    .then(foundArticles => {
      console.log(foundArticles);
      res.json(foundArticles); // send the articles as a response
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});


// TODO: You'll add your routes and other logic here

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/articles", function(req, res) {
  console.log(req.body.title);
  console.log(req.body.content);


const newArticle = new Article({
  title: req.body.title,
  content: req.body.content
});
newArticle.save()
    .then(() => {
      console.log("Successfully saved a new article.");
      res.send("Successfully added a new article.");
    })
    .catch((error) => {
      console.error("Error saving the article:", error);
      res.status(500).send("Internal Server Error. Could not save the article.");
    });

});

app.listen(3000, function() {
  console.log("Server started Dan on port 3000");
});
