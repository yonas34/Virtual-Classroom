const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
name:{type:String},
code:{type:String,unique:true},
departement:{type:String}
});
const model=mongoose.model("course",userSchema);
console.log(model);
module.exports=model;