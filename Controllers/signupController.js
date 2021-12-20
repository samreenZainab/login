// const session = require("express-session")
// const express = require("express");
// const userModel = require("../models/loginModel")
// const login= require("../views/login");
// const { turquoise } = require("color-name");

// class signup{
//     async singup(req,res){
//         const obj = new userModel(
//             {
//                 username:req.body.username,
//                 email:req.body.email,
//                 password:req.body.password
//             }) 
//            obj.save()
//            .then((userdata)=>{
//                return res.redirect(login).status(200).send({
//                    success:true,
//                    message:"record saved successfully"
//                })
//             //   return res.status(200).send({
//             //     success: true, 
//             //     message: "record saved successfully",})
//             })
//             .catch((err)=>{
//                 return res.status(400).send({
//                     success:false,
//                     err: {message: "save Failed"} });
//             })
//     }
    
// }
// module.exports = new signup()
