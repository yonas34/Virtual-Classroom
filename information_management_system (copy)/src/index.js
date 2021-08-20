import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { UserContext } from './Context/UserContext';
import theme from './theme/index';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeContext } from '@material-ui/styled-engine';
import React from 'react';

ReactDOM.render((
  <ThemeProvider theme={theme}>
    
  <UserContext>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </UserContext>
  </ThemeProvider>
), document.getElementById('root'));

serviceWorker.unregister();
