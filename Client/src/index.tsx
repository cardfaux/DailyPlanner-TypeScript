import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import ErrorBoundry from './Utils/ErrorBoundry';

import App from './App';
import './Styles/CSS/index.css';

const theme = {
  colors: {
    primary: '#89cff0',
    secondary: '#f089cf'
  }
};

const AppRoot = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <ErrorBoundry>
        <App />
      </ErrorBoundry>
    </React.StrictMode>
  </ThemeProvider>,
  AppRoot
);
