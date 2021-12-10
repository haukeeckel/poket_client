import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { UserProviderWrapper } from './context/user.context';
import { ErrorProviderWrapper } from './context/error.context';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProviderWrapper>
        <ErrorProviderWrapper>
          <App />
        </ErrorProviderWrapper>
      </UserProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
