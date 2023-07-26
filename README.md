SocialMediaWeb-API là API được viết phục vụ cho SocialMediaWeb  
Sử dụng Nodejs, ExpressJS và MongoDB   

Hướng dẫn sử dụng api.http:   
Tải extension REST Client, mở file api.http, ấn vào "send request"

# Hướng dẫn tích hợp PayPal vào ứng dụng web Node.js

## Bước 1: Tạo tài khoản PayPal

Để bắt đầu, bạn cần có một tài khoản PayPal. Nếu bạn chưa có, hãy truy cập [https://www.paypal.com](https://www.paypal.com) để tạo một tài khoản (tạo tài khoản sandbox để test các giao dịch).

## Bước 2: Cài đặt Node.js và npm

Nếu bạn chưa cài đặt Node.js và npm, hãy truy cập [https://nodejs.org](https://nodejs.org) để tải về và cài đặt phiên bản mới nhất.

## Bước 3: Tạo dự án Node.js

1. Tạo một thư mục mới cho dự án của bạn và mở terminal trong thư mục đó.

2. Khởi tạo một dự án Node.js bằng cách chạy lệnh sau:
```bash
npm init -y
```

## Bước 4: Cài đặt thư viện PayPal
Chúng ta sử dụng thư viện `paypal-rest-sdk` để giao tiếp với PayPal API. Cài đặt thư viện này bằng cách chạy lệnh sau:  
```bash
npm install paypal-rest-sdk
```

## Bước 5: Cấu hình API PayPal

Trước khi sử dụng PayPal API, bạn cần lấy các thông tin cấu hình từ tài khoản PayPal của bạn. Bạn sẽ nhận được "Client ID" và "Secret" từ trang cấu hình của ứng dụng PayPal.

## Bước 6: Khởi tạo và xác thực PayPal

Trong tệp của ứng dụng Node.js, hãy thêm mã sau để khởi tạo và xác thực PayPal:

```javascript
const paypal = require('paypal-rest-sdk');

// Thay thế bằng Client ID và Secret của bạn
paypal.configure({
  mode: 'sandbox', // 'sandbox' hoặc 'live' 
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET'
});    
```
## Bước 7: Tạo thanh toán

Tiếp theo, chúng ta sẽ tạo một thanh toán PayPal cho khách hàng:

```javascript
const createPayment = (req, res) => {
  const paymentData = {
    intent: 'sale', //  mục đích của giao dịch thanh toán 
    payer: {
      payment_method: 'paypal' // phương thức thanh toán
    },
    redirect_urls: {
      return_url: 'YOUR_RETURN_URL', // URL mà PayPal sẽ chuyển hướng khách hàng sau khi thanh toán thành công
      cancel_url: 'YOUR_CANCEL_URL' //URL mà PayPal sẽ chuyển hướng khách hàng nếu họ chọn hủy bỏ thanh toán hoặc nếu có bất kỳ lỗi nào trong quá trình thanh toán
    },
    transactions: [{
      item_list: {
        items: [{
          name: 'Product Name',
          sku: 'Product SKU', // Mã số sản phẩm
          price: 'Product Price', 
          currency: 'USD',
          quantity: 1 // Số lượng
        }]
      },
      amount: {
        currency: 'USD',
        total: 'Product Price' //// giá tiền tổng cộng của các sản phẩm
      },
      description: 'Payment description'
    }]
  };

  paypal.payment.create(paymentData, (error, payment) => {
    if (error) {
      console.error(error);
    } else {
      // Lưu payment.id để sử dụng trong bước sau
      // Redirect khách hàng đến payment.links[1].href
      res.redirect(payment.links[1].href);
    }
  });
};

```  




# Hướng dẫn tích hợp Stripe vào ứng dụng web Node.js

## Bước 1: Tạo tài khoản stripe

Để bắt đầu, bạn cần có một tài khoản stripe. Nếu bạn chưa có, hãy truy cập [https://www.stripe.com](https://www.stripe.com) để tạo một tài khoản. Sau khi đăng ký, bạn sẽ nhận được các thông tin quan trọng như "Publishable Key" và "Secret Key". 

## Bước 2: Cài đặt Stripe trong ứng dụng Node.js

Nếu bạn chưa cài đặt Node.js và npm, hãy truy cập [https://nodejs.org](https://nodejs.org) để tải về và cài đặt phiên bản mới nhất. Mở terminal hoặc command prompt và di chuyển vào thư mục dự án của bạn. Sau đó, cài đặt thư viện Stripe bằng npm:
```bash
npm install stripe
```

## Bước 3: Khởi tạo Stripe và lưu các khóa .
```javascript
const stripeSecretKey = 'YOUR_STRIPE_SECRET_KEY';
const stripe = require('stripe')(stripeSecretKey);
```
## Bước 4: Tạo routes để xử lý thanh toán
Trong file server (ví dụ: 'index.js' hoặc 'server.js'), bạn sẽ cần thêm các routes để xử lý thanh toán thông qua Stripe . Dưới đây là một ví dụ:
```javascript
const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()

var Publishable_Key = 'Your_Publishable_Key'
var Secret_Key = 'Your_Secret_Key'

const stripe = require('stripe')(Secret_Key)

const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
	res.render('Home', {
	key: Publishable_Key
	})
})

app.post('/payment', function(req, res){

	// Moreover you can take more details from user
	// like Address, Name, etc from form
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
			amount: 2500,	 // Charging Rs 25
			description: 'Web Development Product',
			currency: 'INR',
			customer: customer.id
		});
	})
	.then((charge) => {
		res.send("Success") // If no error occurs
	})
	.catch((err) => {
		res.send(err)	 // If some error occurs
	});
})

app.listen(port, function(error){
	if(error) throw error
	console.log("Server created Successfully")
})
```

## Bước 5: Tạo trang thanh toán (payment.ejs)
Trong thư mục 'views', tạo file 'payment.ejs', trong đó bạn có thể định nghĩa một form để nhận thông tin thanh toán từ người dùng (ví dụ: tên, số thẻ, ngày hết hạn, mã bảo mật,...). Dưới đây là ví dụ :
```ejs
<!DOCTYPE html>
<html>
<title>Stripe Payment Demo</title>
<body>
	<h3>Welcome to Payment Gateway</h3>
	<form action="payment" method="POST">
	<script
		src="//checkout.stripe.com/v2/checkout.js"
		class="stripe-button"
		data-key="<%= key %>"
		data-amount="2500"
		data-currency="inr"
		data-name="Crafty Gourav"
		data-description="Handmade Art and Craft Products"
		data-locale="auto" >
		</script>
	</form>
</body>
</html>

```

