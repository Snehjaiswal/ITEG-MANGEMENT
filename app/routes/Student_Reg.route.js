"use strict"


const { Registation,getAll_Registation  }= require('../controllers/Student_Reg.controller');

const router = require("express").Router()


router.post("/Registation", Registation )

router.get("/Registation", getAll_Registation)





module.exports = router;
