var express = require('express');
var app = express();
var moment = require('moment');

var isUnix = false;
var isNatural = false;

app.set('port', (process.env.PORT || 5000));

function isDate(string){
  if (moment(string, "MMMM DD, YYYY", true).isValid()){
    isNatural = true;
    return true;
  }
  if (moment(string, "x", true).isValid()){
    isUnix = true;
    return true;
  }
  return false;
}

app.get('/', function(req, res){
  res.send("Timestamp Microservice - Send query to root in either Unix epoch (ms) format or natural language.")
})

app.get('/:query', function(req, res){
  var query = req.params.query;
  var obj = {"unix": null, "natural": null};
  if (isDate(query) == true){
    if(isUnix){
      obj.unix = query;
      obj.natural = moment(query, "x", true).format("MMMM DD, YYYY");
    }
    if(isNatural){
      obj.unix = moment(query, "MMMM DD, YYYY", true).format("X");
      obj.natural = query;
    }
  }
  res.send(obj);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
