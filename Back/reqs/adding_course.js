const courseSchema=require('../model/course');
const lecturerSchema=require('../model/lecturer');
const studentSchema=require('../model/student');
const adding_course=async (req,res)=>{

const {name,code,departement,lecturer}=req.body;
if(!(name && code ))
res.status(400).send("all inputs are required!");  

//console.log(req.body);
let course=await courseSchema.create({
name:name,
code:code,
structure:[]
});
console.log(course._id);

// course=await studentSchema.updateMany({
//    _id:{$in:studentList},

//  },{$push:{course:course._id}})

res.status(200).send(course);
    
    }
    module.exports=adding_course;