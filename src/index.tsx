import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { theme } from './themeMU';
import { ThemeProvider } from '@mui/material';
import {store} from './store/store'
import './index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    </ThemeProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
