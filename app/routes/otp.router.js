/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:51:52 pm
 */

"use strict"

const router = require('express').Router()
const { GenerateOTP, validateOTP } = require('../utils/otp.util')
const bcrypt = require('bcryptjs')
const { verify } = require('jsonwebtoken')

router.post('/generate-otp', generateOtp)
router.post('/verify-otp', verifyotp)

async function generateOtp(req, res) {
    // console.log(req.body);
    const { email } = req.body;
    const { otp, fullhash } = await GenerateOTP(email);

    res.send({ otp, fullhash });
    console.log({ otp, fullhash });
}

async function verifyotp(req, res) {
    // console.log(req.body);
    const { otp, email, fullhash } = req.body;

    // console.log({otp , email , hash});
    const output = await validateOTP(otp, email, fullhash);

    console.log({ output });
    res.send({ output })
}

module.exports = router;