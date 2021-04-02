const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5001; // or if it runs straight from 443
const axios = require('axios');

// CORs
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  bodyParser.urlencoded({
      extended: true
  })
);

app.use(bodyParser.json()); // can set limit

// routes
app.get('/get-reddit-json-from-url', (req, res) => {
  const url = req.param('url');
  axios.get(`${url}.json`)
  .then(res2 => {
    if (res2.data.length) {
      res.send(res2.data);
    } else {
      res.send([]);
    }
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  });
});

app.listen(port, () => {
  console.log(`App running... on port ${port}`);
});