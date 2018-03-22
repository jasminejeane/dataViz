const express = require("express");
const request = require("request");
var bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

// parse application/json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}));
app.get("/animals", function(req, res) {
  request("http://localhost:5000/animals", function(error, response, body) {

    if (!error && response.statusCode === 200) {

      res.json(JSON.parse(body));
    }
  });
})

app.put("/animal/:id", function(req, res) {

  request({
    url: `http://localhost:5000/animal/${req.params.id}`,
    method: req.method,
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
    body: req.body,
    json: true
  }, function(error, response, body) {

    console.error(error);
    if (!error && response.statusCode === 200) {

      res.json(JSON.parse(body));
    }
  });

})

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
