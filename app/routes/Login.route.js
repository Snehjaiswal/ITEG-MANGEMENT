/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:51:45 pm
 */

"use strict"

const router = require("express").Router()
const { signup ,activateEmail , signin }= require('../controllers/Login.controller')

const auth = require('../middlewares/auth')



router.post('/signup',signup)
router.post('/activation', activateEmail)
router.post('/signin',signin)
// router.post('/refresh_token', getAccessToken)
// router.post('/forgot', forgotPassword)
// router.post('/reset',auth, resetPassword)

module.exports = router;