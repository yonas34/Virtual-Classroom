const users=require('../model/user');
const lecturer=require('../model/lecturer');
const student=require('../model/student');
const deleteUser= async(req,res)=>{


let query={
    _id:{

    $in:req.body.user}};


   await users.deleteMany(query);

   query={
    userInfo:{

    $in:req.body.lecturer}};  
    await lecturer.deleteMany(query);    



    query={
        userInfo:{
    
        $in:req.body.student}};  
        await student.deleteMany(query);    
    console.log(req.body);


    const user=await users.find({},{__v:0});

res.status(200).send(user);



};
module.exports=deleteUser;