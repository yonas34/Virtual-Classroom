import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { UserContext } from './Components/Context/UserContext';

const Apps=()=>{
  return( <UserContext>
    <App />
    </UserContext>)
}
ReactDOM.render(
  <UserContext>
  <App/>
  </UserContext>
  ,
  document.getElementById('root')
);
