const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
classId:{type:mongoose.Schema.Types.ObjectId,ref:"class"},
userInfo:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
CGPA:{type:Number,default:0},
markList:[{course:{type:mongoose.Schema.Types.ObjectId,ref:"course"},mark:{'test_1':{type:Number,max:10,min:0},'test_2':{type:Number,max:10,min:0},'mid':{type:Number,max:30,min:0},'final':{type:Number,max:50,min:0}}}],
askedQuestions:[{type:mongoose.Schema.Types.ObjectId,ref:"question"}]
});
const model=mongoose.model("student",userSchema);
console.log(model);
module.exports=model;