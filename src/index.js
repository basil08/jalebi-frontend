import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './custom.scss';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <MetaMaskProvider debug={false} sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "Jalebi Frontend",
          url: window.location.host,
        }
      }}>
        <App />
      </MetaMaskProvider>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
