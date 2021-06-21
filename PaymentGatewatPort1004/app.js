const express = require('express');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AaW_vovkxUC1Q01tttuAviyTf1y0R6Vuhc7-onuMMZ_-UUhx07sN0dX0BX_38e5z9CRBAGt7TAMkywuh',
  'client_secret': 'EPp6SC0P2N6ufjKSJKBbun3N4zhT98G_iUdv-JwUnOiTl3y9DZwrTuTkOMaiAGQUA_-ZnSbujkYS2j15'
});

const app = express();

app.get('/', (req, res) => res.sendFile(__dirname + "/app.html"));


app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:1004/success",
        "cancel_url": "http://localhost:1004/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Train Ticket",
                "sku": "001",
                "price": "1000",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1000"
        },
        "description": "Payment FUnction"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});


});

app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "1000"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
});

app.get('/cancel', (req, res) => res.send('Cancelled'));


app.listen(1004)
console.log('Listening to 1004')
