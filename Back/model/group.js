const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
classId:{type:mongoose.Schema.Types.ObjectId,ref:"class",unique:true},
groups:[{group:{type:Number},studentsID:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}]}]
});
const model=mongoose.model("group",userSchema);
console.log(model);
module.exports=model;