import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { custom_theme } from '../styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    tr: {
      '&:hover': {
         color: fade(custom_theme.palette.secondary.main, 1),
      },
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }));
  
  export const LayoutLogin = ({children}) => {
    const classes = useStyles();
  
    return (
      <MuiThemeProvider theme={custom_theme}>
          <Box maxWidth="md" display='flex' pt="2rem" justifyContent="center">
              <Typography className={classes.title} variant="h2" >
                <Link href="/" color="inherit" style={{ textDecoration: 'none' }} className={classes.tr} >
                  Hipstagram
                </Link>
              </Typography>
              </Box>
        {children}
      </MuiThemeProvider>
    );
  }
  