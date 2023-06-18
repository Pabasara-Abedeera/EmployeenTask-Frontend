import React from 'react';
import { makeStyles} from '@material-ui/styles';
const useStyles=makeStyles({
    sideMenu:{
        display: 'flex',
        flexDirection: 'column',
        position:'absolute',
        overflowX: 'hidden',
        left:'0px',
        width: '20%',
        height: '100%',
        backgroundColor: '#0d2024',
        zIndex: 1,
        top:"11%",
        bottom:0
    }
})
export default function SideMenu() {
    const classes=useStyles( );
  return (
    <div className={classes.sideMenu}>
    </div>
  )
}
