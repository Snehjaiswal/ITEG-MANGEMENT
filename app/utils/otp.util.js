"use strict"

const bcrypt = require('bcrypt')

const { } = require('../routes/otp.router')

class OTP {
    async GenOTP (email){
        try {
            const otp = Math.floor((Math.random() * 1000000) + 1);
            const ttl = 5 * 60 * 1000;
            const expies = Date.now() + ttl;
            
            const data = ` ${email}.${otp}.${expies}`;

            const hash = await bcrypt.hash(data, 10);
            // console.log({hash});
            const fullhash = `${hash}.${expies}`
            
            // console.log({otp,email ,fullhash});
            return{
                otp,
                fullhash,
            }
            
            
        } catch (error) {
            console.log({error});
        }

    }


    // validation 
async validateOTP(otp , email , fullhash){
    console.log({otp, email,fullhash});
    try {
     
        const [ hashvalue,expies] = fullhash.split(".sj.");
        // console.log({hashvalue});
        const now = Date.now();
        
            if (now > + expies) {
                return {
                    verification: false,
                    msg: "OTP expired"
                };
            }

            const data = `${email}.${otp}.${expies}`;

            const isValid = bcrypt.compare(data, hashvalue);
        
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
}
}

module.exports = new OTP()