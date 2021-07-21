const mongoose=require('mongoose');
const {MONGO_URI}=process.env;
exports.connect=()=>{
mongoose.connect(MONGO_URI,{
useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex:true,
useFindAndModify:true,


}).then(()=>{
console.log('successfully connected to database');
}).catch((error)=>{

console.log('databse connection faild .exiting now');
console.error(error);
process.exit(1);
})
}