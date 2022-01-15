   
"use strict"

const Student_Reg = require('../models/Student_Reg.model')
const uuid = require("uuid").v4
const uniqueID = uuid()


class Registation {

// student post Registation  
 async Registation(req, res){

    try{
       const { uniqueID, Fname , Lname , Dob , Gender , Email , Phone , FatherName , FatherPhone , joinDate , AadharNumber ,Branch, parcent_10,
         parcent_12 ,Photo ,Marksheet_10, Marksheet_12, certificate_diploma, your_Achiv_certificate , Sport_certificate} = req.body;
   
       const St_reg = new Student_reg({ Fname , Lname , Dob , Gender , Email , Phone , FatherName , FatherPhone , joinDate , AadharNumber ,Branch,
         parcent_10, parcent_12 ,Photo ,Marksheet_10, Marksheet_12, certificate_diploma, your_Achiv_certificate , Sport_certificate})
   
       await St_reg.save();
       res.status(201).json({ message: " registered successfuly" });
       console.log(St_reg);
   
    }catch(err){
        console.log(err)
    }
   }
   

// all student get data
async getAll_Registation(req,res){

    const{ uniqueID, Fname , Lname , Dob , Gender , Email , Phone , FatherName , FatherPhone , joinDate , AadharNumber ,Branch, parcent_10, parcent_12 ,Photo ,Marksheet_10, Marksheet_12, certificate_diploma, your_Achiv_certificate , Sport_certificate} = req.body;

    try{
        const getRegister = await Student_reg.find({});
        res.send(getRegister);
        console.log(getRegister);

    }catch(err){
console.log(err);
    }
}


// get data on using id
async  getId_Registation(req,res){
    try{
        const _id = req.params.id;
        const getstudent = await Student_reg.findById(_id);
        res.send(getstudent);
    
    }catch(err){
        res.status(400).send(err);
    
    }}


}

module.exports = Registation;