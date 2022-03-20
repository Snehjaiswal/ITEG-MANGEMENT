/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:51:38 pm
 */

"use strict";

const mongooose = require("mongoose");

const registationSchema = new mongooose.Schema(
  {
    Registation_Id: {
      type: String,
      require: true,
      unique: true,
    },
    Profile: {
      type: String,
    },

    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },

    Dob: {
      type: Date,
    },
    Gender: {
      type: String,
    },
    FatherName: {
      type: String,

      trim: true,
    },
    MotherName: {
      type: String,
      required: true,
      trim: true,
    },
    MobileNo: {
      type: Number,
      required: true,
      trim: true,
    },
    FatherContact: {
      type: Number,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    joinDate: {
      type: Date,
    },
    EnrollmentNo: {
      type: String,
      unique: true,
      trim: true,
    },
    PermanentAddress: {
      type: String,
      required: true,
    },
    ResidentialAddress: {
      type: String,
    },
    FatherOccupation: {
      type: String,
    },
    Course: {
      type: String,
    },
    Leval: {
      type: String,
    },
    //     Qualification_10th :{
    //         Board:[] ,
    //         percentage : [],
    //         PassinngYear:[]
    // },
    // Qualification_12th :{
    //     Board:[] ,
    //     percentage : [],
    //     PassinngYear:[]
    //     },

    // Student Profile

    Marksheet_10th: {
      type: String,
    },
    Marksheet_12th: {
      type: String,
    },
    Sport_certificate: {
      type: String,
    },
    certificate_diploma: {
      type: String,
    },
    AadharNumber: {
      type: String,
    },
    SVS: {
      type: String,
    },
    SNS: {
      type: String,
    },
    Gaon_Ki_Beti: {
      type: String,
    },
    Post_Matrix: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    Role: {
      type: String,
      default: "Student",
    },
  },

  {
    timestamps: true,
  }
);

// collection creation
const Student_Reg = mongooose.model(
  "Student_Reg",
  registationSchema,
  "Student Registration"
);

module.exports = Student_Reg;
