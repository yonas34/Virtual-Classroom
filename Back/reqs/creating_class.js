const classSchema=require('../model/class');
const studentSchema=require('../model/student')
const lecturerSchema=require('../model/lecturer');
const creating_class=async (req,res)=>{
console.log(req.body);
const {userList,Departement,courseList,className}=req.body;
if(!(userList && Departement && courseList))
res.status(400).send("all Inputs are required!");
try{const  cls=await classSchema.create({

    userList:userList,
    Departement:Departement,
    courseList:courseList,
    className:className

});
const markList=[];
courseList.forEach((course)=>{
markList.push({course:course.course,mark:{test_1:0,test_2:0,mid:0,final:0}})
});

console.log(markList);
let course=await studentSchema.updateMany({
    userInfo:{$in:userList},

},{$addToSet:{markList:markList},classId:cls._id})


courseList.forEach(async(course)=>{
let lec=await lecturerSchema.findByIdAndUpdate(course.lecturer,{$push:{listOfClasses:{class:cls._id,course:course.course}}})
console.log(lec);
});








// course=await classSchema.findOne().populate("courseList.course");

 res.status(200).send(course);
}catch(err){

    res.status(400).send(err.message);
}

    }
    module.exports=creating_class;