const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo.router')

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use(

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
