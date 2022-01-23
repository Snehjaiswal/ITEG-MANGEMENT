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
   

    <div>${url}</div></br>
    <p>${txt}</p>
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
