const mongoose = require("mongoose");

//SCHEMA setup
var postSchema = new mongoose.Schema({
	image: { data: Buffer, contentType: String},
	caption: String,
	name: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Post", postSchema);