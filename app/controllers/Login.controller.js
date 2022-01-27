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

                // const verifedEmail = await LoginModel.findOne( {email:req.body.email},{ isVerifyedtrue: false })
                // if (verifedEmail) return res.status(400).json({ msg: "This email not verifed ." })

            // CHECK EMAIL IS ALREADY EXISTS ARE NOT
            const user = await LoginModel.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })

            // CHECK EMAIL IS VERIFED ARE NOT

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." })

            //Hash password 
            const passwordHash = await bcrypt.hash(password, 10)
            const cpasswordHash = await bcrypt.hash(cpassword, 10)

            // It's help Otp generater 
            const { otp, expires } = await OtpUtil.generateOTP(email);
            console.log({ otp, expires });


            const url = ` OTP: ${otp} `  //url for email
            
            // it's help send mail
            sendMail(email, url, "Verify your email address")

            // it's help save data in db
            const newUser = new LoginModel({ uniqueID, Name, email, password: passwordHash, cpassword: cpasswordHash, isVerifyed: false , otp, expires })
            await newUser.save();
            // console.log({ newUser });


            res.json({
                status: "panddig",
                msg: "Register Success! Please activate your email to start."
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    }
    //otp verifed
    async VerifyedOTP(req, res) {

        const { email, otp } = req.body;

        // const [hashValue, expires] = hash.split(".seperator.");
        const now = Date.now();
        const isValid = await LoginModel.findOne({email:email, otp: otp} )
        if (!isValid) {
            res.status(400).json({
                msg: "OTP is invalid.",
                status: false,
            })
        } else {
            const verifyAccount = LoginModel.findOneAndUpdate({email:req.body.email  }, { $set: { isVerifyed: true } })
            .then(()=>{
              
                console.log("successfully verifed");
               }).catch((err)=>{
                   console.log(err);
               })
            res.json({
                msg: "OTP is valid.",
                status: true,
            })
        }

        // if (now > +expires) {
        //     res.json({
        //         verification: false,
        //         msg: `OTP Expired!`,
        //     })
        // }

     
    }



    // student signin information
    async signin(req, res) {
        try {
            const { email, password } = req.body
            // check if user exist
            const user = await LoginModel.findOne({email:email, isVerifyedtrue: true} )
            
            
            if (!user) return res.status(400).json({ msg: "This email in not verifed." })

           

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
