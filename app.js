"use strict"
require('./app/utils/mongooseConnecter.util')
const express = require("express")
const app = express()
// const cors = require("cors")

const { port } = require("./config")

app.use(express.json())

app.use('/api/login',require('./app/routes/Std_Login.route'))

// sneh
// sneh jaiswal
app.listen(port, () => console.log(`Server is running on http://127.0.0.1:${port}`))

// i am change the port number