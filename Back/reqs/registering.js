const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
const userSchema=require('../model/user');
const studentSchema=require('../model/student')
const lecturerSchema=require('../model/lecturer');
const register=async (req,res)=>{
  
   try{
const {first_name,last_name,email,password,user_type}=req.body;
if(!(first_name && last_name && email && password && user_type)){
   res.status(400).send('All input is required');
};
const oldUser=await userSchema.findOne({email});
   if(oldUser){
       return res.status(409).send("user already existes");
   
   }

const user=await userSchema.create({
   first_name:first_name,
last_name:last_name,
email:email,
password:await bcrypt.hash(password,10),
user_type:user_type
});

if(user_type==="student"){
 let student=await studentSchema.create({
classId:null,
userInfo:user._id,
// askedQuestions:new Map([['key','value']])
});
let doc=await studentSchema.findById(student._id).populate("userInfo");
res.status(201).send(doc);
}

if(user_type==="lecturer"){
 let lecturer= await lecturerSchema.create({
//   listOfClasses:[],
  userInfo:user._id,
//   scheduleList:[],
 //incomingQuestions:[{Question:"Questions",isAns:false}],
  });
  res.status(201).json(lecturer);
}
  //doc=await lecturerSchema.find({incomingQuestions:{$elemMatch:{isAns:false}}}).populate("userInfo");
  
// doc.forEach((incomingQuestions)=>{console.log(incomingQuestions.incomingQuestions)});










//    const {first_name,last_name,email,password,type,class_id}=req.body;
//    if(!(email && password && first_name && last_name && type))
//    {
//        res.status(400).send('All input is required');
//    }
   
//    if(type==="student" && class_id)
//    {res.status(400).send("Student must be assigned to specific class")}
//    const oldUser=type==="lecturer"?await lecturer.findOne({email}):await student.findOne({email});
//    if(oldUser){
//        return res.status(409).send("user already existes");
   
//    }
//    encryptedPassword=await bcrypt.hash(password,10);
   
//    const user=type==="lecturer"? await lecturer.create({
//    first_name,
//    last_name,
//    email:email.toLowerCase(),
//    password:encryptedPassword,
   
//    }): await student.create({
//        first_name,
//        last_name,
//        email:email.toLowerCase(),
//        password:encryptedPassword,
//        class:class_id    
//        });
   
//    const token=jwt.sign(
//        {user_id:user._id,email},
//        process.env.TOKEN_KEY,{
//            expiresIn:"2h"
//        }
//    );
//    user.token=token;
//    res.status(201).json(user);
   
   }catch(err){
       console.log(err);
   }
   
   
   }
    module.exports=register;