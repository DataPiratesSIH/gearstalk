import React from 'react';
import AutoGrid from './AutoGrid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Console = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <AutoGrid />
                
            </Container>
        </React.Fragment>
    )
}

export default Console;