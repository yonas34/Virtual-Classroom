import React from 'react'
import { makeStyles,AppBar,Toolbar,Typography,IconButton,Avatar } from '@material-ui/core';
import { Menu as MenuIcon } from "@material-ui/icons";







export default function Navigation(){
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        avatar: {
            display: 'flex',
            '& > *': {
              margin: theme.spacing(1),
            },
          }
    
    
      }));
      const classes = useStyles();

    const ImageAvatar=()=>{

      
      
        return (
          <div className={classes.avatar}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </div>
        );
    
    
    
      }

    

      return (
        <div className={classes.root}>
      <AppBar position="static">
      <Toolbar variant="dense">
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon/>
              </IconButton>
              <Typography variant="h6" color="inherit">
                VCR
                <ImageAvatar/>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
}






