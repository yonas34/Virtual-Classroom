import React,{useContext} from 'react';
import Login from './Components/Login';
import Navigation from './Components/components/Navigation'
import {User} from './Components/Context/UserContext';

export default function App() {
         
    const {dispatch,state}=useContext(User);

          return (
      <div>
     <Navigation/>
{console.log()}
          {state.authenticated !== true && <Login/>}
           </div>
       
    )
}
