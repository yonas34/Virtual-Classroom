const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
studentList:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
courseList:[{course:{type:mongoose.Schema.Types.ObjectId,ref:"course",unique:true},assignment:{type:Number,max:10},test_1:{type:Number,max:10,default:0},test_2:{type:Number,max:30,default:0},final:{type:Number,max:50,default:0}}],
batch:{type:Date,default:new Date()},
Departement:{type:String}
});
const model=mongoose.model("class",userSchema);
console.log(model);
module.exports=model;