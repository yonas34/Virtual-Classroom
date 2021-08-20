import React,{useState} from 'react'
import QRCode from 'qrcode-react'
import { makeStyles } from '@material-ui/styles'
import { Button, Card, CardActions, CardContent, Slider } from '@material-ui/core';
import { Minus, Plus } from 'react-feather';
import { PlusOneTwoTone } from '@material-ui/icons';
const useStyles=makeStyles((theme)=>({
  root:{

  },
    code:{
width:"100%",


    },
}));
export default function Create_qr_code() {
    const classes=useStyles();
    const [size,setSize]=useState(100);
const increase=(event)=>{
setSize(event.target.value);
}

const decrease=()=>{
    setSize(size-50);
}

    return (
        <Card className={classes.root}>
          <CardContent><QRCode size={size} value="WIFI:S:yon;T:nopass;P:;H:false;;"/>
          </CardContent>

      <CardActions>     
    <Slider valueLabelDisplay={'on'} step={10} default={size} marks={true} max={600} min={480} onChange={(event)=>increase(event)}/>
    </CardActions> 
    </Card>
    )
}
