import React, {createContext, useState,useReducer} from 'react';

const initialState = {};
const User = createContext(initialState);
const { Provider } = User;

const UserContext = ( { children } ) => {
  const [User,setUser]=useState({UserName:"Yon"});
  // const [Authenticated,setAuthenticated]
  const [state, dispatch] = useReducer((state, action) => {
      console.log(state)
    switch(action.type) {
      case 'SET_USER':
        setUser ({"UserName":action.UserName,UserType:action.userType,UserId:action.userId,UserEmail:action.UserEmail,authenticated:false,Passwd:action.Passwd});// do something with the action
        return User;
      case 'USER_LOGEDIN':
       User.authenticated=!User.authenticated;
        return User;
      case 'SET_WEBSOCKET':
        User.webSocket=action.webSocket;
          return User;
        default:
        console.log("error");
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { User, UserContext }