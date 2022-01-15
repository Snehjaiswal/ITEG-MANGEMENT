"use strict"

const mongooose = require('mongoose');


const registationSchema = new mongooose.Schema({
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

    },
    parcent_12: {

    },
    Photo: {

    },
    Marksheet_10: {

    },
    Marksheet_12: {

    },
    certificate_diploma: {

    },
    your_Achiv_certificate: {

    },
    Sport_certificate: {

    },
    date: {
        type: Date,
        default: Date.now
    }}

 

    )

// collection creation 
const Student_Reg = mongooose.model('Student_Reg', registationSchema, "Student_Registration")

module.exports = Student_Reg;