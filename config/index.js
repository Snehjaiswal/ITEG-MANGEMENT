/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:52:18 pm
 */

"use strict"

require("dotenv").config()

const config = {
	port: process.env.PORT,

	dbUri: process.env.MONGO_URI,
	dbName: process.env.MONGO_DB_NAME,
    
}

module.exports = config