/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:50:46 pm
 */

"use strict"

const Student_Reg = require('../models/Student_Reg.model')
const uuid = require("uuid").v4


class registation {

    // student post Registation  
    async Registation(req, res) {
        const Registation_Id = uuid()

        try { 
            const { Profile, FirstName, LastName, Dob, Gender, FatherContact, MobileNo, FatherName, MotherName, Email, joinDate, EnrollmentNo, PermanentAddress, ResidentialAddress, FatherOccupation, Course,Leval, Marksheet_10th, Marksheet_12th,  Sport_certificate,certificate_diploma, AadharNumber, SVS, SNS, Gaon_Ki_Beti, Post_Matrix } = req.body

            const St_reg = new Student_Reg({
                Registation_Id, Profile,FirstName, LastName, Dob, Gender, FatherContact, MobileNo, FatherName, MotherName, Email, joinDate, EnrollmentNo, PermanentAddress, ResidentialAddress, FatherOccupation, Course,Leval, Marksheet_10th, Marksheet_12th,  Sport_certificate,certificate_diploma, AadharNumber, SVS, SNS, Gaon_Ki_Beti, Post_Matrix 
            })
            
            await St_reg.save();
            res.status(201).json({ message: " registered successfuly" });
            console.log(St_reg);

        } catch (err) {
            console.log(err)
            res.status(400).json({ err });

        }
    }


    // Show Student list Data 
    async Show_List(req, res,next) {
        try {
           const result= await Student_Reg.find()

            res.status(200).json({
                data: result,
                message: "list data"
            })
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }

    }


}

module.exports = new registation();