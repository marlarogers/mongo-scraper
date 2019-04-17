var mongoose = require('mongoose');
var express = require('express');
var cheerio = require('cheerio');
var axios = require('axios');
var cors = require('cors')
var path = require('path');

var app = express();
var port = 8000
var articles = []
app.use(cors())

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const Article = mongoose.model('Article', { title: String, link: String });
app.get("/", function(req, res) {
    axios.get("https://news.ycombinator.com/")
    .then(function(response) {
        var html = response.data;
        var $ = cheerio.load(html);
        $(".title").each(function(i, element) {
            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");
            // console.log(title);
            // console.log(author);
            // console.log(readTime);
            var article = {
                title,
                link,
            }
            if (title && link) {
                const article = new Article({ title: title, link: link });
                article.save().then(() => console.log('meow'));
                // articles.push(article);
            }
            // console.log(articles);
        })
    })
    

/////arrow function is syntax and this


})

app.get("/articles", function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get("/api/articles", function(req, res) {
    Article.find({}, function(err, response) {
        if (err) {
            console.log(err);
        } else {
            res.json(response);
        }
    })
})

app.listen(port, function() {
    console.log("app is listening on 8000");
})

//req = client, res = server

// sendFile = for sending an HTML file
// sendJSON
// sendRawText
//--// express methods