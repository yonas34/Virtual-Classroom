import React, {createContext, useReducer} from 'react';

const initialState = {};
const Page = createContext(initialState);
const { Provider } = Page;

const PageContext = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'action description':
        const newState = {};// do something with the action
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { Page, PageContext }