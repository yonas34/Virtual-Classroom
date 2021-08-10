const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
first_name:{type:String,default:null},
last_name:{type:String,default:null},
email:{type:String,default:null},
password:{type:String},
user_type:{type:String},
token:{type:String}
});
const model=mongoose.model("user",userSchema);
console.log(model);
module.exports=model;