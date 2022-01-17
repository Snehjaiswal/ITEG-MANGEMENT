"use strict"

const router = require('express').Router()
const {generateOTP, validateOTP } = require('../controllers/otp.controller')


router.post('/generate-otp',genOTP)
router.post('/verify-otp',verifyOTP)


function genOTP(req,res) {
    
    const { email }= req.body;
    console.log({email});
    const { otp , hash }= generateOTP(email) 

    res.send({otp , hash});   
    console.log({otp , hash}); 
    // res.json({msg:"Success"})

}


// // vrifyOTP

function verifyOTP(req,res){
    
    const { otp , email , hash} = req.body;
    
    res.send({msg:"Success"})
}
module.exports= router;