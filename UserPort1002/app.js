const express = require('express');
const mongoose = require('mongoose');
const controlleradmin = require('./controllers/controller');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());

// view engine
app.set('view engine', 'ejs');



// database connection
const dbURI = 'mongodb+srv://Bhuvan:Bhuvan123@cluster0.wor7a.mongodb.net/adminFunctions?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(1002))
  .catch((err) => console.log(err));
console.log('Port 1001');
controlleradmin(app);





