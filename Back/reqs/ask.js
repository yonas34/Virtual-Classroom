const lecturerSchema=require('../model/lecturer');
const questionSchema=require('../model/questions');
const studentSchema=require('../model/student');
const ask=async (req,res)=>{
const {fromStudent,Question,lecturer_id}=req.body;
if(!(fromStudent&&Question&&lecturer_id))
res.status(400).send("all inputs are required!");
const data={Question:Question,fromStudent:fromStudent};

// const doc=await lecturerSchema.findOneAndUpdate({_id:lecturer_id},{new:true},(data)=>{console.log(data)});
const question=await questionSchema.create({
Question:Question,
fromStudent:fromStudent,
answers:{answeredBy:"610afa5f49f51d74139da9d1",answer:"hola!"}

});
console.log(question);
await studentSchema.findByIdAndUpdate(fromStudent,{$push:{askedQuestions:question._id}});
 await lecturerSchema.findByIdAndUpdate(lecturer_id,{$push:{incomingQuestions:question._id}});
// let doc=await lecturerSchema.findById(lecturer_id).populate("incomingQuestions").populate("incomingQuestions.fromStudent");
const doc=await studentSchema.findById(fromStudent).populate('askedQuestions');
console.log(doc);
res.status(200).send(doc);
    
    }
    module.exports=ask;