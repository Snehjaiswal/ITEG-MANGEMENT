/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:52:26 pm
 */

"use strict";
require("./app/utils/mongooseConnecter.util");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Home Route
app.get("/home", (req, res) => res.send("Welcome every one...."));

// Routes Or API's
app.use("/api/login", require("./app/routes/Login.route"));
app.use("/api/otp", require("./app/routes/otp.router"));
app.use("/api/Student_Reg", require("./app/routes/Student_Reg.route"));
app.use("/api/Teacher_Reg", require("./app/routes/Teacher_Reg.route"));

const port = process.env.PORT
// Server start
app.listen(port, () =>
  console.log(`Server is running on http://127.0.0.1:${port}`)
);
