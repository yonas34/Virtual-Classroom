const courseSchema=require('../model/Course');
const lecturerSchema=require('../model/lecturer');
const studentSchema=require('../model/student');
const adding_course=async(req,res)=>{

const {course_name,course_id,departement,lecturer}=req.body;
if(!(course_name && course_id && departement && lecturer))
res.status(400).send("all inputs are required!");  

console.log(req.body);
let course=await new courseSchema({
course_name:course_name,
course_code:course_id,
departement:departement,
lecturer:lecturer
});

course=await courseSchema.findOne().populate('lecturer');
console.log(course);
await lecturerSchema.findByIdAndUpdate(lecturer,{$push:{listOfCourses:course._id}}).populate("listOfCourses");

course=await studentSchema.updateMany({
    _id:{$in:studentList},

},{$push:{course:course._id}})

res.status(200).send(course);
    
    }
    module.exports=adding_course;