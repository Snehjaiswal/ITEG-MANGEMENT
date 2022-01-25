/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:51:38 pm
 */

"use strict"

const mongooose = require('mongoose');


const registationSchema = new mongooose.Schema({
    Registation_Id: {
        type: String,
        require: true,
    },

    Fname: {
        type: String,
        required: true,
        trim: true

    },
    Lname: {
        type: String,
        required: true,
        trim: true

    },
    Dob: {
        type: Date
        // required:true

    },
    Gender: {
        type: String,
        required: true
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
    FatherName: {
        type: String,
        required: true,
        trim: true

    },
    FatherPhone: {
        type: Number,
        required: true,
        trim: true
    },
    joinDate: {
        type: Date

    },
    AadharNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true

    },
    Branch: {

    },
    parcent_10: {
        type: String

    },
    parcent_12: {
        type: String


    },
    Photo: {
        type: String

    },
    Marksheet_10: {
        type: String

    },
    Marksheet_12: {
        type: String

    },
    certificate_diploma: {
        type: String

    },
    your_Achiv_certificate: {
        type: String

    },
    Sport_certificate: {
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
        default: "Student"
    }
},

    {
        timestamps: true
    })

// collection creation 
const Student_Reg = mongooose.model('Student_Reg', registationSchema, "Student Registration")

module.exports = Student_Reg;