"use strict"
const {AUTH_EMAIL, AUTH_PASS  } = require("../../config")

// otp send
const nodemailer = require('nodemailer')

const sendEmail = (to, url, txt) => {
let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    }
})

const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "email verification",
    html: `
   
    <a href=${url}  display: inline-block;">${txt}</a>

    <div>${url}</div>
    </div>
    `
}

transporter.sendMail(mailOptions, (err, infor) => {
    if(err) return err;
    return infor
})
}
module.exports = sendEmail
