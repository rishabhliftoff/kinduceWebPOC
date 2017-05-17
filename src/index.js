/* eslint-disable no-underscore-dangle */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// canvas.toBlob() func for safari and other browsers
import { BrowserRouter } from 'react-router';
import { fromJS } from 'immutable';
import { preload, ServerStateProvider } from 'react-router-server';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './helpers/canvasToBlob';
import configureStore from './store';
import '../node_modules/megadraft/dist/css/megadraft.css';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import '../node_modules/react-select/dist/react-select.css';
import './css/Draft.css';
import './css/draftStyles.css';
import '../node_modules/cropperjs/dist/cropper.css';
import './css/common.scss';
import './css/customize.scss';
import './css/mobile.scss';
import './css/variables.scss';
import './css/custom-css.css';
import { RootContainer } from './containers';

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
