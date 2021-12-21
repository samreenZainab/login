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
app.get("/home",async(req,res)=>{
    session=req.session
    if(session.userid)
    return  res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    })

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.post("/signup",async(req,res)=>{
    const obj = new userModel(
        {
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        }) 
     await obj.save() 
    res.redirect('views/login.html')
})

app.post("/login",async(req,res) => {
            const user = await userModel.find({ name:req.body.username, password:req.body.password }).exec();
            if (!user) {
            return res.redirect('/login') } 
            if(user)
            {
                session=req.session
                session.userid=req.body.username
                res.cookie("value",user)
               return res.redirect("/home")
            } 
            else {
                console.log("3st")
                res.redirect("/login")
            }
})

app.listen(PORT, function() {
    console.log("app is running on port " + PORT);
})
