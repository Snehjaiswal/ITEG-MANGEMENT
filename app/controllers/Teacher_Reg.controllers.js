/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Tue Mar 01 2022 8:52:33 pm
 */


"use strict"

const Teacher_Reg = require('../models/Teacher_Reg.model')
const uuid = require("uuid").v4


class registation {

    // student post Registation  
    async Registation(req, res) {
        const Registation_Id  = uuid()

        try {
    
        const {Fullname, Gender, DOB, Email, Phone, Address, join_Date, Post, Language_skill, Project_Work_Skill, Add_Image} = req.body
            
            const Teacher_reg = new Teacher_Reg({
                Registation_Id,Fullname, Gender, DOB, Email, Phone, Address, join_Date, Post, Language_skill, Project_Work_Skill, Add_Image
            })

            await Teacher_reg.save();
            res.status(201).json({ message: " registered successfuly" });
            console.log(Teacher_reg); 

        } catch (err) {
            console.log(err)
            res.status(400).json({ err });

        }
    }


    // all student get data
    async getAll_Registation(req, res) {

        const { Registation_Id,Fullname, Gender, DOB, Email, Phone, Address, join_Date, Post, Language_skill, Project_Work_Skill, Add_Image } = req.body;

        try {
            const getRegister = await Teacher_Reg.find({});
            res.send(getRegister);
            console.log(getRegister);

        } catch (err) {
            console.log
            (err);
        }
   
    }


}

module.exports = new registation();