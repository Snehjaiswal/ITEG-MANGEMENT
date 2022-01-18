"use strict"

const router  = require('express').Router()
// const {generateOTP, validateOTP } = require('../utils/otp.util')
const bcrypt = require('bcryptjs')




router.post('/generate',async (req,res)=>{
    try {
        const { email }= req.body;
        const otp = Math.floor((Math.random() * 1000000) + 1);
        const ttl = 1 * 60 * 1000;
        const expies = Date.now() + ttl;
        
        const data = ` ${email}.${otp}.${expies}`;
        const hash = await bcrypt.hash(data, 10);
        
        res.send({otp,hash})
        
    } catch (error) {
        console.log({error});
    }
})

router.post('/verify',async(req,res)=>{
    try {
    console.log("hi");
    const { otp,email,hash }= req.body;

    const [Hash, expies] = hash.split(".");
    const now = Date.now();

    
        if (now > + expies) {
            return {
                verification: false,
                msg: "OTP expired"
            };
        }
        const data = `${email}.${otp}.${expies}`;
        const isValid = bcrypt.compare(data, Hash);
    
        if (isValid) {
            return {
                verification: true,
                msg: "OTP is valid.",
            };
        }
        else {
            return {
                verification: false,
                msg: "OTP is Invalid.",
            };
        }
    
} catch (error) {
    console.log({error});
    
}
    
    
})



module.exports= router;