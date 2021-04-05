import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Translate } from '@material-ui/icons';
//
const useStyles = makeStyles((theme)=> ({
    root : {
        minHeight: '10vh',
        fontFamily: 'Nunito',
        background: "#ddd",
        left: '0px',
        bottom: '0px',
        // position: '',
        width: '100%',
        textAlign: 'center',
        marginTop: "20vh"
                
    },
    text: {
        color: "#000",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem' ,
        transform: 'translateY(60%)'  ,   
    },
    con: {
        color: "#5aff3d",
        textDecoration: "none",
    }

}
))
function Footer() {
    const classes = useStyles()
    return (
        <div className={classes.root}  >
            <Typography variant="p" className={classes.text}>
                The captaion House <a className={classes.con} href="https://github.com/jim-2000">Developer</a>
            </Typography>
           
        </div>
    )
}

export default Footer;