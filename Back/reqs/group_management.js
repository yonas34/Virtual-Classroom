const randomize=require('../model/utils/randomize');
const classSchema=require('../model/class');
const groupSchema=require('../model/group');
const group_management=async(req,res)=>{

const studentId=await classSchema.findById(req.body.classId);

const randomized_group=await randomize(studentId.studentList,req.body.group_no);
let grps=[];
let i=0;
randomized_group.forEach((group)=>{i++;grps.push({group:i,studentsID:group})})
try{
await groupSchema.create({
classId:req.body.classId,
groups:grps

});
const group=await groupSchema.find({}).populate("studentsID.userInfo");
    res.status(200).send(group);
}catch(err){
res.status(400).send(await groupSchema.findOneAndUpdate({classId:req.body.classId},{groups:grps}).populate("groups.studentsID"))

}

    }
    module.exports=group_management;