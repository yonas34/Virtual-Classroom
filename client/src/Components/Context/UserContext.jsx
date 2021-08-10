import React, {createContext, useState,useReducer} from 'react';

const initialState = {};
const User = createContext(initialState);
const { Provider } = User;

const UserContext = ( { children } ) => {
  const [User,setUser]=useState({UserName:"Yon"});
   const [Authenticated,setAuthenticated]=useState(false);
  const [state, dispatch] = useReducer((state, action) => {
      console.log(action)
    switch(action.type) {
      case 'SET_USER':
        setUser ({"UserName":action.UserName,"last_name":action.last_name,"UserType":action.UserType,UserId:action.UserId,UserEmail:action.UserEmail,authenticated:action.authenticated,Passwd:action.Passwd});
        console.log(User);
        // do something with the action
        return User;
      case 'USER_LOGEDOUT':
      setUser({authenticated:false})
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