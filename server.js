const express = require("express");
const app = express()
const mongoose=require('mongoose');
const body_parser = require("body-parser")
const userModel = require("./models/loginModel")
const env = require('dotenv').config()
const {dbConnection} = require("./database/connection")
const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var session
var Store = require('express-session').Store;
const loginModel = require("./models/loginModel");
var MongooseStore = require('mongoose-express-session')(Store);
new MongooseStore({connection: mongoose});
dbConnection()
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(body_parser.urlencoded({extended: true })); 
app.use(body_parser.json());
//serving public file
app.use(express.static(__dirname));
app.use(cookieParser());
app.get("/signup",(req,res)=>{
    res.sendFile('views/signup.html',{root:__dirname})
})
app.get("/login",(req,res)=>{
    res.sendFile('views/login.html',{root:__dirname})
})
app.post("/signup",(req,res)=>{
    const obj = new userModel(
        {
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        }) 
    obj.save() 
    res.redirect('views/login.html')
})
app.post("/login",(req,res) => {
    if(req.body.email === "" || req.body.password ===""){
       return res.status(206).send({
        success:false,
        message: "please enter username and password"
       }) 
    }
    var email = userModel.findOne({email:req.body.email}).select('email')
    if(email === null)
    {
    res.redirect("/signup").status(400).send({
            success:false,
            message: "user not registered"})
    }
    var password = userModel.findOne({email:req.body.password}).select('password')
    if(password === null)
    {
    res.redirect("/signup").status(400).send({
            success:false,
            message: "incorrect password"})
    }
    session=req.session;
    if(session.userid=req.body.username){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>")
    }else{
        res.redirect("/login.html")
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(PORT, function() {
    console.log("app is running on port " + PORT);
})
