/*
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:47:59 pm
 */

"use strict"

const bcrypt = require('bcrypt')

const { } = require('../routes/otp.router')

class OTP {
    async GenerateOTP (email){
        try {
            const otp = Math.floor((Math.random() * 1000000) + 1);
            const ttl = 5 * 60 * 1000;
            const expies = Date.now() + ttl;
            
            const data = ` ${email}.${otp}.${expies}`;

            const hash = await bcrypt.hash(data, 10);
            
            const fullhash = `${hash}.sj.${expies}`
            
            // console.log({otp,email ,fullhash});
            return{
                otp,
                hash:fullhash,
            }
            
            
        } catch (error) {
            console.log({error});
        }

    }


    // validation 
async validateOTP(otp , email , hash){
   
    try {
     
        const [hashvalue,expies] = hash.split(".sj.");
        console.log({hashvalue ,expies});
        const now = Date.now();
        
            if (now > + expies) {
                return {
                    verification: false,
                    msg: "OTP expired"
                };
            }

            const data = `${email}.${otp}.${expies}`;

            const isValid = await bcrypt.compare(data, hashvalue ,function(err, result) {
                // result == true
            });
        
            if (!/*
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:47:51 pm
 */
isValid) {
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
        
    } catch (error) {
        console.log({error});
        
    }
}
}

module.exports = new OTP()