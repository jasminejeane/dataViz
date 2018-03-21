

const express = require("express");
const request = require("request");


const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.static('public'));


app.get("/animals", function(req, res){
  request("http://localhost:5000/animals", function(error, response, body) {

  if (!error && response.statusCode === 200) {

    res.json(JSON.parse(body));
  }
});
})



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
