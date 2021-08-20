import React, {createContext, useReducer,useState} from 'react';

const initialState = {};
const Page = createContext(initialState);
const { Provider } = Page;

const PageContext = ( { children } ) => {
  const [pageState,setPageState]= useState(1);
  const [page, setPage] = useReducer((state, action) => {
   console.log(action.pageNo);
    switch(action.type) {
      case 'change':
        setPageState(action.pageNo);
        return pageState;
        
      default:
        throw new Error(action.type);
    };
  }, initialState);

  return <Provider value={{ page, setPage }}>{children}</Provider>;
};

export {Page, PageContext }