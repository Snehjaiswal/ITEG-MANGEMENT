"use strict"


const { registation,getAll_Registation , getId_Registation  }= require('../controllers/Student_Reg.controller');

const router = require("express").Router()


router.post("/Registation", registation )

router.get("/Registation", getAll_Registation)




module.exports = router;
