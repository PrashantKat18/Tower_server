const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const config = require('./config.json');
const route = require('./route');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(route);

app.use('/',express.static(path.join(__dirname, 'www')));
app.use((req, res, next) => {
  console.log(req.path)
  res.sendFile(path.join(__dirname, '/www/index.html'));
})

app.use((req, res, next) => {
  console.log(req.path);
  res.status(404).send('<h1>Page not found</h1>');
})

app.listen(config.PORT, () => {
  console.log("\nMain Server listening on ", config.HOST + ":" + config.PORT)
});
