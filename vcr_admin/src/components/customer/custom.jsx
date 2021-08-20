import React from 'react';
import axios from 'axios';

export const column=[
{id:'first_name',numeric:false,disablePadding:true,lable:'First Name'},
{id:'last_name',numeric:false,disablePadding:true,lable:'Last Name'},
{id:'email',numeric:false,disablePadding:true,lable:'Email Address'},
{id:'id',numeric:true,disablePadding:false,lable:'UUID'},
{id:'password',numeric:false,disablePadding:true,lable:'PWD'},
{id:'user_type',numeric:false,disablePadding:true,lable:'User Type'}
]
export const getRow=async()=>{
    let list=[]

   await axios.post("https://10.42.0.1:8000/get_all_users").then((data)=>{

list=data.data;
});
console.log(list);
return list}



