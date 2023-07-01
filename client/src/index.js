import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './shared/config/redux/store';
import 'shared/config/i18n/i18n';
import { ErrorBoundary, ThemeProvider } from './shared/providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ThemeProvider>
        <Provider store={store}>
          <App/>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
