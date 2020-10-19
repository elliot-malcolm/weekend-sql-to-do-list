const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo_router')

const app = express();

const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/todolist', todoRouter)

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
