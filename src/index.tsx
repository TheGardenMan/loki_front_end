import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
ReactDOM.render(<App />, document.getElementById('root'));
// https://stackoverflow.com/questions/58470055/unhandled-rejection-securityerror-the-operation-is-insecure-on-a-fresh-creat
// serviceWorker.unregister();
serviceWorker.register();
defineCustomElements(window);