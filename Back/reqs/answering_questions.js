const questionsSchema=require('../model/questions');
const answering_questions=async (req,res)=>{

console.log(req.body);
const {answerdBy,answer,_id}=req.body;

if(!(answerdBy,answer,_id))
res.status(400).send("all Inputs are required");
const ans=await questionsSchema.findByIdAndUpdate(_id,{$push:{answers:{answerdBy:answerdBy,answer:answer}}});

    res.status(200).send(ans);
    
    }
    module.exports=answering_questions;