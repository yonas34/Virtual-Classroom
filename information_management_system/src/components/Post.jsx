import React,{useState} from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import {Button ,CardActions,TextField,CardMedia,Grid,Card, CardActionArea, CardContent, experimentalStyled, Typography} from '@material-ui/core';
import img from '../data /1.jpg'
import { propTypes } from 'qrcode-react';




const useStyles=makeStyles((theme)=>(

         {
    paper:{
        padding:theme.spacing(2),
        textAlign:'center',
        color:theme.palette.text.secondary,
    
    },
    img:{
        height:50,
        paddingTop:'56.25%',
        marginTop:'30',
        padding:theme.spacing(30)
  
    },
    card:{
  
  marginTop:'50px',
  width:'300%'
  
  
    },
    commentSection:{
        boxShadow:theme.shadows[14],
        color:'white',
        width:'300%'
    }
  
  }
  
  ))

  
  
export default function Post({postTitle,postBody
    ,...rest}) {

    const theme=useTheme();
console.log(theme)

   
      



    const classes=useStyles();
    const {comment,setComment}=useState('');

    return (
        <Grid container spacing={1}>
        <Grid item xs={4}>


        {/* <Card className={classes.paper}>Post
        <CardMedia className={classes.img} image={img}/>
       
        </Card> */}
    


    <Card className={classes.card} raised={true}>

<CardMedia className={classes.img} image={img} title="Contemplative Reptile"/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
{postTitle? postTitle:"Lizard" }
</Typography>
<Typography component="p">
{postBody?postBody:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}
</Typography>
</CardContent>

</Card>
<Card className={classes.commentSection} >

<TextField
variant="outlined"
margin="normal"

fullWidth
id="comment"
label="comment"
name="comment"
autoFocus
onChange={(event)=>comment(event.target.value)}
/>
<CardActions>
<Button size="small" color="primary">
Share
</Button>
<Button size="small" color="primary">
Learn More
</Button>
</CardActions>
</Card>


    </Grid>
    </Grid>
    )
};
Post.PropTypes={
postTitle:propTypes.string,
postBody:propTypes.string

}
