import React from 'react'
import QrReader from 'react-qr-reader'
const handleScan=(event)=>{
if(event)
console.log(event);

}
const handleError=(event)=>{

    console.log(event);
    
    }
    
export default function Scan_qr() {
    return (
        <div>
           <QrReader onError={(event)=>handleError(event)} onScan={(event)=>handleScan(event)}/>
        </div>
    )
}
