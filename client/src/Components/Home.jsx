import React from 'react'
import Post from './components/Post'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const useStyles=makeStyles((theme)=>(
{root:{
    flexGrow:1,
},
paper:{
    padding:theme.spacing(2),
    textAlign:'center',
    color:theme.palette.text.secondary,

}
}

));
export default function Home() {
    const classes=useStyles();
    return (
        <div className={classes.root}>
            
           
        </div>
    )
}
