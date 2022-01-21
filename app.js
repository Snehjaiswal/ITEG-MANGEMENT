/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:52:26 pm
 */

"use strict"
require('./app/utils/mongooseConnecter.util')
const express = require("express")
const app = express()
const bodyParser = require('body-parser');


const { port } = require("./config")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.json())
// app.use(function (req, res, next) {

//     if (req.body && req.body.formData && typeof req.body.formData == 'string') {
//         let formData = JSON.parse(req.body.formData)

//         for (var key in formData) {
//             req.body[key] = formData[key]
//         }

//         delete req.body.formData
//     }
//     // console.log("Normal Call")
//     next()
// })

app.use('/api/login',require('./app/routes/Login.route'))
app.use('/api/Reg',require('./app/routes/Student_Reg.route'))
app.use('/api/otp',require('./app/routes/otp.router'))


app.listen(port, () =>
 console.log(`Server is running on http://127.0.0.1:${port}`))

