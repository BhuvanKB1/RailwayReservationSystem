const trains = require("../model/train");
const userinfo = require("../model/userinfo")
const axios = require('axios');
module.exports = function(app){

//Routes


app.get('/', (req,res) => {
  res.render('admin')
})


/** 
 *  @swagger
 *  /trainlist/:
 *  get:
 *      summary: "To get the list of all trains"
 *      responses: 
 *          '200':
 *              description: A successful response
 */
app.get('/trainlist', function(req,res){
  
  trains.find().then((trains)=>{
    res.json(trains)
  }).catch(err => {
    if(err){
      throw err;
    }
    else{
      res.status(200).send("Tickets")
    }
  })

})


/** 
*  @swagger
*  /trainlist/{id}:
*  get:
*      summary: "To get the list of all trains"
*      parameters:
*            - in: path
*              name: id
*              schema:
*                  type: string
*              required: true
*      responses: 
*          '200':
*              description: A successful response
*/
app.get('/trainlist/:id', (req,res)=>{
trains.findById(req.params.id).then((trains)=>{

    if(trains){
      res.json(trains)
    }
    else{
      res.sendStatus(404)
    }

}).catch(err => {
    if(err){
      throw err;
    }
    else{
      res.sendStatus(200).send("tickets")
    }
})
})

/**
* @swagger
* /addtrain:
*   post:
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object                      
*     responses:
*       200:
*         description: Returns the requested user
*/
app.post('/addtrain', function(req,res){
  var newTrain = {
    name: req.body.name,
    time: req.body.time,
    trainno: req.body.trainno
  }
  var trains1 = new trains(newTrain);
  trains1.save().then( () => {
    console.log('New Train added')
  }).catch((err)=>{
    if(err)
    {
      throw err;
    }
    else{
      res.sendStatus(200).send("tickets")
    }

  })
  res.send('A new train added');
  })


    /**
     * @swagger
     * /deletetrain/{id}:
     *   delete:
     *     parameters:
     *      - in: path
     *        name: id
     *        type: string
     *     description: Train deleted
     *     responses:
     *       200:
     *         description: Returns the requested admin
     */
app.delete('/deletetrain/:id', function(req,res){
  trains.findOneAndRemove(req.params.id).then(()=>{
    res.send('Train deleted')

}).catch(err => {
    if(err){
      throw err;
    }
    else{
      res.sendStatus(200).send("deleted")
    }
})
res.send('A train deleted');
  
  })




        /**
         * @swagger
         * /trainlist/{id}:
         *   put:
         *     parameters:
         *       - in: path
         *         name: id
         *         type: string
         *     requestBody:
         *       content:
         *         application/json: 
         *             schema:
         *                type: object
         *     responses:
         *         200:
         *           description: put train by ID
         */
  app.put('/trainlist/:id', (req,res,next)=>{
    trains.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        trains.findOne({_id: req.params.id}).then((trains)=>{
            res.json(trains);
    });
});
});

app.get('/userinfo', function(req, res) {
 
  userinfo.find().then((userinfo) => {
      res.json(userinfo)
  }).catch(err => {
      if (err) {
          throw err;
      }
  })

})
app.delete('/userinfo/:id', function(req, res) {
  userinfo.findByIdAndDelete(req.params.id).then(() => {
      res.send('User deleted')

  }).catch(err => {
      if (err) {
          res.sendStatus(404);
      }
  })

})



//axios
app.get('/users', (req, res, next) => {
  axios.get("http://localhost:1002/userinfo").then((response) => {
      var users = response.data;
      res.send(users);

  });
});


app.post("/postuser", (req, res) => {
  axios.post("http://localhost:1002/adduserinfo", {
      FirstName: "dada",
      LastName: "dasda",
      Address: "dadad",
      PhoneNo: 4234232453
  }).then((response) => {
      var user1 = response.data;
      res.send(user1);
  }).catch((err) => {
      console.log(err.message);
  })
})


}