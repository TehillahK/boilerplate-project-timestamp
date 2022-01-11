// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:input",function (req,res,next){
  const input = req.params.input;
  if(!input.includes("-")){
    const val = parseInt(input)
    const date = new Date(val)
    res.json({"unix":val,"utc":date.toUTCString()})
  }
  next()
},function (req,res) {
  const dateParam = req.params.input;
  const date = new Date(dateParam)
  const unix = Date.parse(dateParam)
  res.json({"unix":unix,"utc":date.toString()})
})
/*
app.get("/api/:date",function (req,res) {
  const dateParam = req.params.date;
  const date = new Date(dateParam)
  const unix = Date.parse(dateParam)
  if(!(isNaN(unix)))
    res.json({"unix":unix,"utc":date.toString()})
  else
    res.json({"error":date.toString()})
})
*/




// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
