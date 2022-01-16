"use strict"

const { signup , signin ,activateEmail,getAccessToken ,forgotPassword , resetPassword  }= require('../controllers/Login.controller')
const router = require("express").Router()/*
 * Created on Sun Jan 16 2022
 *
 * Copyright (c) 2022 Your Company
 */

const auth = require('../middlewares/auth')



router.post('/signup',signup)
router.post('/signin',signin)
router.post('/activation', activateEmail)
router.post('/refresh_token', getAccessToken)
router.post('/forgot', forgotPassword)
router.post('/reset',auth, resetPassword)

module.exports = router;