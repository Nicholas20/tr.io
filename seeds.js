var mongoose = require("mongoose");
var Post = require("./models/post");
var Comment   = require("./models/comment");
var User = require("./models/comment");

var data = [
    {
        name: "Nicholas R", 
        image: "public/images/apple.jpeg",
        caption: "This weekend.",
    },
    {
        name: "Nicholas S.", 
        image: "public/images/nuts.jpeg",
        caption: "This weekend.",
    },
    {
        name: "Nicholas T.", 
        image: "public/images/balloons.jpeg",
        caption: "This weekend.",
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Post.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed posts!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few posts
            data.forEach(function(seed){
                Post.create(seed, function(err, post){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a post");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                name: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    post.comments.push(comment);
                                    post.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;