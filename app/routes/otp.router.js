"use strict"

const router  = require('express').Router()
const {GenOTP,validateOTP } = require('../utils/otp.util')
const bcrypt = require('bcryptjs')
const { verify } = require('jsonwebtoken')




router.post('/generate-otp',genotp)
router.post('/verify-otp',verifyotp)


function genotp(req,res) {
    // console.log(req.body);
    const {email}=req.body;
    const { otp , fullhash } = GenOTP(email);
    res.send({ otp , fullhash});
    console.log({ otp , fullhash});
}

function verifyotp(req,res){
    // console.log(req.body);
    const {otp , email , fullhash}=req.body;

    // console.log({otp , email , hash});
    const isValid = validateOTP(otp , email , fullhash);
    console.log({verifyinfi});



}



module.exports= router;