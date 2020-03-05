import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import SearchTabs from './SearchTabs';
import SearchGrid from './SearchGrid';

// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//     },
// }));

const Search = () => {
    // const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
            <SearchGrid />
            </Container>
        </React.Fragment>
    )
}

export default Search;