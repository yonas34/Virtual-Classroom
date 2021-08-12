import React, {createContext, useState,useReducer} from 'react';

const initialState = {user:{authenticated:false}};
const User = createContext(initialState);
const { Provider } = User;

const UserContext = ( { children } ) => {
  const [User,setUser]=useState({user:{authenticated:false}});
   const [Authenticated,setAuthenticated]=useState(false);
  const [state, dispatch] = useReducer((state, action) => {
      console.log(action)
    switch(action.type) {
      case 'SET_USER':
        setUser ({user:action.user,position:action.position});
        console.log(User);
        // do something with the action
        return User;
      case 'USER_LOGEDOUT':
      setUser({user:{authenticated:false}})
        return User;
      case 'SET_WEBSOCKET':
        User.webSocket=action.webSocket;
          return User;
        default:
        console.log("error"+state);
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { User, UserContext }