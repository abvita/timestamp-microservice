var express = require('express');
var app = express();
var moment = require('moment');

var isUnix = false;
var isNatural = false;

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

app.listen(5000);
