import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import VideoCard from './VideoCard';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

const Store = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
            <div className={classes.root}>
            <Grid container spacing={4}>
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
            </Grid>
            </div>
            </Container>
        </React.Fragment>
    )
}

export default Store;