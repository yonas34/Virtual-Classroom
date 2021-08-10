import React,{useState} from 'react'
import { CardMedia, makeStyles,Card ,TextField,Grid,Paper,CardActions,CardContent,Button,Typography} from '@material-ui/core'

import { Image } from '@material-ui/icons';
import img from '../../data/1.jpg';


const useStyles=makeStyles((theme)=>({
    paper:{
        padding:theme.spacing(2),
        textAlign:'center',
        color:theme.palette.text.secondary,
    
    },
    img:{
        height:100,
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

}))

export default function Post() {
    const {comment,setComment}=useState('');
    const classes=useStyles();
    return (
        <Grid item xs={4}>


                    {/* <Card className={classes.paper}>Post
                    <CardMedia className={classes.img} image={img}/>
                   
                    </Card> */}
                


                <Card className={classes.card} raised={true}>
       
         <CardMedia className={classes.img} image={img} title="Contemplative Reptile"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
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
    )
}
