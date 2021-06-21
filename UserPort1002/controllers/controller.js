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

}