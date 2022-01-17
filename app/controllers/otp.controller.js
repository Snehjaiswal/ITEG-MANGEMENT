"use strict"

const bcrypt = require('bcryptjs')


class OTP {

    // otp genetate 
    async generateOTP(email) {
        const otp = Math.floor((Math.random() * 1000000) + 1);
        const ttl = 1 * 60 * 1000;
        const expies = Date.now() + ttl;

        const data = ` ${email}.${otp}.${expies}`;
        const hash = await bcrypt.hash(data, 10);
      console.log({data});
      console.log({hash});
        
        return {
             otp,
            hash,
        }        
    
    }



// verify otp 
async validateOTP(otp, email, hash) {
    const [fullHash, expies] = hash.split(".");
    const now = Date.now();

    if (now > + expies) {
        return {
            verification: false,
            msg: "OTP expired"
        };
    }
    const data = `${email}.${otp}.${expies}`;
    const isValid = bcrypt.compare(data, fullHash);

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
}
}

module.exports = new OTP()
