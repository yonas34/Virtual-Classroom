import { Link as RouterLink } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Logo from './Logo';
import React from 'react';


const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >

    <Toolbar sx={{ height: 64 }}>
     
 <RouterLink to="/">
     
        <Logo />
      </RouterLink>
      <Typography style={{marginLeft:'25%'}}> Infromation Management System For FCSE</Typography>

    </Toolbar>
  </AppBar>
);

export default MainNavbar;
