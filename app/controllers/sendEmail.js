"use strict"
const {AUTH_EMAIL, AUTH_PASS  } = require("../../config")

// otp send
const nodemailer = require('nodemailer')
const { getMaxListeners } = require("../models/Login.model")

const sendEmail = (to, url, txt) => {
let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    }
})

const mailOptions = {
    from: 'kalalsneh@gmail.com',
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
