import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { MainLocationProviderWrapper } from './context/mainlocation.context';
import { UserProviderWrapper } from './context/user.context';
import { ErrorProviderWrapper } from './context/error.context';
import { UserLocationProviderWrapper } from './context/userLocation.context';

import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLocationProviderWrapper>
        <UserProviderWrapper>
          <ErrorProviderWrapper>
            <UserLocationProviderWrapper>
              <App />
            </UserLocationProviderWrapper>
          </ErrorProviderWrapper>
        </UserProviderWrapper>
      </MainLocationProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
