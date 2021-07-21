require('dotenv').config();
const express=require('express');
const User=require('./model/user');
const app=express();
const cors=require('cors');

const bodyparser=require('body-parser')
const cookieParser=require('cookie-parser');
const session=require('express-session');
const auth=require('./middleware/auth')
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

/*
 * Management of sessions
 */
var sessionHandler = session({
    secret : 'none',
    rolling : true,
    resave : true,
    saveUninitialized : true
});
app.use(cookieParser());
app.use(sessionHandler);
app.get('/',(req,res)=>{

    res.send({express:'Created!'});
    
    });
app.post("/welcom",auth,(req,res)=>{

res.status(200).send("welcome");
});
app.post('/register',async (req,res)=>{
try{
const {first_name,last_name,email,password}=req.body;
if(!(email && passwrod && first_name && last_name))
{
    res.status(400).send('All input is required');
}
const oldUser=await User.findOne({email});
if(oldUser){
    return res.status(409).send("user already existes");

}
encryptedPassword=await bcrypt.hash(password,10);

const user=await User.create({
first_name,
last_name,
email:email.toLowerCase(),
password:encryptedPassword,

})

const token=jwt.sign(
    {user_id:user._id,email},
    process.env.TOKEN_KEY,{
        expiresIn:"2h"
    }
);
user.token=token;
res.status(201).json(user);

}catch(err){
    console.log(err);
}


});
app.post('/login',async (req,res)=>{

try{
const{first_name,last_name,email,password}=req.body;
if(!(email && password ))
{
    res.status(400).send("All iniputs required");
}
const user=await User.findOne({email});
if(user && (await(bcrypt.compare(password,user.password))))
{
const toke=jwt.sign(
{user_id:user._id},
process.env.TOKEN_KEY,
{
    expiresIn:"2h",
}

);
user.token=token;
res.status(200).json(user);



}
res.status(400).send("Invalid Credentials");

}catch(err){
    console.log(err);
}

});




module.exports=app;
