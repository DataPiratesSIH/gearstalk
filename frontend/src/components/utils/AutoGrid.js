import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

const AutoGrid = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container spacing={4}>
            <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
            <Paper className={classes.paper} square>
            </Paper>
            </Grid>
            <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
            <Paper style={{ margin: 'auto' }} className={classes.paper} square>
                <div style={{ marginTop: "50px" }}>
                <h1>BLANK</h1>
                </div>
            </Paper>
            </Grid>
            <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
            <Paper className={classes.paper} square>
                <div style={{ marginTop: "50px" }}>
                <h1>BLANK</h1>
                </div>
            </Paper>
            </Grid>
        </Grid>
        </div>
    );
}

export default AutoGrid;