
const express = require("express");
const request = require("request");
var bodyParser = require("body-parser");


const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.static('public'));

// parse application/json
app.use(bodyParser.json())


app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/animals", function(req, res){
  request("http://localhost:5000/animals", function(error, response, body) {

  if (!error && response.statusCode === 200) {

    res.json(JSON.parse(body));
  }
});
})

app.put("/animal/:id", function(req, res){

  request({
    url: `http://localhost:5000/animal/${req.params.id}`,
    method: req.method,
    headers: {
     'cache-control': 'no-cache',
     'content-type': 'application/json'
   },
    body: req.body, json: true },
    function(error, response, body) {

      console.error(error);
  if (!error && response.statusCode === 200) {

    res.json(JSON.parse(body));
  }
});

})



// var request = require("request");
//
// var options = { method: 'PUT',
//   url: 'http://localhost:5000/animal/2',
//   headers:
//    { 'postman-token': '12c77f20-64ea-7b85-8ce9-6419ff827165',
//      'cache-control': 'no-cache',
//      'content-type': 'application/json' },
//   body: { type: 'dog' },
//   json: true };
//
// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//
//   console.log(body);
// });
// request({ url: url, method: 'PUT', json: {foo: "bar", woo: "car"}}, callback)

// https://stackoverflow.com/questions/21393706/node-js-put-with-request-module?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
