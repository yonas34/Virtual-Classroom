import { Container, ThemeProvider } from '@material-ui/core';
import React,{useContext} from 'react'
import { useNavigate, useRoutes } from 'react-router';
import routes from './routes';
import {User} from './Context/UserContext'
import Login from './pages/Login';
export default function App() {
    const routing=useRoutes(routes);
    const navigate=useNavigate();
    const {state,dispatch}=useContext(User);
    console.log(state);
    
    return (
        
           <Container>
            {!state.user.authenticated? routing:<Login/>}
            </Container>
            
        
    )
}
