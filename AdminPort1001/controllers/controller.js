const trains = require("../model/train");
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
 *  /trainlist/60cc92640bc0312f34e0bfdd/:
 *  get:
 *      summary: "To get the train by id"
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
 *  @swagger
 *  /addtrain/:
 *  post:
 *      summary: "To add train"
 *      responses: 
 *          '200':
 *              description: A successful response
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
 *  @swagger
 *  /deletetrain/60d047d5ac7cf92d2c4c501b/:
 *  delete:
 *      summary: "To delete train"
 *      responses: 
 *          '200':
 *              description: A successful response
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


  app.put('/trainlist/:id', (req,res,next)=>{
    trains.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        trains.findOne({_id: req.params.id}).then((trains)=>{
            res.json(trains);
    });
});
});
}