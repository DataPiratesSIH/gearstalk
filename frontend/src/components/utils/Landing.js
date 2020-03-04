import React from 'react';
import AutoGrid from './AutoGrid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
// import LoadingSpinner from './LoadingSpinner';

const Landing = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <AutoGrid />
                
            </Container>
        </React.Fragment>
    )
}

export default Landing;