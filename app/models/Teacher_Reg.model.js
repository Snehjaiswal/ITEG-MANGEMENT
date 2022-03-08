/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Tue Mar 01 2022 8:41:47 pm
 */


"use strict"

const mongooose = require('mongoose');


const registationSchema = new mongooose.Schema({
    Registation_Id: {
        type: String,
        require: true,
    },
    // Teacher full name
    Fullname: {
        type: String,
        required: true,
        trim: true

    },
    Gender: {
        type: String,
        required: true,
        trim: true
    },
    DOB: {
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Phone: {
        type: Number,
        required: true,
        trim: true
    },
    Address: {
        type: String,
        required: true,
        trim: true

    },
    join_Date: {
        type: Date

    },
    Post: {
        type: String
    },
    Language_skill: [ String ],
    
    Project_Work_Skill: [String],

    Add_Image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVerifyed:
    {
        Boolean: false
    },
    Role: {
        type: String,
        default: "Teacher"
    }
},

    {
        timestamps: true
    })

// collection creation 
const Teacher_Reg = mongooose.model('Teacher_Reg', registationSchema, "Teacher Registration")

module.exports = Teacher_Reg;