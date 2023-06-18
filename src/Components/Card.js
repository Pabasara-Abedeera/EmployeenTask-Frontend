import React from 'react'
import { Card as MuiCard,CardActionArea,CardMedia,CardContent,Typography } from '@mui/material';
export default function Card(props) {
    const {text,img,alt}=props;	
    const styles = {
        card:{
            border:"#fff solid 3px",
            '&:hover':{
                border:'#fff solid 5px'
            }
        }
        }
  return (
    <div>
        <MuiCard sx={{ maxWidth: 400, backgroundColor:'rgba(0, 0, 0,0.6)',}} style={styles.card} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          image={img}
          alt={alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color={"#fff"} align='center'>
            {text}
          </Typography>
      
        </CardContent>
      </CardActionArea>
    </MuiCard>
      
    </div>
  )
}
