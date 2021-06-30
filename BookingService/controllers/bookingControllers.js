const Ticket = require('../models/tickets');
const axios = require('axios');
const isAuthenticated = require('../../middlewares/isAuthenticated');



module.exports.book_get = (req,res) => {
    Ticket.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            res.send(err)
        })
}




module.exports.book_post =  (req,res) => {


    const quantity = parseInt(req.body.quantity);
    const price = parseInt(req.body.price);
    const booking_id = Math.random().toString(36).substr(2, 5);
    let total = quantity*price;
    console.log(isAuthenticated.userEmail);
    

    
    const book_ticket = new Ticket({
        booking_id,
        train_id: req.body.train_id,
        quantity,
        total_price:total
    })
    book_ticket.save()
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(400).json({ message: "Booking not successful"});
        })    
}




module.exports.book_delete = (req,res) => {
    const id = req.params.id;
   
    Ticket.findOneAndRemove(id)
        .then((result)=>{
            res.status(200).json({ message: "Booking Cancelation request successful"});
        })
        .catch((err)=>{
            res.status(400).json({ message: "Booking Cancelation request not successful"});
        })
}


