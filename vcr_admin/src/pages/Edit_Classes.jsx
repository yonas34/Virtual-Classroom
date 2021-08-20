import { Divider,Card, CardContent, InputLabel, MenuItem, Select } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { useContext } from 'react'
import Tableing_class from '../components/customer/Tableing_class'
import { Stream } from '../Context/stream'

export default function Edit_Classes() {
    const handleChange=(event)=>{
console.log(event.target.value);
setCh(event.target.value)
console.log(ch);
 let data=clas[clas.map(row=>row.Departement).indexOf(ch)];
 console.log(data);
setCname(data);
}
    const [clas,setClas]=useState([]);
    const [cname,setCname]=useState();
    const [ch,setCh]=useState("IT");
     const colum_student=[
        {id:'first_name',numeric:false,disablePadding:true,label:'First Name'},
        {id:'last_name',numeric:false,disablePadding:false,label:'Last Name'},
        {id:'email',numeric:false,disablePadding:false,label:'Email Address'},
        {id:'id',numeric:true,disablePadding:false,label:'UUID'},
     ]
const setRow=()=>{


}
    const {stream,setStream}=useContext(Stream);
  
useEffect(() => {
    axios.post("https://10.42.0.1:8000/get_all_classes").then((response)=>{
setClas(response.data);

    });
   

    
}, [])
    return (
        <Card>
            <CardContent>
            <InputLabel  id="user_type_lable">Departement</InputLabel>
        <Select value={ch} onChange={(event)=>handleChange(event)}  labelId="user_type_lable" id='dep'  >
           
        { clas.map((departement)=>{
                  console.log(departement._id);
                  
return(<MenuItem name='departement' id='dep' onSelect={(event)=>handleChange(event)} key={departement._id} value={departement.Departement}>{departement.Departement}</MenuItem>)
            })}


                </Select>
              

                
                </CardContent>
                <Divider/>
               {cname &&  <Tableing_class row={cname.userList} column={colum_student} setRow={setRow} tit="Student List"/>}

               <Divider/>
               
               {console.log(cname)}
        </Card>
    )
}
