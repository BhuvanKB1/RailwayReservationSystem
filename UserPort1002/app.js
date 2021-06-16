const express = require('express');
const mongoose = require('mongoose');
const controlleruser = require('./controllers/controller');

const app = express();

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Bhuvan:Bhuvan123@cluster0.wor7a.mongodb.net/userFunctions?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(1002))
  .catch((err) => console.log(err));

console.log('Port 1002')
controlleruser(app);


