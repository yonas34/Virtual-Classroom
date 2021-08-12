import React,{useState,useContext} from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Post from "./Post";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Tabs,Tab } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import {User} from '../Context/UserContext'
import Home from '../Home';
import Schedule from '../Schedule';
import Conference from '../Conference'
import Profile from '../Profile'
import ExitToApp from '@material-ui/icons/ExitToApp';
import {Page} from '../Context/PageContext';
import {Route,BrowserRouter,Switch,Link, Router} from 'react-router-dom';
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow:1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
     
    }),
    backgroundColor:'black'

  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36},
    hide: {
        display: "none"
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      drawerClose: {
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing (7 + 1),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing ( 8 + 1)
        },
        

      },
      toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing( 3)
      },
      paper:{
        padding:theme.spacing(2),
        textAlign:'center',
        color:theme.palette.text.secondary,
    
    },
    avatar: {
        display: 'flex',
        '& > *': {
          
          marginLeft:'1030px',
          
        
        },},


    }));
    

    function MiniDrawer() {

       
        const routes=["/","/schedule","/classroom","/profile","/support","/admin"];
  const {page,setPage}=useContext(Page);

  const [selected,setSelected]=useState(0);
  const handleTab=(event,newTab)=>{
    
   setPage({type:"change",pageNo:newTab});
    console.log(page);
    setSelected(newTab);

  
  }  
  const {dispatch,state}=useContext(User);
  
  function Logout(){
    console.log("logout!");
    localStorage.clear();
          dispatch({type:"USER_LOGEDOUT"});
    
        };
  const ImageAvatar=()=>{
  
        
        
          return (
            <div className={classes.avatar}>
             
              <Avatar alt={state.user.first_name}  src="/static/images/avatar/3.jpg" />
            </div>
          );
      
      
      
        }
  
      
 






      const classes = useStyles();
      const theme = useTheme();
      const [open, setOpen] = React.useState(false);
    
      function handleDrawerOpen() {
        setOpen(true);
      }
   

      function handleDrawerClose() {
        setOpen(false);
      }
      return (
        <div className={classes.root}>
          <CssBaseline />
          

          <BrowserRouter>
      <Route path="/"
    render={(history)=>(
   


          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, {
                  [classes.hide]: open
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
              VCR
                <ImageAvatar/>
              </Typography>
            </Toolbar>
            <Tabs value={history.location.pathname!=="/"?history.location.pathname:"/"} onChange={handleTab}>
      {console.log(history.location.pathname)}
       <Tab to={routes[0]}  value={routes[0]} label='HOME'  component={Link}/>
       <Tab to={routes[1]} value={routes[1]} label='SCHEDULE'  component={Link} />
       <Tab to={routes[2]} value={routes[2]} label='CLASSROOM' component={Link} />
       <Tab to={routes[3]} value={routes[3]} label='PROFILE' component={Link} />
       <Tab to={routes[4]} value={routes[4]} label='SUPPORT' component={Link} />
       <Tab to={routes[5]} value={routes[5]} label='ADMIN' component={Link} />
       
  
     </Tabs>






          </AppBar>
           )}/> 
          
           
           
           
           
          
       
         
         

          <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              {console.log(text)}
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
               
              </ListItemIcon>
             
              <ListItemText primary={text} />
            </ListItem>
          ))}
           <ListItem button key={"logout"} onClick={()=>{Logout()}}><ListItemIcon><ExitToApp/></ListItemIcon><ListItemText primary={"Logout"} /></ListItem>
           
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
 
        <Switch>
              
           {/* {<div hidden={selected !== 0 && state.authenticated} > <Grid container spacing={3}>
                      
                
                      <Post/>
                              
                          </Grid></div>}
       {<div hidden={selected !== 1 && state.authenticated} > <Schedule /></div>}
       {  <div hidden={selected !== 2 && state.authenticated} ><Conference/> </div>}
       {<div hidden={selected !== 1 && state.authenticated} >  <Profile/></div>}
        */}
       
       <Route exact path='/' ><Grid container spacing={3}>
                      
                
                      <Post/>
                              
                          </Grid></Route>
       <Route path='/schedule' ><Schedule/></Route>
       <Route path='/classroom' ><Conference/></Route>
       <Route path='/profile'> <Profile/></Route>
       <Route path='/support' ><div>support</div></Route>
           </Switch>
         </main>
         </BrowserRouter>
    </div>
  );
}

export default MiniDrawer;