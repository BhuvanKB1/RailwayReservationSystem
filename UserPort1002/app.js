const express = require('express');
const mongoose = require('mongoose');
const controlleradmin = require('./controllers/controller');
const bodyParser = require('body-parser');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


app.use(bodyParser.json());

// view engine
app.set('view engine', 'ejs');



// database connection
const dbURI = 'mongodb+srv://Bhuvan:Bhuvan123@cluster0.wor7a.mongodb.net/adminFunctions?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(1002))
  .catch((err) => console.log(err));
console.log('Port 1002');
controlleradmin(app);
module.exports = app;

// Extended: http://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Railway Reservation',
      description: 'Railway Reservation info',
      contact: {
        name: 'Bhuvan KB'
      },
      servers: ["http://localhost:1002"]
      
    }
  },
  apis: ['controllers/controller.js']

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));




