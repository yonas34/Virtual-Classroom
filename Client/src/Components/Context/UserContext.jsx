import React, {createContext, useReducer} from 'react';

const initialState = {};
const User = createContext(initialState);
const { Provider } = User;

const UserContext = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
      console.log(action.type)
    switch(action.type) {
      case 'SET_USER':
        const newState = {"UserName":"state.UserName"};// do something with the action
        return newState;
      default:
        console.log("error");
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { User, UserContext }