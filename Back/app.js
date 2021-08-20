require("dotenv").config();
require("./config/database").connect();
const express=require('express');
const lecturer=require('./model/user');
const student=require('./model/student');
const app=express();
const classes=require('./model/class');
const cors=require('cors');
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
const bodyparser=require('body-parser')
const cookieParser=require('cookie-parser');
const session=require('express-session');
const auth=require('./middleware/auth')
const {getAllClasses,deleteUser,updateUsers,getAllUsers,creating_class,adding_course,answering_questions,ask,schedule_view,registering, downloading_resources, group_discussion,group_management,leturing,online_join,posting_info,preparing_exam,scheduling,take_exam,login}=require('./reqs/reqs')
const upload=require('./middleware/upload');
const apps=(sessionHandler)=>{app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.use(cookieParser());
app.use(sessionHandler);
app.get('/',async(req,res)=>{
    let st=await student.find({},"_id");
console.log(st);
    res.send(st);
    
    });
  
app.post("/welcom",auth,(req,res)=>{

res.status(200).send("welcome");
});
app.post('/register',(req,res)=>registering(req,res));
app.post('/login',async (req,res)=>{login(req,res,lecturer)});
app.post('/download_resource',(req,res)=>downloading_resources(req,res));
app.post('/group_discussion',(req,res)=>{group_discussion(req,res)});
app.post( "/group_management",(req,res)=>group_management(req,res));
app.post( "/leturing",(req,res)=>{leturing(req,res)});
app.post("/login",(req,res)=>login(req,res));
app.post("/notification",(req,res)=>notification(req,res));
app.post("/online_join",(req,res)=>online_join(req,res));
app.post("/posting_info",(req,res)=>posting_info(req,res));
app.post("/preparing_exam",(req,res)=>posting_info(req,res));
app.post("/schedule_view",(req,res)=>schedule_view(req,res));
app.post("/scheduling",(req,res)=>scheduling(req,res));
app.post("/take_exam",(req,res)=>take_exam(req,res));
app.post("/ask",(req,res)=>ask(req,res));
app.post("/answering_questions",(req,res)=>answering_questions(req,res));
app.post("/adding_course",(req,res)=>adding_course(req,res));
app.post("/creating_class",(req,res)=>creating_class(req,res));
app.get("/login",(req,res)=>login(req,res));
app.post("/set_profile",upload.single('avatar'),(req,res)=>{
   res.status(200).send(req.body);
});
app.post("/get_all_users",(req,res)=>getAllUsers(req,res));
app.post("/update_users",(req,res)=>updateUsers(req,res));

app.post("/delete",(req,res)=>deleteUser(req,res));
app.post("/get_all_classes",(req,res)=>getAllClasses(req,res));

return app;

}
module.exports=apps;






















