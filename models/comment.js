const mongoose = require("mongoose");

//SCHEMA setup
var commentSchema = new mongoose.Schema({
	text: String,
	name : String
});

module.exports = mongoose.model("Comment", commentSchema);