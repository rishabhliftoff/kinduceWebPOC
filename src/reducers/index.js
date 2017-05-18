/* eslint-disable new-cap */

import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import notification from './NotificationReducer';


const RootReducer = combineReducers({
  notification
});

export default RootReducer;
