/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:51:58 pm
 */

"use strict"


const { Registation,Show_List,Search }= require('../controllers/Student_Reg.controller');

const router = require("express").Router()


router.post("/Registation", Registation )

router.get("/List", Show_List)

router.get("/Search/:key", Search)



// its basic 


module.exports = router;
