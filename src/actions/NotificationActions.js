import {
  NOTIFICATION_UPDATE,
  NOTIFICATION_CLEAR,
} from './actionTypes';

export function notificationUpdate(newNotifications) {
  return {
    type: NOTIFICATION_UPDATE,
    newNotifications,
  };
}

export function notificationClear() {
  return {
    type: NOTIFICATION_CLEAR,
  };
}
