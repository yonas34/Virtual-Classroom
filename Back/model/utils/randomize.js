function randomize(arr,group_count){
let count=Math.ceil(arr.length/group_count);
let num_pep=1;

let group_created=[];
let tempgroup;
if(count<2)
return "group number must be lessthan number of total members";

for(let j=0;j<group_count&&arr.length>0;j++){
    tempgroup=[];
    
for(let i=1;i<=count;i++)
{
let index=Math.floor(Math.random()*(arr.length-1));
num_pep++;
let ran=arr[index];
arr.splice(index,1);
if(ran===undefined)
continue;
tempgroup.push(ran);

if(arr.length===1)
tempgroup.push(arr.pop());


}
group_created.push(tempgroup);


}

return group_created;

}
module.exports=randomize;