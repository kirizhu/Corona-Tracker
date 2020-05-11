import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  black: {
    backgroundColor: 'black',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.black} position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            COVID-19 Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
