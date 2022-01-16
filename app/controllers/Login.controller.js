"use strict"

const LoginModel = require('../models/Login.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require("uuid").v4
const sendMail = require('../controllers/sendEmail')


const { CLIENT_URL } = process.env
class Login {
    
    // student signup information
    async signup(req, res) {
        const uniqueID = uuid()
        try {
            const {uniqueID, name, email, password, cpassword } = req.body

            if (!name || !email || !password || !cpassword)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." })

            const user = await LoginModel.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." })

            const passwordHash = await bcrypt.hash(password, 12)
            const cpasswordHash = await bcrypt.hash(cpassword, 12)


            const newUser = {
                uniqueID, name, email, password: passwordHash, cpassword: cpasswordHash
            }

            console.log(newUser);
            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/api/activate/${activation_token}`
            sendMail(email, url, "Verify your email address")


            res.json({ msg: "Register Success! Please activate your email to start." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    }

    // -----------------------------------------------------------------------------------------------------------------------
    // email activateEmail

    async activateEmail(req, res) {
        try {
            const { activation_token } = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {uniqueID, name, email, password, cpassword } = user

            const check = await LoginModel.findOne({ email })
            if (check) return res.status(400).json({ msg: "This email already exists." })

            const newUser = new LoginModel({
                uniqueID, name, email, password, cpassword
            })

            await newUser.save()
            console.log(newUser);

            res.json({ msg: "Account has been activated!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    // ----------------------------------------------------------------------------------------------------------------------
    // student signin information
    async signin(req, res) {
        try {
            const { email, password } = req.body
            const user = await LoginModel.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })


            res.json({ msg: "Login success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    // ----------------------------------------------------------------------------------------------
    // get access token
    async getAccessToken(req, res) {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please login now!" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login now!" })

                const access_token = createAccessToken({ id: user.id })
                res.json({ access_token })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

// ------------------------------------------------------------------------------------------------------------------------
    // forget passsword
    async forgotPassword(req, res) {
        try {
            const { email } = req.body
            const user = await LoginModel.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const access_token = createAccessToken({ id: user._id })
            const url = ` ${CLIENT_URL}/api/reset/${access_token}`
            console.log(url);
            sendMail(email, url, "Reset your password")
            res.json({ msg: "Re-send the password, please check your email." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    // reset password
    async resetPassword(req, res) {
        try {
            const { password } = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await LoginModel.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })

            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
    // ----------------------------------------------------------------------------------------------------------------

    // class end
}






// email validation
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// CREATEACTIVATION TOKEN
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}

// createAccessToken TOken
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '15m' })
}

// createRefreshToken 
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = new Login()