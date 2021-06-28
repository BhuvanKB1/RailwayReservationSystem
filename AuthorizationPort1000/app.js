const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser')
const { requireAuth, checkUser } = require('./middleware/middleware');
const axios = require("axios");

const app = express();

app.use(bodyparser.json());





const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


//Extended https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Railways',
            description: 'Railway Reservation System',
            contact: {
                name: "BhuvanKB"
            },
            servers: ["http://localhost:1000"]
        }
    },
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));






// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Bhuvan:Bhuvan123@cluster0.wor7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(1000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
// app.get('/tickets', requireAuth, (req, res) => res.render('tickets'));


app.get("/userhome", checkUser);
app.get("/userhome",requireAuth);

app.get("/userhome", (req, res) => {
  axios.get("http://localhost:1002/trainlist").then((response) => {
      // console.log(response.data);
      var service = response.data;
      res.send(service);
  }).catch((err) => {
      console.log(err.message);
  })
})


app.use(routes);