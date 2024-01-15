/** import mongoose module */
const { default: mongoose } = require("mongoose");

/** set mongoose strictQuery option */
mongoose.set("strictQuery", false);

/**
 * initializes the connection to the 
 * MongoDB database using mongoose.
 */
module.exports = mongoose
	.connect("mongodb://127.0.0.1:27017/node_grpc")
	.then(() => console.log("Database connected successfully"))
	.catch(err => { throw err });