import React from 'react';
import  ReactDOM  from "react-dom";
import {BrowserRouter}from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";
import { UserContext } from './Context/UserContext';
import { StreamContext } from './Context/stream';
const theme=createTheme();

ReactDOM.render((
    <StreamContext>
<UserContext>
    <ThemeProvider theme={theme}>
<BrowserRouter>


<App/>

</BrowserRouter>
</ThemeProvider> 
</UserContext>
</StreamContext>
)
,document.getElementById('root'))
serviceWorker.unregister();

