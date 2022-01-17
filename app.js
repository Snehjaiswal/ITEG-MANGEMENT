"use strict"
require('./app/utils/mongooseConnecter.util')
const express = require("express")
const app = express()


const { port } = require("./config")

app.use(express.json())

app.use('/api/login',require('./app/routes/Login.route'))
app.use('/api/Reg',require('./app/routes/Student_Reg.route'))
app.use('/api/otp',require('./app/routes/otp.router'))


app.listen(port, () =>
 console.log(`Server is running on http://127.0.0.1:${port}`))

