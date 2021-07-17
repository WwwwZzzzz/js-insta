import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Hipstagram
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  };
 

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '30vh',
    },

    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.white : theme.palette.white,
    }, 
}));

export const PageFooter = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
                <Box maxWidth="sm" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Typography variant="caption" display="block">
                        <List style={flexContainer}>
                            <ListItemLink>
                                <ListItemText
                                    secondary="About"
                                />
                            </ListItemLink>
                            <ListItemLink>
                                <ListItemText
                                    secondary="Blog"
                                />
                            </ListItemLink>
                            <ListItemLink>
                                <ListItemText
                                    secondary="Help"
                                />
                            </ListItemLink>
                            <ListItemLink>
                                <ListItemText
                                    secondary="Privacy"
                                />
                            </ListItemLink>
                            <ListItemLink>
                                <ListItemText
                                    secondary="Terms"
                                />
                            </ListItemLink>
                            <ListItemLink>
                                <ListItemText
                                    secondary="Hashtags"
                                />
                            </ListItemLink>
                        </List>
                    </Typography>
                    <Copyright />
                </Box>
            </footer>
        </div>
    );
}