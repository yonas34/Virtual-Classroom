const users=require('../model/user');

const getAllUsers= async(req,res)=>{

const user=await users.find({},{__v:0});


res.status(200).send(user);



};
module.exports=getAllUsers;