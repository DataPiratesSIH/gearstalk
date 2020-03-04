import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import Logout from '../auth/Logout';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import SideDrawer from './SideDrawer';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
    title: {
    flexGrow: 1,
  },
}));

const ResponsiveDrawer = props => {
  const auth = useContext(AuthContext);
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            gearStalk
          </Typography>
          {!auth.isLoggedIn && (
              <Button color="inherit">
              <Link 
                style={{ 
                        color: "white", 
                        textDecoration: "none", 
                        fontSize: "16px" 
                      }} 
                to="/signin"
              >
                  Login
              </Link>
            </Button>
          )}
          {auth.isLoggedIn && (
            <Logout />
          )}
        </Toolbar>
      </AppBar>
        <SideDrawer 
          theme={theme}
          container={container}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      <main className={classes.content}>
        <div style={{ marginTop: "70px" }}>
            {props.children}
        </div>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.any,
};

export default ResponsiveDrawer;
