const trains = require("../model/train");
const userinfo = require("../model/userinfo")
module.exports = function(app){


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
  })

})

/** 
 *  @swagger
 *  /trainlist/60d047d5ac7cf92d2c4c501b/:
 *  get:
 *      summary: "To get the list of all trains"
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
})
})



app.get('/userinfo', function(req,res){
  
  userinfo.find().then((userinfo)=>{
    res.json(userinfo)
  }).catch(err => {
    if(err){
      throw err;
    }
  })

})

app.post('/adduserinfo', function(req,res){
  var newUserInfo = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Address: req.body.Address,
    PhoneNo: req.body.PhoneNo
  }
  var userinfo1 = new userinfo(newUserInfo);
  userinfo1.save().then( () => {
    console.log('New Userinfo Added')
  }).catch((err)=>{
    if(err)
    {
      throw err;
    }
    else{
      res.sendStatus(200).send("Userinfo")
    }

  })
  res.send('User Info Added');
  })




}