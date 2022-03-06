/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:51:58 pm
 */

"use strict"


const { Registation,Show_List }= require('../controllers/Student_Reg.controller');

const router = require("express").Router()


router.post("/Registation", Registation )

router.get("/Show_List", Show_List)


// its basic 


module.exports = router;
