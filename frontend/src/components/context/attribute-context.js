import React, {createContext, useContext, useReducer} from 'react';

export const AttributeContext = createContext();

export const AttributeProvider = ({reducer, initialAttribute, children}) =>(
  <AttributeContext.Provider value={useReducer(reducer, initialAttribute)}>
    {children}
  </AttributeContext.Provider>
);

export const useAttribute = () => useContext(AttributeContext);