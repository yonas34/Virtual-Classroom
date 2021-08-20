import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import routes from './routes';
import {User} from './Context/UserContext';
import { useContext } from 'react';
import Login from './pages/Login';
import React from 'react'
const App = () => {
  const{state,dispatch}=useContext(User);
  console.log(state);
  const routing = useRoutes(routes);

  return (
   
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {state.user.authenticated===true ?routing:<Login/>}
    </ThemeProvider>
    
  );
};

export default App;
