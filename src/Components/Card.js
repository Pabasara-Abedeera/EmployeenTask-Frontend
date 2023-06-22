import React from 'react'
import { Card as MuiCard,CardActionArea,CardMedia,CardContent,Typography } from '@mui/material';
export default function Card(props) {
    const {text,img,alt}=props;	
    const styles = {
      card: {
        border: "#fff solid 3px",
        //boxShadow:'#f7f740 3px 2px 10px'
      },
      media: {
        height: 250,
        objectFit: 'cover', // Crop the image to fit the container
        objectPosition:'50% 40%',
      },
    }
  return (
    <div style={styles.div}>
        <MuiCard sx={{
    maxWidth: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    '&:hover': {
      // Add hover styles here
      // For example, change the background color and add a box shadow
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      boxShadow: '#72a1ed 2px 2px 20px',
    },
  }} style={styles.card} className='cards' >
      <CardActionArea>
        <CardMedia
          style={styles.media}
          component="img"
          height="250"
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
