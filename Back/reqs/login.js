const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
const User=require('../model/user');
const lecturer=require('../model/lecturer');
const student=require('../model/student');
const login=async (req,res)=>{


    try{
        const{email,password}=req.body;
        console.log(email);
        if(!(email && password ))
        {
            res.status(400).send("All iniputs required");
        }
        const user=await User.findOne({email});

        if(user && (await(bcrypt.compare(password,user.password))))
        {
            userInfo=user._id;
            //const a=user.user_type==='student'? await student.findOne({userInfo: userInfo}):'d';
            const teachers= await lecturer.findOne({userInfo: userInfo});
            console.log(teachers);
        const token=jwt.sign(
        {user_id:user._id},
        process.env.TOKEN_KEY,
        {
            expiresIn:"2h",
        }
        
        );
        user.token=token;
        res.status(200).json({user:user,position:teachers});
        
        
        
        }
        else
{        res.status(400).send("Invalid Credentials");
}        
        }catch(err){
            console.log(err);
        }
        
    
    }
    module.exports=login;