
"use strict"

const Student_Reg = require('../models/Student_Reg.model')
const uuid = require("uuid").v4


class registation {

    // student post Registation  
    async Registation(req, res) {
        
        try {

            const {  Fname, Lname, Dob, Gender, Email, Phone, FatherName, FatherPhone, joinDate, AadharNumber, Branch, parcent_10,
                parcent_12, Photo, Marksheet_10, Marksheet_12, certificate_diploma, your_Achiv_certificate, Sport_certificate } = req.body;
                
                const Registration_ID = uuid()
            
                const St_reg = new Student_Reg({
                Registration_ID,  Fname, Lname, Dob, Gender, Email, Phone, FatherName, FatherPhone, joinDate, AadharNumber, Branch,
                parcent_10, parcent_12, Photo, Marksheet_10, Marksheet_12, certificate_diploma, your_Achiv_certificate, Sport_certificate
            })

            await St_reg.save();
            res.status(201).json({ message: " registered successfuly" });
            console.log(St_reg);

        } catch (err) {
            console.log(err)
        }
    }


    // all student get data
    async getAll_Registation(req, res) {

        const { Registration_ID, Fname, Lname, Dob, Gender, Email, Phone, FatherName, FatherPhone, joinDate, AadharNumber, Branch, parcent_10, parcent_12, Photo, Marksheet_10, Marksheet_12, certificate_diploma, your_Achiv_certificate, Sport_certificate } = req.body;

        try {
            const getRegister = await Student_Reg.find({});
            res.send(getRegister);
            console.log(getRegister);

        } catch (err) {
            console.log(err);
        }
    }


}

module.exports = new registation();