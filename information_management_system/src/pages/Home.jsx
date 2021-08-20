import { useState} from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardActionArea, CardContent, experimentalStyled, Fab, Grid, Typography} from '@material-ui/core';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardSidebar from '../components/DashboardSidebar';
import Post from '../components/Post';
import React from 'react';
import { Add } from '@material-ui/icons';




const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});


export default function Home() {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    return (
      <DashboardLayoutRoot>
        <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <DashboardSidebar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />








        <DashboardLayoutWrapper>
          <DashboardLayoutContainer>
            <DashboardLayoutContent>
              <Outlet />
            </DashboardLayoutContent>
          </DashboardLayoutContainer>
        </DashboardLayoutWrapper>
        
      </DashboardLayoutRoot>
    
      
    );
}
