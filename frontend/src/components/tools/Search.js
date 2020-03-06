import React from 'react';
import uuid from 'uuid';
import { AttributeProvider } from '../context/attribute-context';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchGrid from './SearchGrid';

const Search = () => {
    const initialAtribute = {attributes: [{id: uuid(), gender: "Male", features: [{id: uuid(), cloth: "Shirt", color: { "hex": "#000" }}]}]}
      
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
                  gender: "Female",
                  features: [{id: uuid(), cloth: "Pant", color: { "hex": "#000" }}]
                }
              ]
            };
          
          case 'deletePerson':
            const newAttributes = attributes.filter((attribute) => attribute.id !== action.pid);
            return {
                attributes: newAttributes
            }


          case 'addFeature':
            attributes.forEach(function (attribute, index) {
              if (attribute.id === action.pid) {
                attribute.features.push({id: uuid(), cloth: "Shirt", color: { "hex": "#000" }})
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

          case 'updateFeature':
            if (action.field === "gender") {
              for (let i=0; i<attributes.length; i++) {
                if (attributes[i].id === action.uid) {
                  attributes[i].gender = action.value
                }
              }
            } else if (action.field === "cloth") {
              for (let i=0; i<attributes.length; i++) {
                for (let j=0; j<attributes[i].features.length; j++) {
                  if (attributes[i].features[j].id === action.uid) {
                    attributes[i].features[j].cloth = action.value
                  }
                }
              }
            } else {
              for (let i=0; i<attributes.length; i++) {
                for (let j=0; j<attributes[i].features.length; j++) {
                  if (attributes[i].features[j].id === action.uid) {
                    attributes[i].features[j].color = action.value
                  }
                }
              }
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