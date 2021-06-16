module.exports = function(app){

app.get('/', function(req,res){
  
  res.render('admin');

})

app.post('/', function(req,res){
  res.send({'type': 'POST'})
  
  })

app.delete('/', function(req,res){
  res.send({'type': 'DELETE'})
  
  })

app.put('/', function(req,res){
  res.send({'type': 'PUT'})
  
  })
}