const mongoose = require("mongoose");

//SCHEMA setup
var userSchema = new mongoose.Schema({
	name: String,
	comments : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	posts : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
});

module.exports = mongoose.model("User", userSchema);