/* eslint-disable no-underscore-dangle */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// canvas.toBlob() func for safari and other browsers
import { BrowserRouter } from 'react-router';
import { fromJS } from 'immutable';
import { preload, ServerStateProvider } from 'react-router-server';
import configureStore from './store';
import { RootContainer } from './containers';

import './css/common.scss';
import './css/font-awesome-4.7.0/css/font-awesome.min.css';


const rootEl = document.getElementById('root');
preload(window.__INITIAL_MODULES__).then(() => {
  const initialState = fromJS(window.__INITIAL_STATE__[1])
                       .merge(fromJS(window.__INITIAL_STATE__[2]));
  const store = configureStore(initialState);
  ReactDOM.render((
    <ServerStateProvider state={window.__INITIAL_STATE__}>
      <BrowserRouter>
        {
          ({ action, location, router }) => (
            <RootContainer router={router} action={action} location={location} store={store} />
            )
        }
      </BrowserRouter>
    </ServerStateProvider>
  ), rootEl);
});
