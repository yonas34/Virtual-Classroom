import React,{useContext,useState} from 'react'
import { makeStyles,AppBar,Toolbar,Typography,IconButton,Avatar ,Tabs,Tab} from '@material-ui/core';
import { Menu as MenuIcon, Satellite } from "@material-ui/icons";

import {User} from '../Context/UserContext'
import Home from '../Home';
import Schedule from '../Schedule';
import Conference from '../Conference'
import Profile from '../Profile'



export default function Navigation(){
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        avatar: {
            display: 'flex',
            '& > *': {
              
              marginLeft:'1200px'
            
            },
          }
    
    
      }));
      const classes = useStyles();
      const routes=["/home","/schedule","/classroom","/profile","/support","/admin"];
      const {dispatch,state}=useContext(User);

const [selected,setSelected]=useState(0);
const handleTab=(event,newTab)=>{
setSelected(newTab);

}    
const ImageAvatar=()=>{

      
      
        return (
          <div className={classes.avatar}>
           
            <Avatar alt={state.UserName}  src="/static/images/avatar/3.jpg" />
          </div>
        );
    
    
    
      }

    
console.log(state);
function Auth_nav(){ if(state.authenticated)
  return(
  <Tabs value={selected} onChange={handleTab}>
     <Tab label='HOME' />
     <Tab label='SCHEDULE' />
     <Tab label='CLASSROOM' />
     <Tab label='PROFILE' />
     <Tab label='SUPPORT' />
     <Tab label='ADMIN' />
     

   </Tabs>
   

   )

   return null;
   }



      return (
        <div className={classes.root}>
      <AppBar position="static">
      <Toolbar variant="dense">
      
              <Typography variant="h6" color="inherit">
                VCR
                <ImageAvatar/>
              </Typography>
            </Toolbar>
           <Auth_nav/>

           
           
          </AppBar>

{selected === 0 && state.authenticated && <Home/>}
{selected === 1 && state.authenticated  && <Schedule/>}
{selected === 2 && state.authenticated  && <Conference/>}
{selected === 3 && state.authenticated  && <Profile/>}


        </div>
      );
}






