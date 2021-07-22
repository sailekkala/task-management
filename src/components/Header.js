import React from "react";
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
      color : 'white',
      textDecoration : 'none'
    },
  }));

export const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}  component={Link} to={'/'}>
                    Task Management
                </Typography>
                <Button color="inherit" component={Link} to={'/viewTask'}>Tasks</Button>
                <Button color="inherit" component={Link} to={'/jokes'}>Jokes</Button>
                <Button color="inherit" component={Link} to={'/login'}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
