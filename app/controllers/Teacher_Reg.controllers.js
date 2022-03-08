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



    // Teacherr show list
    async Show_List(req, res,next) {
        try {
           const result= await Teacher_Reg.find()

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

     // Search in Teacherr table
     async Search(req, res) {
        try {
       
                await Teacher_Reg.find({
                  $or: [
                    { "Fullname": { $regex:req.params.key}},
                    //  { "Phone": { $regex: req.params.key } },
                    { "Email": { $regex: req.params.key } },
                    { "Post": { $regex: req.params.key } },
                    { "Address": { $regex: req.params.key } },
                  ],
                })
            .then((result) => {console.log();
                        res.status(200).json({
                          search_data: result,
                          message: "list data was search successfully",
                        });
                      })
                      .catch((err) => {
                        res.status(400).send(err);
                      });
        } catch (err) {
            res.send(err);
            console.log(err);

        }
    }




}

module.exports = new registation();