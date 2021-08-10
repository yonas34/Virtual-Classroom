const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
course_name:{type:String,default:null},
course_code:{type:String,default:null},
departement:{type:String},
lecturer:[{type:mongoose.Schema.Types.ObjectId,
ref:"lecturer"}],
markList:[{student:{type:mongoose.Schema.Types.ObjectId,ref:"student"},assignment:{type:Number,max:10},test_1:{type:Number,max:10,default:0},test_2:{type:Number,max:30,default:0},final:{type:Number,max:50,default:0}}]
});
const model=mongoose.model("course",userSchema);
console.log(model);
module.exports=model;