const users=require('../model/user');

const updateUsers= async(req,res)=>{

    req.body.forEach(async(data)=>{
console.log(data);
        console.log(await users.updateOne({_id:data._id},{first_name:data.first_name,last_name:data.last_name,email:data.email,passowrd:data.password,user_type:data.user_type}));
        
    });
const user=await users.find({},{__v:0});


res.status(200).send({process:1,users:user});



};
module.exports=updateUsers;