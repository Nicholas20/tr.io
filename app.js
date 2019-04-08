const express = require("express"),
	  app = express(),
	  port = 3000,
	  passport = require("passport"),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  User = require("./models/user"),
	  Post = require("./models/post"),
	  Comment = require("./models/comment"),
	  seedDB = require("./seeds"),
	  LocalStrategy = require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose");

seedDB();
mongoose.connect("mongodb://localhost:27017/trio", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.render("landing");
});

//AUTH ROUTES
app.get("/signup", function(req, res){
	res.render("signup");
});

app.post("/signup", function(req, res){
	req.body.username;
	req.body.password;
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('signup');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("home.ejs");
		});
	});
});

//LOGIN ROUTES
app.get("/login", function(req, res){
	res.render("login");
})

app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,function(req, res){
});

//LOGOUT ROUTES
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

//
app.get("/home", function(req, res){
	res.render("home");
});

app.get("/user/:post", function(req, res){
	Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
		if(err){
			console.log(err);
		} else {
			res.render("post/show", {post: foundPost});
		}
	});
});

// app.post("/post/", function(req, res){

// });

// app.get("/post/comments", function(req, res){

// });

app.listen(port, function(){
	console.log("Tr.io server initiated.")
});