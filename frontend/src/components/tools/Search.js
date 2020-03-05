import React from 'react';
import { AttributeProvider } from '../context/attribute-context';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchGrid from './SearchGrid';

const Search = () => {
    const initialAtribute = {attributes: []}
      
    const reducer = (state, action) => {
        switch (action.type) {
          case 'changeAttribute':
            return {
              ...state,
              attributes: [action.newAttribute]
            };
            
          default:
            return state;
        }
    };

    return (
        <AttributeProvider initialAttribute={initialAtribute} reducer={reducer} >
            <CssBaseline />
            <Container maxWidth="xl">
            <SearchGrid />
            </Container>
        </AttributeProvider>
    )
}

export default Search;