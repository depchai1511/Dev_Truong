const paypal = require('paypal-rest-sdk');
const router = require('express').Router()
const axios = require('axios');
const fs = require('fs')
const { getMaxListeners } = require('../models/user');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
router.post('/paypal', (req, res) => {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8888/success",
            "cancel_url": "http://localhost:8888/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

})

// router.post('/vnpay', async (req, res) => {
//     try {
//         const paymentData = {
//             // Các thông tin về đơn hàng, tổng tiền, mã giao dịch, ...
//             // Tùy theo yêu cầu của VNPAY và ứng dụng của bạn
//         };

//         // Gửi yêu cầu thanh toán đến VNPAY API
//         const response = await axios.post('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html', paymentData);

//         // Khi nhận được phản hồi từ VNPAY API, bạn có thể chuyển hướng khách hàng đến trang thanh toán của VNPAY
//         res.redirect(response.data.checkoutUrl);
//     } catch (error) {
//         console.error('Lỗi khi gửi yêu cầu thanh toán: ', error.message);
//         res.status(500).send('Lỗi khi gửi yêu cầu thanh toán.');
//     }
// });~

router.post("/stripe", async (req, res) => {
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gourav Hammad',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
        .then((customer) => {

            return stripe.charges.create({
                amount: 2500,     // Charging Rs 25
                description: 'Web Development Product',
                currency: 'INR',
                customer: customer.id
            });
        })
        .then((charge) => {
            res.send("Success")  // If no error occurs
        })
        .catch((err) => {
            res.send(err)       // If some error occurs
        });
});


module.exports = router