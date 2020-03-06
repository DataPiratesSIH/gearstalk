import React from 'react';
import uuid from 'uuid';
import { AttributeProvider } from '../context/attribute-context';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchGrid from './SearchGrid';

const Search = () => {
    const initialAtribute = {attributes: [{id: uuid(), gender: "male", features: [{id: uuid(), cloth: "", color: "#FFFFFF"}]}]}
      
    const reducer = (state, action) => {
        let attributes = state.attributes;
        switch (action.type) {
        
          case 'changeAttribute':
            return {
              ...state,
              attributes: [action.newAttribute]
            };

          case 'addPerson':
            return {
              attributes: [
                ...state.attributes,
                {
                  id: uuid(),
                  gender: "female",
                  features: [{id: uuid(), cloth: "", color: "#FFFFFF"}]
                }
              ]
            };
          
          case 'addFeature':
            attributes.forEach(function (attribute, index) {
              if (attribute.id === action.pid) {
                attribute.features.push({id: uuid(), cloth: "", color: "#FFFFFF"})
              }
            });
            return {
                attributes: attributes
            }


          case 'addFeature':
            attributes.forEach(function (attribute, index) {
              if (attribute.id === action.pid) {
                attribute.features.push({id: uuid(), cloth: "", color: "#FFFFFF"})
              }
            });
            return {
                attributes: attributes
            }
          
          case 'deleteFeature':
            for (let i=0; i<attributes.length; i++) {
                const newFeatures = attributes[i].features.filter((feature) => feature.id !== action.did);
                attributes[i].features = newFeatures;
            }
            return {
                attributes: attributes
            }
            
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