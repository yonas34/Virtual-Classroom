const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
classId:{type:mongoose.Schema.Types.ObjectId,ref:"class"},
userInfo:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
CGPA:{type:Number,default:0},
markList:[{course:{type:mongoose.Schema.Types.ObjectId,ref:"course",unique:true},assignment:{type:Number,max:10},test_1:{type:Number,max:10,default:0},test_2:{type:Number,max:30,default:0},final:{type:Number,max:50,default:0}}],
askedQuestions:[{type:mongoose.Schema.Types.ObjectId,ref:"question"}]
});
const model=mongoose.model("student",userSchema);
console.log(model);
module.exports=model;