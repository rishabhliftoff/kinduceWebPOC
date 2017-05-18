import { Map, fromJS } from 'immutable';
import {
  NOTIFICATION_UPDATE,
} from '../actions/actionTypes';

const initialState = Map({
  notifications: []
});

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_UPDATE:
      state = state.set('notifications', action.notifications);
      return state;
    default:
      return state;
  }
}
