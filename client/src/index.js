import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme } from '@material-ui/core';
import { UserContext } from './Components/Context/UserContext';
import { ThemeProvider } from '@material-ui/styles';
import { PageContext } from './Components/Context/PageContext';
import {StreamContext} from './Components/Context/stream'
const theme=createTheme();


   


ReactDOM.render(
  <StreamContext>
  <ThemeProvider theme={theme}>
   
  <PageContext>
  <UserContext>
  
  <App/>
 
  </UserContext>
  </PageContext>
 
  
  </ThemeProvider>
  </StreamContext>
  
  ,
  document.getElementById('root')
);
