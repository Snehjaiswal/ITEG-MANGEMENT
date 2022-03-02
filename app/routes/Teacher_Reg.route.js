/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Tue Mar 01 2022 9:21:01 pm
 */


"use strict"


const { Registation,getAll_Registation  }= require('../controllers/Teacher_Reg.controllers');

const router = require("express").Router()


router.post("/Registation", Registation )

router.get("/Registation", getAll_Registation)


// its basic 


module.exports = router;
