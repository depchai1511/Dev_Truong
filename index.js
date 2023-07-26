const express = require('express');
const cors = require('cors');
const initRoutes = require('./routes');
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 8888;
const { engine } = require('express-handlebars');
const path = require('path');
const fs = require('fs')
const paypal = require('paypal-rest-sdk');
require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.get('/', function(req, res){
  res.render('Home', {
     key: process.env.STRIPE_PUBLISHABLE_KEY
  })
})


app.get('/success', (req, res) => {
  res.send('OK');
});
app.get('/failure', (req, res) => {
  res.send('failed');
});

require('./passport');
require('./paypal');
dbConnect();
initRoutes(app);

const listener = app.listen(PORT, () => {
  console.log('Server is running on the port ' + listener.address().port);
});
