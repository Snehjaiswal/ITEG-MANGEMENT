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
const cors = require("cors");
const aws = require('aws-sdk')
const multer = require('multer')
const { port ,BUCKET ,secretAccessKey,accessKeyId,region } = require("./config")



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Multer and Bucket
const multerS3 = require('multer-s3');
aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION
});
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    })
})


//img post in database and bucket
app.post('/upload', upload.array('file'), async function (req, res, next) {
    res.send('Successfully uploaded ' + req.file);
   await User.create({photoUrl:req.file})
})
//get all files
app.get("/list", async (req, res) => {
    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    var x = r.Contents.map(item => item.Key);
    res.send(x);
    User.create({photoUrl:req.file})
 console.log(x);
})


// Home Route
app.get('/', (req,res)=>
    res.send("Welcome every one....")
)

// Routes Or API's
app.use('/api/login',require('./app/routes/Login.route'))
app.use('/api/otp',require('./app/routes/otp.router'))
app.use('/api/Student_Reg',require('./app/routes/Student_Reg.route'))
app.use('/api/Teacher_Reg',require('./app/routes/Teacher_Reg.route'))


// Server start
app.listen(port, () =>
 console.log(`Server is running on http://127.0.0.1:${port}`))
