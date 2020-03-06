import React from 'react';
import { useHistory } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import StorageIcon from '@material-ui/icons/Storage';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import MapIcon from '@material-ui/icons/Map';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import StreetviewIcon from '@material-ui/icons/Streetview';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      paddingTop: "64px",
    },
  },  
}));

const SideDrawer = props => {
    let history = useHistory();
    const classes = useStyles();
    const theme = useTheme();

    const pushLink = link => {
      history.push(link);
      props.handleDrawerToggle();
    }

    const drawer = (
        <div>
            <ListItem classes={{root: classes.root}} button>
                <ListItemIcon><AppsIcon color="primary" fontSize="large" /></ListItemIcon>
                <Typography color="primary" style={{ fontSize: '25px', fontWeight: '500' }}>
                    Console
                </Typography>
              </ListItem>
          <Divider />
          <List>
            <ListItem button onClick={() => {pushLink('/')}}>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><AccessibilityIcon /></ListItemIcon>
                <ListItemText primary="Activity" />
              </ListItem>
          </List>
          <Divider />
          <List>
          <ListSubheader component="div">
            DATABASE
          </ListSubheader>  
          <ListItem button onClick={() => {pushLink('/store')}}>
                <ListItemIcon><StorageIcon /></ListItemIcon>
                <ListItemText primary="Store" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><AddPhotoAlternateIcon /></ListItemIcon>
                <ListItemText primary="Add Video" />
              </ListItem>
          </List>
          <Divider />
          <List>
          <ListSubheader component="div">
            TOOLS
          </ListSubheader>
              <ListItem button onClick={() => {pushLink('/search')}}>
                <ListItemIcon><ImageSearchIcon /></ListItemIcon>
                <ListItemText primary="Search" />
              </ListItem>  
              <ListItem button onClick={() => {pushLink('/videoquality')}}>
                <ListItemIcon><CameraEnhanceIcon /></ListItemIcon>
                <ListItemText primary="Video Quality" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><InsertChartIcon /></ListItemIcon>
                <ListItemText primary="Visualization" />
              </ListItem>
          </List>
          <Divider />
          <List>
          <ListSubheader component="div">
            REALTIME MAPPING
          </ListSubheader>  
            <ListItem button onClick={() => {pushLink('/maps')}}>
                <ListItemIcon><MapIcon /></ListItemIcon>
                <ListItemText primary="Maps" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><StreetviewIcon /></ListItemIcon>
                <ListItemText primary="Streetview" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><PersonPinIcon /></ListItemIcon>
                <ListItemText primary="Pinpoint" />
              </ListItem>
          </List>
        </div>
      );

    return (
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden lgUp>
          <Drawer
            container={props.container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav> 
  );
}

export default SideDrawer;