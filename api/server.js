const dotenv = require('dotenv').config({
  path: './.env'
});
const port = process.env.PORT || 3001;
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

const {
  check
} = require('express-validator/check');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/uploads/images', express.static(__dirname + '/public/uploads/images'));

app.use(cors()); //enable cores

require('./config/knex')(app);


var routes = require('./routes');
app.use('/', routes);

// creating server
var server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port => ${port}`);
});
module.exports = server;
