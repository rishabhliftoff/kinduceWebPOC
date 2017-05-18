import {
  NOTIFICATION_UPDATE,
} from './actionTypes';

export function notificationChange(notifications) {
  return {
    type: NOTIFICATION_UPDATE,
    notifications,
  };
}
