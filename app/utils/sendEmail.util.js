/*
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:49:46 pm
 * Title:   ITEG Management System
 */

"use strict"
const {AUTH_EMAIL, AUTH_PASS  } = require("../../config")

// otp send
const nodemailer = require('nodemailer')
const { getMaxListeners } = require("../models/Login.model")

const sendEmail = (to, url, txt) => {
let transporter = nodemailer.createTransport({
    service:"gmail",
    port: 465,
    secure: true, 
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    }
})

const mailOptions = {
    from:process.env.AUTH_EMAIL,
    to:to,
    subject: "email verification",
    html: `
    <div style="max-width: 500px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome!!!</h2>
         
            
            <a  style="color: black; padding: 40px 20px; margin: 10px 10; display: inline-block;">${url}</a>
        
           
            </div>
    `
}

transporter.sendMail(mailOptions)
.then((response)=>{
    // console.log(response);
}).catch((error)=>{
    console.error(error);
})
}
module.exports = sendEmail
