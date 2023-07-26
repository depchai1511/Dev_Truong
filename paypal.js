var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.paypal_client_id,
    'client_secret': process.env.paypal_client_secret
  });
