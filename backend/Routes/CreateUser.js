const express = require('express')
const router = express.Router()
const User = require('../model/User')
const { check, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="HelloChetan#"
router.post("/CreateUser", [check('email').isEmail(), check('password', "password is invaild").isLength({ min: 5 })], 
 async (req, res) => {
    const error = validationResult(req);    
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt= await bcrypt.genSalt(10)
    const securePassword=await bcrypt.hash(req.body.password, salt)
    try {
        User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: securePassword
        })
        console.log("data insert successfully");
        

        res.json({ success: true })
        
        console.log("success");

    } catch (error) {
        console.log(error);
        res.json({ success: false })
        console.log("failure");

    }
});
router.post("/LoginUser",
    [check('email').isEmail(),
    check('password', "password is invaild").isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("error from validator side");
            return res.status(400).json({ errors: errors.array() });
        }
        let email=req.body.email;
        try {
            let userData= await User.findOne({email});
            // User.findOne({
            //     email: req.body.email,
            //     password: req.body.password
            // })
            if(!userData){
                return res.status(400).json({ errors:"Email address is Wrong"});
            }
            const passCompare= await bcrypt.compare(req.body.password,userData.password)
            if(!passCompare){
                return res.status(400).json({ errors:"Password is Wrong"});
                
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)

            
            
            console.log("User Validate successfully");
            console.log("from login user side success from  try side");
            return res.json({ success: true ,authToken:authToken})
            return res.json({ success: true})

        } catch (error) {
            console.log("from login user side error catch");
            console.log(error);
            res.json({ success: false })
        }
    });




module.exports = router;