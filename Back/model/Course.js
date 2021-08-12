const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
course_name:{type:String,default:null},
course_code:{type:String,default:null},
departement:{type:String},
lecturer:[{type:mongoose.Schema.Types.ObjectId,
ref:"lecturer"}],
});
const model=mongoose.model("course",userSchema);
console.log(model);
module.exports=model;