import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchTabs from './SearchTabs';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%'
    },
}));

const SearchGrid = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container spacing={4}>
            <Grid item xl={9} lg={9} md={9} xs={12} sm={12}>
            <Paper className={classes.paper}>
                Video
            </Paper>
            </Grid>
            <Grid item xl={3} lg={3} md={3} xs={12} sm={12}>
            <Paper className={classes.paper}>
                Features
            </Paper>
            </Grid>
            <Grid item xl={12} lg={12} md={12} xs={12} sm={12}>
            <SearchTabs />
            </Grid>
        </Grid>
        </div>
    );
}

export default SearchGrid;