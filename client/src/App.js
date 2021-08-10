import React,{useContext,useEffect} from 'react';
import Login from './Components/Login';
import Navigation from './Components/components/Navigation'
import {User} from './Components/Context/UserContext';
import image from './data/bg.jpg'
import { Paper,makeStyles } from '@material-ui/core';
import MiniDrawer from './Components/components/MiniDrawer';

const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundImage:'center no-repeat url('+image+')',
      backgroundSize:'10% 10%'
    }}));
    
    
 
export default function App() {

  

         
    const {dispatch,state}=useContext(User);
    const classes = useStyles();
    useEffect(() => {
      const response=JSON.parse(localStorage.getItem("user"));
      console.log(JSON.stringify(localStorage.length))
      if(response)
      {
        dispatch({type:"SET_USER",UserName:response.first_name,last_name:response.last_name,UserType:response.user_type,UserId:response._id,UserEmail:response.email,Passwd:response.password,authenticated:true});
    console.log(response);
      }
     
    }, [])
          return (
            <div>
          { state.authenticated !== true &&    <div style={{marginTop:'-64px'}}>
          <Navigation/> 
          </div>}
   { state.authenticated === true && <MiniDrawer/>}
{console.log(state.authenticated)}
          {state.authenticated !== true && <Login/>}
          
          
           </div>
       
    )
}
