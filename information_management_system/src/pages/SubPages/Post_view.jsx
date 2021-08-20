import { ClassNames } from '@emotion/react'
import { Box, Button, CardActionArea, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, TextField } from '@material-ui/core'
import React from 'react'
import Post from '../../components/Post'
import { makeStyles } from '@material-ui/styles'
import { Add, Input } from '@material-ui/icons'
import { useState } from 'react'
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core'
import moment from 'moment';
import {
  Avatar,
 

  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,CardHeader
} from '@material-ui/core';
import { useRef } from 'react'
import { Image } from 'react-feather'
const useStyles=makeStyles((theme)=>(
    {root:{
        flexGrow:3,
    },
    paper:{
        padding:theme.spacing(2),
        textAlign:'center',
        color:theme.palette.text.secondary,
    
    }
    }
    
    ));
export default function Post_view() {
    const theme=useTheme();
    const fullScreen=useMediaQuery(theme.breakpoints.down('lg'));
    const classes=useStyles();
    const [post,setPost]=useState("This is post");
    const [postBody,setPostBody]=useState('post Body');
    const [postImage,setPostImage]=useState(null);
    const [postP,setPostP]=useState(false);
    const uploadInputRef=useRef(null);
    {console.log(postImage)}
    const [posts,setPosts]=useState([<Post postTitle="postTitle" postBody="postBody" />])
    const handleSubmission=()=>{


        const file=new FormData();
        file.append('File',file);
        console.log(file);
        setPosts([...posts,<Post postTitle={post} postBody={postBody}/>]);
        setPostP(false);
    }
    return (

        <div className={classes.root}>
      <div>     
          {posts.map((post)=>{

return post;
          })};

        </div>
        <Dialog fullScreen={fullScreen}  className={"MuiDialog-root"} open={postP}><DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
       




        <Card >
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <img
       src={'/static/images/products/product_1.png'}
          sx={{
            height: 100,
            width: 100
          }}
          alt='post'
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {post}
        </Typography>




        <Typography
          color="textPrimary"
          gutterBottom
          variant="h6"
        >
          {postBody}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${'Addis Abeba'} ${'Ethiopia'}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${moment().format('hh:mm A')} ${new Date().getDate()}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActionArea>
    <CardActions>
        <input  style={{display:'none'}}ref={uploadInputRef} accept="image/*" type='file' onChange={(event)=>{setPostImage(event.target.files[0])}}/>
      <Button
        color="primary"
        fullWidth
        variant="text"
        component="span"
        onClick={()=>uploadInputRef.current && uploadInputRef.current.click()}
      >
        Upload picture
      </Button>
     
     
    </CardActions>
    <Divider />
    <CardActions>
    <TextField
                  error={Boolean(post==="")}
                  fullWidth
                  helperText={post==""}
                  label="Post Title"
                  margin="normal"
                  name="postTitle"
                  
                  onChange={(event)=>setPost(event.target.value)}
                  type="text"
                  value={post}
                  variant="outlined"
                />


      </CardActions>
      <Divider/>
      <CardActions>
      <TextField
                  error={Boolean(postBody==="")}
                  fullWidth
                  helperText={postBody==""}
                  label="Post Body"
                  margin="normal"
                  name="postBodyTitle"
                  
                  onChange={(event)=>setPostBody(event.target.value)}
                  type="text"
                  value={postBody}
                  variant="outlined"
                />

      </CardActions>
      </CardActionArea>
  </Card>













            </DialogContent>
        <DialogActions>
            
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
            <Button onClick={handleSubmission}>Done</Button></DialogActions>
        </Dialog>
        <Fab onClick={()=>setPostP(!postP)} onDragExit={true} color="primary" style={{position:'fixed',margin:0,top:'auto',right:20,bottom:20,left:'auto'}}>
    <Add/>
    
            </Fab>
     
        </div>
    )
}
