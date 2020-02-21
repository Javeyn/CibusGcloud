
'use strict';

const process = require('process'); // Required to mock environment variables
const cors = require('cors');
// [START gae_storage_app]
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8090;

// Requiring our models for syncing
var db = require("./SequelizeModels");

const app = express();
app.use(cors({
  origin:["http://localhost:3001"],
  credentials:true
}));
// app.use(cors({
//   origin:["your deployed url"],
//   credentials:true
// }));

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Display a form for uploading files.
app.get('/', (req, res) => {
  res.render('form.pug');
});

//Routes
require("./routes/api-sequelize-routes.js")(app);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
    console.log('Press Ctrl+C to quit.');
  });
});

module.exports = app;
