const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    Question:{type:String,default:"question"},
    isAns:{type:Boolean,default:false}
    ,fromStudent:{type:mongoose.Schema.Types.ObjectId,ref:"student"},
    answers:[{answeredBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"},answer:{type:String},viewed:{type:Boolean,default:false}}],
    type:{type:mongoose.Schema.Types.ObjectId,ref:"course"}
});
const model=mongoose.model("question",userSchema);
console.log(model);
module.exports=model;