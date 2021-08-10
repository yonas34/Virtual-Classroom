import React,{useContext,useState} from 'react'
import { makeStyles,AppBar,Toolbar,Typography,IconButton,Avatar ,Tabs,Tab} from '@material-ui/core';
import { Menu as MenuIcon, Satellite } from "@material-ui/icons";




export default function Navigation(){
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          position:'fixed'
          
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        avatar: {
            display: 'flex',
            '& > *': {
              
              marginLeft:'1200px'
            
            },
          },
          appbar:{

            position:'static'
          }
    
    
      }));
      const classes = useStyles();
     


    
const ImageAvatar=()=>{

      
      
        return (
          <div className={classes.avatar}>
           
            <Avatar alt={'V'}  src="/static/images/avatar/3.jpg" />
          </div>
        );
    
    
    
      }

    



      return (
        < >
      <AppBar className={classes.root} position="static">
      <Toolbar variant="dense">
      
              <Typography variant="h6" color="inherit">
                VCR
                <ImageAvatar/>
              </Typography>
            </Toolbar>
         

           
           
          </AppBar>

        </>
      );
}






