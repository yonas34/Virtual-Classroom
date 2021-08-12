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
    console.log(state);
    const classes = useStyles();
    useEffect(() => {
      const response=JSON.parse(localStorage.getItem("data"));
      console.log(JSON.stringify(localStorage.length))
      if(response)
      {
        dispatch({type:"SET_USER",user:response.user,position:response.position});
    console.log(response);
      }
     
    }, [])
          return (
            <div>
          { state.user.authenticated !== true &&    <div style={{marginTop:'-64px'}}>
          <Navigation/> 
          </div>}
   { state.user.authenticated === true && <MiniDrawer/>}
{console.log(state.user.authenticated)}
          {state.user.authenticated !== true && <Login/>}
          
          
           </div>
       
    )
}
