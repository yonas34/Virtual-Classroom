const mongoose=require('mongoose');
const deepPopulate=require('mongoose-deep-populate');
const userSchema=new mongoose.Schema({
userList:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
courseList:[{course:{type:mongoose.Schema.Types.ObjectId,ref:"course"},lecturer:{type:mongoose.Schema.Types.ObjectId,ref:"lecturer"},}],
batch:{type:Date,default:new Date()},
Departement:{type:String},
className:{type:String}
});
const model=mongoose.model("class",userSchema);
console.log(model);
module.exports=model;