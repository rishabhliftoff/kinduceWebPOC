/* eslint-disable new-cap */

import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import app from './AppReducer';

const RootReducer = combineReducers({
  app,
});

export default RootReducer;
