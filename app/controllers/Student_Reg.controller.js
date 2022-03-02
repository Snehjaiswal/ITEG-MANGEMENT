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
        const Registation_Id  = uuid()

        try {
        const { Fname, Lname, Dob, Gender, Email, Phone, FatherName, FatherPhone, joinDate, AadharNumber, Branch, parcent_10, parcent_12, Photo, Marksheet_10, Marksheet_12, certificate_diploma, your_Achiv_certificate, Sport_certificate } = req.body
            
            const St_reg = new Student_Reg({
                Registation_Id, Fname, Lname, Dob, Gender, Email, Phone, FatherName, FatherPhone, joinDate, AadharNumber, Branch,
                parcent_10, parcent_12, Photo, Marksheet_10, Marksheet_12, certificate_diploma, your_Achiv_certificate, Sport_certificate
            })

            await St_reg.save();
            res.status(201).json({ message: " registered successfuly" });
            console.log(St_reg); 

        } catch (err) {
            console.log(err)
            res.status(400).json({ err });

        }
    }


    // all student get data
    async getAll_Registation(req, res) {

        const { uniqRegistation_IdueID, Fname, Lname, Dob, Gender, Email, Phone, FatherName, FatherPhone, joinDate, AadharNumber, Branch, parcent_10, parcent_12, Photo, Marksheet_10, Marksheet_12, certificate_diploma, your_Achiv_certificate, Sport_certificate } = req.body;

        try {
            const getRegister = await Student_Reg.find({});
            res.send(getRegister);
            console.log(getRegister);

        } catch (err) {
            console.log
            (err);
        }
   
    }


}

module.exports = new registation();