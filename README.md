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

