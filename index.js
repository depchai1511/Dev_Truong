const express = require('express')
const cors = require('cors')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const cookieSession = require("cookie-session");
const passport = require('passport')
require('dotenv').config()

const dbConnect = require('./config/dbconnect')
const app = express()
const PORT = process.env.PORT || 8888

app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

require('./passport');

dbConnect()
initRoutes(app)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const listener = app.listen(PORT, () => {
    console.log('Server is running on the port ' + listener.address().port);
})


