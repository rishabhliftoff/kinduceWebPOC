import { Map, fromJS, List } from 'immutable';
import {
  NOTIFICATION_UPDATE,
  NOTIFICATION_CLEAR,
} from '../actions/actionTypes';

const initialState = List();

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_UPDATE:
      action.newNotifications.forEach((notification) => {
        state = state.push(
          Map({
            id: notification.id,
            name: notification.name,
            message: notification.message,
          })
        )
      });
      return state;

    case NOTIFICATION_CLEAR:
      return initialState;

    default:
      return state;
  }
}
