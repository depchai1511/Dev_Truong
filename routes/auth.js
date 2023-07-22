const router = require('express').Router()
const passport = require('passport')
require('dotenv').config()
//const authController = require('../controllers/authController')

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure' }),
    (req, res) => {
        console.log('ok')
        res.redirect('/success');
    }
);


router.get('/success',(req,res) => {
  res.send('OK')
});

router.get('/failure',(req,res) => {
  res.send('failed')
});

module.exports = router