import React, {createContext, useReducer,useState} from 'react';

const initialState = {streaming:false};
const Stream = createContext(initialState);
const { Provider } = Stream;

const StreamContext = ( { children } ) => {
 let streamState={streaming:false};
  const [stream, setStream] = useReducer((stream, action) => {
//    console.log(action);
    switch(action.type) {
      case 'stream':
         
        stream={localStream:action.localStream,remoteStream:action.remoteStream,Streaming:true};
     
        return stream;
        
      default:
        throw new Error(action.type);
    };
  }, initialState);
  

  return <Provider value={{  setStream }}>{children}</Provider>;
};

export {Stream,StreamContext }