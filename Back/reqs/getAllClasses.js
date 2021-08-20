const classSchema=require('../model/class');
const deepPopulate=require('mongoose-deep-populate');
const getAllClasses=async(req,res)=>{
;
const classes=await classSchema.find({}).populate({
path:"courseList",populate:{
    
path:"course lecturer",

    populate:{

        path:"userInfo"
    }

}

}).then((data)=>{
    console.log(data);
    res.send(data);
}).catch((err)=>{

    console.log(err);
});
// const classes=await classSchema.deepPopulate('courseList.lecturer.userInfo').then((data)=>{
//     console.log(data)
// }).catch((error)=>{

// console.log(error);

// });
//console.log(classes[0].courseList[0].lecturer.userInfo);


}
module.exports=getAllClasses;