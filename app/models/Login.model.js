/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:51:30 pm
 */

"use strict"

const { Schema , model} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const std_LoginSchema = Schema({
    uniqueID: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now
    },
    Role: {
        type: String,
        default: "Student"
    }


})



// collection creation 
const Std_LoginModel = model('STD_LOGIN', std_LoginSchema,"User Login");

module.exports = Std_LoginModel;

