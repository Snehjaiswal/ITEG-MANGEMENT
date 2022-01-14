"use strict"

const { connect, connection } = require("mongoose")
const { dbUri, dbName } = require("../../config")

connect(dbUri, (error) => {
	if (error) {
		console.log(error)
		return
	}
	connection.useDb(dbName)
	console.log("Connected to MongoDB")
})