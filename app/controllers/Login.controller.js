/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:50:39 pm
 */

"use strict"

const LoginModel = require('../models/Login.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require("uuid").v4


const sendMail = require('../utils/sendEmail.util')
const OtpUtil = require('../utils/otp.util')

class Login {

    async signup(req, res) {
        const uniqueID = uuid()
        try {
            const { Name, email, password, cpassword } = req.body

            if (!Name || !email || !password || !cpassword)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." })

            const user = await LoginModel.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." })

            const passwordHash = await bcrypt.hash(password, 10)
            const cpasswordHash = await bcrypt.hash(cpassword, 10)

            const newUser = new LoginModel({ uniqueID, Name, email, password: passwordHash, cpassword: cpasswordHash, isVerifyed: false })
            await newUser.save()

            console.log({ newUser });

            // It's help Otp generater 
            const { otp, hash } = await OtpUtil.generateOTP(email);
            console.log({ otp, hash });

            const url1 = ` OTP: ${otp} `  //url for email
            const url2 = `<p>HASH :${hash} </p>`
            // it's help send mail
            sendMail(email, url1, url2, "Verify your email address")


            res.json({ 
                status:"panddig",
                msg: "Register Success! Please activate your email to start." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    }


    // ---------------------------------------------------------------------------------------------------------------------
    // Account activate using Otp
    async activateEmail(req, res) {
        try {
            const { email, otp, hash } = req.body;

            const [hashValue, expires] = hash.split(".seperator.");
            const now = Date.now();
            
            if (now > +expires) {
               res.json({
                    verification: false,
                    msg: `OTP Expired!`,
                })
            }
            
            const data = `${email}${otp}${expires}`;
           
            //Compare value is true are false 
            const isValid  = await bcrypt.compare(data, hashValue);
          
            if(!isValid) {
             res.json({ 
                 msg:"OTP is invalid.",
                 status:false, 
                })
            }else{
                 res.json({
                      msg:"OTP is valid.",
                      status:true,
                    })
                
                const user = await LoginModel.updateOne({ isVerifyed: true })
               

            }

        } catch (error) {
            console.error(error);
        }

    }

    // ----------------------------------------------------------------------------------------------------------------------
    // student signin information
    async signin(req, res) {
        try {
            const { email, password } = req.body
            // check if user exist
            const user = await LoginModel.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })



            res.json({ msg: "Login success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

// // email validation
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



module.exports = new Login()
