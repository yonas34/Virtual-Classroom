import React,{useState} from 'react'
import AccountProfile from '../../components/AccountProfile'
import AccountProfileDetails from '../../components/AccountProfileDetails'
import MileStone from '../../components/MileStone'
import TasksProgress from '../../components/TasksProgress'
import customers from '../../__mocks__/customers'
export default function Deans_profile() {
    const increment_Size=100/customers.length;
    const [sizeOfSelected,setSizeOfSelected]=useState(0);
    const [progress,setProgress]=useState(0);
    const handleProgress=()=>{
        console.log(sizeOfSelected)
setProgress(((increment_Size*sizeOfSelected)))

    }
    const handleSelected=(selected)=>{
console.log(selected.size)
setProgress(increment_Size*selected.size)
       
       
    }
    return (
        <div>
            <AccountProfile/>
            <AccountProfileDetails/>
            <MileStone selected={(event)=>handleSelected(event)} customers={customers}/>
            <TasksProgress val={progress}/>
        </div>
    )
}
