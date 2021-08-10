const classSchema=require('../model/class');
const studentSchema=require('../model/student')
const creating_class=async (req,res)=>{
console.log(req.body);
const {studentList,Departement,courseList}=req.body;
if(!(studentList && Departement && courseList))
res.status(400).send("all Inputs are required!");
try{const  cls=await classSchema.create({

    studentList:studentList,
    Departement:Departement,
    courseList:courseList
});

let course=await studentSchema.updateMany({
    _id:{$in:studentList},

},{markList:courseList,classId:cls._id})


 course=await studentSchema.find({_id:{$in:studentList}}).populate("classId");
// course=await classSchema.findOne().populate("courseList.course");

 res.status(200).send(cls);
}catch(err){

    res.status(400).send(err.message);
}

    }
    module.exports=creating_class;