const trains = require("../model/train");
module.exports = function(app){


app.get('/', (req,res) => {
  res.render('admin')
})

app.get('/trainlist', function(req,res){
  
  trains.find().then((trains)=>{
    res.json(trains)
  }).catch(err => {
    if(err){
      throw err;
    }
  })

})

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
})
})

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

  })
  res.send('A new train added');
 // console.log(req.body);
  })

app.delete('/deletetrain/:id', function(req,res){
  trains.findOneAndRemove(req.params.id).then(()=>{
    res.send('Train deleted')

}).catch(err => {
    if(err){
      throw err;
    }
})
  
  })

app.put('/updatetrain', function(req,res){
  res.send({'type': 'PUT'})
  
  })
}