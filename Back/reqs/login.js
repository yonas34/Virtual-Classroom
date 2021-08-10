const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
const User=require('../model/user');
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
        const token=jwt.sign(
        {user_id:user._id},
        process.env.TOKEN_KEY,
        {
            expiresIn:"2h",
        }
        
        );
        user.token=token;
        res.status(200).json(user);
        
        
        
        }
        else
{        res.status(400).send("Invalid Credentials");
}        
        }catch(err){
            console.log(err);
        }
        
    
    }
    module.exports=login;