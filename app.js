const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})


const braintree = require("braintree");


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "gr7p2fp4yqp3gcdf",
  publicKey: "kq5tcsbndk8fp2wb",
  privateKey: "dea5726b0ba7a745a54227a85e3cfb1b	"
});

app.post("/client_token", (req, res) => {
  
  gateway.clientToken.generate({}, (err, response) => {
    
    res.send(response.clientToken);
  });
});

app.post("/checkout", (req, res) => {
  const nonceFromTheClient = req.body.payment_method_nonce;
  const paymentAmount = req.body.payment_amount;

  gateway.transaction.sale({
    amount: paymentAmount,
    paymentMethodNonce: nonceFromTheClient,
    deviceData: "MAC",
    options: {
      submitForSettlement: true
    }
  }, (err, result) => {
  });
});



app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})