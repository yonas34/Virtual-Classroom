import React,{useContext,useState} from 'react'
import { User } from './Context/UserContext'
import axios from 'axios';




import{ Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,makeStyles,Container} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


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
 
   const {dispatch}=globalstate;
   const dataSubmitted=(data)=>{
     data.preventDefault();
   
   if(register)
{   dispatch({type:"SET_USER",UserName:userName,userType:userType,userId:userId,UserEmail:email,Passwd:password});
//register user axios implementation
axios.post('https://localhost:8000/register',{"UserName":userName,"Email":email,"password":password}).then((response)=>{

console.log(response);
});
    dispatch({"type":"USER_LOGEDIN"});}
  if(!register)
  {dispatch({type:"SET_USER",UserName:userName,userType:userName==="y"? 'student':"teacher" ,userId:userId,UserEmail:email,Passwd:password});
  dispatch({"type":"USER_LOGEDIN"});}
  //login user axios implementation






  
};
const regfunc=(event)=>{
  event.preventDefault();

  setResgister(!register);
}





    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {register ? "sign up":"Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={(event)=>dataSubmitted(event)} noValidate>
          


<TextField
            variant="outlined"
            margin="normal"
            //required
            fullWidth
            id="name"
            label="User Name"
            name="name"
            autoFocus
            onChange={(event)=>setUserName(event.target.value)}
          />


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
    </Container>
    )
   
}
export default Login;




