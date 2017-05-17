/* global location */
import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from '../containers';

export default props => (
  <div>
    { props.store && <Provider store={props.store}>
      <AppContainer {...props.otherProps} />
      </Provider>
    }
  </div>
);
