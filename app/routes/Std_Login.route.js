"use strict"

const { Std_signup , Std_signin ,activateEmail,getAccessToken ,forgotPassword , resetPassword  }= require('../controllers/Std_Login.controller')
const router = require("express").Router()



router.post('/signup',Std_signup)
router.post('/signin',Std_signin)
router.post('/activation', activateEmail)
router.post('/refresh_token', getAccessToken)
router.post('/forgot', forgotPassword)
router.post('/reset', resetPassword)
module.exports = router;