const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
listOfClasses:[{type:mongoose.Schema.Types.ObjectId,ref:"class"}],
listOfCourses:[{type:mongoose.Schema.Types.ObjectId,ref:"course"}],
userInfo:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
scheduleList:[{
    startDate:{type:Date},
    endDate:{type:Date},
    course:{type:mongoose.Schema.Types.ObjectId,ref:"class"}
}],
incomingQuestions:[{type:mongoose.Schema.Types.ObjectId,ref:"question"}]
});
const model=mongoose.model("lecturer",userSchema);
console.log(model);
module.exports=model;