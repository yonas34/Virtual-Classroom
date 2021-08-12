import React,{useContext,useState,useEffect} from 'react'
import { User } from './Context/UserContext'
import axios from 'axios';


import image from '../data/bg.jpg'

import{ Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,makeStyles,Container} from '@material-ui/core';
import { Paper } from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Navigation from './components/Navigation';



function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage:'url('+image+')'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
 const Login=()=> {
    const [email,setEmail]=useState('');
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [userType,setUserType]=useState('Teacher');
    const [userId,setUserId]=useState('#123123');
    const [register,setResgister]=useState(false);
    const [password2,setPassword2]=useState('');

    const globalstate=useContext(User);
    const classes = useStyles();
 




   const {state,dispatch}=globalstate;
   
   const dataSubmitted=async(data)=>{
     data.preventDefault();
   
   if(register)
{   dispatch({type:"SET_USER",UserName:userName,userType:userType,userId:userId,UserEmail:email,Passwd:password});
//register user axios implementation
await axios.post('https://10.42.0.1:8000/register',{"UserName":userName,"Email":email,"password":password}).then((response)=>{

console.log(response);
});
   }
  if(!register)
  {
   await axios.post('https://10.42.0.1:8000/login',{"email":email,"password":password}).then((response)=>{
let data=response.data;
data.user.authenticated=true;

console.log(data);
console.log(localStorage.length)
localStorage.setItem('data',JSON.stringify(response.data));

//dispatch({type:"SET_USER","UserName":response.data.user.first_name,"last_name":response.data.user.last_name,"UserType":response.data.user.user_type,UserId:response.data.user._id,UserEmail:response.data.user.email,authenticated:true,Passwd:response.data.user.password});
dispatch({type:"SET_USER",user:data.user,position:data.position});

    })

    
    
   


}
  //login user axios implementation






  
};
const regfunc=(event)=>{
  event.preventDefault();

  setResgister(!register);
}





    return (
      
        <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <Paper className={classes.paper}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {register ? "sign up":"Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={(event)=>dataSubmitted(event)} noValidate>
          


{register &&<TextField
            variant="outlined"
            margin="normal"
            //required
            fullWidth
            id="name"
            label="User Name"
            name="name"
            autoFocus
            onChange={(event)=>setUserName(event.target.value)}
          />}


<TextField
            variant="outlined"
            margin="normal"
            //required
            type="email"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event)=>setEmail(event.target.value)}
          />



          <TextField
            variant="outlined"
            margin="normal"
            //required
            fullWidth
            onChange={(event)=>{setPassword(event.target.value)}}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
 {register && <TextField
            variant="outlined"
            margin="normal"
            //required
            fullWidth
            onChange={(event)=>setPassword2(event.target.value)}
            name="password"
            label="Re-enter"
            type="password"
            id="password2"
            autoComplete="current-password"
          />
}
        {password || password2? (register &&  password != password2 && <div style={{color:'red'} }>
          {"password does not match"}
        </div>) :null }  
          {!register && <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          
      }
      {console.log( register && password == password2 )}
      
      <Button
      disabled={register ? (password == password2 && password ) ? false :true :false  }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {register && "SIGN UP"}
            {!register && "SIGN IN"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={(event)=>{regfunc(event)}} href="#" variant="body2">
                {!register && "Dont have an acount? register"}
                {register && "<<< Login"}
                
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      </Paper>
    </Container>
    )
   
}
export default Login;




