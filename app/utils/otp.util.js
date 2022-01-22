/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 11:22:50 pm
 */

"use strict"

const bcrypt = require('bcrypt')

const { } = require('../routes/otp.router')

class OTP {
    async GenerateOTP (email){
        try {
            const otp = Math.floor(100000 + Math.random() * 9000000);
            const ttl = 5 * 60 * 1000;
            const expires = Date.now() + ttl;
            
            const data = ` ${email}.${otp}.${expires}`;

            const hash = await bcrypt.hash(data, 10);
            
            const fullhash = `${hash}.sj.${expires}`
            
            console.log("Generate OTP >>> ",{otp,email ,fullhash});
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
    
        const [hashvalue,expires] = fullhash.split(".sj.");
        // console.log({hashvalue });
        console.log("validateOTP >>>", {hashvalue, expires})
        const now = Date.now();
        
            if (now > +expires) {
                return {
                    verification: false,
                    msg: "OTP expired"
                };
            }

            const data = `${email}.${otp}.${expires}`;

            const isValid = await bcrypt.compare(data, hashvalue);
            console.log({isValid})
     
            if (isValid) {
                return {
                    verification: true,
                    msg: "OTP is valid.",
                }
            }
            else {
                return {
                    verification: false,
                    msg: "OTP is Invalid.",
                };
            }
 
}
}

module.exports = new OTP()