import React, {createContext, useReducer,useState} from 'react';

const initialState = {};
const Stream = createContext(initialState);
const { Provider } = Stream;

const StreamContext = ( { children } ) => {
 
  const [stream, setStream] = useReducer((stream, action) => {
//    console.log(action);
    switch(action.type) {
      case 'stream':
         
        stream=action.class;
     
        return stream;
        break;
        
      default:
        throw new Error(action.type);
    break;
      };
  }, initialState);
  

  return <Provider value={{ stream, setStream }}>{children}</Provider>;
};

export {Stream,StreamContext }